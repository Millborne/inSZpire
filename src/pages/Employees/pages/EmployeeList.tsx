import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ButtonsIcon,
    CardContainer,
    Inputs,
    Pagination,
    PopoverMenu,
    SnackbarAlert,
    Table,
} from "enterprisze-global-components";
import {
    Add,
    Briefcase,
    Edit2,
    ExportCurve,
    Filter,
    InfoCircle,
    SearchNormal,
} from "iconsax-reactjs";
import {
    useEmployeeService,
    type EmployeeData,
} from "../../../services/employee/list/use-employee";
import { setSelectedEmployee } from "../../../reducers/employeeSlice";
import type { AppDispatch } from "../../../reducers/store";
import { transformEmployeeToFormData } from "../../../utils/employeeTransformers";
import { useGetEmployeeByIdMutation } from "../../../services/employee/update/employeeUpdateAPI";
// Components
import EmployeeFilterModal from "../components/modals/EmployeeFilterModal";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeePositionModal from "../components/modals/EmployeePositionModal";
import { setSelectedEmployee as setSelectedEmployeeAction } from "../../../reducers/employeeSlice";
import { useDispatch } from "react-redux";

const EmployeeList = () => {
    const navigate = useNavigate();
    const employeeService = useEmployeeService();
    const dispatch = useDispatch();
    // Use the new filtering system
    const {
        employees,
        isLoading,
        error,
        filters,
        searchText,
        pagination,
        setSearchText,
        handleFilterChange,
        setFilters,
        applyFilters,
        clearFilters,
        handlePageChange,
        hasActiveFilters,
        filterCount,
        filterOptions,
    } = useEmployeeFilters();
    const [getEmployeeById] = useGetEmployeeByIdMutation();

    // State management
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedEmployeeLocal, setSelectedEmployeeLocal] =
        useState<any>(null);
    const [originalEmployeeData, setOriginalEmployeeData] =
        useState<EmployeeData | null>(null);
    
    // Success message state
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Load employees function
    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log("Loading employee list...");
            const employeesResponse = await employeeService.listEmployees({
                is_archived: 0,
                offset: 0,
                limit: 10,
            });
            console.log("Employees response:", employeesResponse);

            if (employeesResponse.data?.success && employeesResponse.data?.data?.employees) {
                const responseData = employeesResponse.data.data;
                setEmployees(responseData.employees || []);
            } else {
                console.error("No employee data received");
                setEmployees([]);
            }
        } catch (err) {
            console.error("Error loading employees:", err);
            setError("Failed to load employees. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // New function to handle filter updates atomically
    const handleFilterUpdate = (newFilters: FrontendFilters) => {
        console.log("Applying new filters:", newFilters);
        
        // Set filters directly - the hook will handle the API call
        setFilters(newFilters);
    };

    const handleRowClick = (index: number) => {
        dispatch(setSelectedEmployeeAction(employees[index]));
        navigate(`${employees[index]?.employee_ID}/summary`);
        console.log("Row clicked:", employees[index]);
    };

    const handleSubmitSuccess = (action: "add" | "edit" | "update") => {
        setSnackbarAction(action);
        setIsSnackbarOpen(true);
        setIsModalOpen(false);
        setIsUpdatePositionModalOpen(false);
        applyFilters();
    };

    const openAddEmployee = () => {
        setModalMode("add");
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const openEditEmployee = async (employee: EmployeeData) => {
        console.log("Opening edit for employee:", employee);
        setModalMode("edit");
        
        try {
            // Fetch complete employee data using get-by-id endpoint
            const requestBody = { 
                employee_ID: employee.employee_ID
            };
            const response = await getEmployeeById(requestBody).unwrap();
            
            // Pass the entire response to the transformation function
            // It will handle the nested structure internally
            const transformedData = transformEmployeeToFormData(response);
            
            setSelectedEmployeeLocal(transformedData);
            setOriginalEmployeeData(response);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching complete employee data:", error);
            
            // Fallback to original employee data if API call fails
            const transformedData = transformEmployeeToFormData(employee);
            setSelectedEmployeeLocal(transformedData);
            setOriginalEmployeeData(employee);
            setIsModalOpen(true);
        }
    };

    // Get employee full name
    const getEmployeeFullName = (employee: EmployeeData) => {
        const parts = [
            employee.first_name,
            employee.middle_name,
            employee.last_name,
            employee.name_ext,
        ].filter(Boolean);
        return parts.join(" ");
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-success700";
            case "On Leave":
                return "bg-szGrey300";
            case "Suspended":
                return "bg-info500";
            case "AWOL":
                return "bg-warning500";
            case "Terminated":
                return "bg-error500";
            default:
                return "bg-szGrey300";
        }
    };

    // Transform data for table
    const tableData = employees.map((employee) => ({
        name: (
            <div className="md:flex items-center gap-1">
                <div
                    className={`w-[14px] h-[14px] rounded-full ${getStatusColor(
                        employee.employee_status
                    )}`}
                ></div>
                <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">
                    {getEmployeeFullName(employee)}
                </span>
            </div>
        ),
        id: employee.employee_number,
        team: (
            <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">
                {employee.team_name}
            </span>
        ),
        jobTitle: (
            <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">
                {employee.position_name}
            </span>
        ),
        jobCode: employee.position_code,
        directHead: "N/A", // This field is not available in vw_employee view
    }));

    // For larger screen
    const headers: Array<
        | {
              type: "string";
              header: string;
              accessor: string;
              icon?: React.ReactNode;
          }
        | { type: "more"; header: React.ReactNode; accessor: "more" }
        | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    > = [
        { type: "checkbox", header: <></>, accessor: "checkbox" },
        {
            type: "string",
            header: "Name",
            accessor: "name",
            icon: (
                <div className="relative group">
                    <InfoCircle className="w-4 h-4 text-szBlack700 hover:text-szPrimary700 transition-colors duration-200 cursor-help" />
                    <div className="absolute z-10 invisible group-hover:visible bg-white shadow-lg rounded-lg p-2 w-[97px] -left-20 top-6">
                        <div className="flex flex-col gap-2 w-full items-start">
                            <span className="text-body-small-reg text-szBlack800">
                                Legends:
                            </span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Inactive
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Floating
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Clearance
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        { type: "string", header: "ID", accessor: "id" },
        { type: "string", header: "Team", accessor: "team" },
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "string", header: "Job Code", accessor: "jobCode" },
        { type: "string", header: "Direct Head", accessor: "directHead" },
        { type: "more", header: <></>, accessor: "more" },
    ];

    // For smaller screen
    const headersSmall: Array<
        | {
              type: "string";
              header: string;
              accessor: string;
              icon?: React.ReactNode;
          }
        | { type: "more"; header: React.ReactNode; accessor: "more" }
        | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    > = [
        {
            type: "string",
            header: "Name",
            accessor: "name",
            icon: (
                <div className="relative group">
                    <InfoCircle className="w-4 h-4 text-szBlack700 hover:text-szPrimary700 transition-colors duration-200 cursor-help" />
                    <div className="absolute z-10 invisible group-hover:visible bg-white shadow-lg rounded-lg p-2 w-[97px] -left-20 top-6">
                        <div className="flex flex-col gap-2 w-full items-start">
                            <span className="text-body-small-reg text-szBlack800">
                                Legends:
                            </span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Inactive
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Floating
                                </span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">
                                    Clearance
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        { type: "string", header: "ID", accessor: "id" },
        { type: "string", header: "Team", accessor: "team" },
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "string", header: "Job Code", accessor: "jobCode" },
        { type: "string", header: "Direct Head", accessor: "directHead" },
        { type: "more", header: <></>, accessor: "more" },
    ];

    const moreOptions = [
        // {
        //     label: "View",
        //     onClick: (index: number) => navigate(`${data[index]?.id}/summary`),
        // },
        {
            label: "Edit Employee",
            icon: <Edit2 />,
            onClick: (index: number) => openEditEmployee(employees[index]),
        },
        // Removed Update Position for now
    ];

    // Loading state
    if (isLoading) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-64">
                        <div className="text-szPrimary700">
                            Loading employees...
                        </div>
                    </div>
                }
            />
        );
    }

    // Error state
    if (error) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-600">{error}</div>
                    </div>
                }
            />
        );
    }

    return (
        <CardContainer
            content={
                // <div className="h-full p-4 bg-szWhite100 rounded-md shadow-boxShadow flex flex-col gap-5 overflow-auto">
                <div className="grid grid-cols-1 gap-[20px]">
                    <div className="flex items-center gap-3">
                        <h3 className="text-h3 font-montserrat">Employees</h3>
                        <PopoverMenu
                            size="small"
                            items={[
                                {
                                    label: "Add Employee",
                                    icon: <Add />,
                                    onClick: openAddEmployee,
                                },
                                {
                                    label: "Export",
                                    icon: <ExportCurve />,
                                    onClick: () => {},
                                },
                            ]}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full max-w-[355px]">
                            <Inputs
                                placeholder="Search by Name, ID, Job Title, or Team"
                                icon={SearchNormal}
                                value={searchText}
                                onChange={(e: any) =>
                                    setSearchText(e.target.value)
                                }
                            />
                        </div>
                        <ButtonsIcon
                            icon={<Filter />}
                            variant="ghost"
                            size="large"
                            onClick={() => setOpenFilter(true)}
                        />
                    </div>

                    <div className="h-full">
                        <div className="hidden lg:block">
                            <Table
                                headers={headers}
                                data={tableData}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                                onRowClick={handleRowClick}
                            />
                        </div>
                        <div className="block lg:hidden">
                            <Table
                                headers={headersSmall}
                                data={tableData}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                                onRowClick={handleRowClick}
                            />
                        </div>
                        {/* Removed pagination for now */}
                    </div>

                    <EmployeeFilterModal
                        isOpen={openFilter}
                        onClose={() => setOpenFilter(false)}
                        onApply={(newFilters) => {
                            handleFilterUpdate(newFilters);
                        }}
                        currentFilters={filters}
                    />

                    <EmployeeModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedEmployeeLocal(null);
                            setOriginalEmployeeData(null);
                        }}
                        mode={modalMode}
                        addEmployeeData={
                            modalMode === "edit" ? selectedEmployee : undefined
                        }
                        employeeId={
                            modalMode === "edit" && originalEmployeeData
                                ? originalEmployeeData.employee_ID
                                : undefined
                        }
                        onSubmitSuccess={() => handleSubmitSuccess(modalMode)}
                    />

                    <EmployeePositionModal
                        isOpen={isUpdatePositionModalOpen}
                        onClose={() => setIsUpdatePositionModalOpen(false)}
                        employeePositionData={selectedEmployee}
                        onSubmitSuccess={() => handleSubmitSuccess("update")}
                    />

                    <SnackbarAlert
                        isOpen={isSnackbarOpen}
                        onClose={() => setIsSnackbarOpen(false)}
                        showCloseButton={true}
                        type="success"
                        title={
                            snackbarAction === "edit"
                                ? "Successfully edited employee"
                                : snackbarAction === "update"
                                ? "Successfully updated position"
                                : "Successfully added employee"
                        }
                        animation="slide-up"
                    />
                </div>
            }
        />
    );
};

export default EmployeeList;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardContainer, Inputs, Pagination, PopoverMenu, SnackbarAlert, Table } from "enterprisze-global-components";
import { Add, Briefcase, Edit2, ExportCurve, Filter, InfoCircle, SearchNormal } from "iconsax-reactjs";

// Components
import EmployeeFilterModal from "../components/modals/EmployeeFilterModal";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeePositionModal from "../components/modals/EmployeePositionModal";

const EmployeeList = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarAction, setSnackbarAction] = useState<"add" | "edit" | "update" | null>(null);
    const [openFilter, setOpenFilter] = useState(false);

    const handleRowClick = (index: number) => {
        console.log("Row clicked:", index);
        navigate(`${data[index]?.id}/summary`);
    };

    const handleSubmitSuccess = (action: "add" | "edit" | "update") => {
        setSnackbarAction(action);
        setIsSnackbarOpen(true);
    };

    const openAddEmployee = () => {
        setModalMode("add");
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const openEditEmployee = (employee: any) => {
        setModalMode("edit");
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

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
                            <span className="text-body-small-reg text-szBlack800">Legends:</span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Active</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Inactive</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Floating</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Clearance</span>
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
                            <span className="text-body-small-reg text-szBlack800">Legends:</span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Active</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Inactive</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Floating</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Clearance</span>
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

    const data = [
        {
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Germanotta, Stephanie Luke A.</span>
                </div>
            ),
            id: "1234567890",
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">BSI</span>,
            jobTitle: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Junior Web Developer</span>,
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Smith, John William B.</span>
                </div>
            ),
            id: "2345678901",
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: (
                <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Customer Service Representative</span>
            ),
            jobCode: "2345678901",
            directHead: "Jane Smith",
        },
        {
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-info500"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Johnson, Emily Rose C.</span>
                </div>
            ),
            id: "3456789012",
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: (
                <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Customer Service Representative</span>
            ),
            jobCode: "3456789012",
            directHead: "Michael Brown",
        },
        {
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-warning500"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Davis, Robert James D.</span>
                </div>
            ),
            id: "4567890123",
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Manager</span>,
            jobCode: "4567890123",
            directHead: "Sarah Wilson",
        },
    ];

    const moreOptions = [
        {
            label: "View",
            onClick: (index: number) => navigate(`${data[index]?.id}/summary`),
        },
        {
            label: "Edit Employee",
            icon: <Edit2 />,
            onClick: (index: number) => openEditEmployee(data[index]),
        },
        {
            label: "Update Position",
            icon: <Briefcase />,
            onClick: (index: number) => {
                setSelectedEmployee(data[index]);
                setIsUpdatePositionModalOpen(true);
            },
        },
    ];

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
                                { label: "Add Employee", icon: <Add />, onClick: openAddEmployee },
                                { label: "Export", icon: <ExportCurve />, onClick: () => {} },
                            ]}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full max-w-[355px]">
                            <Inputs placeholder="Search by Name, ID, Job Title, or Team" icon={SearchNormal} />
                        </div>
                        <Button leftIcon={<Filter />} variant="ghost" size="large" onClick={() => setOpenFilter(true)} label={""} />
                    </div>

                    <div className="h-full">
                        <div className="hidden lg:block">
                            <Table headers={headers} data={data} moreOptions={moreOptions} tableHeight="h-[400px]" />
                            {/* onRowClick={handleRowClick} */}
                        </div>
                        <div className="block lg:hidden">
                            <Table headers={headersSmall} data={data} moreOptions={moreOptions} tableHeight="h-[400px]" />
                            {/* onRowClick={handleRowClick} */}
                        </div>
                        <div className="flex justify-end">
                            <Pagination currentPage={1} totalPages={10} visiblePages={5} onChange={() => {}} />
                        </div>
                    </div>

                    <EmployeeFilterModal isOpen={openFilter} onClose={() => setOpenFilter(false)} />

                    <EmployeeModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedEmployee(null);
                        }}
                        mode={modalMode}
                        addEmployeeData={modalMode === "edit" ? selectedEmployee : undefined}
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

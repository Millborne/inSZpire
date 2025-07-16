import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonsIcon, CardContainer, Inputs, Pagination, PopoverMenu, SnackbarAlert, Table } from "enterprisze-global-components";
import { Add, Briefcase, Edit2, ExportCurve, Filter, InfoCircle, SearchNormal } from "iconsax-reactjs";

// Components
import EmployeeFilterModal from "../components/modals/EmployeeFilterModal";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeePositionModal from "../components/modals/EmployeePositionModal";

// Import position service (employees are positions in this system)
import { usePositionService, type PositionData } from "../../../services/settings/positions/list";
// Import team service
import { useTeamService, type TeamData } from "../../../services/teams/list";

const EmployeeList = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarAction, setSnackbarAction] = useState<"add" | "edit" | "update" | null>(null);
    const [openFilter, setOpenFilter] = useState(false);

    // Position service (employees are positions)
    const positionService = usePositionService();
    const teamService = useTeamService();
    
    const [employees, setEmployees] = useState<PositionData[]>([]);
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load employees (positions) and teams on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Load positions (employees)
                console.log("Loading positions...");
                const positionsResponse = await positionService.listPositions({
                    is_archived: 0,
                    offset: 0,
                    limit: 50
                });

                console.log("Positions response:", positionsResponse);
                console.log("Positions response data:", positionsResponse.data);
                console.log("Positions response data.data:", positionsResponse.data?.data);

                if (positionsResponse.data?.data) {
                    setEmployees(positionsResponse.data.data);
                    console.log("Positions loaded:", positionsResponse.data.data);
                } else if (positionsResponse.data?.positions) {
                    // Handle the actual response structure
                    setEmployees(positionsResponse.data.positions);
                    console.log("Positions loaded from positions property:", positionsResponse.data.positions);
                    console.log("Setting employees state with:", positionsResponse.data.positions.length, "items");
                    
                    // Debug: Log the first position to see its structure
                    if (positionsResponse.data.positions.length > 0) {
                        console.log("First position structure:", positionsResponse.data.positions[0]);
                        console.log("First position keys:", Object.keys(positionsResponse.data.positions[0]));
                    }
                } else {
                    console.log("No positions data in response:", positionsResponse);
                    // Try alternative response structure
                    if (positionsResponse.data) {
                        setEmployees(Array.isArray(positionsResponse.data) ? positionsResponse.data : []);
                        console.log("Using alternative positions data structure:", positionsResponse.data);
                    }
                }

                // Load teams
                console.log("Loading teams...");
                const teamsResponse = await teamService.viewTeams({
                    is_archived: 0,
                    offset: 0,
                    limit: 50
                });

                console.log("Teams response:", teamsResponse);
                console.log("Teams response data:", teamsResponse.data);
                console.log("Teams response data.data:", teamsResponse.data?.data);

                if (teamsResponse.data?.data) {
                    setTeams(teamsResponse.data.data);
                    console.log("Teams loaded:", teamsResponse.data.data);
                } else {
                    console.log("No teams data in response:", teamsResponse);
                    // Try alternative response structure
                    if (teamsResponse.data) {
                        setTeams(Array.isArray(teamsResponse.data) ? teamsResponse.data : []);
                        console.log("Using alternative teams data structure:", teamsResponse.data);
                    }
                }

            } catch (err) {
                setError("Failed to load data");
                console.error("Error loading data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Monitor employees state changes
    useEffect(() => {
        console.log("Employees state updated:", employees);
        console.log("Employees count in state:", employees.length);
    }, [employees]);

    // Create a map of team_ID to team data for easy lookup
    const teamsMap = teams.reduce((acc, team) => {
        if (team.team_ID) {
            acc[team.team_ID] = team;
        }
        return acc;
    }, {} as Record<string, TeamData>);

    const handleRowClick = (index: number) => {
        console.log("Row clicked:", index);
        if (employees[index]?.position_ID) {
            navigate(`${employees[index].position_ID}/summary`);
        }
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

    // Transform position data for table display (positions represent employees)
    const data = employees.map((position) => {
        // Debug: Log each position being processed
        console.log("Processing position:", position);
        
        // Determine status color based on position status
        const getStatusColor = (status: string) => {
            switch (status) {
                case "active":
                    return "bg-success700";
                case "inactive":
                    return "bg-szGrey300";
                case "pending":
                    return "bg-info500";
                case "suspended":
                case "terminated":
                    return "bg-warning500";
                default:
                    return "bg-szGrey300";
            }
        };

        // Get team name from teams map or from position data
        const getTeamName = () => {
            // First try to get team name from position data
            if (position.team_name) {
                return position.team_name;
            }
            
            // If position has team_ID, look it up in teams map
            if (position.team_ID && teamsMap[position.team_ID]) {
                return teamsMap[position.team_ID].team_name;
            }
            
            return "N/A";
        };

        const transformedData = {
            name: (
                <div className="md:flex items-center gap-1">
                    <div className={`w-[14px] h-[14px] rounded-full ${getStatusColor(position.position_status_name || "active")}`}></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">
                        {position.employee_name || position.position_name || "N/A"}
                    </span>
                </div>
            ),
            id: position.employee_number || position.position_code || "N/A",
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">{getTeamName()}</span>,
            jobTitle: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">{position.job_title || "N/A"}</span>,
            jobCode: position.job_code || "N/A",
            directHead: position.reports_to_employee_name || "N/A",
        };
        
        console.log("Transformed data for position:", transformedData);
        return transformedData;
    });

    const moreOptions = [
        {
            label: "Edit Employee",
            icon: <Edit2 />,
            onClick: (index: number) => openEditEmployee(employees[index]),
        },
        {
            label: "Update Position",
            icon: <Briefcase />,
            onClick: (index: number) => {
                setSelectedEmployee(employees[index]);
                setIsUpdatePositionModalOpen(true);
            },
        },
    ];

    // Loading state
    if (isLoading) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-32">
                        <div className="text-szPrimary700">Loading employees...</div>
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
                    <div className="flex items-center justify-center h-32">
                        <div className="text-red-600">Failed to load employees</div>
                    </div>
                }
            />
        );
    }

    // Debug: Log the data being rendered
    console.log("Rendering table with data:", data);
    console.log("Employees count:", employees.length);
    console.log("Teams count:", teams.length);
    console.log("Is loading:", isLoading);
    console.log("Has error:", error);

    // Show empty state if no data
    if (!isLoading && !error && employees.length === 0) {
        console.log("Showing empty state - no employees found");
        return (
            <CardContainer
                content={
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
                            <ButtonsIcon icon={<Filter />} variant="ghost" size="large" onClick={() => setOpenFilter(true)} />
                        </div>

                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <div className="text-szGrey500 text-lg mb-2">No employees found</div>
                                <div className="text-szGrey400 text-sm">Try adjusting your search criteria or add a new employee</div>
                                <Button 
                                    label="Add Employee"
                                    variant="primary" 
                                    size="medium" 
                                    onClick={openAddEmployee}
                                    className="mt-4"
                                />
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
                            onClose={() => {
                                setIsUpdatePositionModalOpen(false);
                                setSelectedEmployee(null);
                            }}
                            employeePositionData={{
                                startDate: "",
                                position: selectedEmployee?.position_name || "",
                                positionStatus: selectedEmployee?.position_status_name || ""
                            }}
                            onSubmitSuccess={() => handleSubmitSuccess("update")}
                        />

                        <SnackbarAlert
                            isOpen={isSnackbarOpen}
                            onClose={() => setIsSnackbarOpen(false)}
                            showCloseButton={true}
                            type="success"
                            title={
                                snackbarAction === "add"
                                    ? "Successfully added a new Employee"
                                    : snackbarAction === "edit"
                                    ? "Successfully updated employee"
                                    : "Successfully updated employee position"
                            }
                            animation="slide-up"
                        />
                    </div>
                }
            />
        );
    }

    return (
        <CardContainer
            content={
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
                        <ButtonsIcon icon={<Filter />} variant="ghost" size="large" onClick={() => setOpenFilter(true)} />
                    </div>

                    <div className="h-full">
                        <div className="hidden lg:block">
                            <Table
                                headers={headers}
                                data={data}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                                onRowClick={handleRowClick}
                            />
                        </div>
                        <div className="block lg:hidden">
                            <Table
                                headers={headersSmall}
                                data={data}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                                onRowClick={handleRowClick}
                            />
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
                        onClose={() => {
                            setIsUpdatePositionModalOpen(false);
                            setSelectedEmployee(null);
                        }}
                        employeePositionData={{
                            startDate: "",
                            position: selectedEmployee?.position_name || "",
                            positionStatus: selectedEmployee?.position_status_name || ""
                        }}
                        onSubmitSuccess={() => handleSubmitSuccess("update")}
                    />

                    <SnackbarAlert
                        isOpen={isSnackbarOpen}
                        onClose={() => setIsSnackbarOpen(false)}
                        showCloseButton={true}
                        type="success"
                        title={
                            snackbarAction === "add"
                                ? "Successfully added a new Employee"
                                : snackbarAction === "edit"
                                ? "Successfully updated employee"
                                : "Successfully updated employee position"
                        }
                        animation="slide-up"
                    />
                </div>
            }
        />
    );
};

export default EmployeeList;

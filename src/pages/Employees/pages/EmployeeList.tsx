import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    CardContainer, 
    Button, 
    Inputs, 
    Pagination, 
    PopoverMenu, 
    SnackbarAlert
} from "enterprisze-global-components";
import EmployeeModal from "../components/modals/EmployeeModal";
import { 
    SearchNormal, 
    Edit2, 
    Trash, 
    Eye,
} from "iconsax-reactjs";

// Import employee service
import { 
    useEmployeeService, 
    type EmployeeData, 
    type ViewEmployeesRequest,
} from "../../../services/employee/list/use-employee";

const EmployeeList = () => {
    const navigate = useNavigate();
    const employeeService = useEmployeeService();
    
    // State management
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

    // Search and filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<ViewEmployeesRequest>({
        is_archived: 0,
        offset: 0,
        limit: 10
    });
    


    // Pagination state
    const [pagination, setPagination] = useState({
        total: 0,
        offset: 0,
        limit: 10,
        hasMore: false
    });

    // Load employees function
    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Load employees using vw_employee view
            console.log("Sending request with filters:", filters);
            const employeesResponse = await employeeService.listEmployees(filters);
            console.log("Employees response:", employeesResponse);

            // Handle different response structures
            if (employeesResponse.data?.success && employeesResponse.data?.data?.employees) {
                // Response structure: { success: true, data: { employees: [...], pagination: {...} } }
                const responseData = employeesResponse.data.data;
                setEmployees(responseData.employees || []);
                setPagination(responseData.pagination || {
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            } else if (employeesResponse.data?.success && employeesResponse.data?.employees) {
                // Direct response structure: { success: true, employees: [...], pagination: {...} }
                const responseData = employeesResponse.data;
                setEmployees(responseData.employees || []);
                setPagination(responseData.pagination || {
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            } else {
                console.error("No employee data received - response structure:", employeesResponse.data);
                setEmployees([]);
                setPagination({
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            }

        } catch (err) {
            console.error("Error loading data:", err);
            
            // Check if it's a CORS error
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as any;
                if (error.status === 'FETCH_ERROR' || error.status === 'CORS_ERROR') {
                    setError("CORS Error: Backend needs to allow requests from frontend. Please check backend CORS configuration.");
                } else {
                    setError(`Failed to load employees. Status: ${error.status}`);
                }
            } else {
                setError("Failed to load employees. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Load employees on component mount
    useEffect(() => {
        loadData();
    }, [filters]);

    // Handle search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters(prev => ({
                ...prev,
                search: searchTerm,
                offset: 0
            }));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Handle page change
    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * pagination.limit;
        setFilters(prev => ({
            ...prev,
            offset: newOffset
        }));
    };



    // Get employee full name
    const getEmployeeFullName = (employee: EmployeeData) => {
        const parts = [
            employee.first_name,
            employee.middle_name,
            employee.last_name,
            employee.name_ext
        ].filter(Boolean);
        return parts.join(" ");
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500";
            case "On Leave":
                return "bg-blue-500";
            case "Suspended":
                return "bg-orange-500";
            case "AWOL":
                return "bg-yellow-500";
            case "Terminated":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    // Transform data for table
    const tableData = employees.map(employee => ({
        name: (
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.employee_status)}`}></div>
                <span className="font-medium">{getEmployeeFullName(employee)}</span>
            </div>
        ),
        id: employee.employee_number,
        team: employee.team_name,
        jobTitle: employee.position_name,
        jobCode: employee.position_code,
        directHead: "N/A" // This field is not available in vw_employee view
    }));

    // Loading state
    if (isLoading) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-64">
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
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-600">{error}</div>
                    </div>
                }
            />
        );
    }

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-szPrimary700">Employees</h1>
                            <Button
                                label="Add Employee"
                                variant="primary"
                                size="medium"
                                onClick={() => setIsAddEmployeeModalOpen(true)}
                            />
                        </div>

                        {/* Search and Filter Bar */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Inputs 
                                    placeholder="Search by Name, ID, Job Title, or Team" 
                                    icon={SearchNormal}
                                    value={searchTerm}
                                    onChange={(e: any) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button
                                label="Filter"
                                variant="secondary"
                                size="medium"
                                onClick={() => {
                                    setSnackbarMessage("Filter functionality coming soon");
                                    setShowSuccessSnackbar(true);
                                }}
                            />
                        </div>

                        {/* Employee Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-szGrey200">
                                        <th className="text-left p-3 font-medium text-szGrey700">Name</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">ID</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">Team</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">Job Title</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">Job Code</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">Direct Head</th>
                                        <th className="text-left p-3 font-medium text-szGrey700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr 
                                            key={index} 
                                            className="border-b border-szGrey100 hover:bg-szSecondary50 cursor-pointer"
                                            onClick={() => navigate(`/home/employees/${employees[index].employee_ID}`)}
                                        >
                                            <td className="p-3">{row.name}</td>
                                            <td className="p-3">{row.id}</td>
                                            <td className="p-3">{row.team}</td>
                                            <td className="p-3">{row.jobTitle}</td>
                                            <td className="p-3">{row.jobCode}</td>
                                            <td className="p-3">{row.directHead}</td>
                                            <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                                <PopoverMenu
                                                    size="small"
                                                    items={[
                                                        {
                                                            label: "View Details",
                                                            icon: <Eye size={16} />,
                                                            onClick: () => navigate(`/home/employees/${employees[index].employee_ID}`),
                                                        },
                                                        {
                                                            label: "Edit Employee",
                                                            icon: <Edit2 size={16} />,
                                                            onClick: () => {
                                                                setSnackbarMessage("Edit functionality coming soon");
                                                                setShowSuccessSnackbar(true);
                                                            },
                                                        },
                                                        {
                                                            label: "Delete Employee",
                                                            icon: <Trash size={16} />,
                                                            onClick: () => {
                                                                setSnackbarMessage("Delete functionality coming soon");
                                                                setShowSuccessSnackbar(true);
                                                            },
                                                        },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-szGrey600">
                                Displaying {pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} records
                            </div>
                            <Pagination 
                                currentPage={Math.floor(pagination.offset / pagination.limit) + 1}
                                totalPages={Math.ceil(pagination.total / pagination.limit)}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                }
            />

            <SnackbarAlert
                isOpen={showSuccessSnackbar}
                onClose={() => setShowSuccessSnackbar(false)}
                showCloseButton={true}
                type="success"
                title={snackbarMessage}
                animation="slide-up"
            />

            {/* Add Employee Modal */}
            <EmployeeModal
                isOpen={isAddEmployeeModalOpen}
                onClose={() => setIsAddEmployeeModalOpen(false)}
                mode="add"
                onSubmitSuccess={() => {
                    setIsAddEmployeeModalOpen(false);
                    setSnackbarMessage("Employee added successfully!");
                    setShowSuccessSnackbar(true);
                    // Refresh the employee list
                    loadData();
                }}
            />
        </>
    );
};

export default EmployeeList;

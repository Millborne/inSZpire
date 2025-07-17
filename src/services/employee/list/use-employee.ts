import {
    useFetchEmployeesQuery,
    useActionEmployeesMutation,
} from "./employeeAPI";

export const useEmployees = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    // fetch
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchEmployeesQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    // action
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeesMutation();

    return {
        // fetching
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,

        // mutation
        generalAction,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
};

// Employee-specific interfaces based on vw_employee view
export interface EmployeeData {
    employee_ID: string;
    employee_number: string;
    old_employee_number?: string;
    profile_ID: string;
    position_ID: string;
    team_ID: string;
    employment_status: string;
    employee_status_ID: string;
    employee_status: "Active" | "On Leave" | "Suspended" | "AWOL" | "Terminated";
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    profile_image?: string;
    gender?: string;
    pronoun?: string;
    date_of_birth?: string;
    marital_status?: string;
    birth_address?: string;
    blood_type?: string;
    mobile_number?: string;
    personal_email?: string;
    religion?: string;
    religion_ID?: string;
    educational_attainment?: string;
    work_email: string;
    sched_type?: string;
    hire_date: string;
    has_atm?: number;
    salary_frequency?: string;
    is_agency?: number;
    is_confidential?: number;
    is_leave_earned?: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire?: number;
    is_archived: number;
    created_at: string;
    updated_at?: string;
    permanent_address?: string;
    present_address?: string;
    position_code: string;
    position_name: string;
    team_code?: string;
    team_name: string;
    type_name?: string;
    setup_name?: string;
    job_code: string;
    job_title: string;
}

// Request interfaces for vw_employee view
export interface ViewEmployeesRequest {
    search?: string;
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface CreateEmployeeRequest {
    employee_number: string;
    old_employee_number?: string;
    profile_ID: string;
    position_ID: string;
    status_ID: string;
    work_email: string;
    employee_status_ID: string;
    position_status_ID: string;
    sched_type: string;
    hire_date: string;
    has_atm: number;
    salary_frequency: string;
    is_agency: number;
    is_confidential: number;
    is_leave_earned: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire: number;
}

export interface UpdateEmployeeRequest {
    employee_ID: string;
    employee_number?: string;
    old_employee_number?: string;
    position_ID?: string;
    status_ID?: string;
    work_email?: string;
    employee_status_ID?: string;
    position_status_ID?: string;
    sched_type?: string;
    hire_date?: string;
    has_atm?: number;
    salary_frequency?: string;
    is_agency?: number;
    is_confidential?: number;
    is_leave_earned?: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire?: number;
    is_archived?: number;
}

export interface UploadProfileRequest {
    employee_ID: string;
    profile_image: File;
}

export interface BatchUpdateStatusRequest {
    employee_IDs: string[];
    employee_status_ID: string;
    position_status_ID: string;
}

// Response interfaces
export interface EmployeeListResponse {
    success: boolean;
    message: string;
    data: {
        employees: EmployeeData[];
        pagination: {
            total: number;
            offset: number;
            limit: number;
            hasMore: boolean;
        };
    };
}

// Specific employee service methods based on vw_employee API
export const useEmployeeService = () => {
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeesMutation();

    // List employees using vw_employee view
    const listEmployees = async (filters: ViewEmployeesRequest) => {
        return generalAction({
            queryParameters: "/list-view",
            method: "POST",
            body: filters,
        });
    };

    // Get single employee by ID using view
    const getEmployeeById = async (employee_ID: string) => {
        return generalAction({
            queryParameters: "/get-by-id",
            method: "POST",
            body: { employee_ID },
        });
    };

    // Create employee (still uses tbl_employee)
    const createEmployee = async (employeeData: CreateEmployeeRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: employeeData,
        });
    };

    // Update employee (still uses tbl_employee)
    const updateEmployee = async (employeeData: UpdateEmployeeRequest) => {
        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: employeeData,
        });
    };

    // Delete employee (still uses tbl_employee)
    const deleteEmployee = async (employee_ID: string) => {
        return generalAction({
            queryParameters: "/delete",
            method: "DELETE",
            body: { employee_ID },
        });
    };

    // Upload profile image
    const uploadProfile = async (uploadData: UploadProfileRequest) => {
        const formData = new FormData();
        formData.append("employee_ID", uploadData.employee_ID);
        formData.append("profile_image", uploadData.profile_image);

        return generalAction({
            queryParameters: "/upload-profile",
            method: "POST",
            body: formData,
        });
    };

    // Batch update employee status
    const batchUpdateStatus = async (batchData: BatchUpdateStatusRequest) => {
        return generalAction({
            queryParameters: "/batch-update-status",
            method: "PUT",
            body: batchData,
        });
    };

    return {
        // mutation
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,

        // methods
        listEmployees,
        getEmployeeById,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        uploadProfile,
        batchUpdateStatus,
    };
};

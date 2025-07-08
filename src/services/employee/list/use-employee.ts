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

// Employee-specific interfaces based on API documentation
export interface EmployeeData {
    employee_ID?: string;
    employee_code?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    position_ID?: string;
    position_name?: string;
    department_ID?: string;
    department_name?: string;
    job_title_ID?: string;
    job_title_name?: string;
    hire_date?: string;
    salary?: number;
    employee_status:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    profile_image?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateEmployeeRequest {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    position_ID?: string;
    department_ID?: string;
    job_title_ID?: string;
    hire_date?: string;
    salary?: number;
    employee_status:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    is_archived?: number;
}

export interface UpdateEmployeeRequest {
    employee_ID: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    email?: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    position_ID?: string;
    department_ID?: string;
    job_title_ID?: string;
    hire_date?: string;
    salary?: number;
    employee_status?:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    is_archived?: number;
}

export interface ViewEmployeesRequest {
    search?: string;
    is_archived?: number;
    employee_status?:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    department_ID?: string;
    position_ID?: string;
    job_title_ID?: string;
    offset?: number;
    limit?: number;
}

export interface GetEmployeeRequest {
    employee_ID: string;
}

export interface UploadProfileRequest {
    employee_ID: string;
    profile_image: File;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    employee_status:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
}

// Specific employee service methods
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

    // List employees
    const listEmployees = async (filters: ViewEmployeesRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create employee
    const createEmployee = async (employeeData: CreateEmployeeRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: employeeData,
        });
    };

    // Edit employee
    const updateEmployee = async (employeeData: UpdateEmployeeRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: employeeData,
        });
    };

    // Get employee details
    const getEmployee = async (employeeData: GetEmployeeRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: employeeData,
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

    // View employees with filters
    const viewEmployees = async (filters: ViewEmployeesRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
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
        createEmployee,
        updateEmployee,
        getEmployee,
        uploadProfile,
        viewEmployees,
    };
};

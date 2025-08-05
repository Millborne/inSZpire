import {
    useFetchEmployeeHistoryQuery,
    useActionEmployeeHistoryMutation,
} from "./employeeHistoryAPI";

export const useEmployeeHistory = ({
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
        useFetchEmployeeHistoryQuery(
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
    ] = useActionEmployeeHistoryMutation();

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

// Employee History-specific interfaces
export interface EmployeeHistoryData {
    eh_ID?: string;
    emp_ID: string;
    position_ID: string;
    department_ID: string;
    eh_start_date: string;
    eh_end_date?: string;
    eh_reason?: string;
    eh_notes?: string;
    eh_status: "active" | "inactive" | "pending";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
    // Related data
    position?: {
        position_ID: string;
        position_name: string;
        position_description?: string;
        position_level?: number;
    };
    department?: {
        department_ID: string;
        department_name: string;
        department_description?: string;
    };
    employee?: {
        emp_ID: string;
        emp_first_name: string;
        emp_last_name: string;
        emp_middle_name?: string;
        emp_email: string;
    };
}

export interface ListEmployeeHistoryRequest {
    emp_ID?: string;
    position_ID?: string;
    department_ID?: string;
    eh_status?: "active" | "inactive" | "pending";
    search?: string;
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface UpdateEmployeePositionRequest {
    eh_ID: string;
    position_ID: string;
    department_ID: string;
    eh_start_date: string;
    eh_end_date?: string;
    eh_reason?: string;
    eh_notes?: string;
    eh_status?: "active" | "inactive" | "pending";
}

export interface EmployeeHistoryDetailsRequest {
    eh_ID: string;
}

// Specific employee history service methods
export const useEmployeeHistoryService = () => {
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
    ] = useActionEmployeeHistoryMutation();

    const listEmployeeHistory = async (filters: ListEmployeeHistoryRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const updateEmployeePosition = async (
        request: UpdateEmployeePositionRequest
    ) => {
        return generalAction({
            queryParameters: "/update-position",
            method: "PUT",
            body: request,
        });
    };

    const viewEmployeeHistoryDetails = async (
        request: EmployeeHistoryDetailsRequest
    ) => {
        return generalAction({
            queryParameters: `/details/${request.eh_ID}`,
            method: "GET",
        });
    };

    const viewEmployeeHistoryByEmployee = async (emp_ID: string) => {
        return generalAction({
            queryParameters: `/employee/${emp_ID}`,
            method: "GET",
        });
    };

    const viewEmployeeHistoryByPosition = async (position_ID: string) => {
        return generalAction({
            queryParameters: `/position/${position_ID}`,
            method: "GET",
        });
    };

    const viewEmployeeHistoryByDepartment = async (department_ID: string) => {
        return generalAction({
            queryParameters: `/department/${department_ID}`,
            method: "GET",
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
        listEmployeeHistory,
        updateEmployeePosition,
        viewEmployeeHistoryDetails,
        viewEmployeeHistoryByEmployee,
        viewEmployeeHistoryByPosition,
        viewEmployeeHistoryByDepartment,
    };
};

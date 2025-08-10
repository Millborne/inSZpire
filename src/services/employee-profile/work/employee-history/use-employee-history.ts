import {
    useFetchEmployeeHistoryQuery,
    useActionEmployeeHistoryMutation,
    useFetchEmployeeHistoryViewMutation,
    useFetchEmployeeHistoryByEmployeeQuery,
    EmployeeHistoryViewRequest,
    EmployeeHistoryViewResponse,
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

// New hook for employee history view with fallback options
export const useEmployeeHistoryView = () => {
    const [fetchEmployeeHistoryView, { 
        data: mutationData, 
        isSuccess: mutationSuccess, 
        isError: mutationError, 
        isLoading: mutationLoading, 
        error: mutationErrorData 
    }] = useFetchEmployeeHistoryViewMutation();

    const fetchEmployeeHistory = async (request: EmployeeHistoryViewRequest) => {
        try {
            console.log('Attempting to fetch employee history with:', request);
            const response = await fetchEmployeeHistoryView(request).unwrap();
            console.log('Employee history response:', response);
            return response;
        } catch (err: any) {
            console.error('Employee history fetch error:', err);
            
            // Check if it's a 404 error
            if (err?.status === 404) {
                throw new Error('Employee history endpoint not found. Please check if the backend API is implemented.');
            }
            
            throw new Error(err?.data?.message || err?.error || "Failed to fetch employee history");
        }
    };

    return {
        fetchEmployeeHistory,
        data: mutationData,
        isSuccess: mutationSuccess,
        isError: mutationError,
        isLoading: mutationLoading,
        error: mutationErrorData,
    };
};

// Alternative hook using query instead of mutation
export const useEmployeeHistoryByEmployee = (employeeId: string, enabled: boolean = true) => {
    const { 
        data, 
        isSuccess, 
        isError, 
        isLoading, 
        error,
        refetch 
    } = useFetchEmployeeHistoryByEmployeeQuery(employeeId, {
        skip: !enabled || !employeeId
    });

    return {
        data,
        isSuccess,
        isError,
        isLoading,
        error,
        refetch,
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

// Request interfaces
export interface ListEmployeeHistoryRequest {
    employee_ID?: string;
    position_ID?: string;
    department_ID?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
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
    eh_status: "active" | "inactive" | "pending";
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
        listEmployeeHistory,
        updateEmployeePosition,
        viewEmployeeHistoryDetails,
        viewEmployeeHistoryByEmployee,
        viewEmployeeHistoryByPosition,
        viewEmployeeHistoryByDepartment,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
};

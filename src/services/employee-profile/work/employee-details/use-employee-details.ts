import {
    useFetchEmployeeDetailsQuery,
    useActionEmployeeDetailsMutation,
} from "./employeeDetailsAPI";

export const useEmployeeDetails = ({
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
        useFetchEmployeeDetailsQuery(
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
    ] = useActionEmployeeDetailsMutation();

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

// Employee Details interfaces
export interface EmployeeDetailsData {
    emp_ID?: string;
    emp_code: string;
    emp_first_name: string;
    emp_last_name: string;
    emp_middle_name?: string;
    emp_position: string;
    emp_department: string;
    emp_status: "active" | "inactive" | "terminated" | "resigned";
    emp_email: string;
    emp_phone?: string;
    emp_address?: string;
    emp_birth_date?: string;
    emp_hire_date?: string;
    emp_salary?: number;
    emp_supervisor?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateEmployeePositionRequest {
    emp_ID: string;
    emp_position: string;
    emp_department?: string;
    emp_supervisor?: string;
    change_reason?: string;
    effective_date?: string;
}

export interface ListEmployeeDetailsRequest {
    search?: string;
    emp_status?: "active" | "inactive" | "terminated" | "resigned";
    emp_department?: string;
    emp_position?: string;
    offset?: number;
    limit?: number;
}

export interface EmployeePositionHistory {
    history_ID?: string;
    emp_ID: string;
    old_position: string;
    new_position: string;
    old_department?: string;
    new_department?: string;
    change_reason?: string;
    effective_date: string;
    approved_by?: string;
    approval_status: "pending" | "approved" | "rejected";
    created_at?: string;
}

// Specific employee details service methods
export const useEmployeeDetailsService = () => {
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
    ] = useActionEmployeeDetailsMutation();

    const listEmployeeDetails = async (filters: ListEmployeeDetailsRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const updateEmployeePosition = async (
        positionData: UpdateEmployeePositionRequest
    ) => {
        return generalAction({
            queryParameters: "/update-position",
            method: "PUT",
            body: positionData,
        });
    };

    const getEmployeeDetails = async (emp_ID: string) => {
        return generalAction({
            queryParameters: `/view/${emp_ID}`,
            method: "GET",
        });
    };

    const getPositionHistory = async (emp_ID: string) => {
        return generalAction({
            queryParameters: `/position-history/${emp_ID}`,
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
        listEmployeeDetails,
        updateEmployeePosition,
        getEmployeeDetails,
        getPositionHistory,
    };
};

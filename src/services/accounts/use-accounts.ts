import {
    useFetchAccountsQuery,
    useActionAccountsMutation,
} from "./accountsAPI";

export const useAccounts = ({
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
        useFetchAccountsQuery(
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
    ] = useActionAccountsMutation();

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

// Account-specific interfaces based on API documentation
export interface AccountData {
    acc_ID?: string;
    acc_code: string;
    acc_name: string;
    acc_description?: string;
    acc_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateAccountRequest {
    acc_code: string;
    acc_name: string;
    acc_description?: string;
    acc_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateAccountRequest {
    acc_ID: string;
    acc_code?: string;
    acc_name?: string;
    acc_description?: string;
    acc_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewAccountsRequest {
    search?: string;
    is_archived?: number;
    acc_status?: "active" | "pending" | "inactive" | "suspended";
    offset?: number;
    limit?: number;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    acc_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific account service methods
export const useAccountService = () => {
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
    ] = useActionAccountsMutation();

    const createAccount = async (accountData: CreateAccountRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: accountData,
        });
    };

    const updateAccount = async (accountData: UpdateAccountRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: accountData,
        });
    };

    const viewAccounts = async (filters: ViewAccountsRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const batchUpdateStatus = async (batchData: BatchUpdateStatusRequest) => {
        return generalAction({
            queryParameters: "/batch-update-status",
            method: "POST",
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
        createAccount,
        updateAccount,
        viewAccounts,
        batchUpdateStatus,
    };
};

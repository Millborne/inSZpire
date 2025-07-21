

import {
    useFetchWorkSetupsQuery,
    useActionWorkSetupsMutation,
} from "./workSetupAPI";

export const useWorkSetups = ({
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
        useFetchWorkSetupsQuery(
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
    ] = useActionWorkSetupsMutation();

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

// Work Setup-specific interfaces based on API documentation
export interface WorkSetupData {
    setup_ID?: string;
    setup_name: string;
    work_setup_description?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateWorkSetupRequest {
    work_setup_name: string;
    work_setup_description?: string;
    is_archived?: number;
}

export interface UpdateWorkSetupRequest {
    work_setup_ID: string;
    work_setup_name?: string;
    work_setup_description?: string;
    is_archived?: number;
}

export interface ViewWorkSetupsRequest {
    search?: string;
    is_archived?: number;
}

export interface GetWorkSetupRequest {
    work_setup_ID: string;
}

// Specific work setup service methods based on API documentation
export const useWorkSetupService = () => {
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
    ] = useActionWorkSetupsMutation();

    const listWorkSetups = async (filters: ViewWorkSetupsRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const getWorkSetup = async (workSetupData: GetWorkSetupRequest) => {
        return generalAction({
            queryParameters: `/view?work_setup_ID=${workSetupData.work_setup_ID}`,
            method: "POST",
            body: { work_setup_ID: workSetupData.work_setup_ID },
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
        listWorkSetups,
        getWorkSetup,
    };
};

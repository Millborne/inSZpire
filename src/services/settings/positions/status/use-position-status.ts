import {
    useFetchPositionStatusesQuery,
    useActionPositionStatusesMutation,
} from "./positionStatusAPI";

export const usePositionStatus = ({
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
        useFetchPositionStatusesQuery(
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
    ] = useActionPositionStatusesMutation();

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

// Position Status-specific interfaces
export interface PositionStatusData {
    position_status_ID: string;
    status_name: string;
    status_description?: string;
    is_active?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ViewPositionStatusesRequest {
    search?: string;
    is_active?: number;
    offset?: number;
    limit?: number;
}

export interface CreatePositionStatusRequest {
    status_name: string;
    status_description?: string;
    is_active?: number;
    created_by: string;
}

export interface UpdatePositionStatusRequest {
    position_status_ID: string;
    status_name?: string;
    status_description?: string;
    is_active?: number;
    updated_by: string;
}

export interface DeletePositionStatusRequest {
    position_status_ID: string;
}

// Specific position status service methods
export const usePositionStatusService = () => {
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
    ] = useActionPositionStatusesMutation();

    const listPositionStatuses = async (filters: ViewPositionStatusesRequest) => {
        return generalAction({
            queryParameters: "/list-view",
            method: "POST",
            body: filters,
        });
    };

    const createPositionStatus = async (statusData: CreatePositionStatusRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: statusData,
        });
    };

    const updatePositionStatus = async (statusData: UpdatePositionStatusRequest) => {
        return generalAction({
            queryParameters: "/updatePositionStatus",
            method: "PUT",
            body: statusData,
        });
    };

    const deletePositionStatus = async (statusData: DeletePositionStatusRequest) => {
        return generalAction({
            queryParameters: "/deletePositionStatus",
            method: "DELETE",
            body: statusData,
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
        listPositionStatuses,
        createPositionStatus,
        updatePositionStatus,
        deletePositionStatus,
    };
};

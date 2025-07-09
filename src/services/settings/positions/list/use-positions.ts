import {
    useFetchPositionsQuery,
    useActionPositionsMutation,
} from "./positionsAPI";

export const usePositions = ({
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
        useFetchPositionsQuery(
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
    ] = useActionPositionsMutation();

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

// Position-specific interfaces based on API documentation
export interface PositionData {
    position_ID?: string;
    position_name: string;
    position_description?: string;
    position_code?: string;
    department_ID?: string;
    department_name?: string;
    job_title_ID?: string;
    job_title_name?: string;
    position_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreatePositionRequest {
    position_name: string;
    position_description?: string;
    position_code?: string;
    department_ID?: string;
    job_title_ID?: string;
    position_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdatePositionRequest {
    position_ID: string;
    position_name?: string;
    position_description?: string;
    position_code?: string;
    department_ID?: string;
    job_title_ID?: string;
    position_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewPositionsRequest {
    search?: string;
    is_archived?: number;
    position_status?: "active" | "pending" | "inactive" | "suspended";
    department_ID?: string;
    job_title_ID?: string;
    offset?: number;
    limit?: number;
}

export interface GetPositionRequest {
    position_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    position_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific position service methods
export const usePositionService = () => {
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
    ] = useActionPositionsMutation();

    // List positions
    const listPositions = async (filters: ViewPositionsRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create position
    const createPosition = async (positionData: CreatePositionRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: positionData,
        });
    };

    // Edit position
    const updatePosition = async (positionData: UpdatePositionRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: positionData,
        });
    };

    // View position details
    const getPosition = async (positionData: GetPositionRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: positionData,
        });
    };

    // View positions with filters
    const viewPositions = async (filters: ViewPositionsRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    // Batch update status
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
        listPositions,
        createPosition,
        updatePosition,
        getPosition,
        viewPositions,
        batchUpdateStatus,
    };
};

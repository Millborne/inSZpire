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
    node_reference?: string;
    position_code: string;
    position_name: string;
    team_ID: string;
    site_ID?: string;
    job_ID: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    position_type_ID: string;
    work_setup_ID: string;
    basic_salary: number;
    is_approved?: number;
    is_archived?: number;
    created_by?: string;
    updated_by?: string;
    created_at?: string;
    updated_at?: string;
    tags?: Array<{
        tag_ID: string;
        tag_name: string;
        tag_type: string;
        description?: string;
    }>;
}

export interface CreatePositionRequest {
    position_code: string;
    position_name: string;
    team_ID: string;
    site_ID?: string;
    job_ID: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    position_type_ID: string;
    work_setup_ID: string;
    basic_salary: number;
    is_approved?: number;
    is_archived?: number;
    created_by: string;
    updated_by?: string;
    tag_IDs?: string[];
}

export interface UpdatePositionRequest {
    position_ID: string;
    node_reference?: number;
    position_code?: string;
    position_name?: string;
    team_ID?: string;
    site_ID?: string;
    job_ID?: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    position_type_ID?: string;
    work_setup_ID?: string;
    basic_salary?: number;
    is_approved?: number;
    is_archived?: number;
    updated_by: string;
    tag_IDs?: string[];
}

export interface ViewPositionsRequest {
    search?: string;
    is_archived?: number;
    position_ID?: string;
    offset?: number;
    limit?: number;
}

export interface GetPositionRequest {
    position_ID: string;
}

export interface DeletePositionRequest {
    position_ID: string;
}

export interface GetTagsByTypeRequest {
    tag_type: string;
}

// Specific position service methods based on API documentation
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

    const listPositions = async (filters: ViewPositionsRequest) => {
        return generalAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: filters,
        });
    };

    const createPosition = async (positionData: CreatePositionRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: positionData,
        });
    };

    const updatePosition = async (positionData: UpdatePositionRequest) => {
        return generalAction({
            queryParameters: "/updatePosition",
            method: "PUT",
            body: positionData,
        });
    };

    const getPosition = async (positionData: GetPositionRequest) => {
        return generalAction({
            queryParameters: `/getPositions?position_ID=${positionData.position_ID}`,
            method: "POST",
            body: { position_ID: positionData.position_ID },
        });
    };

    const viewPositions = async (filters: ViewPositionsRequest) => {
        return generalAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: filters,
        });
    };

    const deletePosition = async (positionData: DeletePositionRequest) => {
        return generalAction({
            queryParameters: "/deletePosition",
            method: "DELETE",
            body: positionData,
        });
    };

    const getTagsByType = async (tagType: string) => {
        return generalAction({
            queryParameters: `/tags/${tagType}`,
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
        listPositions,
        createPosition,
        updatePosition,
        getPosition,
        viewPositions,
        deletePosition,
        getTagsByType,
    };
};

import {
    useFetchPositionsQuery,
    useActionPositionsMutation,
} from "./positionsAPI";

export interface Position {
    position_ID: string;
    position_code: string;
    position_name: string;
    team_ID: string;
    site_ID: string;
    job_ID: string;
    reports_to_position_ID: string;
    reports_to_node: string;
    team_level: string;
    position_type_ID: string;
    work_setup_ID: string;
    basic_salary: number;
    is_approved: boolean;
    is_archived: boolean;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}

export interface PositionsResponse {
    positions: Position[];
    total: number;
}

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
                method: method ?? "GET",
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

// Specific positions service methods
export const usePositionsService = () => {
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

    // Get all positions
    const getPositions = async () => {
        return generalAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: {},
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
        getPositions,
    };
}; 
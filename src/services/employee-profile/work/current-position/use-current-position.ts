import { useFetchCurrentPositionQuery, useActionCurrentPositionMutation } from "./currentPositionAPI";

export const useCurrentPosition = ({
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
        useFetchCurrentPositionQuery(
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
    ] = useActionCurrentPositionMutation();

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

// Current Position interfaces based on API documentation
export interface CurrentPositionData {
    position_name?: string;
    job_code?: string;
    hire_date?: string;
    start_date?: string;
    employment_status?: string;
}

export interface GetCurrentPositionRequest {
    employeeId: string;
}

export const useCurrentPositionService = () => {
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
    ] = useActionCurrentPositionMutation();

    const getCurrentPosition = async (requestData: GetCurrentPositionRequest) => {
        return generalAction({
            queryParameters: "/current-position",
            method: "POST",
            body: requestData,
        });
    };

    return {
        getCurrentPosition,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
}; 
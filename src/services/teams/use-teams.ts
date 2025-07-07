import { useFetchTeamsQuery, useActionTeamsMutation } from "./teamsAPI";

export const useTeams = ({
    queryParameters,
    method,
}: // body,
{
    queryParameters?: string;
    method?: string;
    body?: any;
}) => {
    // fetch
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchTeamsQuery({
            queryParameters: queryParameters ?? "",
            method: method,
        });

    // action
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
        },
    ] = useActionTeamsMutation();
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
    };
};

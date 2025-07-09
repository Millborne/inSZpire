import { useFetchTeamsQuery, useActionTeamsMutation } from "./teamsAPI";

export const useTeams = ({
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
        useFetchTeamsQuery(
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
        actionReset,
    };
};

// Team-specific interfaces based on API documentation
export interface TeamData {
    team_ID?: string;
    team_name: string;
    team_description?: string;
    team_status: "active" | "inactive";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateTeamRequest {
    team_name: string;
    team_description?: string;
    team_status: "active" | "inactive";
    is_archived?: number;
}

export interface UpdateTeamRequest {
    team_ID: string;
    team_name?: string;
    team_description?: string;
    team_status?: "active" | "inactive";
    is_archived?: number;
}

export interface ViewTeamsRequest {
    search?: string;
    is_archived?: number;
    team_status?: "active" | "inactive";
    offset?: number;
    limit?: number;
}

export interface GetTeamRequest {
    team_ID: string;
}

// Specific team service methods based on API documentation
export const useTeamService = () => {
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
    ] = useActionTeamsMutation();

    const createTeam = async (teamData: CreateTeamRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: teamData,
        });
    };

    const updateTeam = async (teamData: UpdateTeamRequest) => {
        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: teamData,
        });
    };

    const viewTeams = async (filters: ViewTeamsRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const getTeam = async (teamData: GetTeamRequest) => {
        return generalAction({
            queryParameters: `/list?team_ID=${teamData.team_ID}`,
            method: "POST",
            body: { team_ID: teamData.team_ID },
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
        createTeam,
        updateTeam,
        viewTeams,
        getTeam,
    };
};

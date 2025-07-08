import {
    useFetchTeamMembersQuery,
    useActionTeamMembersMutation,
} from "./teamMemberAPI";

export const useTeamMembers = ({
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
        useFetchTeamMembersQuery(
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
    ] = useActionTeamMembersMutation();

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

// Team Member-specific interfaces
export interface TeamMemberData {
    tm_ID?: string;
    emp_ID: string;
    team_ID: string;
    tm_role: string;
    tm_status: "active" | "pending" | "inactive";
    tm_start_date: string;
    tm_end_date?: string;
    tm_notes?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
    // Related data
    employee?: {
        emp_ID: string;
        emp_first_name: string;
        emp_last_name: string;
        emp_middle_name?: string;
        emp_email: string;
        emp_phone?: string;
        emp_position?: string;
        emp_department?: string;
    };
    team?: {
        team_ID: string;
        team_name: string;
        team_description?: string;
        team_leader_ID?: string;
    };
}

export interface ViewTeamMembersRequest {
    emp_ID?: string;
    team_ID?: string;
    tm_status?: "active" | "pending" | "inactive";
    search?: string;
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface TeamMemberDetailsRequest {
    tm_ID: string;
}

// Specific team member service methods
export const useTeamMemberService = () => {
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
    ] = useActionTeamMembersMutation();

    const viewTeamMembers = async (filters: ViewTeamMembersRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const viewTeamMemberDetails = async (request: TeamMemberDetailsRequest) => {
        return generalAction({
            queryParameters: `/details/${request.tm_ID}`,
            method: "GET",
        });
    };

    const viewTeamMembersByEmployee = async (emp_ID: string) => {
        return generalAction({
            queryParameters: `/employee/${emp_ID}`,
            method: "GET",
        });
    };

    const viewTeamMembersByTeam = async (team_ID: string) => {
        return generalAction({
            queryParameters: `/team/${team_ID}`,
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
        viewTeamMembers,
        viewTeamMemberDetails,
        viewTeamMembersByEmployee,
        viewTeamMembersByTeam,
    };
};

import {
    useFetchTeamDetailsQuery,
    useFetchTeamMembersQuery,
    useActionTeamsMutation,
    useActionPositionsMutation,
} from "./teamMemberAPI";

// Team details hook
export const useTeamDetails = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchTeamDetailsQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    return {
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};

// Team members hook
export const useTeamMembers = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchTeamMembersQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    return {
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};

// Team-specific interfaces based on backend database schema
export interface TeamData {
    team_ID: string;           // 32-char hex UUID
    node_reference: number;    // Node reference number
    team_code: string;         // e.g., "bsi", "spt"
    team_name: string;         // e.g., "Business Solutions and Innovation"
    team_description: string;  // Team description
    team_logo: string | null;  // filename or null
    acc_ID: string | null;     // account ID or null
    parent_team_ID: string | null; // parent team UUID or null
    node: string;              // hierarchy path e.g., "1.4", "1.4.5"
    is_archived: number;       // 0 = active, 1 = archived
    created_by: string;        // Created by UUID
    updated_by: string;        // Updated by UUID
    created_at: string;        // ISO date string
    updated_at: string;        // ISO date string
    tags?: string;             // Associated tags (comma-separated)
}

export interface PositionData {
    position_ID: string;       // 32-char hex UUID
    node_reference: number;    // Node reference number
    position_code: string;     // Position code
    position_name: string;     // Position name
    team_ID: string;           // Links to the team
    site_ID: string | null;    // Site ID
    job_ID: string;            // Links to job title
    reports_to_position_ID: string | null; // Reports to position ID
    reports_to_node: string | null; // Reports to node
    team_level: string;        // Team level
    position_type_ID: string;  // Position type ID
    work_setup_ID: string;     // Work setup ID
    basic_salary: number;      // Basic salary
    is_approved: number;       // Approval status
    is_archived: number;       // Archive status
    created_by: string;        // Created by UUID
    updated_by: string;        // Updated by UUID
    created_at: string;        // ISO date string
    updated_at: string;        // ISO date string
    
    // Additional fields from view (vw_position_details)
    job_title?: string;        // Job title (e.g., "Web Dev", "UX Designer")
    job_code?: string;         // Job code
    team_name?: string;        // Team name
    team_code?: string;        // Team code
    position_type?: string;    // Position type
    work_setup?: string;       // Work setup
    company_ID?: string;       // Company ID
    company_name?: string;     // Company name
    site_name?: string;        // Site name
    position_status?: string;  // Position status
    reports_to_position?: string; // Reports to position
    employee_number?: string;  // Employee number
    employee_name?: string;    // Employee name
    preferred_name?: string;   // Preferred name
    reports_to_employee_name?: string; // Reports to employee name
    reports_to_preferred_name?: string; // Reports to preferred name
    reports_to_employee_number?: string; // Reports to employee number
    tags?: string;             // Associated tags
}

export interface ViewTeamRequest {
    search?: string;
    is_archived?: number;
    offset?: number;
    limit?: number;
    node_root?: string;
}

export interface ViewPositionsRequest {
    search?: string;
    is_archived?: number;
    position_ID?: string;
    team_ID?: string;
    offset?: number;
    limit?: number;
}

// Specific team member service methods based on API documentation
export const useTeamMemberService = () => {
    const [
        teamAction,
        {
            data: teamActionData,
            isError: teamActionIsError,
            isLoading: teamActionIsLoading,
            isSuccess: teamActionIsSuccess,
            error: teamActionError,
            reset: teamActionReset,
        },
    ] = useActionTeamsMutation();

    const [
        positionAction,
        {
            data: positionActionData,
            isError: positionActionIsError,
            isLoading: positionActionIsLoading,
            isSuccess: positionActionIsSuccess,
            error: positionActionError,
            reset: positionActionReset,
        },
    ] = useActionPositionsMutation();

    // Get team details
    const getTeamDetails = async (filters: ViewTeamRequest) => {
        return teamAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    // Get team members (positions for a specific team)
    const getTeamMembers = async (filters: ViewPositionsRequest) => {
        return positionAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: filters,
        });
    };

    return {
        // team mutation
        teamActionData,
        teamActionIsError,
        teamActionIsLoading,
        teamActionIsSuccess,
        teamActionError,
        teamActionReset,

        // position mutation
        positionActionData,
        positionActionIsError,
        positionActionIsLoading,
        positionActionIsSuccess,
        positionActionError,
        positionActionReset,

        // methods
        getTeamDetails,
        getTeamMembers,
    };
};

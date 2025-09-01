import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const teamMemberAPI = createApi({
    reducerPath: "teamMember",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4172/api/v1",
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["teamMember", "team", "position"],
    endpoints: (builder) => ({
        // Get team details
        fetchTeamDetails: builder.query({
            query: (data: generalProps) => `/teams${data.queryParameters}`,
        }),
        // Get team members (positions for a specific team)
        fetchTeamMembers: builder.query({
            query: (data: generalProps) => `/position${data.queryParameters}`,
        }),
        // Team actions
        actionTeams: builder.mutation({
            query: (data: generalProps) => ({
                url: `/teams${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
        // Position actions
        actionPositions: builder.mutation({
            query: (data: generalProps) => ({
                url: `/position${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchTeamDetailsQuery,
    useFetchTeamMembersQuery,
    useActionTeamsMutation,
    useActionPositionsMutation,
} = teamMemberAPI;

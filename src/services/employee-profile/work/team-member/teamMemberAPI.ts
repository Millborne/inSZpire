import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

export const teamMemberAPI = createApi({
    reducerPath: "teamMember",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE ||"http://localhost:4172/api/v1",
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["teamMember", "team", "position"],
    endpoints: (builder) => ({
        // Get team details
        fetchTeamDetails: builder.query({
            query: (data: generalProps) =>
                `/teams${data.queryParameters}`,
        }),
        
        // Get team members (positions for a specific team)
        fetchTeamMembers: builder.query({
            query: (data: generalProps) =>
                `/position${data.queryParameters}`,
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
    useActionPositionsMutation 
} = teamMemberAPI;

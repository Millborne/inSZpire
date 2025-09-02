import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface GeneralProps {
    queryParameters?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    team_ID?: string; // 🔹 Added for specific team fetch
}

export const teamsAPI = createApi({
    reducerPath: "teams",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["teams", "specificTeam"], // ✅ Added specific tag
    endpoints: (builder) => ({
        fetchTeams: builder.query<any, GeneralProps>({
            query: ({ queryParameters = "/view", team_ID, body }) => {
                // 🔹 If team_ID is provided, include it in body to fetch specific team
                const requestBody = team_ID
                    ? { team_ID, ...(body || {}) }
                    : body || {};

                return {
                    url: `/api/v1/teams${queryParameters}`,
                    method: "POST",
                    body: requestBody,
                };
            },
            transformResponse: (response: any) => response.data,
            providesTags: (result, error, arg) =>
                arg.team_ID
                    ? [{ type: "specificTeam", id: arg.team_ID }]
                    : ["teams"], // ✅ Cache team-specific data separately
        }),
        actionTeams: builder.mutation<any, GeneralProps>({
            query: ({ queryParameters, method = "POST", body }) => ({
                url: `/api/v1/teams${queryParameters}`,
                method,
                body,
            }),
            transformErrorResponse: (error: any) => {
                console.error("🟥 RTK Error from backend:", error);
                return error;
            },
            invalidatesTags: (result, error, arg) =>
                arg.body?.team_ID
                    ? [{ type: "specificTeam", id: arg.body.team_ID }]
                    : ["teams"], // ✅ Invalidate only updated team
        }),
    }),
});

export const { useFetchTeamsQuery, useActionTeamsMutation } = teamsAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const teamMemberAPI = createApi({
    reducerPath: "teamMember",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["teamMember"],
    endpoints: (builder) => ({
        fetchTeamMembers: builder.query({
            query: (data: generalProps) =>
                `api/team-members${data.queryParameters}`,
        }),
        actionTeamMembers: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/team-members${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchTeamMembersQuery, useActionTeamMembersMutation } =
    teamMemberAPI;

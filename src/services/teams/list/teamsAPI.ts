import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_APP_CLIENT_ENDPOINT } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const teamsAPI = createApi({
    reducerPath: "teams",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_APP_CLIENT_ENDPOINT,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["teams"],
    endpoints: (builder) => ({
        fetchTeams: builder.query({
            query: (data: generalProps) => `api/teams${data.queryParameters}`,
        }),
        actionTeams: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/teams${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchTeamsQuery, useActionTeamsMutation } = teamsAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface GeneralProps {
  queryParameters: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

export const teamsAPI = createApi({
  reducerPath: "teams",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
       headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    fetchTeams: builder.query<any, GeneralProps>({
      query: (data) => `/api/v1/teams${data.queryParameters}`,
      transformResponse: (response: any) => response.data,
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
}),

  }),
});

export const {
  useFetchTeamsQuery,
  useActionTeamsMutation,
} = teamsAPI;




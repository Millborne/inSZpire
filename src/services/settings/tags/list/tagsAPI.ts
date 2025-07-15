import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const tagsAPI = createApi({
    reducerPath: "tags",
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
    tagTypes: ["tags"],
    endpoints: (builder) => ({
        fetchTags: builder.query({
            query: (data: generalProps) =>
                `/api/v1${data.queryParameters}`,
        }),
        actionTags: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchTagsQuery, useActionTagsMutation } = tagsAPI;
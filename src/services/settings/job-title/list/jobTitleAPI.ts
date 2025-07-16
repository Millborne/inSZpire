import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const jobTitleAPI = createApi({
    reducerPath: "jobTitle",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4172/api/v1",
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["jobTitle"],
    endpoints: (builder) => ({
        fetchJobTitles: builder.query({
            query: (data: generalProps) =>
                `/job-title${data.queryParameters}`,
        }),
        actionJobTitles: builder.mutation({
            query: (data: generalProps) => ({
                url: `/job-title${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchJobTitlesQuery, useActionJobTitlesMutation } =
    jobTitleAPI;

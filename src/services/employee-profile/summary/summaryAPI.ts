import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const summaryAPI = createApi({
    reducerPath: "summary",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE || "http://localhost:3000",
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["summary"],
    endpoints: (builder) => ({
        fetchSummary: builder.query({
            query: (data: generalProps) =>
                `/api/v1/employee${data.queryParameters}`,
        }),
        actionSummary: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchSummaryQuery, useActionSummaryMutation } = summaryAPI;

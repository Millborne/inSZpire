import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Use the correct backend URL - your backend is running on localhost:4172
const baseURL = import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:4172/api/v1";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeHistoryAPI = createApi({
    reducerPath: "employeeHistory",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["employeeHistory"],
    endpoints: (builder) => ({
        fetchEmployeeHistory: builder.query({
            query: (data: generalProps) =>
                `/employee-history${data.queryParameters}`,
        }),
        actionEmployeeHistory: builder.mutation({
            query: (data: generalProps) => ({
                url: `/employee-history${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchEmployeeHistoryQuery,
    useActionEmployeeHistoryMutation,
} = employeeHistoryAPI;

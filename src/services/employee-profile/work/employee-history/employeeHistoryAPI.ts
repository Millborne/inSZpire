import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeHistoryAPI = createApi({
    reducerPath: "employeeHistory",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE,
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
                `api/employee-history${data.queryParameters}`,
        }),
        actionEmployeeHistory: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/employee-history${data.queryParameters}`,
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



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_APP_CLIENT_ENDPOINT } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeDetailsAPI = createApi({
    reducerPath: "employeeDetails",
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
    tagTypes: ["employeeDetails"],
    endpoints: (builder) => ({
        fetchEmployeeDetails: builder.query({
            query: (data: generalProps) =>
                `api/employee-details${data.queryParameters}`,
        }),
        actionEmployeeDetails: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/employee-details${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchEmployeeDetailsQuery, useActionEmployeeDetailsMutation } = employeeDetailsAPI; 
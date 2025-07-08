import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeAPI = createApi({
    reducerPath: "employee",
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
    tagTypes: ["employee"],
    endpoints: (builder) => ({
        fetchEmployees: builder.query({
            query: (data: generalProps) =>
                `api/employee${data.queryParameters}`,
        }),
        actionEmployees: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchEmployeesQuery, useActionEmployeesMutation } =
    employeeAPI;

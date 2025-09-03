import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

// Use the correct backend URL - your backend is running on localhost:4172
const baseURL =
    import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:3001/api/v1";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeAPI = createApi({
    reducerPath: "employee",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["employee"],
    endpoints: (builder) => ({
        fetchEmployees: builder.query({
            query: (data: generalProps) =>
                `/api/v1/employee${data.queryParameters}`,
        }),
        actionEmployees: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchEmployeesQuery, useActionEmployeesMutation } =
    employeeAPI;

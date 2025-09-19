import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

// Use the correct backend URL
const baseURL =
    import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:3001/api/v1";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeDetailsAPI = createApi({
    reducerPath: "employeeDetailsMain",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["employeeDetails"],
    endpoints: (builder) => ({
        fetchEmployeeDetails: builder.query({
            query: (data: generalProps) =>
                `/employee${data.queryParameters}`,
        }),
        actionEmployeeDetails: builder.mutation({
            query: (data: generalProps) => ({
                url: `/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchEmployeeDetailsQuery, useActionEmployeeDetailsMutation } =
    employeeDetailsAPI;

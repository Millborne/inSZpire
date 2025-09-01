import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_IDENTITY_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeDetailsAPI = createApi({
    reducerPath: "employeeDetails",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_IDENTITY_SERVICE,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["employeeDetails"],
    endpoints: (builder) => ({
        fetchEmployeeDetails: builder.query({
            query: (data: generalProps) =>
                `/api/v1/profile${data.queryParameters}`,
        }),
        actionEmployeeDetails: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/profile${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchEmployeeDetailsQuery,
    useActionEmployeeDetailsMutation,
} = employeeDetailsAPI;

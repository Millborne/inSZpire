import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const baseURL =
    import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:4172/api/v1";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

interface EmployeeIdentifiersRequest {
    search?: string;
    is_archived?: number;
    limit?: number;
    offset?: number;
}

export const idsAPI = createApi({
    reducerPath: "ids",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["ids", "identifiers"],
    endpoints: (builder) => ({
        fetchIds: builder.query({
            query: (data: generalProps) =>
                `/api/v1/employee-identifiers${data.queryParameters}`,
        }),
        fetchEmployeeIdentifiers: builder.query({
            query: (filters: EmployeeIdentifiersRequest) => ({
                url: "/api/v1/employee-identifiers/view",
                method: "POST",
                body: filters,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(
                              ({ employee_identifier_ID }: any) => ({
                                  type: "ids" as const,
                                  id: employee_identifier_ID,
                              })
                          ),
                          { type: "ids", id: "LIST" },
                      ]
                    : [{ type: "ids", id: "LIST" }],
        }),
        fetchIdentifiers: builder.query({
            query: () => ({
                url: "/api/v1/identifiers/view",
                method: "POST",
            }),
            providesTags: [{ type: "identifiers", id: "LIST" }],
        }),
        actionIds: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/employee-identifiers${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
            invalidatesTags: [{ type: "ids", id: "LIST" }],
        }),
    }),
});

export const {
    useFetchIdsQuery,
    useFetchEmployeeIdentifiersQuery,
    useFetchIdentifiersQuery,
    useActionIdsMutation,
} = idsAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

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
    baseUrl: VITE_EMPLOYMENT_SERVICE,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["ids", "identifiers"],
  endpoints: (builder) => ({
    fetchIds: builder.query({
      query: (data: generalProps) =>
        `/employee-identifiers${data.queryParameters}`,
    }),
    fetchEmployeeIdentifiers: builder.query({
      query: (filters: EmployeeIdentifiersRequest) => ({
        url: "/employee-identifiers/view",
        method: "POST",
        body: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ employee_identifier_ID }: any) => ({
                type: "ids" as const,
                id: employee_identifier_ID,
              })),
              { type: "ids", id: "LIST" },
            ]
          : [{ type: "ids", id: "LIST" }],
    }),
    fetchIdentifiers: builder.query({
      query: () => ({
        url: "/identifiers/view",
        method: "POST",
      }),
      providesTags: [{ type: "identifiers", id: "LIST" }],
    }),
    actionIds: builder.mutation({
      query: (data: generalProps) => ({
        url: `/employee-identifiers${data.queryParameters}`,
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

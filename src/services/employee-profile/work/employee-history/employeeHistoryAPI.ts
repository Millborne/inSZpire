// services/employee-profile/work/employee-history/employeeHistoryAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

export const employeeHistoryAPI = createApi({
  reducerPath: "employeeHistory",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_EMPLOYMENT_SERVICE,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["employeeHistory"],
  endpoints: (builder) => ({
    // ✅ mark the history query as providing a tag per employee
    fetchEmployeeHistory: builder.query<any, { body: any }>({
      query: (data) => ({
        url: "/api/v1/employee-history/current-and-company",
        method: "POST",
        body: data.body,
      }),
      providesTags: (_res, _err, args) => [
        { type: "employeeHistory", id: args.body?.employee_ID ?? "LIST" },
      ],
    }),

    // (optional) your dropdown aggregator stays as-is
    getEmployeeDropdowns: builder.query<
      { positionOptions: {value:string;label:string}[]; statusOptions:{value:string;label:string}[] },
      void
    >({
      query: () => ({ url: "/api/v1/employee-history/dropdowns", method: "POST" }),
    }),

    // ✅ generic mutation: invalidate the same tag so the page refetches
    actionEmployeeHistory: builder.mutation<
      any,
      { queryParameters: string; method: string; body?: any }
    >({
      query: ({ queryParameters, method, body }) => ({
        url: `/api/v1/employee-history${queryParameters}`,
        method,
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "employeeHistory", id: args.body?.employee_ID ?? "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchEmployeeHistoryQuery,
  useGetEmployeeDropdownsQuery,
  useActionEmployeeHistoryMutation,
} = employeeHistoryAPI;










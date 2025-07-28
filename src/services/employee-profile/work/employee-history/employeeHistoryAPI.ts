// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

// const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

// interface generalProps {
//     queryParameters: string;
//     method?: string;
//     body?: any;
// }

// export const employeeHistoryAPI = createApi({
//     reducerPath: "employeeHistory",
//     baseQuery: fetchBaseQuery({
//         baseUrl: VITE_EMPLOYMENT_SERVICE,
//         prepareHeaders: (headers) => {
//             const token = Cookies.get("token");

//             if (token) {
//                 headers.set("Authorization", `Bearer ${token}`);
//             }

//             return headers;
//         },
//     }),
//     tagTypes: ["employeeHistory"],
//     endpoints: (builder) => ({
//         fetchEmployeeHistory: builder.query({
//             query: (data: generalProps) =>
//                 `api/employee-history${data.queryParameters}`,
//         }),
//         actionEmployeeHistory: builder.mutation({
//             query: (data: generalProps) => ({
//                 url: `/api/employee-history${data.queryParameters}`,
//                 method: data.method,
//                 body: data.body ?? undefined,
//             }),
//         }),
//     }),
// });

// export const {
//     useFetchEmployeeHistoryQuery,
//     useActionEmployeeHistoryMutation,
// } = employeeHistoryAPI;

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
    // Ensure .env has VITE_EMPLOYMENT_SERVICE=http://localhost:4172/api/v1
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
        `employee-history${data.queryParameters}`, // ✅ Correct endpoint path
    }),

    actionEmployeeHistory: builder.mutation({
      query: (data: generalProps) => ({
        url: `employee-history${data.queryParameters}`, // ✅ No duplicate /api
        method: data.method,
        body: data.body ?? undefined,
      }),
    }),

    // ✅ Corrected employee update endpoint
    updateEmployee: builder.mutation({
      query: (body) => ({
        url: `employee/update`, // ✅ Removed /api/v1/ to prevent duplication
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchEmployeeHistoryQuery,
  useActionEmployeeHistoryMutation,
  useUpdateEmployeeMutation,
} = employeeHistoryAPI;



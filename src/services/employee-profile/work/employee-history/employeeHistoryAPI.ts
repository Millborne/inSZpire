import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types for the new employee history API
export interface EmployeeHistoryViewRequest {
  employee_ID: string;
  offset?: number;
  limit?: number;
}

export interface EmployeeHistoryViewResponse {
  success: boolean;
  message: string;
  data: {
    history: EmployeeHistoryViewData[];
    pagination: {
      total: number;
      offset: number;
      limit: number;
      hasMore: boolean;
    };
  };
}

export interface EmployeeHistoryViewData {
  employee_history_ID: string;
  employee_ID: string;
  employee_number: string;
  employee_full_name: string;
  first_name: string;
  last_name: string;
  employment_status: string;
  employee_status_ID: string;
  employee_status: string;
  previous_position_ID: string | null;
  current_position_ID: string;
  previous_position_code: string | null;
  previous_position_name: string | null;
  current_position_code: string;
  current_position_name: string;
  basic_salary: number | null;
  start_date: string;
  end_date: string | null;
  change_type: string;
  is_archived: number;
  created_at: string;
  updated_at: string;
}

// Base API configuration - using the working endpoint pattern
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/v1',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Create the API slice
export const employeeHistoryAPI = createApi({
  reducerPath: 'employeeHistoryAPI',
  baseQuery,
  tagTypes: ['EmployeeHistory'],
  endpoints: (builder) => ({
    // The working endpoint from your second image
    fetchEmployeeHistoryView: builder.mutation<EmployeeHistoryViewResponse, EmployeeHistoryViewRequest>({
      query: (request) => ({
        url: '/employee-history/view',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['EmployeeHistory'],
    }),

    // Alternative endpoint - try this if the above doesn't work
    fetchEmployeeHistoryByEmployee: builder.query<EmployeeHistoryViewResponse, string>({
      query: (employeeId) => `/employee-history/employee/${employeeId}`,
      providesTags: ['EmployeeHistory'],
    }),

    // Existing endpoints (keeping for compatibility)
    fetchEmployeeHistory: builder.query<any, { queryParameters: string; method: string }>({
      query: ({ queryParameters, method }) => ({
        url: queryParameters,
        method,
      }),
      providesTags: ['EmployeeHistory'],
    }),

    actionEmployeeHistory: builder.mutation<any, { queryParameters: string; method: string; body?: any }>({
      query: ({ queryParameters, method, body }) => ({
        url: queryParameters,
        method,
        body,
      }),
      invalidatesTags: ['EmployeeHistory'],
    }),
  }),
});

// Export hooks
export const {
  useFetchEmployeeHistoryViewMutation,
  useFetchEmployeeHistoryByEmployeeQuery,
  useFetchEmployeeHistoryQuery,
  useActionEmployeeHistoryMutation,
} = employeeHistoryAPI;



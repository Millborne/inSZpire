import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

// Debug: Log the environment variable to see what URL is being used
console.log("🔧 VITE_EMPLOYMENT_SERVICE:", VITE_EMPLOYMENT_SERVICE);

// Fallback to localhost:3000 if environment variable is not set
const baseUrl = VITE_EMPLOYMENT_SERVICE || "http://localhost:3000";

console.log("🔧 Using base URL:", baseUrl);

// Types for the new employee history API (Company History feature)
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

// Types for position API
export interface PositionData {
    position_ID: string;
    position_code: string;
    position_name: string;
    position_description?: string;
    is_active?: boolean;
}

export interface PositionResponse {
    success: boolean;
    message: string;
    data: PositionData[];
}

// Types for employee update
export interface EmployeeUpdateRequest {
    employee_ID: string;
    employment_status_ID?: string;
    employee_status_ID?: string;
    position_status_ID?: string;
    current_position_ID?: string;
    basic_salary?: number;
    change_type_ID?: string;
    reason_for_change?: string;
    updated_by?: string;
}

export interface EmployeeUpdateResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const employeeHistoryAPI = createApi({
    reducerPath: "employeeHistory",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            console.log("🔧 Making API call with baseUrl:", baseUrl);
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["employeeHistory", "positions"],
    endpoints: (builder) => ({
        // ✅ mark the history query as providing a tag per employee (Workmate's existing endpoint)
        fetchEmployeeHistory: builder.query<any, { body: any }>({
            query: (data) => {
                console.log(
                    "🔧 Calling fetchEmployeeHistory with URL:",
                    `${baseUrl}/api/v1/employee-history/current-and-company`
                );
                console.log("🔧 Request body:", data.body);
                return {
                    url: "/api/v1/employee-history/current-and-company",
                    method: "POST",
                    body: data.body,
                };
            },
            providesTags: (_res, _err, args) => [
                {
                    type: "employeeHistory",
                    id: args.body?.employee_ID ?? "LIST",
                },
            ],
        }),

        // 🆕 NEW: Company History endpoint (for the timeline feature)
        fetchEmployeeHistoryView: builder.mutation<
            EmployeeHistoryViewResponse,
            EmployeeHistoryViewRequest
        >({
            query: (request) => {
                console.log(
                    "🔧 Calling fetchEmployeeHistoryView with URL:",
                    `${baseUrl}/api/v1/employee-history/view`
                );
                console.log("🔧 Request body:", request);
                return {
                    url: "/api/v1/employee-history/view",
                    method: "POST",
                    body: request,
                };
            },
            invalidatesTags: (_res, _err, args) => [
                { type: "employeeHistory", id: args.employee_ID ?? "LIST" },
            ],
        }),

        // 🆕 NEW: Alternative Company History endpoint using query
        fetchEmployeeHistoryByEmployee: builder.query<
            EmployeeHistoryViewResponse,
            string
        >({
            query: (employeeId) => {
                console.log(
                    "🔧 Calling fetchEmployeeHistoryByEmployee with URL:",
                    `${baseUrl}/api/v1/employee-history/get-by-employee`
                );
                console.log("🔧 Employee ID:", employeeId);
                return {
                    url: "/api/v1/employee-history/get-by-employee",
                    method: "POST",
                    body: { employee_ID: employeeId },
                };
            },
            providesTags: (_res, _err, employeeId) => [
                { type: "employeeHistory", id: employeeId },
            ],
        }),

        // 🆕 NEW: Update employee
        updateEmployee: builder.mutation<
            EmployeeUpdateResponse,
            EmployeeUpdateRequest
        >({
            query: (request) => {
                console.log(
                    "🔧 Calling updateEmployee with URL:",
                    `${baseUrl}/api/v1/employee/update`
                );
                console.log("🔧 Update request:", request);
                return {
                    url: "/api/v1/employee/update",
                    method: "PUT",
                    body: request,
                };
            },
            invalidatesTags: (_res, _err, args) => [
                { type: "employeeHistory", id: args.employee_ID ?? "LIST" },
                { type: "positions", id: "LIST" },
            ],
        }),

        // 🆕 NEW: Generic query for backward compatibility
        fetchEmployeeHistoryGeneric: builder.query<
            any,
            { queryParameters: string; method: string }
        >({
            query: ({ queryParameters, method }) => ({
                url: queryParameters,
                method,
            }),
            providesTags: ["employeeHistory"],
        }),

        // (optional) your dropdown aggregator stays as-is
        getEmployeeDropdowns: builder.query<
            {
                positionOptions: { value: string; label: string }[];
                statusOptions: { value: string; label: string }[];
            },
            void
        >({
            query: () => ({
                url: "/api/v1/employee-history/dropdowns",
                method: "POST",
            }),
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
                {
                    type: "employeeHistory",
                    id: args.body?.employee_ID ?? "LIST",
                },
            ],
        }),
    }),
});

export const {
    useFetchEmployeeHistoryQuery,
    useFetchEmployeeHistoryViewMutation,
    useFetchEmployeeHistoryByEmployeeQuery,
    useFetchEmployeeHistoryGenericQuery,
    useGetEmployeeDropdownsQuery,
    useActionEmployeeHistoryMutation,
    useUpdateEmployeeMutation,
} = employeeHistoryAPI;

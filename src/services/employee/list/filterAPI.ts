import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:3000";

export interface FilterOptions {
    employment_statuses: Array<{
        status_ID: string;
        status_name: string;
        status_description: string;
    }>;
    employee_statuses: Array<{
        employee_status_ID: string;
        emp_status_name: string;
        emp_description: string;
    }>;
    position_types: Array<{
        position_type_ID: string;
        type_name: string;
    }>;
}

export const filterAPI = createApi({
    reducerPath: "filter",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["filter"],
    endpoints: (builder) => ({
        fetchAllFilterOptions: builder.query<FilterOptions, void>({
            queryFn: async () => {
                // Temporary solution: Return mock data until backend endpoint is implemented
                // TODO: Replace with actual API call when /api/v1/filters/all-options is implemented
                const mockData: FilterOptions = {
                    employment_statuses: [
                        {
                            status_ID: "bb52e0c9526111f0b6b802dcb324866b",
                            status_name: "Probationary",
                            status_description: "Under evaluation period"
                        },
                        {
                            status_ID: "bb52e29b526111f0b6b802dcb324866b",
                            status_name: "Regular",
                            status_description: "Permanent employee"
                        },
                        {
                            status_ID: "bb52e354526111f0b6b802dcb324866b",
                            status_name: "Contractual",
                            status_description: "Fixed-term contract"
                        }
                    ],
                    employee_statuses: [
                        {
                            employee_status_ID: "6d6f5ba9526111f0b6b802dcb324866b",
                            emp_status_name: "Active",
                            emp_description: "Regular work duties"
                        },
                        {
                            employee_status_ID: "6d6f5d9e526111f0b6b802dcb324866b",
                            emp_status_name: "On Leave",
                            emp_description: "Approved temporary absence"
                        },
                        {
                            employee_status_ID: "6d6f5f2a526111f0b6b802dcb324866b",
                            emp_status_name: "Suspended",
                            emp_description: "Temporarily suspended"
                        },
                        {
                            employee_status_ID: "6d6f60b6526111f0b6b802dcb324866b",
                            emp_status_name: "AWOL",
                            emp_description: "Absent without leave"
                        },
                        {
                            employee_status_ID: "6d6f6242526111f0b6b802dcb324866b",
                            emp_status_name: "Terminated",
                            emp_description: "Employment ended"
                        }
                    ],
                    position_types: [
                        {
                            position_type_ID: "cbdae27c515d11f0b6b802dcb324866b",
                            type_name: "full-time"
                        },
                        {
                            position_type_ID: "cbdb0665515d11f0b6b802dcb324866b",
                            type_name: "part-time"
                        },
                        {
                            position_type_ID: "cbdb07c0515d11f0b6b802dcb324866b",
                            type_name: "contract"
                        },
                        {
                            position_type_ID: "cbdb0827515d11f0b6b802dcb324866b",
                            type_name: "freelance"
                        }
                    ]
                };
                
                return { data: mockData };
            }
        }),
        fetchEmploymentStatuses: builder.query({
            query: () => `/api/v1/filters/employment-statuses`,
        }),
        fetchEmployeeStatuses: builder.query({
            query: () => `/api/v1/filters/employee-statuses`,
        }),
        fetchPositionTypes: builder.query({
            query: () => `/api/v1/filters/position-types`,
        }),
    }),
});

export const { 
    useFetchAllFilterOptionsQuery,
    useFetchEmploymentStatusesQuery,
    useFetchEmployeeStatusesQuery,
    useFetchPositionTypesQuery
} = filterAPI; 
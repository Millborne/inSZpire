import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Update employee request interface - matches backend structure
export interface UpdateEmployeeRequest {
    employee_ID: string; // Consistent with backend using employee_ID
    employee?: {
        current_position_ID?: string;
        position_status_ID?: string;
        employee_status_ID?: string;
        hire_date?: string;
        work_email?: string;
        salary_frequency?: string;
        sched_type?: string;
        has_atm?: number;
        is_agency?: number;
        is_confidential?: number;
        is_leave_earned?: number;
        e_sig_url?: string;
        qr_code_url?: string;
        separation_date?: string;
        reason_for_leaving?: string;
        not_for_rehire?: number;
        is_archived?: number;
    };
    profile?: {
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        name_ext?: string;
        preferred_name?: string;
        gender?: string;
        pronoun?: string;
        date_of_birth?: string;
        birth_address?: string;
        marital_status?: string;
        religion_ID?: string;
        blood_type?: string;
        telephone_number?: string;
        mobile_number?: string;
        personal_email?: string;
        educational_attainment_ID?: string;
    };
    permanent_address?: {
        address_ID?: string; // Address ID for update operations
        address_line_1?: string;
        address_line_2?: string;
        country_ID?: number;
        region_state_ID?: number;
        province_ID?: number;
        city_municipality_ID?: number;
        barangay_ID?: number;
        postal_code?: string;
        service_identifier?: string;
        address_type_ID?: number;
        entity?: string;
    };
    present_address?: {
        address_ID?: string; // Address ID for update operations
        address_line_1?: string;
        address_line_2?: string;
        country_ID?: number;
        region_state_ID?: number;
        province_ID?: number;
        city_municipality_ID?: number;
        barangay_ID?: number;
        postal_code?: string;
        service_identifier?: string;
        address_type_ID?: number;
        entity?: string;
    };
}

// Get employee by ID request
export interface GetEmployeeByIdRequest {
    employee_ID: string; // Consistent with backend using employee_ID
}

const baseUrl = import.meta.env.VITE_EMPLOYMENT_SERVICE || 'http://localhost:3000';

export const employeeUpdateAPI = createApi({
    reducerPath: 'employeeUpdateAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${baseUrl}/api/v1`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        updateEmployee: builder.mutation<any, UpdateEmployeeRequest>({
            query: (employeeData) => ({
                url: '/employee/update',
                method: 'PUT',
                body: employeeData,
            }),
        }),
        getEmployeeById: builder.mutation<any, GetEmployeeByIdRequest>({
            query: (request) => ({
                url: '/employee/get-by-id',
                method: 'POST',
                body: request,
            }),
        }),
    }),
});

export const { useUpdateEmployeeMutation, useGetEmployeeByIdMutation } = employeeUpdateAPI; 
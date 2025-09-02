import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../utils/rtkQueryAuth";

// Define the backend API structure
interface CreateEmployeeRequest {
    work_email: string;
    current_position_ID: string;
    sched_type: string;
    hire_date: string;
    has_atm: number;
    salary_frequency: string;
    is_agency: number;
    is_confidential: number;
    is_leave_earned: number;
    e_sig_url: string;
    qr_code_url: string;
    separation_date: string;
    reason_for_leaving: string;
    not_for_rehire: number;
    is_archived: number;
    profile: {
        first_name: string;
        last_name: string;
        middle_name: string;
        name_ext: string;
        preferred_name: string;
        profile_image: string;
        gender: string;
        pronoun: string;
        date_of_birth: string;
        birth_address: string;
        marital_status: string;
        religion_ID: string;
        blood_type: string;
        telephone_number: string;
        mobile_number: string;
        personal_email: string;
        educational_attainment_ID: string;
    };
    permanent_address: {
        address_line_1: string;
        address_line_2: string;
        country_ID: number;
        region_state_ID: number;
        province_ID: number;
        city_municipality_ID: number;
        barangay_ID: number;
        postal_code: string;
        service_identifier: string;
        address_type_ID: number;
        entity: string;
    };
    present_address: {
        address_line_1: string;
        address_line_2: string;
        country_ID: number;
        region_state_ID: number;
        province_ID: number;
        city_municipality_ID: number;
        barangay_ID: number;
        postal_code: string;
        service_identifier: string;
        address_type_ID: number;
        entity: string;
    };
}

const baseUrl =
    import.meta.env.VITE_EMPLOYMENT_SERVICE || "http://localhost:4172";

export const employeeCreateAPI = createApi({
    reducerPath: "employeeCreateAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/api/v1`,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return prepareSharedAuthHeaders(headers);
        },
    }),
    endpoints: (builder) => ({
        createEmployee: builder.mutation<any, CreateEmployeeRequest>({
            query: (employeeData) => ({
                url: "/employee/create",
                method: "POST",
                body: employeeData,
            }),
        }),
    }),
});

export const { useCreateEmployeeMutation } = employeeCreateAPI;

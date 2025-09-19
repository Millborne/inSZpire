import { useCallback } from "react";
import {
    useFetchEmployeeDetailsQuery,
    useActionEmployeeDetailsMutation,
} from "./employeeDetailsAPI";

export const useEmployeeDetails = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    // fetch
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchEmployeeDetailsQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    // action
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeeDetailsMutation();

    return {
        // fetching
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,

        // mutation
        generalAction,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
};

// Employee Details interfaces
export interface EmployeeDetailsData {
    employee_ID: string;
    employee_number?: string;
    old_employee_number?: string;
    profile_ID?: string;
    position_ID?: string;
    team_ID?: string;
    employment_status?: string;
    employee_status_ID?: string;
    employee_status?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    profile_image?: string;
    gender?: "male" | "female" | "other";
    pronoun?: string;
    date_of_birth?: string;
    marital_status?: string;
    birth_address?: string;
    blood_type?: string;
    mobile_number?: string;
    personal_email?: string;
    religion?: string;
    religion_ID?: string;
    educational_attainment?: string;
    work_email?: string;
    sched_type?: string;
    hire_date?: string;
    has_atm?: number;
    salary_frequency?: string;
    is_agency?: number;
    is_confidential?: number;
    is_leave_earned?: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire?: number;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
    permanent_address?: string | null;
    present_address?: string | null;
    position_code?: string;
    position_name?: string;
    team_code?: string;
    team_name?: string;
    type_name?: string;
    setup_name?: string;
    job_code?: string;
    job_title?: string;
    supervisor_first_name?: string;
    supervisor_last_name?: string;
    emergency_contact_first_name?: string;
    emergency_contact_last_name?: string;
    emergency_contact_number?: string;
    work_location?: string;
}

export interface GetEmployeeByIdRequest {
    employee_ID: string;
}

export interface EmployeeDetailsResponse {
    success: boolean;
    message: string;
    data: EmployeeDetailsData;
}

// Specific employee details service methods
export const useEmployeeDetailsService = () => {
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeeDetailsMutation();

    // Get employee details by ID - memoized to prevent infinite re-renders
    const getEmployeeById = useCallback(async (request: GetEmployeeByIdRequest) => {
        return generalAction({
            queryParameters: "/get-by-id",
            method: "POST",
            body: request,
        });
    }, [generalAction]);

    return {
        // mutation
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,

        // methods
        getEmployeeById,
    };
};

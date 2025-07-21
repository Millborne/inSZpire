import { useFetchSummaryQuery, useActionSummaryMutation } from "./summaryAPI";

export const useSummary = ({
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
        useFetchSummaryQuery(
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
    ] = useActionSummaryMutation();

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

// Summary-specific interfaces based on API documentation
export interface ProfileSummaryData {
    employee_ID?: string;
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

export interface ViewProfileSummaryRequest {
    employee_ID: string;
}

export interface GetByIdViewRequest {
    employeeId: string;
}

export interface SummaryFiltersRequest {
    department_ID?: string;
    position_ID?: string;
    job_title_ID?: string;
    employee_status?:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    date_range?: {
        start_date: string;
        end_date: string;
    };
}

export interface DepartmentSummaryData {
    department_ID: string;
    department_name: string;
    total_employees: number;
    active_employees: number;
    average_salary: number;
    total_attendance: number;
    total_leave: number;
    total_overtime: number;
}

export interface PositionSummaryData {
    position_ID: string;
    position_name: string;
    total_employees: number;
    active_employees: number;
    average_salary: number;
    total_attendance: number;
    total_leave: number;
    total_overtime: number;
}

// Specific summary service methods
export const useSummaryService = () => {
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
    ] = useActionSummaryMutation();

    // View Profile Summary
    const viewProfileSummary = async (
        summaryData: ViewProfileSummaryRequest
    ) => {
        return generalAction({
            queryParameters: "/profile-summary",
            method: "POST",
            body: summaryData,
        });
    };

    // Get Department Summary
    const getDepartmentSummary = async (filters: SummaryFiltersRequest) => {
        return generalAction({
            queryParameters: "/department-summary",
            method: "POST",
            body: filters,
        });
    };

    // Get Position Summary
    const getPositionSummary = async (filters: SummaryFiltersRequest) => {
        return generalAction({
            queryParameters: "/position-summary",
            method: "POST",
            body: filters,
        });
    };

    // Get Overall Summary
    const getOverallSummary = async (filters: SummaryFiltersRequest) => {
        return generalAction({
            queryParameters: "/overall-summary",
            method: "POST",
            body: filters,
        });
    };

    // Get Employee Performance Summary
    const getEmployeePerformanceSummary = async (
        summaryData: ViewProfileSummaryRequest
    ) => {
        return generalAction({
            queryParameters: "/employee-performance",
            method: "POST",
            body: summaryData,
        });
    };

    // Get Attendance Summary
    const getAttendanceSummary = async (
        summaryData: ViewProfileSummaryRequest
    ) => {
        return generalAction({
            queryParameters: "/attendance-summary",
            method: "POST",
            body: summaryData,
        });
    };

    // Get comprehensive employee data using view
    const getByIdView = async (requestData: GetByIdViewRequest) => {
        return generalAction({
            queryParameters: "/get-by-id-view",
            method: "POST",
            body: requestData,
        });
    };

    return {
        // mutation
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,

        // methods
        viewProfileSummary,
        getDepartmentSummary,
        getPositionSummary,
        getOverallSummary,
        getEmployeePerformanceSummary,
        getAttendanceSummary,
        getByIdView,
    };
};

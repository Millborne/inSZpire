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
    employee_code?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: "male" | "female" | "other";
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    position_ID?: string;
    position_name?: string;
    department_ID?: string;
    department_name?: string;
    job_title_ID?: string;
    job_title_name?: string;
    hire_date?: string;
    salary?: number;
    employee_status:
        | "active"
        | "pending"
        | "inactive"
        | "suspended"
        | "terminated";
    profile_image?: string;
    total_work_days?: number;
    total_leave_days?: number;
    total_overtime_hours?: number;
    current_month_attendance?: number;
    current_month_leave?: number;
    current_month_overtime?: number;
    performance_rating?: number;
    last_evaluation_date?: string;
    next_evaluation_date?: string;
    emergency_contact?: {
        name?: string;
        relationship?: string;
        phone?: string;
        email?: string;
    };
    documents_count?: number;
    certifications_count?: number;
    training_completed?: number;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ViewProfileSummaryRequest {
    employee_ID: string;
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
    };
};

import {
    useFetchEducationQuery,
    useActionEducationMutation,
} from "./educationAPI";

export const useEducation = ({
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
        useFetchEducationQuery(
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
    ] = useActionEducationMutation();

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

// Education-specific interfaces based on API documentation
export interface EducationData {
    education_ID?: string;
    employee_ID?: string;
    education_level:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name: string;
    school_address?: string;
    course_degree?: string;
    major_field?: string;
    minor_field?: string;
    start_date: string;
    end_date?: string;
    graduation_date?: string;
    gpa?: number;
    honors_awards?: string;
    thesis_dissertation?: string;
    academic_achievements?: string;
    extracurricular_activities?: string;
    scholarships?: string;
    education_status: "completed" | "ongoing" | "incomplete" | "transferred";
    is_graduated: boolean;
    is_current: boolean;
    education_status_detail: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateEducationRequest {
    employee_ID: string;
    education_level:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name: string;
    school_address?: string;
    course_degree?: string;
    major_field?: string;
    minor_field?: string;
    start_date: string;
    end_date?: string;
    graduation_date?: string;
    gpa?: number;
    honors_awards?: string;
    thesis_dissertation?: string;
    academic_achievements?: string;
    extracurricular_activities?: string;
    scholarships?: string;
    education_status: "completed" | "ongoing" | "incomplete" | "transferred";
    is_graduated: boolean;
    is_current: boolean;
    education_status_detail: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateEducationRequest {
    education_ID: string;
    education_level?:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name?: string;
    school_address?: string;
    course_degree?: string;
    major_field?: string;
    minor_field?: string;
    start_date?: string;
    end_date?: string;
    graduation_date?: string;
    gpa?: number;
    honors_awards?: string;
    thesis_dissertation?: string;
    academic_achievements?: string;
    extracurricular_activities?: string;
    scholarships?: string;
    education_status?: "completed" | "ongoing" | "incomplete" | "transferred";
    is_graduated?: boolean;
    is_current?: boolean;
    education_status_detail?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewEducationRequest {
    employee_ID: string;
    education_level?:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    education_status?: "completed" | "ongoing" | "incomplete" | "transferred";
    education_status_detail?: "active" | "pending" | "inactive" | "suspended";
    is_graduated?: boolean;
    is_current?: boolean;
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface GetEducationRequest {
    education_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    education_status_detail: "active" | "pending" | "inactive" | "suspended";
}

// Specific education service methods
export const useEducationService = () => {
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
    ] = useActionEducationMutation();

    // List education records
    const listEducation = async (filters: ViewEducationRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create education record
    const createEducation = async (educationData: CreateEducationRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: educationData,
        });
    };

    // Edit education record
    const updateEducation = async (educationData: UpdateEducationRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: educationData,
        });
    };

    // Get specific education record
    const getEducation = async (educationData: GetEducationRequest) => {
        return generalAction({
            queryParameters: "/get",
            method: "POST",
            body: educationData,
        });
    };

    // View education records with filters
    const viewEducation = async (filters: ViewEducationRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    // Batch update status
    const batchUpdateStatus = async (batchData: BatchUpdateStatusRequest) => {
        return generalAction({
            queryParameters: "/batch-update-status",
            method: "POST",
            body: batchData,
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
        listEducation,
        createEducation,
        updateEducation,
        getEducation,
        viewEducation,
        batchUpdateStatus,
    };
};

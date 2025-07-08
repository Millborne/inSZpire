import {
    useFetchJobTitlesQuery,
    useActionJobTitlesMutation,
} from "./jobTitleAPI";

export const useJobTitles = ({
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
        useFetchJobTitlesQuery(
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
    ] = useActionJobTitlesMutation();

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

// Job Title-specific interfaces based on API documentation
export interface JobTitleData {
    job_title_ID?: string;
    job_title_name: string;
    job_title_description?: string;
    job_title_code?: string;
    job_title_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateJobTitleRequest {
    job_title_name: string;
    job_title_description?: string;
    job_title_code?: string;
    job_title_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateJobTitleRequest {
    job_title_ID: string;
    job_title_name?: string;
    job_title_description?: string;
    job_title_code?: string;
    job_title_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewJobTitlesRequest {
    search?: string;
    is_archived?: number;
    job_title_status?: "active" | "pending" | "inactive" | "suspended";
    offset?: number;
    limit?: number;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    job_title_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific job title service methods
export const useJobTitleService = () => {
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
    ] = useActionJobTitlesMutation();

    const createJobTitle = async (jobTitleData: CreateJobTitleRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: jobTitleData,
        });
    };

    const updateJobTitle = async (jobTitleData: UpdateJobTitleRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: jobTitleData,
        });
    };

    const viewJobTitles = async (filters: ViewJobTitlesRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
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
        createJobTitle,
        updateJobTitle,
        viewJobTitles,
    };
};

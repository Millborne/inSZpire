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
    job_ID?: string;
    job_code: string;
    job_title: string;
    job_description?: string;
    basic_salary?: number;
    status?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateJobTitleRequest {
    job_code: string;
    job_title: string;
    job_description?: string;
    basic_salary?: number;
    status?: string;
    is_archived?: number;
}

export interface UpdateJobTitleRequest {
    job_ID: string;
    job_code?: string;
    job_title?: string;
    job_description?: string;
    basic_salary?: number;
    status?: string;
    is_archived?: number;
}

export interface ViewJobTitlesRequest {
    search?: string;
    is_archived?: number;
    page?: number;
    limit?: number;
}

export interface GetJobTitleRequest {
    job_ID: string;
}

export interface BatchUpdateStatusRequest {
    job_IDs: string[];
    status: string;
}

// Specific job title service methods based on API documentation
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
            queryParameters: "/create",
            method: "POST",
            body: jobTitleData,
        });
    };

    const updateJobTitle = async (jobTitleData: UpdateJobTitleRequest) => {
        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: jobTitleData,
        });
    };

    const listJobTitles = async (filters: ViewJobTitlesRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const getJobTitle = async (jobTitleData: GetJobTitleRequest) => {
        return generalAction({
            queryParameters: `/list?job_ID=${jobTitleData.job_ID}`,
            method: "POST",
            body: { job_ID: jobTitleData.job_ID },
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
        listJobTitles,
        getJobTitle,
    };
};

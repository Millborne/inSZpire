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
    educ_ID?: string;
    profile_ID: string;
    education_level_ID: string;
    school_ID: string;
    degree?: string;
    course?: string;
    year_started?: string | number;
    year_left?: string | number;
    honors_received?: string;
    user_type?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateEducationRequest {
    profile_ID: string;
    education_level_ID: string;
    school_ID: string;
    degree?: string;
    course?: string;
    year_started?: string | number;
    year_left?: string | number;
    honors_received?: string;
    user_type?: string;
}

export interface UpdateEducationRequest {
    educ_ID: string;
    fields: {
        education_level_ID?: string;
        school_ID?: string;
        degree?: string;
        course?: string;
        year_started?: string | number;
        year_left?: string | number;
        honors_received?: string;
        user_type?: string;
    };
}

export interface ViewEducationRequest {
    filters?: {
        profile_ID?: string;
        education_level_ID?: string;
        school_ID?: string;
        degree?: string;
        course?: string;
        year_started?: string | number;
        year_left?: string | number;
        honors_received?: string;
        user_type?: string;
    };
}

export interface GetEducationRequest {
    educ_ID: string;
}

export interface DeleteEducationRequest {
    educ_ID: string;
    profile_ID: string;
    user_type: string;
}

// Specific education service methods based on API documentation
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

    const listEducation = async (filters: ViewEducationRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const createEducation = async (educationData: CreateEducationRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: educationData,
        });
    };

    const updateEducation = async (educationData: UpdateEducationRequest) => {
        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: educationData,
        });
    };

    const getEducation = async (educationData: GetEducationRequest) => {
        return generalAction({
            queryParameters: `/list?educ_ID=${educationData.educ_ID}`,
            method: "POST",
            body: { filters: { educ_ID: educationData.educ_ID } },
        });
    };

    const viewEducation = async (filters: ViewEducationRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    const deleteEducation = async (educationData: DeleteEducationRequest) => {
        return generalAction({
            queryParameters: "/delete",
            method: "POST",
            body: educationData,
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
        deleteEducation,
    };
};

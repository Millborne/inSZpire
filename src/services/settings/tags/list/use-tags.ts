import { useFetchTagsQuery, useActionTagsMutation } from "./tagsAPI";

export const useTags = ({
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
        useFetchTagsQuery(
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
    ] = useActionTagsMutation();

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

// Tag-specific interfaces based on API documentation
export interface TagData {
    tag_ID?: string;
    tag_name: string;
    tag_description?: string;
    tag_color?: string;
    tag_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateTagRequest {
    tag_name: string;
    tag_description?: string;
    tag_color?: string;
    tag_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateTagRequest {
    tag_ID: string;
    tag_name?: string;
    tag_description?: string;
    tag_color?: string;
    tag_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewTagsRequest {
    search?: string;
    is_archived?: number;
    tag_status?: "active" | "pending" | "inactive" | "suspended";
    offset?: number;
    limit?: number;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    tag_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific tag service methods
export const useTagService = () => {
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
    ] = useActionTagsMutation();

    const createTag = async (tagData: CreateTagRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: tagData,
        });
    };

    const updateTag = async (tagData: UpdateTagRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: tagData,
        });
    };

    const viewTags = async (filters: ViewTagsRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

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
        createTag,
        updateTag,
        viewTags,
        batchUpdateStatus,
    };
};

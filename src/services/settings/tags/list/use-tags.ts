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

// Tag-specific interfaces based on API documentation (using position endpoints)
export interface TagData {
    tag_ID?: string;
    tag_name: string;
    tag_type: string;
    description?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateTagRequest {
    tag_name: string;
    tag_type: string;
    description?: string;
    is_archived?: number;
}

export interface UpdateTagRequest {
    tag_ID: string;
    tag_name?: string;
    tag_type?: string;
    description?: string;
    is_archived?: number;
}

export interface ViewTagsRequest {
    tag_type?: string;
    is_archived?: number;
}

export interface GetTagsByTypeRequest {
    tag_type: string;
}

export interface BatchUpdateStatusRequest {
    tag_IDs: string[];
    status: string;
}

// Specific tag service methods based on API documentation (using position endpoints)
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

    const getTagsByType = async (tagType: string) => {
        return generalAction({
            queryParameters: `/tags/${tagType}`,
            method: "GET",
        });
    };

    const viewTags = async (filters: ViewTagsRequest) => {
        return generalAction({
            queryParameters: `/tags/view`,
            body: filters,
            method: "POST",
        });
    };

    const createTag = async (tagData: CreateTagRequest) => {
        return generalAction({
            queryParameters: `/tags`,
            body: tagData,
            method: "POST",
        });
    };

    const updateTag = async (tagData: UpdateTagRequest) => {
        return generalAction({
            queryParameters: `/tags`,
            body: tagData,
            method: "PUT",
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
        getTagsByType,
        viewTags,
        createTag,
        updateTag,
    };
};
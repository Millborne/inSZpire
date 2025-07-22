import {
    useFetchPositionTypesQuery,
    useActionPositionTypesMutation,
} from "../type/positionTypeAPI";

export const usePositionTypes = ({
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
        useFetchPositionTypesQuery(
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
    ] = useActionPositionTypesMutation();

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

// Position Type-specific interfaces based on API documentation
export interface PositionTypeData {
    position_type_ID?: string;
    type_name: string;
    position_type_description?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreatePositionTypeRequest {
    position_type_name: string;
    position_type_description?: string;
    is_archived?: number;
}

export interface UpdatePositionTypeRequest {
    position_type_ID: string;
    position_type_name?: string;
    position_type_description?: string;
    is_archived?: number;
}

export interface ViewPositionTypesRequest {
    search?: string;
    is_archived?: number;
}

export interface GetPositionTypeRequest {
    position_type_ID: string;
}

// Specific position type service methods based on API documentation
export const usePositionTypeService = () => {
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
    ] = useActionPositionTypesMutation();

    const listPositionTypes = async (filters: ViewPositionTypesRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const getPositionType = async (
        positionTypeData: GetPositionTypeRequest
    ) => {
        return generalAction({
            queryParameters: `/view?position_type_ID=${positionTypeData.position_type_ID}`,
            method: "POST",
            body: { position_type_ID: positionTypeData.position_type_ID },
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
        listPositionTypes,
        getPositionType,
    };
};

import { useFetchFamilyQuery, useActionFamilyMutation } from "./familyAPI";

export const useFamily = ({
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
        useFetchFamilyQuery(
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
    ] = useActionFamilyMutation();

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

// Family-specific interfaces based on API documentation
export interface FamilyData {
    profile_family_ID?: string;
    profile_ID: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    relation: string;
    date_of_birth?: string;
    contact_number?: string;
    address?: string;
    is_emergency_contact?: boolean;
    user_type?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateFamilyRequest {
    profile_ID: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    relation: string;
    date_of_birth?: string;
    contact_number?: string;
    address?: string;
    is_emergency_contact?: boolean;
    user_type?: string;
}

export interface UpdateFamilyRequest {
    profile_family_ID: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    name_ext?: string;
    relation?: string;
    date_of_birth?: string;
    contact_number?: string;
    address?: string;
    is_emergency_contact?: boolean;
}

export interface ViewFamilyRequest {
    profile_ID?: string;
    search?: string;
    offset?: number;
    limit?: number;
}

export interface GetFamilyRequest {
    profile_family_ID: string;
}

export interface DeleteFamilyRequest {
    profile_family_ID: string;
}

export interface InformationUpdateRequest {
    profile_ID?: string;
}

// Specific family service methods based on API documentation
export const useFamilyService = () => {
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
    ] = useActionFamilyMutation();

    const listFamily = async (filters: ViewFamilyRequest) => {
        return generalAction({
            queryParameters: "/getFamilyContacts",
            method: "GET",
            body: filters,
        });
    };

    const createFamily = async (familyData: CreateFamilyRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: familyData,
        });
    };

    const updateFamily = async (familyData: UpdateFamilyRequest) => {
        return generalAction({
            queryParameters: "/updateFamilyContact",
            method: "PUT",
            body: familyData,
        });
    };

    const getFamily = async (familyData: GetFamilyRequest) => {
        return generalAction({
            queryParameters: `/getFamilyContacts?profile_family_ID=${familyData.profile_family_ID}`,
            method: "GET",
        });
    };

    const viewFamily = async (filters: ViewFamilyRequest) => {
        return generalAction({
            queryParameters: "/getFamilyContacts",
            method: "GET",
            body: filters,
        });
    };

    const deleteFamily = async (familyData: DeleteFamilyRequest) => {
        return generalAction({
            queryParameters: "/deleteFamilyContact",
            method: "DELETE",
            body: familyData,
        });
    };

    const getInformationUpdateRequests = async (
        request: InformationUpdateRequest
    ) => {
        return generalAction({
            queryParameters: "/getInformationUpdateRequests",
            method: "POST",
            body: request,
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
        listFamily,
        createFamily,
        updateFamily,
        getFamily,
        viewFamily,
        deleteFamily,
        getInformationUpdateRequests,
    };
};

import { useFetchContactQuery, useActionContactMutation } from "./contactAPI";

export const useContact = ({
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
        useFetchContactQuery(
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
    ] = useActionContactMutation();

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

// Contact-specific interfaces based on API documentation (using family endpoints)
export interface ContactData {
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

export interface CreateContactRequest {
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

export interface UpdateContactRequest {
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

export interface ViewContactRequest {
    profile_ID?: string;
    search?: string;
    offset?: number;
    limit?: number;
}

export interface GetContactRequest {
    profile_family_ID: string;
}

export interface DeleteContactRequest {
    profile_family_ID: string;
}

export interface InformationUpdateRequest {
    profile_ID?: string;
}

// Specific contact service methods based on API documentation (using family endpoints)
export const useContactService = () => {
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
    ] = useActionContactMutation();

    const listContact = async (filters: ViewContactRequest) => {
        return generalAction({
            queryParameters: "/getFamilyContacts",
            method: "GET",
            body: filters,
        });
    };

    const createContact = async (contactData: CreateContactRequest) => {
        return generalAction({
            queryParameters: "/create",
            method: "POST",
            body: contactData,
        });
    };

    const updateContact = async (contactData: UpdateContactRequest) => {
        return generalAction({
            queryParameters: "/updateFamilyContact",
            method: "PUT",
            body: contactData,
        });
    };

    const getContact = async (contactData: GetContactRequest) => {
        return generalAction({
            queryParameters: `/getFamilyContacts?profile_family_ID=${contactData.profile_family_ID}`,
            method: "GET",
        });
    };

    const viewContact = async (filters: ViewContactRequest) => {
        return generalAction({
            queryParameters: "/getFamilyContacts",
            method: "GET",
            body: filters,
        });
    };

    const deleteContact = async (contactData: DeleteContactRequest) => {
        return generalAction({
            queryParameters: "/deleteFamilyContact",
            method: "DELETE",
            body: contactData,
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
        listContact,
        createContact,
        updateContact,
        getContact,
        viewContact,
        deleteContact,
        getInformationUpdateRequests,
    };
};

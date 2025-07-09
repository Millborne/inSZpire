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

// Contact-specific interfaces based on API documentation
export interface ContactData {
    contact_ID?: string;
    employee_ID?: string;
    contact_type:
        | "emergency"
        | "personal"
        | "professional"
        | "reference"
        | "other";
    first_name: string;
    last_name: string;
    middle_name?: string;
    relationship: string;
    company_name?: string;
    job_title?: string;
    department?: string;
    phone_number: string;
    mobile_number?: string;
    email?: string;
    address?: {
        street_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    is_emergency_contact: boolean;
    emergency_contact_priority?: number;
    is_beneficiary: boolean;
    is_reference: boolean;
    is_guarantor: boolean;
    contact_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateContactRequest {
    employee_ID: string;
    contact_type:
        | "emergency"
        | "personal"
        | "professional"
        | "reference"
        | "other";
    first_name: string;
    last_name: string;
    middle_name?: string;
    relationship: string;
    company_name?: string;
    job_title?: string;
    department?: string;
    phone_number: string;
    mobile_number?: string;
    email?: string;
    address?: {
        street_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    is_emergency_contact: boolean;
    emergency_contact_priority?: number;
    is_beneficiary: boolean;
    is_reference: boolean;
    is_guarantor: boolean;
    contact_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateContactRequest {
    contact_ID: string;
    contact_type?:
        | "emergency"
        | "personal"
        | "professional"
        | "reference"
        | "other";
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    relationship?: string;
    company_name?: string;
    job_title?: string;
    department?: string;
    phone_number?: string;
    mobile_number?: string;
    email?: string;
    address?: {
        street_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    is_emergency_contact?: boolean;
    emergency_contact_priority?: number;
    is_beneficiary?: boolean;
    is_reference?: boolean;
    is_guarantor?: boolean;
    contact_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewContactRequest {
    employee_ID: string;
    contact_type?:
        | "emergency"
        | "personal"
        | "professional"
        | "reference"
        | "other";
    relationship?: string;
    is_emergency_contact?: boolean;
    is_beneficiary?: boolean;
    is_reference?: boolean;
    is_guarantor?: boolean;
    contact_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface GetContactRequest {
    contact_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    contact_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific contact service methods
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

    // List contacts
    const listContact = async (filters: ViewContactRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create contact
    const createContact = async (contactData: CreateContactRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: contactData,
        });
    };

    // Edit contact
    const updateContact = async (contactData: UpdateContactRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: contactData,
        });
    };

    // Get specific contact
    const getContact = async (contactData: GetContactRequest) => {
        return generalAction({
            queryParameters: "/get",
            method: "POST",
            body: contactData,
        });
    };

    // View contacts with filters
    const viewContact = async (filters: ViewContactRequest) => {
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
        listContact,
        createContact,
        updateContact,
        getContact,
        viewContact,
        batchUpdateStatus,
    };
};

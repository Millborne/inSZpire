import { useFetchIdsQuery, useActionIdsMutation } from "./idsAPI";

export const useIds = ({
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
        useFetchIdsQuery(
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
    ] = useActionIdsMutation();

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

// IDs-specific interfaces based on API documentation
export interface IdsData {
    id_ID?: string;
    employee_ID?: string;
    id_type:
        | "sss"
        | "tin"
        | "philhealth"
        | "pagibig"
        | "passport"
        | "driver_license"
        | "national_id"
        | "voter_id"
        | "postal_id"
        | "other";
    id_number: string;
    id_name?: string;
    issuing_authority?: string;
    issuing_country?: string;
    issuing_state?: string;
    issuing_city?: string;
    issue_date?: string;
    expiry_date?: string;
    is_expired: boolean;
    is_primary: boolean;
    is_verified: boolean;
    verification_date?: string;
    verification_status?: "pending" | "verified" | "rejected" | "expired";
    verification_notes?: string;
    document_image?: string;
    document_back_image?: string;
    id_status: "active" | "pending" | "inactive" | "suspended" | "expired";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateIdsRequest {
    employee_ID: string;
    id_type:
        | "sss"
        | "tin"
        | "philhealth"
        | "pagibig"
        | "passport"
        | "driver_license"
        | "national_id"
        | "voter_id"
        | "postal_id"
        | "other";
    id_number: string;
    id_name?: string;
    issuing_authority?: string;
    issuing_country?: string;
    issuing_state?: string;
    issuing_city?: string;
    issue_date?: string;
    expiry_date?: string;
    is_expired: boolean;
    is_primary: boolean;
    is_verified: boolean;
    verification_date?: string;
    verification_status?: "pending" | "verified" | "rejected" | "expired";
    verification_notes?: string;
    document_image?: string;
    document_back_image?: string;
    id_status: "active" | "pending" | "inactive" | "suspended" | "expired";
    is_archived?: number;
}

export interface UpdateIdsRequest {
    id_ID: string;
    id_type?:
        | "sss"
        | "tin"
        | "philhealth"
        | "pagibig"
        | "passport"
        | "driver_license"
        | "national_id"
        | "voter_id"
        | "postal_id"
        | "other";
    id_number?: string;
    id_name?: string;
    issuing_authority?: string;
    issuing_country?: string;
    issuing_state?: string;
    issuing_city?: string;
    issue_date?: string;
    expiry_date?: string;
    is_expired?: boolean;
    is_primary?: boolean;
    is_verified?: boolean;
    verification_date?: string;
    verification_status?: "pending" | "verified" | "rejected" | "expired";
    verification_notes?: string;
    document_image?: string;
    document_back_image?: string;
    id_status?: "active" | "pending" | "inactive" | "suspended" | "expired";
    is_archived?: number;
}

export interface ViewIdsRequest {
    employee_ID: string;
    id_type?:
        | "sss"
        | "tin"
        | "philhealth"
        | "pagibig"
        | "passport"
        | "driver_license"
        | "national_id"
        | "voter_id"
        | "postal_id"
        | "other";
    is_expired?: boolean;
    is_primary?: boolean;
    is_verified?: boolean;
    verification_status?: "pending" | "verified" | "rejected" | "expired";
    id_status?: "active" | "pending" | "inactive" | "suspended" | "expired";
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface GetIdsRequest {
    id_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    id_status: "active" | "pending" | "inactive" | "suspended" | "expired";
}

// Specific IDs service methods
export const useIdsService = () => {
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
    ] = useActionIdsMutation();

    // List IDs
    const listIds = async (filters: ViewIdsRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create ID
    const createIds = async (idsData: CreateIdsRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: idsData,
        });
    };

    // Edit ID
    const updateIds = async (idsData: UpdateIdsRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: idsData,
        });
    };

    // Get specific ID
    const getIds = async (idsData: GetIdsRequest) => {
        return generalAction({
            queryParameters: "/get",
            method: "POST",
            body: idsData,
        });
    };

    // View IDs with filters
    const viewIds = async (filters: ViewIdsRequest) => {
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
        listIds,
        createIds,
        updateIds,
        getIds,
        viewIds,
        batchUpdateStatus,
    };
};

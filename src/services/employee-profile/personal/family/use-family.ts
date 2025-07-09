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
    family_ID?: string;
    employee_ID?: string;
    family_member_type:
        | "spouse"
        | "child"
        | "parent"
        | "sibling"
        | "dependent"
        | "other";
    first_name: string;
    last_name: string;
    middle_name?: string;
    maiden_name?: string;
    relationship: string;
    date_of_birth?: string;
    place_of_birth?: string;
    gender?: "male" | "female" | "other";
    civil_status?: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality?: string;
    religion?: string;
    occupation?: string;
    employer?: string;
    employer_address?: string;
    employer_phone?: string;
    employer_email?: string;
    contact_number?: string;
    email?: string;
    address?: {
        present_address?: string;
        permanent_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    is_beneficiary: boolean;
    is_dependent: boolean;
    is_emergency_contact: boolean;
    emergency_contact_priority?: number;
    health_conditions?: string;
    allergies?: string;
    medications?: string;
    special_needs?: string;
    education_level?:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name?: string;
    school_address?: string;
    course_degree?: string;
    family_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateFamilyRequest {
    employee_ID: string;
    family_member_type:
        | "spouse"
        | "child"
        | "parent"
        | "sibling"
        | "dependent"
        | "other";
    first_name: string;
    last_name: string;
    middle_name?: string;
    maiden_name?: string;
    relationship: string;
    date_of_birth?: string;
    place_of_birth?: string;
    gender?: "male" | "female" | "other";
    civil_status?: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality?: string;
    religion?: string;
    occupation?: string;
    employer?: string;
    employer_address?: string;
    employer_phone?: string;
    employer_email?: string;
    contact_number?: string;
    email?: string;
    address?: {
        present_address?: string;
        permanent_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    is_beneficiary: boolean;
    is_dependent: boolean;
    is_emergency_contact: boolean;
    emergency_contact_priority?: number;
    health_conditions?: string;
    allergies?: string;
    medications?: string;
    special_needs?: string;
    education_level?:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name?: string;
    school_address?: string;
    course_degree?: string;
    family_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateFamilyRequest {
    family_ID: string;
    family_member_type?:
        | "spouse"
        | "child"
        | "parent"
        | "sibling"
        | "dependent"
        | "other";
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    maiden_name?: string;
    relationship?: string;
    date_of_birth?: string;
    place_of_birth?: string;
    gender?: "male" | "female" | "other";
    civil_status?: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality?: string;
    religion?: string;
    occupation?: string;
    employer?: string;
    employer_address?: string;
    employer_phone?: string;
    employer_email?: string;
    contact_number?: string;
    email?: string;
    address?: {
        present_address?: string;
        permanent_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    is_beneficiary?: boolean;
    is_dependent?: boolean;
    is_emergency_contact?: boolean;
    emergency_contact_priority?: number;
    health_conditions?: string;
    allergies?: string;
    medications?: string;
    special_needs?: string;
    education_level?:
        | "elementary"
        | "high_school"
        | "vocational"
        | "bachelor"
        | "master"
        | "doctorate"
        | "post_graduate"
        | "other";
    school_name?: string;
    school_address?: string;
    course_degree?: string;
    family_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewFamilyRequest {
    employee_ID: string;
    family_member_type?:
        | "spouse"
        | "child"
        | "parent"
        | "sibling"
        | "dependent"
        | "other";
    relationship?: string;
    is_beneficiary?: boolean;
    is_dependent?: boolean;
    is_emergency_contact?: boolean;
    family_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface GetFamilyRequest {
    family_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    family_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific family service methods
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

    // List family members
    const listFamily = async (filters: ViewFamilyRequest) => {
        return generalAction({
            queryParameters: "/list",
            method: "POST",
            body: filters,
        });
    };

    // Create family member
    const createFamily = async (familyData: CreateFamilyRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: familyData,
        });
    };

    // Edit family member
    const updateFamily = async (familyData: UpdateFamilyRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: familyData,
        });
    };

    // Get specific family member
    const getFamily = async (familyData: GetFamilyRequest) => {
        return generalAction({
            queryParameters: "/get",
            method: "POST",
            body: familyData,
        });
    };

    // View family members with filters
    const viewFamily = async (filters: ViewFamilyRequest) => {
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
        listFamily,
        createFamily,
        updateFamily,
        getFamily,
        viewFamily,
        batchUpdateStatus,
    };
};

import {
    useFetchBasicInfoQuery,
    useActionBasicInfoMutation,
} from "./basicInfoAPI";

export const useBasicInfo = ({
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
        useFetchBasicInfoQuery(
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
    ] = useActionBasicInfoMutation();

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

// Basic Info-specific interfaces based on API documentation
export interface BasicInfoData {
    basic_info_ID?: string;
    employee_ID?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    maiden_name?: string;
    nickname?: string;
    date_of_birth: string;
    place_of_birth?: string;
    gender: "male" | "female" | "other";
    civil_status: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality: string;
    religion?: string;
    blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    height?: number;
    weight?: number;
    email: string;
    phone_number?: string;
    mobile_number?: string;
    emergency_contact?: {
        name: string;
        relationship: string;
        phone: string;
        email?: string;
        address?: string;
    };
    address?: {
        present_address: string;
        permanent_address?: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        pagibig_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    basic_info_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateBasicInfoRequest {
    employee_ID: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    maiden_name?: string;
    nickname?: string;
    date_of_birth: string;
    place_of_birth?: string;
    gender: "male" | "female" | "other";
    civil_status: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality: string;
    religion?: string;
    blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    height?: number;
    weight?: number;
    email: string;
    phone_number?: string;
    mobile_number?: string;
    emergency_contact?: {
        name: string;
        relationship: string;
        phone: string;
        email?: string;
        address?: string;
    };
    address?: {
        present_address: string;
        permanent_address?: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        pagibig_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    basic_info_status: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface UpdateBasicInfoRequest {
    basic_info_ID: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    maiden_name?: string;
    nickname?: string;
    date_of_birth?: string;
    place_of_birth?: string;
    gender?: "male" | "female" | "other";
    civil_status?: "single" | "married" | "divorced" | "widowed" | "separated";
    nationality?: string;
    religion?: string;
    blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    height?: number;
    weight?: number;
    email?: string;
    phone_number?: string;
    mobile_number?: string;
    emergency_contact?: {
        name: string;
        relationship: string;
        phone: string;
        email?: string;
        address?: string;
    };
    address?: {
        present_address: string;
        permanent_address?: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    government_ids?: {
        sss_number?: string;
        tin_number?: string;
        philhealth_number?: string;
        pagibig_number?: string;
        passport_number?: string;
        driver_license_number?: string;
    };
    basic_info_status?: "active" | "pending" | "inactive" | "suspended";
    is_archived?: number;
}

export interface ViewBasicInfoRequest {
    employee_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    basic_info_status: "active" | "pending" | "inactive" | "suspended";
}

// Specific basic info service methods
export const useBasicInfoService = () => {
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
    ] = useActionBasicInfoMutation();

    // View Basic Info
    const viewBasicInfo = async (basicInfoData: ViewBasicInfoRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: basicInfoData,
        });
    };

    // Create Basic Info
    const createBasicInfo = async (basicInfoData: CreateBasicInfoRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "POST",
            body: basicInfoData,
        });
    };

    // Edit Basic Info
    const updateBasicInfo = async (basicInfoData: UpdateBasicInfoRequest) => {
        return generalAction({
            queryParameters: "/",
            method: "PUT",
            body: basicInfoData,
        });
    };

    // Get Basic Info by Employee ID
    const getBasicInfo = async (basicInfoData: ViewBasicInfoRequest) => {
        return generalAction({
            queryParameters: "/get",
            method: "POST",
            body: basicInfoData,
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
        viewBasicInfo,
        createBasicInfo,
        updateBasicInfo,
        getBasicInfo,
        batchUpdateStatus,
    };
};

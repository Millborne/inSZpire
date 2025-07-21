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
    employee_ID?: string;
    employee_number?: string;
    old_employee_number?: string;
    profile_ID?: string;
    position_ID?: string;
    team_ID?: string;
    employment_status?: string;
    employee_status_ID?: string;
    employee_status?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    profile_image?: string;
    gender?: "male" | "female" | "other";
    pronoun?: string;
    date_of_birth?: string;
    marital_status?: string;
    birth_address?: string;
    blood_type?: string;
    mobile_number?: string;
    personal_email?: string;
    religion?: string;
    religion_ID?: string;
    educational_attainment?: string;
    work_email?: string;
    sched_type?: string;
    hire_date?: string;
    has_atm?: number;
    salary_frequency?: string;
    is_agency?: number;
    is_confidential?: number;
    is_leave_earned?: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire?: number;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
    permanent_address?: string | null;
    present_address?: string | null;
    position_code?: string;
    position_name?: string;
    team_code?: string;
    team_name?: string;
    type_name?: string;
    setup_name?: string;
    job_code?: string;
    job_title?: string;
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
    employee_ID?: string;
    employee?: {
        employee_ID: string;
        employee_number: string;
        old_employee_number: string | null;
        profile_ID: string;
        current_position_ID: string;
        status_ID: string;
        work_email: string;
        employee_status_ID: string;
        position_status_ID: string;
        sched_type: "flexible" | "fixed" | string;
        hire_date?: string; // ISO 8601 date
        has_atm: 0 | 1;
        salary_frequency: "monthly" | "bi-weekly" | string;
        is_agency: 0 | 1;
        is_confidential: 0 | 1;
        is_leave_earned: 0 | 1;
        e_sig_url: string;
        qr_code_url: string;
        separation_date: string | null;
        reason_for_leaving: string | null;
        not_for_rehire: 0 | 1;
        is_archived: 0 | 1;
        created_at: string;
        updated_at: string;
    };
    profile?: {
        profile_ID?: string;
        user_ID?: string;
        first_name: string;
        last_name: string;
        middle_name?: string | null;
        name_ext?: string | null;
        preferred_name?: string | null;
        profile_image?: string;
        gender?: "male" | "female" | "other" | string;
        pronoun?: string;
        date_of_birth?: string;
        birth_address?: string;
        marital_status?: "single" | "married" | "divorced" | string;
        religion_ID?: string;
        blood_type?:
            | "a+"
            | "a-"
            | "b+"
            | "b-"
            | "ab+"
            | "ab-"
            | "o+"
            | "o-"
            | string;
        telephone_number?: string;
        mobile_number?: string;
        personal_email?: string;
        educational_attainment_ID?: string;
        created_at?: string;
        updated_at?: string;
    };
    addresses: {
        address_ID?: string;
        address_line_1?: string;
        address_line_2?: string | null;
        country_ID?: number;
        region_state_ID?: number;
        province_ID?: number;
        city_municipality_ID?: number;
        barangay_ID?: number;
        postal_code?: string;
        service_identifier?: "home" | "work" | string;
        address_type_ID?: number;
        record_ID?: string;
        entity?: "profile" | "employee" | string;
        is_archived?: 0 | 1;
        created_at?: string;
        updated_at?: string;
    }[];
}

export interface ViewBasicInfoRequest {
    employee_ID: string;
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    basic_info_status: "active" | "pending" | "inactive" | "suspended";
}

export interface GetByIdViewRequest {
    employeeId: string;
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
            queryParameters: "/update",
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

    // Get comprehensive employee data using view
    const getByIdView = async (requestData: GetByIdViewRequest) => {
        return generalAction({
            queryParameters: "/get-by-id-view",
            method: "POST",
            body: requestData,
        });
    };

    // Get employee data
    const getById = async (requestData: GetByIdViewRequest) => {
        return generalAction({
            queryParameters: "/get-by-id",
            method: "POST",
            body: requestData,
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
        getByIdView,
        getById,
    };
};

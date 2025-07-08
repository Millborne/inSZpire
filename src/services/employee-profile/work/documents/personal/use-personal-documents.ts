import {
    useFetchPersonalDocumentsQuery,
    useActionPersonalDocumentsMutation,
} from "./personalDocumentsAPI";

export const usePersonalDocuments = ({
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
        useFetchPersonalDocumentsQuery(
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
    ] = useActionPersonalDocumentsMutation();

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

// Personal Documents-specific interfaces
export interface PersonalDocumentData {
    pd_ID?: string;
    emp_ID: string;
    pd_type: string;
    pd_name: string;
    pd_description?: string;
    pd_file_path: string;
    pd_file_size?: number;
    pd_file_type?: string;
    pd_upload_date: string;
    pd_expiry_date?: string;
    pd_status: "active" | "pending" | "expired" | "inactive";
    pd_notes?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
    // Related data
    employee?: {
        emp_ID: string;
        emp_first_name: string;
        emp_last_name: string;
        emp_middle_name?: string;
        emp_email: string;
    };
}

export interface UploadDocumentRequest {
    emp_ID: string;
    pd_type: string;
    pd_name: string;
    pd_description?: string;
    pd_file: File;
    pd_expiry_date?: string;
    pd_notes?: string;
    pd_status?: "active" | "pending" | "expired" | "inactive";
}

export interface ViewDocumentRequest {
    emp_ID?: string;
    pd_type?: string;
    pd_status?: "active" | "pending" | "expired" | "inactive";
    search?: string;
    is_archived?: number;
    offset?: number;
    limit?: number;
}

export interface PersonalDocumentDetailsRequest {
    pd_ID: string;
}

export interface UpdateDocumentRequest {
    pd_ID: string;
    pd_type?: string;
    pd_name?: string;
    pd_description?: string;
    pd_file?: File;
    pd_expiry_date?: string;
    pd_notes?: string;
    pd_status?: "active" | "pending" | "expired" | "inactive";
}

export interface BatchUpdateStatusRequest {
    req_IDs: string[];
    pd_status: "active" | "pending" | "expired" | "inactive";
}

// Specific personal documents service methods
export const usePersonalDocumentsService = () => {
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
    ] = useActionPersonalDocumentsMutation();

    const uploadDocument = async (request: UploadDocumentRequest) => {
        const formData = new FormData();
        formData.append("emp_ID", request.emp_ID);
        formData.append("pd_type", request.pd_type);
        formData.append("pd_name", request.pd_name);
        if (request.pd_description) {
            formData.append("pd_description", request.pd_description);
        }
        formData.append("pd_file", request.pd_file);
        if (request.pd_expiry_date) {
            formData.append("pd_expiry_date", request.pd_expiry_date);
        }
        if (request.pd_notes) {
            formData.append("pd_notes", request.pd_notes);
        }
        if (request.pd_status) {
            formData.append("pd_status", request.pd_status);
        }

        return generalAction({
            queryParameters: "/upload",
            method: "POST",
            body: formData,
        });
    };

    const viewDocument = async (filters: ViewDocumentRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const viewDocumentDetails = async (
        request: PersonalDocumentDetailsRequest
    ) => {
        return generalAction({
            queryParameters: `/details/${request.pd_ID}`,
            method: "GET",
        });
    };

    const updateDocument = async (request: UpdateDocumentRequest) => {
        const formData = new FormData();
        formData.append("pd_ID", request.pd_ID);
        if (request.pd_type) {
            formData.append("pd_type", request.pd_type);
        }
        if (request.pd_name) {
            formData.append("pd_name", request.pd_name);
        }
        if (request.pd_description) {
            formData.append("pd_description", request.pd_description);
        }
        if (request.pd_file) {
            formData.append("pd_file", request.pd_file);
        }
        if (request.pd_expiry_date) {
            formData.append("pd_expiry_date", request.pd_expiry_date);
        }
        if (request.pd_notes) {
            formData.append("pd_notes", request.pd_notes);
        }
        if (request.pd_status) {
            formData.append("pd_status", request.pd_status);
        }

        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: formData,
        });
    };

    const viewDocumentsByEmployee = async (emp_ID: string) => {
        return generalAction({
            queryParameters: `/employee/${emp_ID}`,
            method: "GET",
        });
    };

    const viewDocumentsByType = async (pd_type: string) => {
        return generalAction({
            queryParameters: `/type/${pd_type}`,
            method: "GET",
        });
    };

    const batchUpdateStatus = async (request: BatchUpdateStatusRequest) => {
        return generalAction({
            queryParameters: "/batch-update-status",
            method: "PUT",
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
        uploadDocument,
        viewDocument,
        viewDocumentDetails,
        updateDocument,
        viewDocumentsByEmployee,
        viewDocumentsByType,
        batchUpdateStatus,
    };
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../../utils/rtkQueryAuth";

const { VITE_DOCUMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

interface DeleteDocumentByEmployeeProps {
    document_ID: string;
    profile_ID: string;
    doc_type_ID: string;
}

export const personalDocumentsAPI = createApi({
    reducerPath: "personalDocuments",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_DOCUMENT_SERVICE,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["personalDocuments"],
    endpoints: (builder) => ({
        fetchPersonalDocuments: builder.query({
            query: (data: generalProps) =>
                `api/v1/documents${data.queryParameters}`,
        }),
        actionPersonalDocuments: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/documents/${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
        fetchDocumentByType: builder.mutation({
            query: ({
                employee_ID,
                doc_type_ID,
            }: {
                employee_ID: string;
                doc_type_ID: string;
            }) => ({
                url: `/api/v1/documents/fetch`,
                method: "POST",
                body: {
                    employee_ID,
                    doc_type_ID,
                    is_archived: 0,
                    limit: 1,
                    sort_by: "created_at",
                    sort_order: "DESC",
                },
            }),
        }),
        deleteDocumentByEmployee: builder.mutation({
            query: (data: DeleteDocumentByEmployeeProps) => ({
                url: `/api/v1/documents/employee/document`,
                method: "DELETE",
                body: {
                    document_ID: data.document_ID,
                    profile_ID: data.profile_ID,
                    doc_type_ID: data.doc_type_ID,
                },
            }),
        }),
    }),
});

export const {
    useFetchPersonalDocumentsQuery,
    useActionPersonalDocumentsMutation,
    useFetchDocumentByTypeMutation,
    useDeleteDocumentByEmployeeMutation,
} = personalDocumentsAPI;

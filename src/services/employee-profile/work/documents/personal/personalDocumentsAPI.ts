import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_DOCUMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const personalDocumentsAPI = createApi({
    reducerPath: "personalDocuments",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_DOCUMENT_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["personalDocuments"],
    endpoints: (builder) => ({
        fetchPersonalDocuments: builder.query({
            query: (data: generalProps) => `api/v1/documents${data.queryParameters}`,
        }),
        actionPersonalDocuments: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/documents/${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
        fetchDocumentByType: builder.mutation({
            query: ({ employee_ID, doc_type_ID }: { employee_ID: string; doc_type_ID: string }) => ({
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
    }),
});

export const { useFetchPersonalDocumentsQuery, useActionPersonalDocumentsMutation, useFetchDocumentByTypeMutation } = personalDocumentsAPI;

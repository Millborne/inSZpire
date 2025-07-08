import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_APP_CLIENT_ENDPOINT } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const personalDocumentsAPI = createApi({
    reducerPath: "personalDocuments",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_APP_CLIENT_ENDPOINT,
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
            query: (data: generalProps) =>
                `api/personal-documents${data.queryParameters}`,
        }),
        actionPersonalDocuments: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/personal-documents${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchPersonalDocumentsQuery,
    useActionPersonalDocumentsMutation,
} = personalDocumentsAPI;

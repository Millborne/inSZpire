import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_CLIENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const accountsAPI = createApi({
    reducerPath: "accounts",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_CLIENT_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["accounts"],
    endpoints: (builder) => ({
        fetchAccounts: builder.query({
            query: (data: generalProps) =>
                `api/accounts${data.queryParameters}`,
        }),
        actionAccounts: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/accounts${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchAccountsQuery, useActionAccountsMutation } = accountsAPI;

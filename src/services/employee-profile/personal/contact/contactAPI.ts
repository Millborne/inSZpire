import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_IDENTITY_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const contactAPI = createApi({
    reducerPath: "contact",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_IDENTITY_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["contact"],
    endpoints: (builder) => ({
        fetchContact: builder.query({
            query: (data: generalProps) =>
                `api/personal/contact${data.queryParameters}`,
        }),
        actionContact: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/personal/contact${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchContactQuery, useActionContactMutation } = contactAPI;

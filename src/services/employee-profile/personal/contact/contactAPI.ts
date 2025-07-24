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
        baseUrl: VITE_IDENTITY_SERVICE || "http://localhost:4173",
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
                `/api/v1/family${data.queryParameters}`,
        }),
        actionContact: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/family${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchContactQuery, useActionContactMutation } = contactAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const idsAPI = createApi({
    reducerPath: "ids",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["ids"],
    endpoints: (builder) => ({
        fetchIds: builder.query({
            query: (data: generalProps) =>
                `api/personal/ids${data.queryParameters}`,
        }),
        actionIds: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/personal/ids${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchIdsQuery, useActionIdsMutation } = idsAPI;
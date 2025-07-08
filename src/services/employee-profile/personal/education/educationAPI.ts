import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_APP_CLIENT_ENDPOINT } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const educationAPI = createApi({
    reducerPath: "education",
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
    tagTypes: ["education"],
    endpoints: (builder) => ({
        fetchEducation: builder.query({
            query: (data: generalProps) =>
                `api/personal/education${data.queryParameters}`,
        }),
        actionEducation: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/personal/education${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchEducationQuery, useActionEducationMutation } =
    educationAPI;

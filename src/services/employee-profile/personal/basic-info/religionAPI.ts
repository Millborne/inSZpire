import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const religionAPI = createApi({
    reducerPath: "religion",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE || "http://localhost:8000",
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["religion"],
    endpoints: (builder) => ({
        fetchReligion: builder.query({
            query: (data: generalProps) =>
                `/api/v1/religion${data.queryParameters}`,
        }),
        actionReligion: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/religion${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchReligionQuery, useActionReligionMutation } = religionAPI;

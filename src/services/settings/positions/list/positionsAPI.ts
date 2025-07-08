import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_APP_CLIENT_ENDPOINT } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const positionsAPI = createApi({
    reducerPath: "positions",
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
    tagTypes: ["positions"],
    endpoints: (builder) => ({
        fetchPositions: builder.query({
            query: (data: generalProps) =>
                `api/positions${data.queryParameters}`,
        }),
        actionPositions: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/positions${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchPositionsQuery, useActionPositionsMutation } =
    positionsAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const positionsAPI = createApi({
    reducerPath: "positions",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4172/api/v1",
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
                `/position${data.queryParameters}`,
        }),
        actionPositions: builder.mutation({
            query: (data: generalProps) => ({
                url: `/position${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchPositionsQuery, useActionPositionsMutation } =
    positionsAPI;

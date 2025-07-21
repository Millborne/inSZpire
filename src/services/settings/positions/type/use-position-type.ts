import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const positionTypeAPI = createApi({
    reducerPath: "positionType",
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
    tagTypes: ["positionType"],
    endpoints: (builder) => ({
        fetchPositionTypes: builder.query({
            query: (data: generalProps) =>
                `/position-type${data.queryParameters}`,
        }),
        actionPositionTypes: builder.mutation({
            query: (data: generalProps) => ({
                url: `/position-type${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchPositionTypesQuery, useActionPositionTypesMutation } =
    positionTypeAPI;

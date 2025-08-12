import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000/api/v1";

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const positionStatusAPI = createApi({
    reducerPath: "positionStatus",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["positionStatus"],
    endpoints: (builder) => ({
        fetchPositionStatuses: builder.query({
            query: (data: generalProps) =>
                `/employee${data.queryParameters}`,
        }),
        actionPositionStatuses: builder.mutation({
            query: (data: generalProps) => ({
                url: `/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchPositionStatusesQuery, useActionPositionStatusesMutation } =
    positionStatusAPI;

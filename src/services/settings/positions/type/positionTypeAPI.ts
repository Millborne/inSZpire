import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const positionTypeAPI = createApi({
    reducerPath: "positionType",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
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
                `/api/v1/position-type${data.queryParameters}`,
        }),
        actionPositionTypes: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/position-type${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchPositionTypesQuery, useActionPositionTypesMutation } =
    positionTypeAPI;
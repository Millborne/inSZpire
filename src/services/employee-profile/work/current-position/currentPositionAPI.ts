import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const currentPositionAPI = createApi({
    reducerPath: "currentPosition",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE || "http://localhost:3000/api/v1",
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["currentPosition"],
    endpoints: (builder) => ({
        fetchCurrentPosition: builder.query({
            query: (data: generalProps) =>
                `/api/v1/employee${data.queryParameters}`,
        }),
        actionCurrentPosition: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchCurrentPositionQuery,
    useActionCurrentPositionMutation,
} = currentPositionAPI;

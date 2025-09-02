import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

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
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["positionStatus"],
    endpoints: (builder) => ({
        fetchPositionStatuses: builder.query({
            query: (data: generalProps) => `/employee${data.queryParameters}`,
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

export const {
    useFetchPositionStatusesQuery,
    useActionPositionStatusesMutation,
} = positionStatusAPI;

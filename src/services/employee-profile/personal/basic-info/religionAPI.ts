import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_IDENTITY_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const religionAPI = createApi({
    reducerPath: "religion",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_IDENTITY_SERVICE || "http://localhost:8000",
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
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

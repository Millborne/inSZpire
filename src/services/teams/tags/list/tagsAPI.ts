import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const tagsAPI = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["tags"],
    endpoints: (builder) => ({
        fetchTags: builder.query({
            query: (data: generalProps) => `/api/v1${data.queryParameters}`,
        }),

        actionTags: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1${data.queryParameters}`,
                method: data.method || "POST",
                body: data.body ?? undefined,
            }),
        }),

        // ✅ Add this mutation so you can use useViewTagsMutation
        viewTags: builder.mutation({
            query: (body: any) => ({
                url: `/api/v1/tags/view`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useFetchTagsQuery,
    useActionTagsMutation,
    useViewTagsMutation, // ✅ Now valid
} = tagsAPI;

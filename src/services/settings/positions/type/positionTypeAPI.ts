import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

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
            return prepareSharedAuthHeaders(headers);
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const workSetupAPI = createApi({
    reducerPath: "workSetup",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["workSetup"],
    endpoints: (builder) => ({
        fetchWorkSetups: builder.query({
            query: (data: generalProps) =>
                `/api/v1/work-setup${data.queryParameters}`,
        }),
        actionWorkSetups: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/work-setup${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchWorkSetupsQuery, useActionWorkSetupsMutation } =
    workSetupAPI;

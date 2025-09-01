import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../../../utils/rtkQueryAuth";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const employeeSupervisionAPI = createApi({
    reducerPath: "employeeSupervision",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
        prepareHeaders: (headers) => {
            return prepareSharedAuthHeaders(headers);
        },
    }),
    tagTypes: ["employeeSupervision"],
    endpoints: (builder) => ({
        fetchEmployeeSupervision: builder.query({
            query: (data: generalProps) =>
                `/api/v1/position${data.queryParameters}`,
        }),
        actionEmployeeSupervision: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/position${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchEmployeeSupervisionQuery,
    useActionEmployeeSupervisionMutation,
} = employeeSupervisionAPI;

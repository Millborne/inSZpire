import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const workSetupAPI = createApi({
    reducerPath: "workSetup",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
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
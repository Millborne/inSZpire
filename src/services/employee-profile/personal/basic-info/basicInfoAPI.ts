import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_EMPLOYMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const basicInfoAPI = createApi({
    reducerPath: "basicInfo",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_EMPLOYMENT_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["basicInfo"],
    endpoints: (builder) => ({
        fetchBasicInfo: builder.query({
            query: (data: generalProps) =>
                `/api/v1/employee${data.queryParameters}`,
        }),
        actionBasicInfo: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/employee${data.queryParameters}`,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const { useFetchBasicInfoQuery, useActionBasicInfoMutation } =
    basicInfoAPI;

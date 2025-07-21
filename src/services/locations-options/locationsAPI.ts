import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_GEOLOCATION_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const locationsAPI = createApi({
    reducerPath: "locations",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_GEOLOCATION_SERVICE || "http://localhost:3000",
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["locations"],
    endpoints: (builder) => ({
        fetchCountries: builder.query({
            query: (data: generalProps) =>
                `/api/countries/view${data.queryParameters}`,
        }),
        // fetchRegionStates: builder.query({
        //     query: (data: generalProps) =>
        //         `/api/region-states/view${data.queryParameters}`,
        // }),
        // fetchProvinces: builder.query({
        //     query: (data: generalProps) =>
        //         `/api/provinces/list${data.queryParameters}`,
        // }),
        // fetchMunicipalities: builder.query({
        //     query: (data: generalProps) =>
        //         `/api/municipalities/list${data.queryParameters}`,
        // }),
        // fetchBarangays: builder.query({
        //     query: (data: generalProps) =>
        //         `/api/barangays/list${data.queryParameters}`,
        // }),
        actionLocations: builder.mutation({
            query: (data: generalProps) => ({
                url: data.queryParameters,
                method: data.method,
                body: data.body ?? undefined,
            }),
        }),
    }),
});

export const {
    useFetchCountriesQuery,
    // useFetchRegionStatesQuery,
    // useFetchProvincesQuery,
    // useFetchMunicipalitiesQuery,
    // useFetchBarangaysQuery,
    useActionLocationsMutation,
} = locationsAPI;

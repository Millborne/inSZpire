import {
    useFetchCountriesQuery,
    // useFetchRegionStatesQuery,
    // useFetchProvincesQuery,
    // useFetchMunicipalitiesQuery,
    // useFetchBarangaysQuery,
    useActionLocationsMutation,
} from "./locationsAPI";

// General hook for all location queries
export const useLocations = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    // fetch
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchCountriesQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    // action
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionLocationsMutation();

    return {
        // fetching
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,

        // mutation
        generalAction,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
};

// Location-specific interfaces based on API documentation
export interface Country {
    country_ID: number;
    country_code: string;
    country_name: string;
}

export interface RegionState {
    region_state_ID: number;
    region_name: string;
    country_ID: number;
}

export interface Province {
    province_ID: number;
    province_name: string;
    region_ID: number;
}

export interface Municipality {
    city_municipality_ID: number;
    city_municipality_name: string;
    province_ID: number;
    region_ID: number;
}

export interface Barangay {
    barangay_ID: number;
    barangay_name: string;
    city_municipality_ID: number;
}

// Request interfaces for API calls
export interface CountriesRequest {
    search?: string;
    page?: number;
    limit?: number;
    is_archived?: boolean;
    sortBy?: "country_name" | "country_code";
    sortOrder?: "ASC" | "DESC";
}

export interface RegionStatesRequest {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: "region_name" | "country_ID";
    sortOrder?: "ASC" | "DESC";
}

export interface ProvincesRequest {
    region_ID?: number;
    province_ID?: number;
    search?: string;
    offset?: number;
    limit?: number;
}

export interface MunicipalitiesRequest {
    province_ID?: number;
    city_municipality_ID?: number;
    region_ID?: number;
    search?: string;
    offset?: number;
    limit?: number;
}

export interface BarangaysRequest {
    city_municipality_ID?: number;
    barangay_ID?: number;
    search?: string;
    offset?: number;
    limit?: number;
}

// Response interfaces
export interface CountriesResponse {
    message: string;
    data: Country[];
    total: number;
}

export interface RegionStatesResponse {
    message: string;
    data: RegionState[];
    total: number;
}

export interface ProvincesResponse {
    status: string;
    data: Province[];
    total: number;
    offset: number;
    limit: number;
}

export interface MunicipalitiesResponse {
    status: string;
    data: Municipality[];
    total: number;
    offset: number;
    limit: number;
}

export interface BarangaysResponse {
    status: string;
    data: Barangay[];
    total: number;
    offset: number;
    limit: number;
}

// Specific location service methods
export const useLocationsService = () => {
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionLocationsMutation();

    const getCountries = async (filters: CountriesRequest) => {
        return generalAction({
            queryParameters: "/api/countries/view",
            method: "POST",
            body: filters,
        });
    };

    const getRegionStates = async (filters: RegionStatesRequest) => {
        return generalAction({
            queryParameters: "/api/region-states/view",
            method: "POST",
            body: filters,
        });
    };

    const getProvinces = async (filters: ProvincesRequest) => {
        return generalAction({
            queryParameters: "/api/v1/province/list",
            method: "POST",
            body: filters,
        });
    };

    const getMunicipalities = async (filters: MunicipalitiesRequest) => {
        return generalAction({
            queryParameters: "/api/v1/municipality/list",
            method: "POST",
            body: filters,
        });
    };

    const getBarangays = async (filters: BarangaysRequest) => {
        return generalAction({
            queryParameters: "/api/v1/barangay/list",
            method: "POST",
            body: filters,
        });
    };

    return {
        // mutation
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,

        // methods
        getCountries,
        getRegionStates,
        getProvinces,
        getMunicipalities,
        getBarangays,
    };
};
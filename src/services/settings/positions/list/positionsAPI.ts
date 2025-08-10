import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;

// ✅ Fallback to dev API if env var is missing or empty
const BASE_URL =
  (VITE_TEAM_AND_POSITION_SERVICE || "").trim() ||
  "https://erp-team-and-position-api-dev.supportzebra.net";

// === Types for the dropdown transform ===
type PositionRow = {
  position_ID: string;
  position_name: string;
  position_status: string | null;
};

type GetPositionsResponse = {
  positions: PositionRow[];
  total: number;
};

interface GeneralProps {
  queryParameters: string;
  method?: string;
  body?: any;
}

export const positionsAPI = createApi({
  reducerPath: "positions",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["positions"],
  endpoints: (builder) => ({
    fetchPositions: builder.query<any, GeneralProps>({
      query: (data) => `/api/v1/position${data.queryParameters}`,
    }),

    actionPositions: builder.mutation<any, GeneralProps>({
      query: (data) => ({
        url: `/api/v1/position${data.queryParameters}`,
        method: data.method,
        body: data.body ?? undefined,
      }),
    }),

    getPositions: builder.query<
      {
        positionOptions: { value: string; label: string }[];
        statusOptions: { value: string; label: string }[];
      },
      Record<string, any> | void
    >({
      query: (body = {}) => ({
        url: "/api/v1/position/getPositions",
        method: "POST",
        body,
      }),
      transformResponse: (resp: GetPositionsResponse) => {
        const positionOptions =
          (resp.positions ?? []).map((p) => ({
            value: p.position_ID,
            label: p.position_name,
          })) ?? [];

        const uniqueStatuses = Array.from(
          new Set(
            (resp.positions ?? [])
              .map((p) => p.position_status)
              .filter(Boolean) as string[]
          )
        );

        const statusOptions = uniqueStatuses.map((s) => ({
          value: s,
          label: s,
        }));

        return { positionOptions, statusOptions };
      },
      providesTags: ["positions"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useFetchPositionsQuery,
  useActionPositionsMutation,
  useGetPositionsQuery,
  useLazyGetPositionsQuery,
} = positionsAPI;




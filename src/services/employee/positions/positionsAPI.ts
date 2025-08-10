import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL = "http://localhost:4172"; // or your ENV if you prefer

type PositionRow = {
  position_ID: string;
  position_name: string;
  position_status: string | null;
};

type GetPositionsResponse = {
  positions: PositionRow[];
  total: number;
};

export const positionsAPI = createApi({
  reducerPath: "positions",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["positions"],
  endpoints: (builder) => ({
    fetchPositions: builder.query({
      query: (data: { queryParameters: string }) =>
        `/api/v1/position${data.queryParameters}`,
    }),

    actionPositions: builder.mutation({
      query: (data: { queryParameters: string; method?: string; body?: any }) => ({
        url: `/api/v1/position${data.queryParameters}`,
        method: data.method ?? "POST",
        body: data.body ?? undefined,
      }),
    }),

    // ✅ Read operation -> query (POST) for caching/auto-refetch
    getPositions: builder.query<
      { positionOptions: { value: string; label: string }[]; statusOptions: { value: string; label: string }[] },
      Record<string, any> | void
    >({
      query: (body = {}) => ({
        url: "/api/v1/position/getPositions",
        method: "POST",
        body,
      }),
      transformResponse: (resp: GetPositionsResponse) => {
        const positionOptions = (resp.positions ?? []).map((p) => ({
          value: p.position_ID,
          label: p.position_name,
        }));

        const uniqueStatuses = Array.from(
          new Set(
            (resp.positions ?? [])
              .map((p) => p.position_status)
              .filter(Boolean) as string[]
          )
        );

        const statusOptions = uniqueStatuses.map((s) => ({ value: s, label: s }));
        return { positionOptions, statusOptions };
      },
      providesTags: ["positions"],
    }),
  }),
});

export const {
  useFetchPositionsQuery,
  useActionPositionsMutation,
  useGetPositionsQuery,
} = positionsAPI;



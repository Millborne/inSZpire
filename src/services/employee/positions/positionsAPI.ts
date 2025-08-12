import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
// Types for position API
export interface PositionData {
  position_ID: string;
  position_code: string;
  position_name: string;
  position_description?: string;
  is_active?: boolean;
  reports_to_position_ID?: string;
  team_level?: number;
  job_title?: string;
  job_code?: string;
  team_ID?: string;
  team_name?: string;
  team_code?: string;
  position_type?: string;
  work_setup?: string;
  company_ID?: string;
  company_name?: string;
  site_ID?: string;
  site_name?: string;
  basic_salary?: string;
  is_approved?: number;
  is_archived?: number;
  position_status?: string;
}
 
export interface PositionResponse {
  positions: PositionData[];
  total?: number;
}
 
// Types for update position
export interface UpdatePositionRequest {
  position_ID: string;
  position_code?: string;
  position_name?: string;
  team_ID?: string;
  site_ID?: string;
  job_ID?: string;
  reports_to_position_ID?: string;
  position_type_ID?: string;
  work_setup_ID?: string;
  basic_salary?: number;
  is_approved?: number;
  is_archived?: number;
  updated_by?: string;
  node_reference?: number;
}
 
export interface UpdatePositionResponse {
  success: boolean;
  message: string;
  data?: any;
}
 
export const externalPositionsAPI = createApi({
  reducerPath: "externalPositions",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://erp-team-and-position-api-dev.supportzebra.net",
    prepareHeaders: (headers) => {
      console.log('🔧 Making external positions API call');
      return headers;
    },
  }),
  tagTypes: ["externalPositions"],
  endpoints: (builder) => ({
    // Fetch positions from external API
    fetchPositions: builder.query<PositionResponse, void>({
      query: () => {
        console.log('🔧 Calling fetchPositions with URL: https://erp-team-and-position-api-dev.supportzebra.net/api/v1/position/getPositions');
        return {
          url: "/api/v1/position/getPositions",
          method: "POST",
          body: {}, // Empty body for POST request
        };
      },
      providesTags: ["externalPositions"],
    }),
 
    // Update position
    updatePosition: builder.mutation<UpdatePositionResponse, UpdatePositionRequest>({
      query: (request) => {
        console.log('🔧 Calling updatePosition with URL: https://erp-team-and-position-api-dev.supportzebra.net/api/v1/position/updatePosition');
        console.log('🔧 Update request:', request);
        return {
          url: "/api/v1/position/updatePosition",
          method: "PUT",
          body: request,
        };
      },
      invalidatesTags: ["externalPositions"],
    }),
  }),
});
 
export const {
  useFetchPositionsQuery,
  useUpdatePositionMutation,
} = externalPositionsAPI;
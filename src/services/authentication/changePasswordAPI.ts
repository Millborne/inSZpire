import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareSharedAuthHeaders } from "../../utils/rtkQueryAuth";

// Use the same base URL as your employee API
const baseURL = import.meta.env.VITE_AUTHENTICATION_SERVICE || "http://localhost:3000/api";

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePasswordAPI = createApi({
  reducerPath: "changePassword",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      return prepareSharedAuthHeaders(headers);
    },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const { VITE_DOCUMENT_SERVICE } = import.meta.env;

interface generalProps {
    queryParameters: string;
    method?: string;
    body?: any;
}

export const profilePictureAPI = createApi({
    reducerPath: "profilePicture",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_DOCUMENT_SERVICE,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["profilePicture"],
    endpoints: (builder) => ({
        fetchProfilePicture: builder.query({
            query: (data: generalProps) => `api/v1/documents${data.queryParameters}`,
        }),
        uploadProfilePicture: builder.mutation({
            query: (data: generalProps) => ({
                url: `/api/v1/documents/profile-picture`,
                method: data.method,
                body: data.body,
            }),
        }),
        deleteProfilePicture: builder.mutation({
            query: ({ profile_ID }: { profile_ID: string }) => ({
                url: `/api/v1/documents/profile-picture/${profile_ID}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useFetchProfilePictureQuery, useUploadProfilePictureMutation, useDeleteProfilePictureMutation } = profilePictureAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { RootState } from "../../../../reducers/store";

const { VITE_IDENTITY_SERVICE } = import.meta.env;

// Education API interfaces based on documentation
export interface CreateEducationRequest {
    profile_ID?: string;
    education_level_ID: string;
    school_ID?: string;
    degree?: string;
    course?: string;
    year_started?: string | number;
    year_left?: string | number;
    honors_received?: string;
    user_type?: string;
}

export interface UpdateEducationRequest {
    educ_ID: string;
    profile_ID: string;
    education_level_ID?: string;
    school_ID?: string;
    degree?: string;
    course?: string;
    year_started?: string | number;
    year_left?: string | number;
    honors_received?: string;
}

export interface ListEducationRequest {
    profile_ID?: string;
    search?: string;
    offset?: number;
    limit?: number;
}

export interface DeleteEducationRequest {
    educ_ID: string;
    profile_ID: string;
    user_type: string;
}

// Education Levels API interfaces
export interface ViewEducationLevelsRequest {
    search?: string;
    is_archived?: 0 | 1;
    offset?: number;
    limit?: number;
}

export interface EducationLevelData {
    education_level_id: string;
    name: string;
    description?: string;
    is_archived?: number;
    created_at?: string;
    updated_at?: string;
}

export const educationAPI = createApi({
    reducerPath: "education",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_IDENTITY_SERVICE || "http://localhost:4172/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = Cookies.get("token");
            const state = getState() as RootState;
            const profileId = state.employeeState.selectedEmployee?.profile_ID;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            if (profileId) {
                headers.set("x-profile-id", profileId);
            }

            return headers;
        },
    }),
    tagTypes: ["education", "educationLevels"],
    endpoints: (builder) => ({
        // Create education record
        createEducation: builder.mutation<any, CreateEducationRequest>({
            query: (data) => ({
                url: "/api/education/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["education"],
        }),

        // Update education record
        updateEducation: builder.mutation<any, UpdateEducationRequest>({
            query: (data) => ({
                url: "/api/education/update",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["education"],
        }),

        // List education records
        listEducation: builder.query<any, ListEducationRequest>({
            query: (data) => ({
                url: "/api/education/list",
                method: "POST",
                body: data,
            }),
            providesTags: ["education"],
        }),

        // Delete education record
        deleteEducation: builder.mutation<any, DeleteEducationRequest>({
            query: (data) => ({
                url: "/api/education/delete",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["education"],
        }),

        // View education levels
        viewEducationLevels: builder.query<any, ViewEducationLevelsRequest>({
            query: (data) => ({
                url: "/api/education-level/view",
                method: "POST",
                body: data,
            }),
            providesTags: ["educationLevels"],
        }),
    }),
});

export const {
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useListEducationQuery,
    useDeleteEducationMutation,
    useViewEducationLevelsQuery,
} = educationAPI;

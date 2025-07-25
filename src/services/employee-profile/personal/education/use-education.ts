import {
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useListEducationQuery,
    useDeleteEducationMutation,
    useViewEducationLevelsQuery,
    type CreateEducationRequest,
    type UpdateEducationRequest,
    type ListEducationRequest,
    type DeleteEducationRequest,
    type ViewEducationLevelsRequest,
    type EducationLevelData,
} from "./educationAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers/store";

// Education data interface
export interface EducationData {
    educ_ID?: string;
    profile_ID?: string;
    education_level_ID: string;
    school_ID: string;
    degree?: string;
    course?: string;
    year_started?: string | number;
    year_left?: string | number;
    honors_received?: string;
    user_type?: string;
    created_at?: string;
    updated_at?: string;
}

// Re-export API interfaces for convenience
export type {
    CreateEducationRequest,
    UpdateEducationRequest,
    ListEducationRequest,
    DeleteEducationRequest,
    ViewEducationLevelsRequest,
    EducationLevelData,
};

// Main education hook that provides all education operations
export const useEducation = () => {
    const [createEducation, createEducationResult] =
        useCreateEducationMutation();
    const [updateEducation, updateEducationResult] =
        useUpdateEducationMutation();
    const [deleteEducation, deleteEducationResult] =
        useDeleteEducationMutation();

    return {
        // Create education record
        createEducation,
        createEducationResult,

        // Update education record
        updateEducation,
        updateEducationResult,

        // Delete education record
        deleteEducation,
        deleteEducationResult,
    };
};

// Hook for listing education records
export const useEducationList = (
    params: ListEducationRequest = {},
    options?: { skip?: boolean }
) => {
    // Get selected employee from Redux store
    const selectedEmployee = useSelector(
        (state: RootState) => state.employeeState.selectedEmployee
    );

    // Use profileId from employee state if not provided in params
    const queryParams = {
        ...params,
        profile_ID: params.profile_ID || selectedEmployee?.profile_ID,
    };

    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useListEducationQuery(queryParams, {
            skip: options?.skip || !queryParams.profile_ID,
        });

    return {
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};

// Hook for viewing education levels
export const useEducationLevels = (
    params: ViewEducationLevelsRequest = {},
    options?: { skip?: boolean }
) => {
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useViewEducationLevelsQuery(
            {
                limit: 100,
            },
            {
                skip: options?.skip || false,
            }
        );

    return {
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};

// Legacy hook for backward compatibility
export const useEducationService = () => {
    const [createEducation, createEducationResult] =
        useCreateEducationMutation();
    const [updateEducation, updateEducationResult] =
        useUpdateEducationMutation();
    const [deleteEducation, deleteEducationResult] =
        useDeleteEducationMutation();

    const listEducation = async (filters: ListEducationRequest) => {
        // This would need to be implemented differently since we're using RTK Query
        // For now, return a promise that resolves to the current data
        return Promise.resolve({ data: null });
    };

    const getEducation = async (educationData: { educ_ID: string }) => {
        // This would need to be implemented differently since we're using RTK Query
        return Promise.resolve({ data: null });
    };

    const viewEducation = async (filters: ListEducationRequest) => {
        // This would need to be implemented differently since we're using RTK Query
        return Promise.resolve({ data: null });
    };

    return {
        // mutation results
        actionData:
            createEducationResult.data ||
            updateEducationResult.data ||
            deleteEducationResult.data,
        actionIsError:
            createEducationResult.isError ||
            updateEducationResult.isError ||
            deleteEducationResult.isError,
        actionIsLoading:
            createEducationResult.isLoading ||
            updateEducationResult.isLoading ||
            deleteEducationResult.isLoading,
        actionIsSuccess:
            createEducationResult.isSuccess ||
            updateEducationResult.isSuccess ||
            deleteEducationResult.isSuccess,
        actionError:
            createEducationResult.error ||
            updateEducationResult.error ||
            deleteEducationResult.error,
        actionReset: () => {
            createEducationResult.reset();
            updateEducationResult.reset();
            deleteEducationResult.reset();
        },

        // methods
        listEducation,
        createEducation,
        updateEducation,
        getEducation,
        viewEducation,
        deleteEducation,
    };
};

// import { useEffect, useState } from "react";
import { useUploadProfilePictureMutation, useFetchProfilePictureQuery, useDeleteProfilePictureMutation } from "./profilePictureAPI";

type UploadProfilePictureArgs = {
    profile_image: File;
    profile_ID: string;
};

type DeleteProfilePictureArgs = {
    profile_ID: string;
};

export const useProfilePicture = (profile_ID: string) => {
    /* ---------- FETCH ONE ---------- */
    const {
        data: profileData,
        refetch: refetchProfile,
        isLoading: isLoadingProfile,
        error: profileError,
    } = useFetchProfilePictureQuery(
        {
            queryParameters: `/profile-picture/${profile_ID}`,
        },
        {
            skip: !profile_ID,
        }
    );

    /* ---------- POST ---------- */
    const [actionMutation, { isLoading: isUploading }] = useUploadProfilePictureMutation();

    const upload = async (args: UploadProfilePictureArgs) => {
        const formData = new FormData();
        formData.append("profile_image", args.profile_image);
        formData.append("profile_ID", args.profile_ID);

        try {
            await actionMutation({
                queryParameters: "",
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            throw error;
        }
    };

    /* ---------- DELETE ---------- */
    const [deleteMutation, { isLoading: isDeleting }] = useDeleteProfilePictureMutation();

    const deleteProfilePicture = async (args: DeleteProfilePictureArgs) => {
        try {
            await deleteMutation(args).unwrap();
            await refetchProfile();
        } catch (error) {
            console.error("Error deleting profile picture:", error);
            throw error;
        }
    };

    return {
        isUploading,
        isLoadingProfile,
        profileError,
        isDeleting,
        upload,
        deleteProfilePicture,
        profileData,
        refetchProfile,
    };
};

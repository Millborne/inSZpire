import React, { useState, useEffect } from "react";
import {
    ConfirmationContent,
    Dropdown,
    Inputs,
    Modal,
    Toggle,
    SnackbarAlert,
} from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { capitalizeFirst, formatDateForDisplay } from "../../../../utils";

// assets
import tagsConfirmation from "../../../../assets/tags_confirmation.png";
import archiveConfirmation from "../../../../assets/archive_confirmation.png";
import updateConfirmation from "../../../../assets/update_confirmation.png";

export interface TagsDataType {
    id: string;
    name: string;
    description?: string;
    type: string;
    is_archived?: number;
    updated_at?: string;
    created_at?: string;
}

export type ModalMode = "view" | "edit" | "add";

interface TagsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tags: TagsDataType[];
    mode: ModalMode;
    selectedTag?: TagsDataType | null;
    onSave?: (data: TagsDataType) => void;
    setModalMode?: (mode: ModalMode) => void;
}

interface ValidationErrors {
    name?: string;
    type?: string;
    description?: string;
}

const TagsModal: React.FC<TagsModalProps> = ({
    isOpen,
    onClose,
    mode,
    selectedTag,
    onSave,
    setModalMode,
}) => {
    const [formData, setFormData] = useState<TagsDataType>({
        id: "",
        name: "",
        description: "",
        type: "",
        updated_at: "",
        created_at: "",
    });
    const [toggle, setToggle] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);
    const [confirmationAction, setConfirmationAction] = useState<
        "update" | "add" | "archive"
    >("update");
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"error" | "success">(
        "error"
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedTag) {
            setFormData(selectedTag);
            setToggle(selectedTag?.is_archived === 1 ? true : false);
        } else {
            setFormData({
                id: "",
                name: "",
                description: "",
                type: "",
                updated_at: "",
                created_at: "",
            });
            setToggle(false);
        }
        // Clear errors when modal opens or data changes
        console.log("selectedTag", selectedTag);
        setErrors({});
    }, [selectedTag, isOpen]);

    // Handle input changes
    const handleInputChange = (field: keyof TagsDataType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[field as keyof ValidationErrors]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    // Validation function
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Tag name is required";
        }

        if (!formData.type?.trim()) {
            newErrors.type = "Tag type is required";
        }

        if (!formData.description?.trim()) {
            newErrors.description = "Tag description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Check if form has data (for add mode)
    const hasFormData = (): boolean => {
        return !!(
            formData.name?.trim() &&
            formData.type?.trim() &&
            formData.description?.trim()
        );
    };

    // Check if changes occurred (for edit mode)
    const hasChanges = (): boolean => {
        if (!selectedTag) return false;

        return !!(
            formData.name !== selectedTag.name ||
            formData.type !== selectedTag.type ||
            formData.description !== selectedTag.description ||
            toggle !== (selectedTag.is_archived === 1)
        );
    };

    const handleSave = async () => {
        setIsConfirmationModalOpen(false);
        setIsSubmitting(true);
        // Validate form before saving
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (onSave) {
                await onSave({ ...formData, is_archived: toggle ? 1 : 0 });
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error saving tag:", error);
            setIsSubmitting(false);
        }
    };

    const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
        // Always run validation to show errors, but only proceed if validation passes
        if (action !== "archive") {
            const isValid = validateForm();
            if (!isValid) {
                return; // Don't open confirmation modal if validation fails
            }
        }

        setConfirmationAction(action);
        setIsConfirmationModalOpen(true);
    };

    const getConfirmationProps = () => {
        const tagName = formData.name || "Tag";

        switch (confirmationAction) {
            case "add":
                return {
                    image: tagsConfirmation,
                    description: `Are you sure to add this tag?`,
                    buttonLabel: "Add Tag",
                };
            case "archive":
                return {
                    image: archiveConfirmation,
                    description: `Are you sure you want to archive this tag?`,
                    buttonLabel: "Archive",
                    buttonFooterIcon: <ArchiveBox />,
                };
            case "update":
            default:
                return {
                    image: updateConfirmation,
                    description: `Are you sure you want to update this tag?`,
                    buttonLabel: "Update Tag",
                };
        }
    };

    // Get confirmation content based on action
    const getConfirmationContent = () => {
        switch (confirmationAction) {
            case "add":
                return (
                    <ConfirmationContent
                        title="ADD TAG"
                        variant="add"
                        data={[
                            //change this based on integration
                            {
                                label: "TAG NAME",
                                value: capitalizeFirst(formData.name) || "—",
                            },
                            {
                                label: "TAG TYPE",
                                value: capitalizeFirst(formData.type) || "—",
                            },
                            {
                                label: "TAG DESCRIPTION",
                                value:
                                    capitalizeFirst(formData.description) ||
                                    "—",
                            },
                        ]}
                    />
                );
            case "update":
                return (
                    <div className="min-h-[100px]">
                        <ConfirmationContent
                            variant="edit"
                            sectionLabel="TAG"
                            data={[
                                ...(formData.name !== selectedTag?.name
                                    ? [
                                          {
                                              label: "Tag Name",
                                              value: "",
                                              oldValue:
                                                  capitalizeFirst(
                                                      selectedTag?.name
                                                  ) || "—",
                                              newValue:
                                                  capitalizeFirst(
                                                      formData.name
                                                  ) || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.type !== selectedTag?.type
                                    ? [
                                          {
                                              label: "Tag Type",
                                              value: "",
                                              oldValue:
                                                  capitalizeFirst(
                                                      selectedTag?.type
                                                  ) || "—",
                                              newValue:
                                                  capitalizeFirst(
                                                      formData.type
                                                  ) || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.description !==
                                selectedTag?.description
                                    ? [
                                          {
                                              label: "Description",
                                              value: "",
                                              oldValue:
                                                  capitalizeFirst(
                                                      selectedTag?.description
                                                  ) || "—",
                                              newValue:
                                                  capitalizeFirst(
                                                      formData.description
                                                  ) || "—",
                                          },
                                      ]
                                    : []),

                                ...(toggle
                                    ? [
                                          {
                                              label: "Archive Status",
                                              value: "",
                                              oldValue: "Active",
                                              newValue: "Archived",
                                          },
                                      ]
                                    : []),
                            ]}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const getTitle = () => {
        if (mode === "add") return "Add Tag";
        if (mode === "edit") return "Edit Tag";
        if (mode === "view") return "View Tag";
        return "Tag";
    };

    // TODO: Backend Integration - Fetch tag types from API
    const tagTypeOptions = [
        { label: "Position", value: "Position" },
        { label: "Team", value: "Team" },
        // TODO: Add more tag types from backend or change this based on backend
    ];

    const footerButtons: Array<{
        label: string;
        variant: "ghost" | "primary";
        onClick: () => void;
        size: "medium";
        disabled?: boolean;
        loading?: boolean;
    }> = [
        {
            label: "Cancel",
            variant: "ghost",
            onClick: onClose,
            size: "medium",
        },
    ];

    if (mode !== "view") {
        footerButtons.push({
            label: mode === "add" ? "Add Tag" : "Update Tag",
            variant: "primary",
            onClick:
                mode === "edit"
                    ? () => handleConfirmationOpen("update")
                    : () => handleConfirmationOpen("add"),
            size: "medium",
            disabled: mode === "add" ? !hasFormData() : !hasChanges(),
            loading: isSubmitting,
        });
    }

    const confirmationProps = getConfirmationProps();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={getTitle()}
                showButton={mode !== "view" ? false : true}
                buttonLabel="Edit Tag"
                buttonOnClick={() => {
                    if (mode === "view") {
                        setModalMode?.("edit");
                    }
                }}
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                buttonIcon={<Edit2 />}
                headerOptions="left"
                footerOptions="stacked-left"
                footerButtons={footerButtons}
                content={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                        <div className="flex flex-col gap-[24px]">
                            <Inputs
                                label="TAG NAME"
                                value={capitalizeFirst(formData.name)}
                                onChange={(e) =>
                                    handleInputChange("name", e.target.value)
                                }
                                // TODO: Backend Integration - Add validation
                                error={!!errors.name}
                                disabled={mode === "view"}
                            />

                            <div className="z-20">
                                <Dropdown
                                    label="TAG TYPE"
                                    size="small"
                                    options={tagTypeOptions}
                                    placeholder="Select type"
                                    value={
                                        formData.type
                                            ? {
                                                  label: capitalizeFirst(
                                                      formData.type
                                                  ),
                                                  value: capitalizeFirst(
                                                      formData.type
                                                  ),
                                              }
                                            : undefined
                                    }
                                    onSelectionChange={(value) => {
                                        const typeValue = Array.isArray(value)
                                            ? value[0]?.value
                                            : value?.value;
                                        handleInputChange(
                                            "type",
                                            typeValue || ""
                                        );
                                    }}
                                    disabled={mode === "view"}
                                />
                                {errors.type && (
                                    <p className="text-caption-reg text-red-500 mt-1">
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            {mode === "edit" && (
                                <>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <Toggle
                                                isOn={toggle}
                                                onToggle={() => {
                                                    if (!toggle) {
                                                        handleConfirmationOpen(
                                                            "archive"
                                                        );
                                                    } else {
                                                        setToggle(!toggle);
                                                    }
                                                }}
                                                // TODO: Backend Integration - Add loading state to toggle
                                                // disabled={isLoading}
                                            />
                                            <p>Archived</p>
                                        </div>
                                        <p className="text-caption-reg text-szGrey500">
                                            {toggle
                                                ? "Switch this off to restore the tag."
                                                : "Switching this on will result in archiving the tag."}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        {/* TODO: Backend Integration - Use actual timestamps from API */}
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                                            {/* Updated mar 23, 2025 08:06 AM */}
                                            Updated{" "}
                                            {formatDateForDisplay(
                                                formData.updated_at
                                            ) || "—"}
                                        </p>
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                                            Created{" "}
                                            {formatDateForDisplay(
                                                formData.created_at
                                            ) || "—"}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <Inputs
                            label="TAG DESCRIPTION"
                            className="h-[256px]"
                            maxCharacter={200}
                            isTextarea
                            value={capitalizeFirst(formData.description) || ""}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            // TODO: Backend Integration - Add validation
                            error={!!errors.description}
                            disabled={mode === "view"}
                        />
                    </div>
                }
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onClick={async () => {
                    try {
                        setIsSubmitting(true);
                        if (confirmationAction === "archive") {
                            // TODO: Backend Integration - Call archive API
                            // await archiveTag(selectedTag?.id).unwrap();
                            setToggle(true);
                            setIsConfirmationModalOpen(false);
                            setIsSubmitting(false);
                        } else {
                            await handleSave();
                            setIsConfirmationModalOpen(false);
                        }
                    } catch (error) {
                        console.error("Error in confirmation action:", error);
                        setIsSubmitting(false);
                    }
                }}
                image={confirmationProps.image}
                description={confirmationProps.description}
                buttonLabel={confirmationProps.buttonLabel}
                content={getConfirmationContent()}
                buttonFooterIcon={confirmationProps.buttonFooterIcon}
            />

            <SnackbarAlert
                isOpen={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                title={snackbarMessage}
                type={snackbarType}
            />
        </>
    );
};

export default TagsModal;

import React, { useState, useEffect } from "react";
import { ConfirmationContent, Inputs, Modal, Toggle } from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";

export interface JobTitleDataType {
    id: string;
    jobTitle: string;
    description?: string;
    salary: string;
    is_archived?: number;
}

export type ModalMode = "view" | "edit" | "add";

interface JobTitleModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitles: JobTitleDataType[];
    mode: ModalMode;
    selectedJobTitle?: JobTitleDataType | null;
    onSave?: (data: JobTitleDataType) => void;
}

const JobTitleModal: React.FC<JobTitleModalProps> = ({ isOpen, onClose, mode, selectedJobTitle, onSave }) => {
    // Form state
    const [formData, setFormData] = useState<JobTitleDataType>({
        id: "",
        jobTitle: "",
        description: "",
        salary: "",
    });
    const [toggle, setToggle] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState<"update" | "add" | "archive">("update");

    // TODO: Backend Integration - Add loading state for form operations
    // const [isLoading, setIsLoading] = useState(false);

    // Load selected job title data when it changes
    useEffect(() => {
        if (selectedJobTitle) {
            setFormData(selectedJobTitle);
            // TODO: Backend Integration - Set archived status from API data
            // setToggle(selectedJobTitle.isArchived || false);
        } else {
            setFormData({
                id: "",
                jobTitle: "",
                description: "",
                salary: "",
            });
            setToggle(false);
        }
    }, [selectedJobTitle]);

    // Handle input changes
    const handleInputChange = (field: keyof JobTitleDataType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // TODO: Backend Integration - Add validation before saving
    const handleSave = async () => {
        try {
            // TODO: Add loading state
            // setIsLoading(true);

            if (onSave) {
                await onSave(formData);
            }
            onClose();
        } catch (error) {
            // TODO: Add error handling
            console.error("Error saving job title:", error);
        } finally {
            // TODO: Remove loading state
            // setIsLoading(false);
        }
    };

    const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
        setConfirmationAction(action);
        setIsConfirmationModalOpen(true);
    };

    const getConfirmationProps = () => {
        // const jobTitleName = formData.jobTitle || "Job Title";

        switch (confirmationAction) {
            case "add":
                return {
                    image: "/src/assets/job_title_confirmation.png",
                    description: `Are you sure to add this job title?`,
                    buttonLabel: "Add Job Title",
                };
            case "archive":
                return {
                    image: "/src/assets/archive_confirmation.png",
                    description: `Are you sure you want to archive this job title?`,
                    buttonLabel: "Archive",
                    buttonFooterIcon: <ArchiveBox />,
                };
            case "update":
            default:
                return {
                    image: "/src/assets/update_confirmation.png",
                    description: `Are you sure you want to update this job title?`,
                    buttonLabel: "Update Job Title",
                };
        }
    };

    // Get confirmation content based on action
    const getConfirmationContent = () => {
        switch (confirmationAction) {
            case "add":
                return (
                    <ConfirmationContent
                        title="ADD JOB TITLE"
                        variant="add"
                        data={[
                            //change this based on integration
                            { label: "JOB TITLE", value: formData.jobTitle || "—" },
                            { label: "DESCRIPTION", value: formData.description || "—" },
                            { label: "SALARY", value: formData.salary || "—" },
                            {
                                label: "JOB TITLE DESCRIPTION",
                                value: formData.description || "—",
                            },
                        ]}
                    />
                );
            case "update":
                return (
                    <div className="min-h-[100px]">
                        <ConfirmationContent
                            variant="edit"
                            sectionLabel="JOB TITLE"
                            data={[
                                //change this based on integration
                                {
                                    label: "Job Title",
                                    value: "",
                                    oldValue: selectedJobTitle?.jobTitle || "—",
                                    newValue: formData.jobTitle || "—",
                                },

                                {
                                    label: "Salary",
                                    value: "",
                                    oldValue: selectedJobTitle?.salary || "—",
                                    newValue: formData.salary || "—",
                                },
                                {
                                    label: "Description",
                                    value: "",
                                    oldValue: selectedJobTitle?.description || "—",
                                    newValue: formData.description || "—",
                                },
                            ]}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    // Get modal title based on mode
    const getTitle = () => {
        if (mode === "add") return "Add Job Title";
        if (mode === "edit") return "Edit Job Title";
        if (mode === "view") return "View Job Title";
        return "Job Title";
    };

    // Footer buttons
    const footerButtons: Array<{
        label: string;
        variant: "ghost" | "primary";
        onClick: () => void;
        size: "medium";
    }> = [
        {
            label: "Cancel",
            variant: "ghost",
            onClick: onClose,
            size: "medium",
        },
    ];

    // Add save button if not in view mode
    if (mode !== "view") {
        footerButtons.push({
            label: mode === "add" ? "Add Job Title" : "Update Job Title",
            variant: "primary",
            onClick: mode === "edit" ? () => handleConfirmationOpen("update") : () => handleConfirmationOpen("add"),
            size: "medium",
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
                buttonLabel="Edit Job Title"
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
                                label="JOB TITLE NAME"
                                value={formData.jobTitle}
                                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                // TODO: Backend Integration - Add validation
                                // error={errors.jobTitle}
                                // disabled={isLoading}
                            />

                            <div className="z-20">
                                <Inputs
                                    label="SALARY"
                                    value={formData.salary}
                                    onChange={(e) => handleInputChange("salary", e.target.value)}
                                    // TODO: Backend Integration - Add validation
                                    // error={errors.jobTitle}
                                    // disabled={isLoading}
                                />
                            </div>

                            {mode === "edit" && (
                                <>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <Toggle
                                                isOn={toggle}
                                                onToggle={() => {
                                                    if (!toggle) {
                                                        handleConfirmationOpen("archive");
                                                    } else {
                                                        setToggle(!toggle);
                                                    }
                                                }}
                                            />
                                            <p>Archived</p>
                                        </div>
                                        <p className="text-caption-reg text-szGrey500">
                                            {toggle
                                                ? "Switch this off to restore the job title."
                                                : "Switching this on will result in archiving the job title."}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        {/* TODO: Backend Integration - Use actual timestamps from API */}
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">Updated mar 23, 2025 08:06 AM</p>
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">Created Jan 27, 2025 08:03 PM</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right column */}
                        <Inputs
                            label="JOB TITLE DESCRIPTION"
                            className="h-[256px]"
                            maxCharacter={200}
                            isTextarea
                            value={formData.description || ""}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            // TODO: Backend Integration - Add validation
                            // error={errors.description}
                            // disabled={isLoading}
                        />
                    </div>
                }
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onClick={async () => {
                    try {
                        if (confirmationAction === "archive") {
                            // TODO: Backend Integration - Call archive API
                            // await archiveJobTitle(selectedJobTitle?.id).unwrap();
                            setToggle(true);
                            setIsConfirmationModalOpen(false);
                        } else {
                            handleSave();
                            setIsConfirmationModalOpen(false);
                        }
                    } catch (error) {
                        // TODO: Add error handling
                        console.error("Error in confirmation action:", error);
                    }
                }}
                image={confirmationProps.image}
                description={confirmationProps.description}
                buttonLabel={confirmationProps.buttonLabel}
                content={getConfirmationContent()}
                buttonFooterIcon={confirmationProps.buttonFooterIcon}
            />
        </>
    );
};

export default JobTitleModal;

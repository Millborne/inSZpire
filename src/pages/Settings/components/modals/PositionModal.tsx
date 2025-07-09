import React, { useState, useEffect } from "react";
import { ConfirmationContent, Divider, Dropdown, Inputs, Modal, Toggle } from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";

export interface PositionDataType {
    id: string;
    position: string;
    team: string;
    jobTitle: string;
}

export type ModalMode = "view" | "edit" | "add";

interface PositionModalProps {
    isOpen: boolean;
    onClose: () => void;
    positions: PositionDataType[];
    mode: ModalMode;
    selectedPosition?: PositionDataType | null;
    onSave?: (data: PositionDataType) => void;
}

const PositionModal: React.FC<PositionModalProps> = ({ isOpen, onClose, mode, selectedPosition, onSave }) => {
    // Form state
    const [formData, setFormData] = useState<PositionDataType>({
        id: "",
        position: "",
        team: "",
        jobTitle: "",
    });
    const [toggle, setToggle] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState<"update" | "add" | "archive">("update");

    // TODO: Backend Integration - Add loading state for form operations
    // const [isLoading, setIsLoading] = useState(false);

    // Load selected position data when it changes
    useEffect(() => {
        if (selectedPosition) {
            setFormData(selectedPosition);
            // TODO: Backend Integration - Set archived status from API data
            // setToggle(selectedPosition.isArchived || false);
        } else {
            setFormData({
                id: "",
                position: "",
                team: "",
                jobTitle: "",
            });
            setToggle(false);
        }
    }, [selectedPosition]);

    // Handle input changes
    const handleInputChange = (field: keyof PositionDataType, value: string) => {
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
            console.error("Error saving position:", error);
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
        // const positionName = formData.position || "Position";

        switch (confirmationAction) {
            case "add":
                return {
                    image: "/src/assets/position_confirmation.png",
                    description: `Are you sure to add this position?`,
                    buttonLabel: "Add Position",
                };
            case "archive":
                return {
                    image: "/src/assets/archive_confirmation.png",
                    description: `Are you sure you want to archive this position?`,
                    buttonLabel: "Archive",
                    buttonFooterIcon: <ArchiveBox />,
                };
            case "update":
            default:
                return {
                    image: "/src/assets/update_confirmation.png",
                    description: `Are you sure you want to update this position?`,
                    buttonLabel: "Update Position",
                };
        }
    };

    // Get confirmation content based on action
    const getConfirmationContent = () => {
        switch (confirmationAction) {
            case "add":
                return (
                    <ConfirmationContent
                        title="ADD POSITION"
                        variant="add"
                        data={[
                            //change this based on integration
                            { label: "POSITION", value: formData.position || "—" },
                            { label: "TEAM", value: formData.team || "—" },
                            { label: "JOB TITLE", value: formData.jobTitle || "—" },
                            {
                                label: "JOB TITLE",
                                value: formData.jobTitle || "—",
                            },
                        ]}
                    />
                );
            case "update":
                return (
                    <div className="min-h-[100px]">
                        <ConfirmationContent
                            variant="edit"
                            sectionLabel="POSITION"
                            data={[
                                //change this based on integration
                                {
                                    label: "Position",
                                    value: "",
                                    oldValue: selectedPosition?.position || "—",
                                    newValue: formData.position || "—",
                                },
                                {
                                    label: "Team",
                                    value: "",
                                    oldValue: selectedPosition?.team || "—",
                                    newValue: formData.team || "—",
                                },
                                {
                                    label: "Job Title",
                                    value: "",
                                    oldValue: selectedPosition?.jobTitle || "—",
                                    newValue: formData.jobTitle || "—",
                                },
                                {
                                    label: "Job Title",
                                    value: "",
                                    oldValue: selectedPosition?.jobTitle || "—",
                                    newValue: formData.jobTitle || "—",
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
        if (mode === "add") return "Add Position";
        if (mode === "edit") return "Edit Position";
        if (mode === "view") return "View Position";
        return "Position";
    };

    // Status options for dropdown
    const positionStatusOptions = [
        { label: "Pending", value: "Pending" },
        { label: "Active", value: "Active" },
        { label: "Idle", value: "Idle" },
    ];

    const teamOptions = [
        { label: "Business Solutions and Innovations", value: "Team 1" },
        { label: "Accounting and Finance Team", value: "Team 2" },
    ];

    const positionReferenceOptions = [
        { label: "Junior Dev", value: "Junior Dev" },
        { label: "Liaison Officer", value: "Liaison Officer" },
    ];

    const positionTypeOptions = [
        { label: "Team", value: "Team" },
        { label: "Individual", value: "Individual" },
    ];

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
            label: mode === "add" ? "Add Position" : "Update Position",
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
                buttonLabel="Edit Position"
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                buttonIcon={<Edit2 />}
                headerOptions="left"
                footerOptions="stacked-left"
                footerButtons={footerButtons}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                            <div className="flex flex-col gap-[24px]">
                                <Inputs
                                    label="POSITION NAME"
                                    value={formData.position}
                                    onChange={(e) => handleInputChange("position", e.target.value)}
                                    // TODO: Backend Integration - Add validation
                                    // error={errors.position}
                                    // disabled={isLoading}
                                />
                                <div className="z-30">
                                    <Dropdown
                                        label="TEAM"
                                        size="small"
                                        options={teamOptions}
                                        placeholder="Select Team"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("team", statusValue || "");
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-[24px]">
                                <div className="z-[9999]">
                                    <Dropdown
                                        label="POSITION REFERENCE"
                                        size="small"
                                        options={positionReferenceOptions}
                                        placeholder="Select Job Title"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("jobTitle", statusValue || "");
                                        }}
                                    />
                                </div>
                                <div className="z-[999]">
                                    <Dropdown
                                        label="POSITION STATUS"
                                        size="small"
                                        options={positionStatusOptions}
                                        placeholder="Select Job Title"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("jobTitle", statusValue || "");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <Divider />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                            <div className="flex flex-col gap-[24px]">
                                <Inputs
                                    label="JOB TITLE"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange("position", e.target.value)}
                                    // TODO: Backend Integration - Add validation
                                    // error={errors.position}
                                    // disabled={isLoading}
                                />
                                <div className="z-30">
                                    <Dropdown
                                        label="SITE"
                                        size="small"
                                        options={teamOptions}
                                        placeholder="Select Team"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("team", statusValue || "");
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-[24px]">
                                <div className="z-[99]">
                                    <Dropdown
                                        label="POSITION TYPE"
                                        size="small"
                                        options={positionReferenceOptions}
                                        placeholder="Select Job Title"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("jobTitle", statusValue || "");
                                        }}
                                    />
                                </div>
                                <div className="z-[60]">
                                    <Dropdown
                                        label="WORK SETUP"
                                        size="small"
                                        options={positionStatusOptions}
                                        placeholder="Select Job Title"
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("jobTitle", statusValue || "");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <Divider />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                            <div className="flex flex-col gap-[24px]">
                                <Inputs
                                    label="BASIC SALARY"
                                    value={formData.position}
                                    onChange={(e) => handleInputChange("position", e.target.value)}
                                    // TODO: Backend Integration - Add validation
                                    // error={errors.position}
                                    // disabled={isLoading}
                                />

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
                                                    ? "Switch this off to restore the position."
                                                    : "Switching this on will result in archiving the position."}
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
                            <div className="flex flex-col gap-[24px]">
                                <div className="z-50">
                                    <Dropdown
                                        label="TAGS"
                                        size="small"
                                        options={positionTypeOptions}
                                        placeholder="Select Job Title"
                                        multiSelect
                                        isCheckbox
                                        // value={formData.status ? { label: formData.status, value: formData.status } : undefined}
                                        onSelectionChange={(value) => {
                                            const statusValue = Array.isArray(value) ? value[0]?.value : value?.value;
                                            handleInputChange("jobTitle", statusValue || "");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
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
                            // await archivePosition(selectedPosition?.id).unwrap();
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

export default PositionModal;

import React, { useState, useEffect } from "react";
import {
    ConfirmationContent,
    Divider,
    Dropdown,
    Inputs,
    Modal,
    Toggle,
    SnackbarAlert,
} from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";

// services
import {
    useJobTitleService,
    type JobTitleData,
} from "../../../../services/settings/job-title/list";

export interface PositionDataType {
    id: string;
    position: string;
    team: string;
    jobTitle: string;
    positionCode?: string;
    basicSalary?: number;
    is_archived?: number;
    // Additional fields for API integration
    team_ID?: string;
    job_ID?: string;
    site_ID?: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    position_type_ID?: string;
    work_setup_ID?: string;
    is_approved?: number;
    tag_IDs?: string[];
}

export type ModalMode = "view" | "edit" | "add";

interface PositionModalProps {
    isOpen: boolean;
    onClose: () => void;
    positions: PositionDataType[];
    mode: ModalMode;
    selectedPosition?: PositionDataType | null;
    onSave?: (data: PositionDataType) => void;
    setModalMode?: (mode: ModalMode) => void;
}

interface ValidationErrors {
    position?: string;
    team?: string;
    jobTitle?: string;
    positionCode?: string;
    basicSalary?: string;
    position_type_ID?: string;
    work_setup_ID?: string;
}

const PositionModal: React.FC<PositionModalProps> = ({
    isOpen,
    onClose,
    mode,
    selectedPosition,
    onSave,
    setModalMode,
}) => {
    console.log(selectedPosition);
    // Services
    const jobTitleService = useJobTitleService();

    // Form state
    const [formData, setFormData] = useState<PositionDataType>({
        id: "",
        position: "",
        team: "",
        jobTitle: "",
        positionCode: "",
        basicSalary: 0,
        site_ID: "",
        reports_to_position_ID: "",
        reports_to_node: "",
        team_level: "",
        position_type_ID: "",
        work_setup_ID: "",
        is_approved: 0,
        tag_IDs: [],
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

    // Job titles state
    const [jobTitles, setJobTitles] = useState<JobTitleData[]>([]);
    const [isLoadingJobTitles, setIsLoadingJobTitles] = useState(false);
    const [addTenJobTitles, setAddTenJobTitles] = useState(10);
    // Load selected position data when it changes
    useEffect(() => {
        if (selectedPosition) {
            setFormData(selectedPosition);
            setToggle(selectedPosition?.is_archived === 1 ? true : false);
        } else {
            setFormData({
                id: "",
                position: "",
                team: "",
                jobTitle: "",
                positionCode: "",
                basicSalary: 0,
                site_ID: "",
                reports_to_position_ID: "",
                reports_to_node: "",
                team_level: "",
                position_type_ID: "",
                work_setup_ID: "",
                is_approved: 0,
                tag_IDs: [],
            });
            setToggle(false);
        }
        // Clear errors when modal opens or data changes
        setErrors({});
    }, [selectedPosition, isOpen]);

    // Fetch job titles when modal opens
    useEffect(() => {
        const fetchJobTitles = async () => {
            if (isOpen) {
                setIsLoadingJobTitles(true);
                try {
                    const filters = {
                        is_archived: 0, // Only active job titles
                        page: 1,
                        limit: addTenJobTitles, // Get all job titles
                    };

                    const result = await jobTitleService.listJobTitles(filters);
                    if (result.data?.data) {
                        setJobTitles(result.data.data);
                    }
                } catch (error) {
                    console.error("Error fetching job titles:", error);
                } finally {
                    setIsLoadingJobTitles(false);
                }
            }
        };

        fetchJobTitles();
    }, [isOpen, addTenJobTitles]);

    // Transform job titles to dropdown options
    const positionReferenceOptions = jobTitles.map((jobTitle) => ({
        label: jobTitle.job_title,
        value: jobTitle.job_ID || "",
    }));

    // Handle input changes
    const handleInputChange = (
        field: keyof PositionDataType,
        value: string | number | string[]
    ) => {
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

        if (!formData.position?.trim()) {
            newErrors.position = "Position name is required";
        }

        if (!formData.team?.trim()) {
            newErrors.team = "Team is required";
        }

        if (!formData.jobTitle?.trim()) {
            newErrors.jobTitle = "Job title is required";
        }

        if (!formData.positionCode?.trim()) {
            newErrors.positionCode = "Position code is required";
        }

        if (!formData.basicSalary || formData.basicSalary <= 0) {
            newErrors.basicSalary = "Basic salary must be greater than 0";
        }

        if (!formData.position_type_ID?.trim()) {
            newErrors.position_type_ID = "Position type is required";
        }

        if (!formData.work_setup_ID?.trim()) {
            newErrors.work_setup_ID = "Work setup is required";
        }

        setErrors(newErrors);

        // Check if any data has been entered
        const hasData =
            formData.position?.trim() &&
            formData.team?.trim() &&
            formData.jobTitle?.trim() &&
            formData.positionCode?.trim() &&
            formData.basicSalary &&
            formData.basicSalary > 0 &&
            formData.position_type_ID?.trim() &&
            formData.work_setup_ID?.trim();

        if (!hasData) {
            setSnackbarMessage("Please fill all required fields to proceed");
            setSnackbarType("error");
            setSnackbarOpen(true);
            return false;
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        // Validate form before saving
        if (!validateForm()) {
            return;
        }

        try {
            if (onSave) {
                await onSave({ ...formData, is_archived: toggle ? 1 : 0 });
            }
        } catch (error) {
            console.error("Error saving position:", error);
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

        if (action === "update") {
            // Check if any data has been updated
            const hasChanges =
                formData.position !== selectedPosition?.position ||
                formData.team !== selectedPosition?.team ||
                formData.jobTitle !== selectedPosition?.jobTitle ||
                formData.positionCode !== selectedPosition?.positionCode ||
                formData.basicSalary !== selectedPosition?.basicSalary ||
                formData.site_ID !== selectedPosition?.site_ID ||
                formData.position_type_ID !==
                    selectedPosition?.position_type_ID ||
                formData.work_setup_ID !== selectedPosition?.work_setup_ID ||
                toggle !== (selectedPosition?.is_archived === 1);

            if (!hasChanges) {
                setSnackbarMessage("Please update the details to proceed");
                setSnackbarType("error");
                setSnackbarOpen(true);
                return; // Exit if no changes detected
            }
        }

        setConfirmationAction(action);
        setIsConfirmationModalOpen(true);
    };

    const getConfirmationProps = () => {
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
                            {
                                label: "POSITION NAME",
                                value: formData.position || "—",
                            },
                            {
                                label: "TEAM",
                                value:
                                    teamOptions.find(
                                        (opt) =>
                                            opt.value === formData.team ||
                                            opt.label === formData.team_ID
                                    )?.label || "—",
                            },
                            {
                                label: "JOB TITLE",
                                value:
                                    positionReferenceOptions.find(
                                        (opt) =>
                                            opt.value === formData.jobTitle ||
                                            opt.label === formData.jobTitle
                                    )?.label || "—",
                            },
                            {
                                label: "POSITION CODE",
                                value: formData.positionCode || "—",
                            },
                            {
                                label: "BASIC SALARY",
                                value: formData.basicSalary?.toString() || "—",
                            },
                            {
                                label: "POSITION TYPE",
                                value:
                                    positionTypeOptions.find(
                                        (opt) =>
                                            opt.value ===
                                            formData.position_type_ID
                                    )?.label || "—",
                            },
                            {
                                label: "WORK SETUP",
                                value:
                                    workSetupOptions.find(
                                        (opt) =>
                                            opt.value === formData.work_setup_ID
                                    )?.label || "—",
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
                                ...(formData.position !==
                                selectedPosition?.position
                                    ? [
                                          {
                                              label: "Position Name",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.position ||
                                                  "—",
                                              newValue:
                                                  formData.position || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.team !== selectedPosition?.team
                                    ? [
                                          {
                                              label: "Team",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.team || "—",
                                              newValue: formData.team || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.jobTitle !==
                                selectedPosition?.jobTitle
                                    ? [
                                          {
                                              label: "Job Title",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.jobTitle ||
                                                  "—",
                                              newValue:
                                                  formData.jobTitle || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.positionCode !==
                                selectedPosition?.positionCode
                                    ? [
                                          {
                                              label: "Position Code",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.positionCode ||
                                                  "—",
                                              newValue:
                                                  formData.positionCode || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.basicSalary !==
                                selectedPosition?.basicSalary
                                    ? [
                                          {
                                              label: "Basic Salary",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.basicSalary?.toString() ||
                                                  "—",
                                              newValue:
                                                  formData.basicSalary?.toString() ||
                                                  "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.position_type_ID !==
                                selectedPosition?.position_type_ID
                                    ? [
                                          {
                                              label: "Position Type",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.position_type_ID ||
                                                  "—",
                                              newValue:
                                                  formData.position_type_ID ||
                                                  "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.work_setup_ID !==
                                selectedPosition?.work_setup_ID
                                    ? [
                                          {
                                              label: "Work Setup",
                                              value: "",
                                              oldValue:
                                                  selectedPosition?.work_setup_ID ||
                                                  "—",
                                              newValue:
                                                  formData.work_setup_ID || "—",
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
        {
            label: "business solutions and innovation",
            value: "2985811d451311f0b6b802dcb324866b",
        },
    ];

    const positionTypeOptions = [
        { label: "Team", value: "def1234567890abcdef1234567890abc" },
        { label: "Individual", value: "abc1234567890abcdef1234567890def" },
    ];

    const workSetupOptions = [
        { label: "On-site", value: "234567890abcdef1234567890abcdef1" },
        { label: "Remote", value: "34567890abcdef1234567890abcdef12" },
        { label: "Hybrid", value: "4567890abcdef1234567890abcdef123" },
    ];

    const siteOptions = [
        { label: "Main Office", value: "abcdef1234567890abcdef1234567890" },
        { label: "Branch Office", value: "bcdef1234567890abcdef12345678901" },
    ];

    const reportsToOptions = [
        { label: "Supervisor", value: "f639b02d459e11f0b6b802dcb324866b" },
    ];

    const teamLevelOptions = [
        { label: "Entry Level", value: "1" },
        { label: "Mid Level", value: "2" },
        { label: "Senior Level", value: "3" },
        { label: "Management", value: "4" },
    ];

    const tagOptions = [
        { label: "Technical", value: "730a048357cf11f0b6b802dcb324866b" },
        { label: "Non-Technical", value: "730a1caa57cf11f0b6b802dcb324866b" },
        { label: "Leadership", value: "87649d4f564a11f0b6b802dcb324866b" },
        { label: "Specialist", value: "f5a6351b561c11f0b6b802dcb324866b" },
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
            onClick:
                mode === "edit"
                    ? () => handleConfirmationOpen("update")
                    : () => handleConfirmationOpen("add"),
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
                    <div className="flex flex-col gap-[16px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                            <div className="flex flex-col gap-[24px]">
                                <Inputs
                                    label="POSITION NAME"
                                    value={formData.position}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "position",
                                            e.target.value
                                        )
                                    }
                                    error={!!errors.position}
                                    disabled={mode === "view"}
                                />
                                <div className="z-30">
                                    <Dropdown
                                        label="TEAM"
                                        size="small"
                                        options={teamOptions}
                                        placeholder="Select Team"
                                        value={
                                            formData.team
                                                ? teamOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.team ||
                                                          opt.label ===
                                                              formData.team_ID
                                                  )
                                                : undefined
                                        }
                                        onSelectionChange={(value) => {
                                            const teamValue = Array.isArray(
                                                value
                                            )
                                                ? value[0]?.value
                                                : value?.value;
                                            handleInputChange(
                                                "team",
                                                teamValue || ""
                                            );
                                        }}
                                        disabled={mode === "view"}
                                    />
                                    {errors.team && (
                                        <p className="text-caption-reg text-red-500 mt-1">
                                            {errors.team}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-[24px]">
                                <div className="z-[9999]">
                                    <Dropdown
                                        label="POSITION REFERENCE"
                                        size="small"
                                        options={positionReferenceOptions}
                                        placeholder={
                                            isLoadingJobTitles
                                                ? "Loading job titles..."
                                                : "Select Job Title"
                                        }
                                        value={
                                            formData.jobTitle
                                                ? positionReferenceOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.jobTitle ||
                                                          opt.label ===
                                                              formData.jobTitle
                                                  )
                                                : undefined
                                        }
                                        onSelectionChange={(value) => {
                                            const jobTitleValue = Array.isArray(
                                                value
                                            )
                                                ? value[0]?.value
                                                : value?.value;
                                            handleInputChange(
                                                "jobTitle",
                                                jobTitleValue || ""
                                            );
                                        }}
                                        disabled={
                                            mode === "view" ||
                                            isLoadingJobTitles
                                        }
                                        onScroll={(e) => {
                                            setAddTenJobTitles(
                                                addTenJobTitles + 10
                                            );
                                        }}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-caption-reg text-red-500 mt-1">
                                            {errors.jobTitle}
                                        </p>
                                    )}
                                </div>
                                <div className="z-[999]">
                                    <Dropdown
                                        label="POSITION STATUS"
                                        size="small"
                                        options={positionStatusOptions}
                                        placeholder="Select Status"
                                        disabled={mode === "view"}
                                        onSelectionChange={(value) => {
                                            const positionStatusValue =
                                                Array.isArray(value)
                                                    ? value[0]?.value
                                                    : value?.value;
                                            handleInputChange(
                                                "is_approved",
                                                positionStatusValue === "Active"
                                                    ? 1
                                                    : 0
                                            );
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
                                    label="POSITION CODE"
                                    value={formData.positionCode}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "positionCode",
                                            e.target.value
                                        )
                                    }
                                    error={!!errors.positionCode}
                                    disabled={mode === "view"}
                                />
                                <div className="z-30">
                                    <Dropdown
                                        label="SITE"
                                        size="small"
                                        options={siteOptions}
                                        placeholder="Select Site"
                                        disabled={mode === "view"}
                                        onSelectionChange={(value) => {
                                            const siteValue = Array.isArray(
                                                value
                                            )
                                                ? value[0]?.value
                                                : value?.value;
                                            handleInputChange(
                                                "site_ID",
                                                siteValue || ""
                                            );
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
                                        options={positionTypeOptions}
                                        placeholder="Select Position Type"
                                        disabled={mode === "view"}
                                        value={
                                            formData.position_type_ID
                                                ? {
                                                      label:
                                                          positionTypeOptions.find(
                                                              (opt) =>
                                                                  opt.value ===
                                                                  formData.position_type_ID
                                                          )?.label || "",
                                                      value: formData.position_type_ID,
                                                  }
                                                : undefined
                                        }
                                        onSelectionChange={(value) => {
                                            const positionTypeValue =
                                                Array.isArray(value)
                                                    ? value[0]?.value
                                                    : value?.value;
                                            handleInputChange(
                                                "position_type_ID",
                                                positionTypeValue || ""
                                            );
                                        }}
                                    />
                                    {errors.position_type_ID && (
                                        <p className="text-caption-reg text-red-500 mt-1">
                                            {errors.position_type_ID}
                                        </p>
                                    )}
                                </div>
                                <div className="z-[60]">
                                    <Dropdown
                                        label="WORK SETUP"
                                        size="small"
                                        options={workSetupOptions}
                                        placeholder="Select Work Setup"
                                        disabled={mode === "view"}
                                        value={
                                            formData.work_setup_ID
                                                ? {
                                                      label:
                                                          workSetupOptions.find(
                                                              (opt) =>
                                                                  opt.value ===
                                                                  formData.work_setup_ID
                                                          )?.label || "",
                                                      value: formData.work_setup_ID,
                                                  }
                                                : undefined
                                        }
                                        onSelectionChange={(value) => {
                                            const workSetupValue =
                                                Array.isArray(value)
                                                    ? value[0]?.value
                                                    : value?.value;
                                            handleInputChange(
                                                "work_setup_ID",
                                                workSetupValue || ""
                                            );
                                        }}
                                    />
                                    {errors.work_setup_ID && (
                                        <p className="text-caption-reg text-red-500 mt-1">
                                            {errors.work_setup_ID}
                                        </p>
                                    )}
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
                                    value={
                                        formData.basicSalary?.toString() || ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "basicSalary",
                                            parseFloat(e.target.value) || 0
                                        )
                                    }
                                    error={!!errors.basicSalary}
                                    disabled={mode === "view"}
                                    type="number"
                                />

                                <div className="z-[40]">
                                    <Dropdown
                                        label="REPORTS TO"
                                        size="small"
                                        options={reportsToOptions}
                                        placeholder="Select Reports To"
                                        disabled={mode === "view"}
                                        onSelectionChange={(value) => {
                                            const reportsToValue =
                                                Array.isArray(value)
                                                    ? value[0]?.value
                                                    : value?.value;
                                            handleInputChange(
                                                "reports_to_position_ID",
                                                reportsToValue || ""
                                            );
                                        }}
                                    />
                                </div>

                                <div className="z-[30]">
                                    <Dropdown
                                        label="TEAM LEVEL"
                                        size="small"
                                        options={teamLevelOptions}
                                        placeholder="Select Team Level"
                                        disabled={mode === "view"}
                                        onSelectionChange={(value) => {
                                            const teamLevelValue =
                                                Array.isArray(value)
                                                    ? value[0]?.value
                                                    : value?.value;
                                            handleInputChange(
                                                "team_level",
                                                teamLevelValue || ""
                                            );
                                        }}
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
                                                            handleConfirmationOpen(
                                                                "archive"
                                                            );
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
                                            <p className="text-caption-all-caps text-szGrey500 uppercase">
                                                Updated mar 23, 2025 08:06 AM
                                            </p>
                                            <p className="text-caption-all-caps text-szGrey500 uppercase">
                                                Created Jan 27, 2025 08:03 PM
                                            </p>
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
                                        options={tagOptions}
                                        placeholder="Select Tags"
                                        multiSelect
                                        isCheckbox
                                        disabled={mode === "view"}
                                        onSelectionChange={(value) => {
                                            const tagsValue = Array.isArray(
                                                value
                                            )
                                                ? value.map((v) => v.value)
                                                : value
                                                ? [value.value]
                                                : [];
                                            handleInputChange(
                                                "tag_IDs",
                                                tagsValue
                                            );
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
                        console.error("Error in confirmation action:", error);
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

export default PositionModal;

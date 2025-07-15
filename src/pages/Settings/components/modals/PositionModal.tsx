import React, { useState, useEffect, useMemo } from "react";
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
import {
    usePositionTypeService,
    type PositionTypeData,
} from "../../../../services/settings/positions/list";
import {
    useTagService,
    type TagData,
} from "../../../../services/settings/tags/list";
import {
    useWorkSetupService,
    type WorkSetupData,
} from "../../../../services/settings/work-setup/list";
import { useTeamService, type TeamData } from "../../../../services/teams/list";
import { sanitizeUUID } from "../../../../utils";

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
    position_status_name?: string;
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
    // Services
    const jobTitleService = useJobTitleService();
    const positionTypeService = usePositionTypeService();
    const tagService = useTagService();
    const workSetupService = useWorkSetupService();
    const teamService = useTeamService();

    const [selectedPositionData, setSelectedPositionData] =
        useState<PositionDataType | null>(null);

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

    // Position types state
    const [positionTypes, setPositionTypes] = useState<PositionTypeData[]>([]);
    const [isLoadingPositionTypes, setIsLoadingPositionTypes] = useState(false);

    // Tags state
    const [tags, setTags] = useState<TagData[]>([]);
    const [isLoadingTags, setIsLoadingTags] = useState(false);

    // Work setups state
    const [workSetups, setWorkSetups] = useState<WorkSetupData[]>([]);
    const [isLoadingWorkSetups, setIsLoadingWorkSetups] = useState(false);

    // Teams state
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [isLoadingTeams, setIsLoadingTeams] = useState(false);

    // Fetch job titles when modal opens
    useEffect(() => {
        const fetchJobTitles = async () => {
            if (isOpen) {
                setIsLoadingJobTitles(true);
                try {
                    const filtersGetTotal = {
                        is_archived: 0, // Only active job titles
                        page: 1,
                        limit: 10, // Get all job titles
                    };

                    const resultGetTotal = await jobTitleService.listJobTitles(
                        filtersGetTotal
                    );
                    if (resultGetTotal.data?.data) {
                        const filters = {
                            is_archived: 0, // Only active job titles
                            page: 1,
                            limit: resultGetTotal.data.total, // Get all job titles
                        };
                        const result = await jobTitleService.listJobTitles(
                            filters
                        );
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
    }, [isOpen]);

    // Fetch position types when modal opens
    useEffect(() => {
        const fetchPositionTypes = async () => {
            if (isOpen) {
                setIsLoadingPositionTypes(true);
                try {
                    const filtersGetTotal = {
                        is_archived: 0, // Only active position types
                        offset: 0,
                        limit: 10,
                    };

                    const resultGetTotal =
                        await positionTypeService.listPositionTypes(
                            filtersGetTotal
                        );

                    if (resultGetTotal.data) {
                        const filters = {
                            is_archived: 0, // Only active position types
                            offset: 0,
                            limit: resultGetTotal.data.total_count, // Get all position types
                        };
                        const result =
                            await positionTypeService.listPositionTypes(
                                filters
                            );
                        setPositionTypes(result.data.data);
                    }
                } catch (error) {
                    console.error("Error fetching position types:", error);
                } finally {
                    setIsLoadingPositionTypes(false);
                }
            }
        };

        fetchPositionTypes();
    }, [isOpen]);

    // Fetch tags when modal opens
    useEffect(() => {
        const fetchTags = async () => {
            if (isOpen) {
                setIsLoadingTags(true);
                try {
                    const filtersGetTotal = {
                        is_archived: 0, // Only active tags
                        offset: 0,
                        limit: 10,
                    };

                    const resultGetTotal = await tagService.viewTags(
                        filtersGetTotal
                    );

                    if (resultGetTotal.data) {
                        const filters = {
                            is_archived: 0, // Only active tags
                            offset: 0,
                            limit: resultGetTotal.data.total_count, // Get all tags
                        };
                        const result = await tagService.viewTags(filters);
                        setTags(result.data.data);
                    }
                } catch (error) {
                    console.error("Error fetching tags:", error);
                } finally {
                    setIsLoadingTags(false);
                }
            }
        };

        fetchTags();
    }, [isOpen]);

    // Fetch work setups when modal opens
    useEffect(() => {
        const fetchWorkSetups = async () => {
            if (isOpen) {
                setIsLoadingWorkSetups(true);
                try {
                    const filtersGetTotal = {
                        is_archived: 0, // Only active work setups
                        offset: 0,
                        limit: 10, // Get work setups with limit
                    };

                    const resultGetTotal =
                        await workSetupService.listWorkSetups(filtersGetTotal);
                    if (resultGetTotal.data) {
                        const filters = {
                            is_archived: 0, // Only active work setups
                            offset: 0,
                            limit: resultGetTotal.data.total_count, // Get work setups with limit
                        };
                        const result = await workSetupService.listWorkSetups(
                            filters
                        );

                        setWorkSetups(result.data.data);
                    }
                } catch (error) {
                    console.error("Error fetching work setups:", error);
                } finally {
                    setIsLoadingWorkSetups(false);
                }
            }
        };

        fetchWorkSetups();
    }, [isOpen]);

    // Fetch teams when modal opens
    useEffect(() => {
        const fetchTeams = async () => {
            if (isOpen) {
                setIsLoadingTeams(true);
                try {
                    const filtersGetTotal = {
                        offset: 0,
                        limit: 10,
                    };

                    const resultGetTotal = await teamService.viewTeams(
                        filtersGetTotal
                    );
                    if (resultGetTotal.data) {
                        const filters = {
                            offset: 0,
                            limit: resultGetTotal.data.total_count, // Get teams with limit
                        };
                        const result = await teamService.viewTeams(filters);
                        setTeams(result.data?.data);
                    }
                } catch (error) {
                    console.error("Error fetching teams:", error);
                } finally {
                    setIsLoadingTeams(false);
                }
            }
        };

        fetchTeams();
    }, [isOpen]);

    // Transform job titles to dropdown options
    const positionReferenceOptions = useMemo(() => {
        return jobTitles.map((jobTitle) => ({
            label: jobTitle.job_title,
            value: jobTitle.job_ID || "",
        }));
    }, [jobTitles]);

    // Transform position types to dropdown options
    const positionTypeOptions = useMemo(() => {
        return positionTypes.map((positionType) => ({
            label: positionType.type_name,
            value: positionType.position_type_ID || "",
        }));
    }, [positionTypes]);

    // Transform tags to dropdown options
    const tagOptions = useMemo(() => {
        return (Array.isArray(tags) ? tags : []).map((tag) => ({
            label: tag.tag_name,
            value: tag.tag_ID || "",
        }));
    }, [tags]);

    // Transform work setups to dropdown options
    const workSetupOptions = useMemo(() => {
        return workSetups.map((workSetup) => ({
            label: workSetup.setup_name,
            value: workSetup.setup_ID || "",
        }));
    }, [workSetups]);

    // Transform teams to dropdown options
    const teamOptions = useMemo(() => {
        return teams.map((team) => ({
            label: team.team_name,
            value: team.team_ID || "",
        }));
    }, [teams]);

    // Status options for dropdown - static array, no need for memoization
    const positionStatusOptions = useMemo(
        () => [
            { label: "Pending", value: "Pending" },
            { label: "Active", value: "Active" },
            { label: "Idle", value: "Idle" },
            { label: "Transferred", value: "Transferred" },
        ],
        []
    );

    const siteOptions = useMemo(
        () => [
            { label: "Main Office", value: "abcdef1234567890abcdef1234567890" },
            {
                label: "Branch Office",
                value: "bcdef1234567890abcdef12345678901",
            },
        ],
        []
    );

    const reportsToOptions = useMemo(
        () => [
            {
                label: "Supervisor",
                value: "f639b02d-459e-11f0-b6b8-02dcb324866b",
            },
        ],
        []
    );

    const teamLevelOptions = useMemo(
        () => [
            { label: "Entry Level", value: "1" },
            { label: "Mid Level", value: "2" },
            { label: "Senior Level", value: "3" },
            { label: "Management", value: "4" },
        ],
        []
    );

    // Load selected position data when it changes
    useEffect(() => {
        if (selectedPosition) {
            // Set toggle state first
            setToggle(selectedPosition?.is_archived === 1);
            setFormData(selectedPosition);
            setSelectedPositionData(selectedPosition);
        } else {
            // Reset form data for new position
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
            setSelectedPositionData(null);
        }
        // Clear errors when modal opens or data changes
        setErrors({});
    }, [selectedPosition, isOpen]); // Include all options used in the effect

    // Update form data when selectedPosition or options change
    useEffect(() => {
        if (
            selectedPosition &&
            teamOptions.length > 0 &&
            positionReferenceOptions.length > 0
        ) {
            let updatedFormData = {
                ...selectedPosition,
                team:
                    teamOptions.find(
                        (team) => team.label === selectedPosition.team_ID
                    )?.value || "",
                jobTitle:
                    positionReferenceOptions.find(
                        (job) => job.label === selectedPosition.jobTitle
                    )?.value || "",
                position_status_name:
                    positionStatusOptions.find(
                        (type) =>
                            type.label === selectedPosition.position_status_name
                    )?.value || "",
                work_setup_ID: workSetupOptions.find(
                    (setup) => setup.label === selectedPosition.work_setup_ID
                )?.value,
                tag_IDs: selectedPosition.tag_IDs
                    ?.map(
                        (tag) =>
                            tagOptions.find((opt) => opt.label === tag)?.value
                    )
                    ?.filter((id): id is string => id !== undefined),

                position_type_ID:
                    positionTypeOptions.find(
                        (type) =>
                            type.label === selectedPosition.position_type_ID
                    )?.value || "",
                reports_to_position_ID:
                    reportsToOptions.find(
                        (opt) =>
                            opt.value ===
                                selectedPosition.reports_to_position_ID ||
                            opt.label ===
                                selectedPosition.reports_to_position_ID
                    )?.value || "",
            };
            setFormData(updatedFormData);
            setSelectedPositionData(updatedFormData);
        }
    }, [
        selectedPosition,
        teamOptions.length,
        positionReferenceOptions.length,
        workSetupOptions.length,
        tagOptions.length,
    ]);

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
                // Set form data once with all updates
                // const updatedFormData = {
                //     ...selectedPosition,
                //     team_ID:
                //         teamOptions.find(
                //             (team) => team.label === selectedPosition.team
                //         )?.value || "",
                //     jobTitle:
                //         positionReferenceOptions.find(
                //             (job) => job.label === selectedPosition.jobTitle
                //         )?.value || "",
                //     position_status_name:
                //         positionTypeOptions.find(
                //             (type) =>
                //                 type.label ===
                //                 selectedPosition.position_status_name
                //         )?.value || "",
                //     work_setup_ID: workSetupOptions.find(
                //         (setup) =>
                //             setup.label === selectedPosition.work_setup_ID
                //     )?.value,
                //     tag_IDs: selectedPosition.tag_IDs
                //         ?.map(
                //             (tag) =>
                //                 tagOptions.find((opt) => opt.label === tag)
                //                     ?.value
                //         )
                //         ?.filter((id): id is string => id !== undefined),
                // };

                await onSave({
                    ...formData,
                    is_archived: toggle ? 1 : 0,
                });
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
                formData.position !== selectedPositionData?.position ||
                formData.team !== selectedPositionData?.team ||
                formData.jobTitle !== selectedPositionData?.jobTitle ||
                formData.positionCode !== selectedPositionData?.positionCode ||
                formData.basicSalary !== selectedPositionData?.basicSalary ||
                formData.site_ID !== selectedPositionData?.site_ID ||
                formData.position_type_ID !==
                    selectedPositionData?.position_type_ID ||
                formData.work_setup_ID !==
                    selectedPositionData?.work_setup_ID ||
                toggle !== (selectedPositionData?.is_archived === 1) ||
                JSON.stringify(formData.tag_IDs) !==
                    JSON.stringify(selectedPositionData?.tag_IDs) ||
                formData.team_level !== selectedPositionData?.team_level ||
                formData.reports_to_position_ID !==
                    selectedPositionData?.reports_to_position_ID;

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
                            ...(formData.site_ID
                                ? [
                                      {
                                          label: "SITE",
                                          value:
                                              siteOptions.find(
                                                  (opt) =>
                                                      opt.value ===
                                                      formData.site_ID
                                              )?.label || "—",
                                      },
                                  ]
                                : []),
                            ...(formData.tag_IDs
                                ? [
                                      {
                                          label: "TAGS",
                                          value:
                                              formData.tag_IDs
                                                  .map(
                                                      (tagId) =>
                                                          tagOptions.find(
                                                              (opt) =>
                                                                  opt.value ===
                                                                  tagId
                                                          )?.label
                                                  )
                                                  .filter(Boolean)
                                                  .join(", ") || "—",
                                      },
                                  ]
                                : []),
                            ...(formData.team_level
                                ? [
                                      {
                                          label: "TEAM LEVEL",
                                          value:
                                              teamLevelOptions.find(
                                                  (opt) =>
                                                      opt.value ===
                                                          formData.team_level?.toString() ||
                                                      opt.label ===
                                                          formData.team_level?.toString()
                                              )?.label || "—",
                                      },
                                  ]
                                : []),
                            ...(formData.reports_to_position_ID
                                ? [
                                      {
                                          label: "REPORTS TO POSITION",
                                          value:
                                              reportsToOptions.find(
                                                  (opt) =>
                                                      opt.value ===
                                                          formData.reports_to_position_ID ||
                                                      opt.label ===
                                                          formData.reports_to_position_ID
                                              )?.label || "—",
                                      },
                                  ]
                                : []),
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
                                selectedPositionData?.position
                                    ? [
                                          {
                                              label: "Position Name",
                                              value: "",
                                              oldValue:
                                                  selectedPositionData?.position ||
                                                  "—",
                                              newValue:
                                                  formData.position || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.team !== selectedPositionData?.team
                                    ? [
                                          {
                                              label: "Team",
                                              value: "",
                                              oldValue:
                                                  teamOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.team_ID ||
                                                          opt.label ===
                                                              selectedPositionData?.team_ID
                                                  )?.label || "—",
                                              newValue:
                                                  teamOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.team ||
                                                          opt.label ===
                                                              formData.team
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.jobTitle !==
                                selectedPositionData?.jobTitle
                                    ? [
                                          {
                                              label: "Job Title",
                                              value: "",
                                              oldValue:
                                                  positionReferenceOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.jobTitle ||
                                                          opt.label ===
                                                              selectedPositionData?.jobTitle
                                                  )?.label || "—",
                                              newValue:
                                                  positionReferenceOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.jobTitle ||
                                                          opt.label ===
                                                              formData.jobTitle
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.positionCode !==
                                selectedPositionData?.positionCode
                                    ? [
                                          {
                                              label: "Position Code",
                                              value: "",
                                              oldValue:
                                                  selectedPositionData?.positionCode ||
                                                  "—",
                                              newValue:
                                                  formData.positionCode || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.basicSalary !==
                                selectedPositionData?.basicSalary
                                    ? [
                                          {
                                              label: "Basic Salary",
                                              value: "",
                                              oldValue:
                                                  selectedPositionData?.basicSalary?.toString() ||
                                                  "—",
                                              newValue:
                                                  formData.basicSalary?.toString() ||
                                                  "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.position_type_ID !==
                                selectedPositionData?.position_type_ID
                                    ? [
                                          {
                                              label: "Position Type",
                                              value: "",
                                              oldValue:
                                                  positionTypeOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.position_type_ID ||
                                                          opt.label ===
                                                              selectedPositionData?.position_type_ID
                                                  )?.label || "—",
                                              newValue:
                                                  positionTypeOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                          formData.position_type_ID
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.work_setup_ID !==
                                selectedPositionData?.work_setup_ID
                                    ? [
                                          {
                                              label: "Work Setup",
                                              value: "",
                                              oldValue:
                                                  workSetupOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.work_setup_ID ||
                                                          opt.label ===
                                                              selectedPositionData?.work_setup_ID
                                                  )?.label || "—",
                                              newValue:
                                                  workSetupOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.work_setup_ID ||
                                                          opt.label ===
                                                              formData.work_setup_ID
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.site_ID !==
                                selectedPositionData?.site_ID
                                    ? [
                                          {
                                              label: "Site",
                                              value: "",
                                              oldValue:
                                                  siteOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.site_ID ||
                                                          opt.label ===
                                                              selectedPositionData?.site_ID
                                                  )?.label || "—",
                                              newValue:
                                                  siteOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.site_ID ||
                                                          opt.label ===
                                                              formData.site_ID
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(JSON.stringify(formData.tag_IDs) !==
                                JSON.stringify(selectedPositionData?.tag_IDs)
                                    ? [
                                          {
                                              label: "Tags",
                                              value: "",
                                              oldValue:
                                                  selectedPositionData?.tag_IDs
                                                      ?.map(
                                                          (tag) =>
                                                              tagOptions.find(
                                                                  (opt) =>
                                                                      opt.value ===
                                                                      tag
                                                              )?.label
                                                      )
                                                      .join(", ") || "—",
                                              newValue:
                                                  formData.tag_IDs
                                                      ?.map(
                                                          (tag) =>
                                                              tagOptions.find(
                                                                  (opt) =>
                                                                      opt.value ===
                                                                      tag
                                                              )?.label
                                                      )
                                                      .join(", ") || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.team_level !==
                                selectedPositionData?.team_level
                                    ? [
                                          {
                                              label: "Team Level",
                                              value: "",
                                              oldValue:
                                                  teamLevelOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.team_level?.toString() ||
                                                          opt.label ===
                                                              selectedPositionData?.team_level?.toString()
                                                  )?.label || "—",
                                              newValue:
                                                  teamLevelOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.team_level?.toString() ||
                                                          opt.label ===
                                                              formData.team_level?.toString()
                                                  )?.label || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.reports_to_position_ID !==
                                selectedPositionData?.reports_to_position_ID
                                    ? [
                                          {
                                              label: "Reports To Position",
                                              value: "",
                                              oldValue:
                                                  reportsToOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              selectedPositionData?.reports_to_position_ID ||
                                                          opt.label ===
                                                              selectedPositionData?.reports_to_position_ID
                                                  )?.label || "—",
                                              newValue:
                                                  reportsToOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.reports_to_position_ID ||
                                                          opt.label ===
                                                              formData.reports_to_position_ID
                                                  )?.label || "—",
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
                                : [])
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
                                        placeholder={
                                            isLoadingTeams
                                                ? "Loading teams..."
                                                : "Select Team"
                                        }
                                        value={
                                            formData.team
                                                ? teamOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.team_ID ||
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
                                        disabled={
                                            mode === "view" || isLoadingTeams
                                        }
                                        // onScroll={(e) => {
                                        //     setAddTenTeams(addTenTeams + 10);
                                        // }}
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
                                        // onScroll={(e) => {
                                        //     setAddTenJobTitles(
                                        //         addTenJobTitles + 10
                                        //     );
                                        // }}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-caption-reg text-red-500 mt-1">
                                            {errors.jobTitle}
                                        </p>
                                    )}
                                </div>
                                {/* <div className="z-[999]">
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
                                        value={
                                            formData.position_status_name
                                                ? positionStatusOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.position_status_name ||
                                                          opt.label ===
                                                              formData.position_status_name
                                                  )
                                                : undefined
                                        }
                                    />
                                </div> */}
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
                                        value={
                                            formData.site_ID
                                                ? siteOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.site_ID ||
                                                          opt.label ===
                                                              formData.site_ID
                                                  )
                                                : undefined
                                        }
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
                                        placeholder={
                                            isLoadingPositionTypes
                                                ? "Loading position types..."
                                                : "Select Position Type"
                                        }
                                        disabled={
                                            mode === "view" ||
                                            isLoadingPositionTypes
                                        }
                                        value={
                                            formData.position_type_ID
                                                ? positionTypeOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.position_type_ID ||
                                                          opt.label ===
                                                              formData.position_type_ID
                                                  )
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
                                        placeholder={
                                            isLoadingWorkSetups
                                                ? "Loading work setups..."
                                                : "Select Work Setup"
                                        }
                                        disabled={
                                            mode === "view" ||
                                            isLoadingWorkSetups
                                        }
                                        // onScroll={(e) => {
                                        //     setAddTenWorkSetups(
                                        //         addTenWorkSetups + 10
                                        //     );
                                        // }}
                                        value={
                                            formData.work_setup_ID
                                                ? workSetupOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.work_setup_ID ||
                                                          opt.label ===
                                                              formData.work_setup_ID
                                                  )
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
                                        value={
                                            formData.reports_to_position_ID
                                                ? reportsToOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.reports_to_position_ID ||
                                                          "" ||
                                                          opt.label ===
                                                              formData.reports_to_position_ID ||
                                                          ""
                                                  )
                                                : undefined
                                        }
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
                                        value={
                                            formData.team_level
                                                ? teamLevelOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                              formData.team_level?.toString() ||
                                                          opt.label ===
                                                              formData.team_level?.toString()
                                                  )
                                                : undefined
                                        }
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
                                        placeholder={
                                            isLoadingTags
                                                ? "Loading tags..."
                                                : "Select Tags"
                                        }
                                        multiSelect
                                        isCheckbox
                                        disabled={
                                            mode === "view" || isLoadingTags
                                        }
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
                                        value={
                                            formData.tag_IDs
                                                ? formData.tag_IDs
                                                      ?.map((tag) =>
                                                          tagOptions.find(
                                                              (opt) =>
                                                                  opt.label ===
                                                                      tag ||
                                                                  opt.value ===
                                                                      tag
                                                          )
                                                      )
                                                      .filter(
                                                          (
                                                              tag
                                                          ): tag is NonNullable<
                                                              typeof tag
                                                          > => tag !== undefined
                                                      )
                                                : []
                                        }
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

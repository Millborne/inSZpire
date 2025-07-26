import React, { useState, useEffect } from "react";
import {
  ConfirmationContent,
  Inputs,
  Modal,
  Toggle,
  SnackbarAlert,
} from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";

// assets
import jobTitleConfirmation from "../../../../assets/job_title_confirmation.png";
import archiveConfirmation from "../../../../assets/archive_confirmation.png";
import updateConfirmation from "../../../../assets/update_confirmation.png";

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
  setModalMode?: (mode: ModalMode) => void;
}

interface ValidationErrors {
  jobTitle?: string;
  description?: string;
  salary?: string;
}

const JobTitleModal: React.FC<JobTitleModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedJobTitle,
  onSave,
  setModalMode,
}) => {
  // Form state
  const [formData, setFormData] = useState<JobTitleDataType>({
    id: "",
    jobTitle: "",
    description: "",
    salary: "",
  });
  const [toggle, setToggle] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "update" | "add" | "archive"
  >("update");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"error" | "success">(
    "error"
  );

  // TODO: Backend Integration - Add loading state for form operations
  // const [isLoading, setIsLoading] = useState(false);

  // Load selected job title data when it changes
  useEffect(() => {
    if (selectedJobTitle) {
      setFormData(selectedJobTitle);
      setToggle(selectedJobTitle?.is_archived === 1 ? true : false);
    } else {
      setFormData({
        id: "",
        jobTitle: "",
        description: "",
        salary: "",
      });
      setToggle(false);
    }
    // Clear errors when modal opens or data changes
    setErrors({});
  }, [selectedJobTitle, isOpen]);

  // Handle input changes
  const handleInputChange = (field: keyof JobTitleDataType, value: string) => {
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

    if (!formData.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title name is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Job title description is required";
    }

    if (!formData.salary?.trim()) {
      newErrors.salary = "Salary is required";
    } else {
      const salaryValue = parseFloat(formData.salary.replace(/[₱,\s]/g, ""));
      if (isNaN(salaryValue) || salaryValue < 0) {
        newErrors.salary = "Please enter a valid salary amount";
      }
    }

    setErrors(newErrors);
    // Check if any data has been entered
    const hasData =
      formData.jobTitle?.trim() &&
      formData.description?.trim() &&
      formData.salary?.trim();

    if (!hasData) {
      setSnackbarMessage("Please fill all fields to proceed");
      setSnackbarType("error");
      setSnackbarOpen(true);
      return false;
    }
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Backend Integration - Add validation before saving
  const handleSave = async () => {
    // Validate form before saving
    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Add loading state
      // setIsLoading(true);

      if (onSave) {
        await onSave({ ...formData, is_archived: toggle ? 1 : 0 });
      }
      // onClose();
    } catch (error) {
      // TODO: Add error handling
      console.error("Error saving job title:", error);
    } finally {
      // TODO: Remove loading state
      // setIsLoading(false);
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
        formData.jobTitle !== selectedJobTitle?.jobTitle ||
        formData.description !== selectedJobTitle?.description ||
        formData.salary !== selectedJobTitle?.salary ||
        toggle !== (selectedJobTitle?.is_archived === 1);

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
    // const jobTitleName = formData.jobTitle || "Job Title";

    switch (confirmationAction) {
      case "add":
        return {
          image: jobTitleConfirmation,
          description: `Are you sure to add this job title?`,
          buttonLabel: "Add Job Title",
        };
      case "archive":
        return {
          image: archiveConfirmation,
          description: `Are you sure you want to archive this job title?`,
          buttonLabel: "Archive",
          buttonFooterIcon: <ArchiveBox />,
        };
      case "update":
      default:
        return {
          image: updateConfirmation,
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
              {
                label: "JOB TITLE",
                value: formData.jobTitle || "—",
              },
              {
                label: "DESCRIPTION",
                value: formData.description || "—",
              },
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
                ...(formData.jobTitle !== selectedJobTitle?.jobTitle
                  ? [
                      {
                        label: "Job Title",
                        value: "",
                        oldValue: selectedJobTitle?.jobTitle || "—",
                        newValue: formData.jobTitle || "—",
                      },
                    ]
                  : []),
                ...(formData.salary !== selectedJobTitle?.salary
                  ? [
                      {
                        label: "Salary",
                        value: "",
                        oldValue: selectedJobTitle?.salary || "—",
                        newValue: formData.salary || "—",
                      },
                    ]
                  : []),
                ...(formData.description !== selectedJobTitle?.description
                  ? [
                      {
                        label: "Description",
                        value: "",
                        oldValue: selectedJobTitle?.description || "—",
                        newValue: formData.description || "—",
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
        buttonLabel="Edit Job Title"
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
                label="JOB TITLE NAME"
                value={formData.jobTitle}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleInputChange("jobTitle", e.target.value)}
                error={!!errors.jobTitle}
                disabled={mode === "view"}
              />

              <div className="z-20">
                <Inputs
                  label="SALARY"
                  value={formData.salary}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => handleInputChange("salary", e.target.value)}
                  error={!!errors.salary}
                  disabled={mode === "view"}
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
            <Inputs
              label="JOB TITLE DESCRIPTION"
              className="h-[256px]"
              maxCharacter={200}
              isTextarea
              value={formData.description || ""}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleInputChange("description", e.target.value)}
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

export default JobTitleModal;

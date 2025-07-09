import React, { useEffect, useState } from "react";
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";

//component
import ConfirmationModal from "../../../../components/ConfirmationModal";

export interface TeamDataType {
  id: string;
  name: string;
  description?: string;
  reference?: string;
  manager?: string;
  tags?: string[];
}

export type ModalMode = "view" | "edit" | "add";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  selectedTeam?: TeamDataType | null;
  onSave?: (data: TeamDataType) => void;
}

const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedTeam,
  onSave,
}) => {
  const [formData, setFormData] = useState<TeamDataType>({
    id: "",
    name: "",
    description: "",
    reference: "",
    manager: "",
    tags: [],
  });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "update" | "add" | "archive"
  >("update");

  // Title
  const getTitle = () => {
    if (mode === "add") return "Add Team";
    if (mode === "edit") return "Edit Team";
    if (mode === "view") return "View Team";
    return "Team";
  };

  // Load selected account data when it changes
  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        id: selectedTeam.id || "",
        name: selectedTeam.name || "",
        description: selectedTeam.description || "",
        reference: selectedTeam.reference || "",
        manager: selectedTeam.manager || "",
        tags: selectedTeam.tags || [],
      });
      // TODO: Backend Integration - Set archived status from API data
      // setToggle(selectedAccount.isArchived || false);
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        reference: "",
        manager: "",
        tags: [],
      });
    }
  }, [selectedTeam]);

  // Handle input changes
  const handleInputChange = (
    field: keyof TeamDataType,
    value: string | string[]
  ) => {
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
      console.error("Error saving team:", error);
    } finally {
      // TODO: Remove loading state
      // setIsLoading(false);
    }
  };

  const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
    setConfirmationAction(action);
    setIsConfirmationModalOpen(true);
    onClose();
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
      label: mode === "add" ? "Add Team" : "Update Team",
      variant: "primary",
      onClick:
        mode === "edit"
          ? () => handleSave()
          : () => handleConfirmationOpen("add"),
      size: "medium",
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        showButton={mode !== "view" ? false : true}
        buttonLabel="Edit Tag"
        modalWidth="w-[900px]"
        contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
        headerOptions="left"
        footerOptions="stacked-left"
        footerButtons={footerButtons}
        content={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1 z-60">
            <div className="flex flex-col gap-[24px]">
              <Inputs
                label="TEAM NAME"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                // TODO: Backend Integration - Add validation
                // error={errors.name}
                // disabled={isLoading}
              />
              <div className="z-auto">
                <Dropdown
                  label="TEAM REFERENCE"
                  size="small"
                  options={[
                    { label: "Team 1", value: "team1" },
                    { label: "Team 2", value: "team2" },
                    { label: "Team 3", value: "team3" },
                  ]} //change options based on the backend
                  placeholder="Select team reference"
                  // value={
                  //   formData.reference
                  //     ? { label: formData.reference, value: formData.reference }
                  //     : null
                  // }
                  onSelectionChange={(value) => {
                    const referenceValue = Array.isArray(value)
                      ? value[0]?.value
                      : value?.value;
                    handleInputChange("reference", referenceValue || "");
                  }}
                  usePortal={true}
                />
              </div>
              <div className="z-auto">
                <Dropdown
                  label="MANAGED BY"
                  size="small"
                  options={[
                    { label: "John Doe", value: "john-doe" },
                    { label: "Jane Smith", value: "jane-smith" },
                    { label: "Michael Brown", value: "michael-brown" },
                  ]} //change options based on the backend
                  placeholder="Select manager"
                  // value={
                  //   formData.manager
                  //     ? { label: formData.manager, value: formData.manager }
                  //     : null
                  // }
                  onSelectionChange={(value) => {
                    const managerValue = Array.isArray(value)
                      ? value[0]?.value
                      : value?.value;
                    handleInputChange("manager", managerValue || "");
                  }}
                  usePortal={true}
                />
              </div>
              <div className="z-[90] h-[20px]">
                <Dropdown
                  label="TAGS"
                  placeholder="Select tags"
                  options={[
                    { label: "Tag 1", value: "tag1" },
                    { label: "Tag 2", value: "tag2" },
                  ]} //change options based on the backend
                  onSelectionChange={(value) => {
                    const tagValues = Array.isArray(value)
                      ? value.map((v) => v.value)
                      : value
                      ? [value.value]
                      : [];
                    handleInputChange("tags", tagValues);
                  }}
                  multiSelect
                  size="small"
                  usePortal={true}
                />
              </div>
            </div>
            <div className="z-0 mt-[40px] sm:mt-0">
              <Inputs
                label="TEAM DESCRIPTION"
                className="h-[256px]"
                maxCharacter={200}
                isTextarea
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                // TODO: Backend Integration - Add validation
                // error={errors.description}
                // disabled={isLoading}
              />
            </div>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onClick={async () => {
          try {
            if (confirmationAction === "add") {
              // TODO: Backend Integration - Call add API
              if (onSave) {
                await onSave(formData);
              }
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
        image="/src/assets/team_confirmation.png"
        description="Are you sure you want to add this team?"
        buttonLabel="Add Team"
      />
    </>
  );
};

export default TeamModal;

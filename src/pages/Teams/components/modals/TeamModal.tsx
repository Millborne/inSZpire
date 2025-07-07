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
      setFormData(selectedTeam);
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
  const handleInputChange = (field: keyof TeamDataType, value: string) => {
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
          ? () => handleConfirmationOpen("update")
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
            <div className="flex flex-col gap-[24px]">
              <Inputs
                label="TEAM NAME"
                value={formData.name}
                // onChange={(e) => handleInputChange("account", e.target.value)}
                // TODO: Backend Integration - Add validation
                // error={errors.account}
                // disabled={isLoading}
              />
              <div className="z-auto">
                <Dropdown
                  label="TEAM REFERENCE"
                  size="small"
                  options={[]} //add options based on the backend
                  placeholder="Select team reference"
                  value={
                    formData.reference
                      ? { label: formData.reference, value: formData.reference }
                      : undefined
                  }
                  onSelectionChange={(value) => {
                    const referenceValue = Array.isArray(value)
                      ? value[0]?.value
                      : value?.value;
                    // handleInputChange("reference", referenceValue || "");
                  }}
                />
              </div>
              <div className="z-auto">
                <Dropdown
                  label="MANAGED BY"
                  size="small"
                  options={[]} //add options based on the backend
                  placeholder="Select manager"
                  value={
                    formData.manager
                      ? { label: formData.manager, value: formData.manager }
                      : undefined
                  }
                  onSelectionChange={(value) => {
                    const managerValue = Array.isArray(value)
                      ? value[0]?.value
                      : value?.value;
                    // handleInputChange("reference", managerValue || "");
                  }}
                />
              </div>
              <div className="z-auto">
                <Dropdown
                  label="TAGS"
                  placeholder="Select tags"
                  options={[]} //add options based on the backend
                  onSelectionChange={() => {}}
                  multiSelect
                  size="small"
                />
              </div>
            </div>
            <div className="z-0">
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
              // TODO: Backend Integration - Call archive API
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

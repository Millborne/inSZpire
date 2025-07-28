import React, { useEffect, useState } from "react";
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";
import ConfirmationModal from "../../../../components/ConfirmationModal";

export interface SpecificTeamDataType {
  id: string;
  name: string;
  description?: string;
  reference?: string;
  status?: string;
  tags?: string[];
  parent_team_ID?: string;
}

export type ModalMode = "view" | "edit" | "add";

interface SpecificTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  selectedTeam?: SpecificTeamDataType | null;
  onSave?: (data: SpecificTeamDataType) => void;
  teamReferenceOptions?: { label: string; value: string }[];
  tagOptions?: { label: string; value: string }[];
}

const SpecificTeamModal: React.FC<SpecificTeamModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedTeam,
  onSave,
  teamReferenceOptions = [],
  tagOptions = [],
}) => {
  const [formData, setFormData] = useState<SpecificTeamDataType>({
    id: "",
    name: "",
    description: "",
    reference: "",
    status: "",
    tags: [],
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"update" | "add" | "archive">("add");

  const getTitle = () => {
    if (mode === "add") return "Add Team Info";
    if (mode === "edit") return "Edit Team Info";
    if (mode === "view") return "View Team Info";
    return "Team Info";
  };

  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        id: selectedTeam.id || "",
        name: selectedTeam.name || "",
        description: selectedTeam.description || "",
        reference: selectedTeam.reference || "",
        status: selectedTeam.status || "",
        tags: selectedTeam.tags || [],
      });
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        reference: "",
        status: "",
        tags: [],
      });
    }
  }, [selectedTeam]);

  const handleInputChange = (field: keyof SpecificTeamDataType, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
    setConfirmationAction(action);
    setIsConfirmationModalOpen(true);
  };

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

  if (mode !== "view") {
    footerButtons.push({
      label: mode === "add" ? "Add" : "Save",
      variant: "primary",
      onClick: () => handleConfirmationOpen(mode === "edit" ? "update" : "add"),
      size: "medium",
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        showButton={mode === "view"}
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
              />
              <div className="z-auto">
                <Dropdown
                  label="TEAM REFERENCE"
                  size="small"
                  options={teamReferenceOptions}
                  placeholder="Select team reference"
                  value={
                    formData.reference
                      ? teamReferenceOptions.find(opt => opt.value === formData.reference)
                      : undefined
                  }
                  onSelectionChange={(value) => {
                    const ref = Array.isArray(value) ? value[0]?.value : value?.value;
                    handleInputChange("reference", ref || "");
                  }}
                  usePortal={true}
                />
              </div>
              <div className="z-auto">
                <Dropdown
                  label="STATUS"
                  size="small"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Archived", value: "archived" },
                  ]}
                  placeholder="Select status"
                  value={
                    formData.status
                      ? { label: formData.status, value: formData.status }
                      : undefined
                  }
                  onSelectionChange={(value) => {
                    const status = Array.isArray(value) ? value[0]?.value : value?.value;
                    handleInputChange("status", status || "");
                  }}
                  usePortal={true}
                />
              </div>
              <div className="z-[90] h-[20px]">
                <Dropdown
                  label="TAGS"
                  placeholder="Select tags"
                  options={tagOptions}
                  value={formData.tags?.map(tag => ({
                    label: tagOptions.find(opt => opt.value === tag)?.label || tag,
                    value: tag
                  }))}
                  onSelectionChange={(value) => {
                    const tags = Array.isArray(value) ? value.map(v => v.value) : value ? [value.value] : [];
                    handleInputChange("tags", tags);
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
                onChange={(e) => handleInputChange("description", e.target.value)}
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
            if (onSave) {
              await onSave({
                ...formData,
                parent_team_ID: formData.reference,
              });
            }
            setIsConfirmationModalOpen(false);
            onClose();
          } catch (error) {
            console.error("Error in confirmation action:", error);
          }
        }}
        image="/src/assets/team_confirmation.png"
        description={
          confirmationAction === "add"
            ? "Are you sure you want to add this team?"
            : "Are you sure you want to update this team?"
        }
        buttonLabel={confirmationAction === "add" ? "Add Team" : "Update Team"}
      />
    </>
  );
};

export default SpecificTeamModal;

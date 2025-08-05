import React, { useEffect, useState } from "react";
import { Dropdown, Inputs, Modal, SnackbarAlert } from "enterprisze-global-components";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useViewTagsMutation } from "../../../../services/teams/tags/list/tagsAPI";
import { useActionTeamsMutation } from "../../../../services/teams/list/teamsAPI";

export interface SpecificTeamDataType {
  team_ID: string;
  team_code: string;
  team_name: string;
  team_description: string;
  team_reference_name?: string;
  parent_team_ID?: string;
  employees?: Array<any>;
  tags?: Array<any>;
  underlings?: Array<any>;
  status?: string;
  is_archived?: number;
}

export type ModalMode = "view" | "edit" | "add";

export interface SpecificTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  selectedTeam: SpecificTeamDataType | null;
  onSave: (updatedTeam: SpecificTeamDataType) => void;
}

const SpecificTeamModal: React.FC<SpecificTeamModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedTeam,
  onSave,
}) => {
  const [viewTags, { data: tagData }] = useViewTagsMutation();
  const [actionTeams] = useActionTeamsMutation();
  const [fetchTeams] = useActionTeamsMutation();

  const [formData, setFormData] = useState<SpecificTeamDataType>({
    team_ID: "",
    team_code: "",
    team_name: "",
    team_description: "",
    parent_team_ID: "",
    status: "",
    employees: [],
    tags: [],
  });

  const [tagOptions, setTagOptions] = useState<{ label: string; value: string }[]>([]);
  const [teamReferenceOptions, setTeamReferenceOptions] = useState<{ label: string; value: string }[]>([]);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"update" | "add" | "archive">("add");

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSuccess = (message: string) => {
    setSnackbarMessage(message);
    setShowSuccessSnackbar(true);
    setTimeout(() => setShowSuccessSnackbar(false), 3000);
  };

  // 🔹 Fetch tags when modal opens
  useEffect(() => {
    if (isOpen) {
      viewTags({ tag_type: "team", is_archived: 0, offset: 0, limit: 1000 });
    }
  }, [isOpen, viewTags]);

  // 🔹 Populate tag dropdown
  useEffect(() => {
    if (tagData?.data) {
      setTagOptions(
        tagData.data.map((tag: any) => ({
          label: tag.tag_name,
          value: tag.tag_ID,
        }))
      );
    }
  }, [tagData]);

  // 🔹 Populate team reference dropdown
  useEffect(() => {
    if (isOpen) {
      fetchTeams({
        queryParameters: "/view",
        method: "POST",
        body: { is_archived: 0, offset: 0, limit: 1000 },
      })
        .unwrap()
        .then((res) => {
          const filteredTeams = res.data
            .filter((team: any) => team.team_ID !== selectedTeam?.team_ID)
            .map((team: any) => ({
              label: team.team_name,
              value: team.team_ID,
            }));
          setTeamReferenceOptions(filteredTeams);
        })
        .catch(() => setTeamReferenceOptions([]));
    }
  }, [isOpen, fetchTeams, selectedTeam?.team_ID]);

  // 🔹 Populate form when modal opens
  useEffect(() => {
    if (selectedTeam) {
      const currentTagIDs = selectedTeam.tags?.map((tag: any) => tag.tag_ID) || [];
      setFormData({
        team_ID: selectedTeam.team_ID || "",
        team_code: selectedTeam.team_code || "",
        team_name: selectedTeam.team_name || "",
        team_description: selectedTeam.team_description || "",
        parent_team_ID: selectedTeam.parent_team_ID || "",
        status: selectedTeam.status || "",
        employees: selectedTeam.employees || [],
        tags: currentTagIDs,
        is_archived: selectedTeam.is_archived,
      });
    }
  }, [selectedTeam]);

  const handleInputChange = (field: keyof SpecificTeamDataType, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
    setConfirmationAction(action);
    setIsConfirmationModalOpen(true);
  };

  const footerButtons = [
    { label: "Cancel", variant: "ghost" as const, onClick: onClose, size: "medium" as const },
    ...(mode !== "view"
      ? [
          {
            label: mode === "add" ? "Add" : "Save",
            variant: "primary" as const,
            onClick: () => handleConfirmationOpen(mode === "edit" ? "update" : "add"),
            size: "medium" as const,
          },
        ]
      : []),
  ];

  const handleUpdate = async () => {
    const updateData: any = {};
    if (formData.team_code) updateData.team_code = formData.team_code;
    if (formData.team_name) updateData.team_name = formData.team_name;
    if (formData.team_description) updateData.team_description = formData.team_description;
    if (formData.is_archived !== undefined) updateData.is_archived = formData.is_archived;
    if (formData.parent_team_ID) updateData.parent_team_ID = formData.parent_team_ID;
    if (formData.tags && formData.tags.length > 0) updateData.tag_IDs = formData.tags;

    try {
      // 🔄 Update API
      await actionTeams({
        queryParameters: "/update",
        method: "PUT",
        body: {
          team_ID: formData.team_ID,
          ...updateData,
        },
      }).unwrap();

      // 🔄 Fetch updated team
      const viewRes = await fetchTeams({
        queryParameters: "/view",
        method: "POST",
        body: { team_ID: formData.team_ID },
      }).unwrap();

      const updatedTeam = viewRes.data.find(
        (t: any) => t.team_ID === formData.team_ID
      );
      console.log("🔥 Updated Team from /view:", updatedTeam);

      // 🔄 Pass updated data back to parent
      if (updatedTeam) {
        onSave(updatedTeam);
      }

      setIsConfirmationModalOpen(false);
      handleSuccess("Successfully updated team!");
      onClose();
    } catch (error) {
      console.error("❌ Error updating team:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          mode === "add" ? "Add Team Info" : mode === "edit" ? "Edit Team Info" : "View Team Info"
        }
        modalWidth="w-[900px]"
        contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
        headerOptions="left"
        footerButtons={footerButtons}
        content={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
            <div className="flex flex-col gap-[24px]">
              <Inputs label="TEAM NAME" value={formData.team_name} onChange={(e) => handleInputChange("team_name", e.target.value)} />
              <Inputs label="TEAM CODE" value={formData.team_code} onChange={(e) => handleInputChange("team_code", e.target.value)} />
              <Dropdown
                label="TEAM REFERENCE"
                size="small"
                options={teamReferenceOptions}
                placeholder="Select team reference"
                value={
                  formData.parent_team_ID
                    ? teamReferenceOptions.find(opt => opt.value === formData.parent_team_ID)
                    : undefined
                }
                onSelectionChange={(value) => {
                  const ref = Array.isArray(value) ? value[0]?.value : value?.value;
                  handleInputChange("parent_team_ID", ref || "");
                }}
                usePortal
              />
              <Dropdown
                label="STATUS"
                size="small"
                options={[
                  { label: "Active", value: "0" },
                  { label: "Archived", value: "1" },
                ]}
                placeholder="Select status"
                value={
                  formData.is_archived !== undefined
                    ? {
                        label: formData.is_archived === 0 ? "Active" : "Archived",
                        value: formData.is_archived.toString(),
                      }
                    : undefined
                }
                onSelectionChange={(value) => {
                  const selectedValue = Array.isArray(value) ? value[0]?.value : value?.value;
                  handleInputChange("is_archived", selectedValue === "1" ? 1 : 0);
                }}
                usePortal
              />
              <Dropdown
                label="TAGS"
                placeholder="Select tags"
                options={tagOptions}
                value={formData.tags?.map((tagID) => ({
                  label: tagOptions.find(opt => opt.value === tagID)?.label || tagID,
                  value: tagID,
                }))}
                onSelectionChange={(value) => {
                  const tags = Array.isArray(value) ? value.map(v => v.value) : value ? [value.value] : [];
                  handleInputChange("tags", tags);
                }}
                multiSelect
                size="small"
                usePortal
              />
            </div>
            <div>
              <Inputs
                label="TEAM DESCRIPTION"
                className="h-[256px]"
                maxCharacter={200}
                isTextarea
                value={formData.team_description || ""}
                onChange={(e) => handleInputChange("team_description", e.target.value)}
              />
            </div>
          </div>
        }
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onClick={handleUpdate}
        image="/src/assets/team_confirmation.png"
        description={
          confirmationAction === "add" ? "Are you sure you want to add this team?" : "Are you sure you want to update this team?"
        }
        buttonLabel={confirmationAction === "add" ? "Add Team" : "Update Team"}
      />

      <SnackbarAlert
        isOpen={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
        showCloseButton={true}
        type="success"
        title={snackbarMessage}
        animation="slide-up"
      />
    </>
  );
};

export default SpecificTeamModal;

































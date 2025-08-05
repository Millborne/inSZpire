// import React, { useEffect, useState } from "react";
// import { Dropdown, Inputs, Modal } from "enterprisze-global-components";

// //component
// import ConfirmationModal from "../../../../components/ConfirmationModal";

// export interface TeamDataType {
//   id: string;
//   team_ID?: string;
//   name: string;
//   description?: string;
//   reference?: string;
//   manager?: string;
//   tags?: string[];
// }

// export type ModalMode = "view" | "edit" | "add";

// interface TeamModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: ModalMode;
//   selectedTeam?: TeamDataType | null;
//   onSave?: (data: TeamDataType) => void;
// }

// const TeamModal: React.FC<TeamModalProps> = ({
//   isOpen,
//   onClose,
//   mode,
//   selectedTeam,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState<TeamDataType>({
//     id: "",
//     name: "",
//     description: "",
//     reference: "",
//     manager: "",
//     tags: [],
//   });
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState<
//     "update" | "add" | "archive"
//   >("update");

//   // Title
//   const getTitle = () => {
//     if (mode === "add") return "Add Team";
//     if (mode === "edit") return "Edit Team";
//     if (mode === "view") return "View Team";
//     return "Team";
//   };

//   // Load selected account data when it changes
//   useEffect(() => {
//     if (selectedTeam) {
//       setFormData({
//         id: selectedTeam.id || "",
//         name: selectedTeam.name || "",
//         description: selectedTeam.description || "",
//         reference: selectedTeam.reference || "",
//         manager: selectedTeam.manager || "",
//         tags: selectedTeam.tags || [],
//       });
//       // TODO: Backend Integration - Set archived status from API data
//       // setToggle(selectedAccount.isArchived || false);
//     } else {
//       setFormData({
//         id: "",
//         name: "",
//         description: "",
//         reference: "",
//         manager: "",
//         tags: [],
//       });
//     }
//   }, [selectedTeam]);

//   // Handle input changes
//   const handleInputChange = (
//     field: keyof TeamDataType,
//     value: string | string[]
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // TODO: Backend Integration - Add validation before saving
//   const handleSave = async () => {
//     try {
//       // TODO: Add loading state
//       // setIsLoading(true);

//       if (onSave) {
//         await onSave(formData);
//       }
//       onClose();
//     } catch (error) {
//       // TODO: Add error handling
//       console.error("Error saving team:", error);
//     } finally {
//       // TODO: Remove loading state
//       // setIsLoading(false);
//     }
//   };

//   const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
//     setConfirmationAction(action);
//     setIsConfirmationModalOpen(true);
//     onClose();
//   };

//   // Footer buttons
//   const footerButtons: Array<{
//     label: string;
//     variant: "ghost" | "primary";
//     onClick: () => void;
//     size: "medium";
//   }> = [
//     {
//       label: "Cancel",
//       variant: "ghost",
//       onClick: onClose,
//       size: "medium",
//     },
//   ];

//   // Add save button if not in view mode
//   if (mode !== "view") {
//     footerButtons.push({
//       label: mode === "add" ? "Add Team" : "Update Team",
//       variant: "primary",
//       onClick:
//         mode === "edit"
//           ? () => handleSave()
//           : () => handleConfirmationOpen("add"),
//       size: "medium",
//     });
//   }

//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         title={getTitle()}
//         showButton={mode !== "view" ? false : true}
//         buttonLabel="Edit Tag"
//         modalWidth="w-[900px]"
//         contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
//         headerOptions="left"
//         footerOptions="stacked-left"
//         footerButtons={footerButtons}
//         content={
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1 z-60">
//             <div className="flex flex-col gap-[24px]">
//               <Inputs
//                 label="TEAM NAME"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 // TODO: Backend Integration - Add validation
//                 // error={errors.name}
//                 // disabled={isLoading}
//               />
//               <div className="z-auto">
//                 <Dropdown
//                   label="TEAM REFERENCE"
//                   size="small"
//                   options={[
//                     { label: "Team 1", value: "team1" },
//                     { label: "Team 2", value: "team2" },
//                     { label: "Team 3", value: "team3" },
//                   ]} //change options based on the backend
//                   placeholder="Select team reference"
//                   // value={
//                   //   formData.reference
//                   //     ? { label: formData.reference, value: formData.reference }
//                   //     : null
//                   // }
//                   onSelectionChange={(value) => {
//                     const referenceValue = Array.isArray(value)
//                       ? value[0]?.value
//                       : value?.value;
//                     handleInputChange("reference", referenceValue || "");
//                   }}
//                   usePortal={true}
//                 />
//               </div>
//               <div className="z-auto">
//                 <Dropdown
//                   label="MANAGED BY"
//                   size="small"
//                   options={[
//                     { label: "John Doe", value: "john-doe" },
//                     { label: "Jane Smith", value: "jane-smith" },
//                     { label: "Michael Brown", value: "michael-brown" },
//                   ]} //change options based on the backend
//                   placeholder="Select manager"
//                   // value={
//                   //   formData.manager
//                   //     ? { label: formData.manager, value: formData.manager }
//                   //     : null
//                   // }
//                   onSelectionChange={(value) => {
//                     const managerValue = Array.isArray(value)
//                       ? value[0]?.value
//                       : value?.value;
//                     handleInputChange("manager", managerValue || "");
//                   }}
//                   usePortal={true}
//                 />
//               </div>
//               <div className="z-[90] h-[20px]">
//                 <Dropdown
//                   label="TAGS"
//                   placeholder="Select tags"
//                   options={[
//                     { label: "Tag 1", value: "tag1" },
//                     { label: "Tag 2", value: "tag2" },
//                   ]} //change options based on the backend
//                   onSelectionChange={(value) => {
//                     const tagValues = Array.isArray(value)
//                       ? value.map((v) => v.value)
//                       : value
//                       ? [value.value]
//                       : [];
//                     handleInputChange("tags", tagValues);
//                   }}
//                   multiSelect
//                   size="small"
//                   usePortal={true}
//                 />
//               </div>
//             </div>
//             <div className="z-0 mt-[40px] sm:mt-0">
//               <Inputs
//                 label="TEAM DESCRIPTION"
//                 className="h-[256px]"
//                 maxCharacter={200}
//                 isTextarea
//                 value={formData.description || ""}
//                 onChange={(e) =>
//                   handleInputChange("description", e.target.value)
//                 }
//                 // TODO: Backend Integration - Add validation
//                 // error={errors.description}
//                 // disabled={isLoading}
//               />
//             </div>
//           </div>
//         }
//       />
//       <ConfirmationModal
//         isOpen={isConfirmationModalOpen}
//         onClose={() => setIsConfirmationModalOpen(false)}
//         onClick={async () => {
//           try {
//             if (confirmationAction === "add") {
//               // TODO: Backend Integration - Call add API
//               if (onSave) {
//                 await onSave(formData);
//               }
//               setIsConfirmationModalOpen(false);
//             } else {
//               handleSave();
//               setIsConfirmationModalOpen(false);
//             }
//           } catch (error) {
//             // TODO: Add error handling
//             console.error("Error in confirmation action:", error);
//           }
//         }}
//         image="/src/assets/team_confirmation.png"
//         description="Are you sure you want to add this team?"
//         buttonLabel="Add Team"
//       />
//     </>
//   );
// };

// export default TeamModal;
import React, { useEffect, useState, useCallback } from "react";
import { Inputs, Modal, Dropdown } from "enterprisze-global-components";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useActionTeamsMutation } from "../../../../services/teams/list/teamsAPI";
import { useViewTagsMutation } from "../../../../services/settings/tags/list/tagsAPI";

export interface TeamDataType {
  team_ID?: string;
  team_code: string;
  team_name: string;
  team_description?: string;
  team_logo?: string | File;
  parent_team_ID?: string | null;
  node?: string;
  is_archived?: number;
  created_by?: string;
  updated_by?: string;
  tag_IDs?: string[];
  acc_ID?: any;
}

export type ModalMode = "view" | "edit" | "add";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  selectedTeam?: TeamDataType | null;
  onSave?: (data: TeamDataType) => void;
}

interface TagOption {
  label: string;
  value: string;
}

const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedTeam,
  onSave,
}) => {
  const [formData, setFormData] = useState<TeamDataType>({
    team_code: "",
    team_name: "",
    team_description: "",
    parent_team_ID: null,
    tag_IDs: [],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"update" | "add">("add");

  const [actionTeams] = useActionTeamsMutation();
  const [viewTags, { data: tagData }] = useViewTagsMutation();
  const [teamReferenceOptions, setTeamReferenceOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    viewTags({ tag_type: "team", is_archived: 0, offset: 0, limit: 1000 });

    // Fetch team references internally
    actionTeams({
      queryParameters: "/view",
      method: "POST",
      body: { is_archived: 0, offset: 0, limit: 1000 },
    })
      .unwrap()
      .then((res) => {
        const options = res.data.map((team: any) => ({
          label: team.team_name,
          value: team.team_ID,
        }));
        setTeamReferenceOptions(options);
      })
      .catch(() => setTeamReferenceOptions([]));

    // Reset form
    if (mode === "add" && !selectedTeam) {
      setFormData({
        team_code: "",
        team_name: "",
        team_description: "",
        parent_team_ID: null,
        tag_IDs: [],
      });
    } else if (selectedTeam) {
      setFormData({
        team_ID: selectedTeam.team_ID || "",
        team_code: selectedTeam.team_code || "",
        team_name: selectedTeam.team_name || "",
        team_description: selectedTeam.team_description || "",
        parent_team_ID: selectedTeam.parent_team_ID || null,
        team_logo: selectedTeam.team_logo || "",
        node: selectedTeam.node,
        is_archived: selectedTeam.is_archived,
        created_by: selectedTeam.created_by,
        updated_by: selectedTeam.updated_by,
        tag_IDs: selectedTeam.tag_IDs || [],
      });
    }
  }, [isOpen, selectedTeam, mode]);

  const getTitle = () =>
    mode === "add" ? "Add Team" : mode === "edit" ? "Edit Team Info" : "View Team Info";

  const handleInputChange = (field: keyof TeamDataType, value: any) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => ({ ...prev, [field]: value ?? "" }));
  };

  const validateFields = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.team_code?.trim()) errors.team_code = "Team code is required.";
    if (!formData.team_name?.trim()) errors.team_name = "Team name is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = useCallback(async () => {
    if (!validateFields()) return;

    const cleanedTagIDs = Array.isArray(formData.tag_IDs)
      ? formData.tag_IDs.filter(Boolean)
      : [];

    const isUpdate = confirmationAction === "update" || mode === "edit";
    const bodyToSend = {
      ...formData,
      tag_IDs: cleanedTagIDs,
      ...(isUpdate ? { team_ID: formData.team_ID } : {}),
      parent_team_ID: formData.parent_team_ID || null,
    };

    const method = isUpdate ? "PUT" : "POST";
    const endpoint = isUpdate ? "/update" : "/";

    try {
      const response = await actionTeams({
        queryParameters: endpoint,
        method,
        body: bodyToSend,
      }).unwrap();

      if (onSave) onSave(response.data || formData);

      setIsConfirmationModalOpen(false);
      onClose();
    } catch (err) {
      console.error(`❌ Error ${isUpdate ? "updating" : "creating"} team:`, err);
    }
  }, [formData, mode, confirmationAction, actionTeams, onSave, onClose]);

  const tags: TagOption[] = (tagData?.data || []).map((tag: any) => ({
    label: tag.tag_name,
    value: tag.tag_ID,
  }));

  const selectedTags: TagOption[] = tags.filter((tag) =>
    (formData.tag_IDs ?? []).includes(tag.value)
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        showButton={false}
        modalWidth="w-[900px]"
        contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
        footerButtons={[
          { label: "Cancel", variant: "ghost" as const, onClick: onClose },
          ...(mode !== "view"
            ? [
                {
                  label: mode === "add" ? "Add Team" : "Save",
                  variant: "primary" as const,
                  onClick: () => setIsConfirmationModalOpen(true),
                },
              ]
            : []),
        ]}
        content={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1 z-60">
            <div className="flex flex-col gap-[24px]">
              <Inputs
                label="TEAM NAME"
                value={formData.team_name}
                error={!!formErrors.team_name}
                onChange={(e) => handleInputChange("team_name", e.target.value)}
              />
              <Inputs
                label="TEAM CODE"
                value={formData.team_code}
                error={!!formErrors.team_code}
                onChange={(e) => handleInputChange("team_code", e.target.value)}
              />
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
                label="TAGS"
                placeholder="Select tags"
                options={tags}
                value={selectedTags}
                onSelectionChange={(value) => {
                  const ids = Array.isArray(value) ? value.map(v => v.value) : value ? [value.value] : [];
                  handleInputChange("tag_IDs", ids);
                }}
                multiSelect
                size="small"
                usePortal
              />
            </div>
            <div className="z-0 mt-[40px] sm:mt-0">
              <Inputs
                label="TEAM DESCRIPTION"
                className="h-[256px]"
                maxCharacter={200}
                isTextarea
                value={formData.team_description || ""}
                onChange={(e) =>
                  handleInputChange("team_description", e.target.value)
                }
              />
            </div>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onClick={handleSave}
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

export default TeamModal;




















































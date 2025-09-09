import React from "react";
import { Modal } from "enterprisze-global-components";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
      showButton={false}
      modalWidth="w-[900px]"
      contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
      footerButtons={[
        { label: "Cancel", variant: "ghost" as const, onClick: onClose },
        {
          label: "Add Team Member",
          variant: "primary" as const,
          onClick: () => {
            // TODO: Implement add team member logic
            console.log("Add Team Member clicked");
            if (onSave) onSave({});
            onClose();
          },
        },
      ]}
      content={
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-szBlack800">
            Add Team Member Modal
          </h2>
        </div>
      }
    />
  );
};

export default AddTeamMemberModal;

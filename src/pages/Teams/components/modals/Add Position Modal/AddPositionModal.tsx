import React from "react";
import { Modal } from "enterprisze-global-components";

interface AddPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Position"
      showButton={false}
      modalWidth="w-[900px]"
      contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
      footerButtons={[
        { label: "Cancel", variant: "ghost" as const, onClick: onClose },
        {
          label: "Add Position",
          variant: "primary" as const,
          onClick: () => {
            // TODO: Implement add position logic
            console.log("Add Position clicked");
            if (onSave) onSave({});
            onClose();
          },
        },
      ]}
      content={
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-szBlack800">
            Add Position Modal
          </h2>
        </div>
      }
    />
  );
};

export default AddPositionModal;

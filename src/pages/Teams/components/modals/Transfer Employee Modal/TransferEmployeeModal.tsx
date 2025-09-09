import React from "react";
import { Modal } from "enterprisze-global-components";

interface TransferEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const TransferEmployeeModal: React.FC<TransferEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transfer Employee"
      showButton={false}
      modalWidth="w-[900px]"
      contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
      footerButtons={[
        { label: "Cancel", variant: "ghost" as const, onClick: onClose },
        {
          label: "Transfer Employee",
          variant: "primary" as const,
          onClick: () => {
            // TODO: Implement transfer employee logic
            console.log("Transfer Employee clicked");
            if (onSave) onSave({});
            onClose();
          },
        },
      ]}
      content={
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-szBlack800">
            Transfer Employee Modal
          </h2>
        </div>
      }
    />
  );
};

export default TransferEmployeeModal;

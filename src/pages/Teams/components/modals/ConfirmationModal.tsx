import { Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  image?: string; // ✅ optional
  description: string;
  content?: React.ReactNode;
  buttonLabel: string;
  buttonFooterIcon?: React.ReactNode;
  contentHeight?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onClick,
  image,
  description,
  content,
  buttonLabel,
  buttonFooterIcon,
  contentHeight = "h-auto min-h-[150px] max-h-[55vh]",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeaderDivider={false}
      showFooterDivider={false}
      icon={<InfoCircle />}
      title="Confirmation"
      showButton={false}
      modalWidth="w-[600px]"
      contentHeight={contentHeight}
      headerOptions="left"
      footerOptions="center"
      showCloseIcon={false}
      footerButtons={[
        {
          label: "Cancel",
          variant: "ghost",
          onClick: () => {
            console.log("❌ Cancel button clicked");
            onClose();
          },
          size: "medium",
        },
        {
  label: buttonLabel,
  variant: "primary",
  onClick: () => {
    console.log("🟢 Confirm button clicked → Calling onClick()");
    try {
      console.log("try test")
      onClick(); // <--- this is the handleConfirmationClick
    } catch (err) {
      console.error("🔥 Error calling onClick:", err);
    }
  },
  size: "medium",
  leftIcon: buttonFooterIcon,
}
,
      ]}
      content={
        <div className="flex flex-col gap-[8px] items-center">
          {image && <img src={image} alt="confirmation" className="w-[80px]" />}
          <p className="text-body-base-strong text-szBlack800 text-center">
            {description}
          </p>
          <div className="flex flex-col gap-[8px] w-full">{content}</div>
        </div>
      }
    />
  );
};

export default ConfirmationModal;



import { Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import React from "react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    description: string;
    subDescription: string;
    buttonLabel: string;
    buttonFooterIcon?: React.ReactNode;
    contentHeight?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onClick,
    description,
    subDescription,
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
            modalWidth="w-[447px]"
            contentHeight={contentHeight}
            headerOptions="left"
            footerOptions="center"
            showCloseIcon={false}
            footerButtons={[
                {
                    label: "Cancel",
                    variant: "ghost",
                    onClick: () => onClose(),
                    size: "medium",
                },
                {
                    label: buttonLabel,
                    variant: "primary",
                    onClick: () => onClick(),
                    size: "medium",
                    leftIcon: buttonFooterIcon,
                },
            ]}
            content={
                <div className="flex flex-col gap-[16px] py-[20px] items-center">
                    <p className="text-h3 text-szBlack800 font-montserrat text-center">{description}</p>
                    <p className="text-body-base-strong font-montserrat text-szBlack500 text-center">{subDescription}</p>
                </div>
            }
        />
    );
};

export default ConfirmationModal;

import { useState } from "react";
import { Modal, PendingRequestContent } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";

interface FamilyPendingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCloseConfirmation?: () => void;
    onSubmitSuccess?: () => void;
}

const pendingFamilyMember = {
    title: "Lee, Keith Lloyd",
    previous: [
        {
            label: "Contact Number",
            value: "-",
            newValue: "09123456786",
        },
    ],
    current: [
        {
            label: "Contact Number",
            value: "-",
            newValue: "09123456786",
        },
    ],
};

const FamilyPendingModal: React.FC<FamilyPendingModalProps> = ({ isOpen, onClose, onCloseConfirmation, onSubmitSuccess }) => {
    const [selectedType, setSelectedType] = useState<"previous" | "current" | undefined>(undefined);

    const handleSubmitToHR = () => {
        onClose();
        if (onCloseConfirmation) {
            onCloseConfirmation();
        }
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showHeaderDivider={false}
            showFooterDivider={false}
            icon={<InfoCircle />}
            title="Pending request(s)"
            showButton={false}
            modalWidth="w-[600px]"
            contentHeight="h-[65vh]"
            headerOptions="left"
            footerOptions="center"
            footerButtons={[
                {
                    label: "Cancel",
                    variant: "ghost",
                    onClick: () => onClose(),
                    size: "medium",
                },
                {
                    label: "Submit to HR",
                    variant: "primary",
                    onClick: handleSubmitToHR,
                    size: "medium",
                },
            ]}
            content={
                <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-col gap-[8px]">
                        <p className="text-body-base-strong text-szBlack800 text-center">
                            From your pending requests, you’ve updated the same field(s)
                        </p>
                        <div className="flex flex-col gap-[8px]">
                            <PendingRequestContent
                                variant="add"
                                title={pendingFamilyMember.title}
                                previous={pendingFamilyMember.previous}
                                current={pendingFamilyMember.current}
                                onSelect={(type, data) => {
                                    setSelectedType(type);
                                }}
                                selectedType={selectedType}
                            />
                            <PendingRequestContent
                                variant="add"
                                title={pendingFamilyMember.title}
                                previous={pendingFamilyMember.previous}
                                current={pendingFamilyMember.current}
                                onSelect={(type, data) => {
                                    setSelectedType(type);
                                }}
                                selectedType={selectedType}
                            />
                        </div>
                    </div>
                </div>
            }
        ></Modal>
    );
};

export default FamilyPendingModal;

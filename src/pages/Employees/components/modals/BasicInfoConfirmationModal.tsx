import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { basicInfoData } from "./BasicInfoModal";
import { useState } from "react";
import BasicInfoPendingModal from "./BasicInfoPendingModal";

interface BasicInfoConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    basicInfoData: basicInfoData[];
    onSubmitSuccess?: () => void;
}

const BasicInfoConfirmationModal: React.FC<BasicInfoConfirmationModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [isBasicInfoPendingModalOpen, setIsBasicInfoPendingModalOpen] = useState(false);

    const handlePendingCheck = () => {
        setIsBasicInfoPendingModalOpen(true);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                showFooterDivider={false}
                icon={<InfoCircle />}
                title="Confirmation"
                showButton={false}
                modalWidth="w-[600px]"
                contentHeight="h-[65vh]"
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
                        label: "Proceed",
                        variant: "primary",
                        onClick: handlePendingCheck,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to update your basic info.</p>
                            <div className="flex flex-col gap-[16px]">
                                <ConfirmationContent
                                    variant="edit"
                                    sectionLabel="BIRTHDAY"
                                    data={[
                                        {
                                            label: "Place of Birth",
                                            value: "",
                                            oldValue:
                                                "Blk 5 Lot 3, Villa Luz Subdivision, Barangay Bayan Luma V, Imus City, Cavite, Region IV-A",
                                            newValue:
                                                "Blk 5 Lot 3, Villa Luz Subdivision, Barangay Bayan Luma V, Imus City, Cavite, Region IV-A",
                                        },
                                    ]}
                                />
                                <ConfirmationContent
                                    variant="edit"
                                    sectionLabel="FULL NAME"
                                    data={[
                                        {
                                            label: "Extension",
                                            value: "",
                                            oldValue: "Jr",
                                            newValue: "Jr., CPA",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
            <BasicInfoPendingModal
                isOpen={isBasicInfoPendingModalOpen}
                onClose={() => setIsBasicInfoPendingModalOpen(false)}
                onCloseConfirmation={onClose}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default BasicInfoConfirmationModal;

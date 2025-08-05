import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import BasicInfoPendingModal from "./BasicInfoPendingModal";
import { employeePositionData } from "./EmployeePositionModal";
import Layer2 from "../../../../assets/Layer_2.svg";

interface EmployeePositionConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeePositionData: employeePositionData[];
    onSubmitSuccess?: () => void;
}

const EmployeePositionConfirmationModal: React.FC<EmployeePositionConfirmationModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
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
                contentHeight="h-[383px]"
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
                        label: "Update Position",
                        variant: "primary",
                        onClick: handlePendingCheck,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <img src={Layer2} alt="Layer 2" className="w-[80px] h-[80px] mx-auto" />
                            <p className="text-body-base-strong text-szBlack800 text-center">
                                You are about to update the position of John Smith Fernandez
                            </p>
                            <div className="flex flex-col gap-[16px]">
                                <ConfirmationContent
                                    variant="edit"
                                    sectionLabel="POSITION"
                                    data={[
                                        {
                                            label: "POSITION",
                                            value: "",
                                            oldValue: "Junior Software Developer",
                                            newValue: "Senior Software Developer",
                                        },
                                        {
                                            label: "POSITION STATUS",
                                            value: "",
                                            oldValue: "Regular",
                                            newValue: "Trainee",
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

export default EmployeePositionConfirmationModal;




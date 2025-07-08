// import { useState } from "react";

// icons

// components
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";
import { useState } from "react";
import EmployeePositionConfirmationModal from "./EmployeePositionConfirmationModal";

export interface employeePositionData {
    startDate: string;
    position: string;
    positionStatus: string;
}

interface EmployeePositionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    employeePositionData: employeePositionData;
}

const EmployeePositionModal: React.FC<EmployeePositionModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentEmployeePositionData, setCurrentEmployeePositionData] = useState<employeePositionData | null>(null);

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentEmployeePositionData(null);
    };

    const handleProceed = () => {
        setShowConfirmationModal(true);
        onClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Update Position for Employee"
                modalWidth="w-[900px]"
                contentHeight="h-[383px]"
                showButton={false}
                footerOptions="stacked-left"
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
                        onClick: handleProceed,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="grid grid-cols-1 gap-4 pt-1 items-start relative z-50">
                            <Inputs label="START DATE" placeholder="12/01/2022" />

                            <div className="flex flex-col lg:flex-row gap-[16px] z-50">
                                <Dropdown label="POSITION" placeholder="Junior Developer 2" options={[]} onSelectionChange={() => {}} />

                                <Dropdown label="POSITION STATUS" placeholder="Trainee" options={[]} onSelectionChange={() => {}} />
                            </div>
                        </div>
                    </div>
                }
            />

            <EmployeePositionConfirmationModal
                isOpen={showConfirmationModal}
                onClose={handleConfirmationClose}
                employeePositionData={currentEmployeePositionData ? [currentEmployeePositionData] : []}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default EmployeePositionModal;

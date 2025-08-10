import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { employeePositionData } from "./EmployeePositionModal";
import Layer2 from "../../../../assets/Layer_2.svg";

interface EmployeePositionConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeePositionData: employeePositionData | null;
    employeeName?: string;
    currentPositionName?: string;
    currentPositionStatus?: string;
    onSubmitSuccess?: () => void;
}

const EmployeePositionConfirmationModal: React.FC<EmployeePositionConfirmationModalProps> = ({ 
    isOpen, 
    onClose, 
    employeePositionData,
    employeeName = "Employee",
    currentPositionName = "Current Position",
    currentPositionStatus = "Current Status",
    onSubmitSuccess 
}) => {
    const handleUpdatePosition = () => {
        onClose();
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
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
                        onClick: handleUpdatePosition,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <img src={Layer2} alt="Layer 2" className="w-[80px] h-[80px] mx-auto" />
                            <p className="text-body-base-strong text-szBlack800 text-center">
                                You are about to update the position of {employeeName}
                            </p>
                            <div className="flex flex-col gap-[16px]">
                                <ConfirmationContent
                                    variant="edit"
                                    sectionLabel="POSITION"
                                    data={[
                                        {
                                            label: "POSITION",
                                            value: "",
                                            oldValue: currentPositionName,
                                            newValue: employeePositionData?.position || "New Position",
                                        },
                                        {
                                            label: "POSITION STATUS",
                                            value: "",
                                            oldValue: currentPositionStatus,
                                            newValue: employeePositionData?.positionStatus || "New Status",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default EmployeePositionConfirmationModal;




import { Avatar, ConfirmationContent, Modal, TextContent } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import BasicInfoPendingModal from "./BasicInfoPendingModal";
import { addEmployeeData } from "./EmployeeModal";
import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";

interface EmployeeConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    addEmployeeData: addEmployeeData[];
    onSubmitSuccess?: () => void;
}

const nameAndBirthdayData = [
    { label: "Extension", value: "Jr." },
    { label: "First Name", value: "John" },
    { label: "Middle Name", value: "Stephen" },
    { label: "Last Name", value: "Bardagulan" },
    { label: "Nickname", value: "Dacutan" },
    { label: "Date of Birth", value: "12/01/2000" },
    { label: "Honors Received", value: "Honors Received" },
];

const workData = [
    { label: "Date Hired", value: "12/01/2020" },
    { label: "Position", value: "Junior Developer 2" },
    { label: "Position Status", value: "Trainee" },
];

const otherData = [
    { label: "Religion", value: "Roman Catholic" },
    { label: "Civil Status", value: "Single" },
    { label: "Blood Type", value: "B+" },
];

const addressData = [
    { label: "Region", value: "Region X" },
    { label: "Province", value: "Misamis Oriental" },
    { label: "City / Municipality", value: "CDO City" },
    { label: "Barangay", value: "Carmen" },
];

const EmployeeConfirmationModal: React.FC<EmployeeConfirmationModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [isBasicInfoPendingModalOpen, setIsBasicInfoPendingModalOpen] = useState(false);

    const [profileImg, setProfileImg] = useState<string | undefined>();

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
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to add this employee.</p>
                            <div className="flex flex-row items-center justify-center gap-[8px]">
                                <Avatar size="xsmall" src={profileImg || SZOfficialLogo} />
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong font-dmsans text-szBlack800">John Stephen Bardagulan Dacutan</p>
                                    {/* <p className="text-body-base-strong text-szBlack800">junior developer 2</p> */}
                                    <TextContent header="junior developer 2" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[16px]">
                                <ConfirmationContent variant="add" sectionLabel="NAME AND BIRTHDAY" data={nameAndBirthdayData} />
                                <ConfirmationContent variant="add" sectionLabel="WORK" data={workData} />
                                <ConfirmationContent variant="add" sectionLabel="ADDRESS" data={addressData} />
                                <ConfirmationContent variant="add" sectionLabel="OTHERS" data={otherData} />
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

export default EmployeeConfirmationModal;

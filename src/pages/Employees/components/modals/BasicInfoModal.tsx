import { useState } from "react";

// icons

// components
import { Checkbox, Dropdown, Inputs, Modal } from "enterprisze-global-components";
import BasicInfoConfirmationModal from "./BasicInfoConfirmationModal";
//   import DeleteConfirmation from "../../../../components/DeleteConfirmation";

export interface basicInfoData {
    fullName: {
        lastName: string;
        firstName: string;
        middleName: string;
        nickname: string;
        extension: string;
    };
    birthday: {
        dateOfBirth: string;
        age: string;
        placeOfBirth: string;
    };
    education: {
        highSchool: string;
        attainment: string;
        lastSchool: string;
        yearsAttended: string;
        collegeCourse: string;
    };
    others: {
        religion: string;
        sex: string;
        civilStatus: string;
        gender: string;
        pronouns: string;
        bloodType: string;
    };
    addresses: {
        present: string;
        permanent: string;
    };
}

interface BasicInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
}

const BasicInfoModal: React.FC<BasicInfoModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentBasicInfoData, setCurrentBasicInfoData] = useState<basicInfoData | null>(null);

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentBasicInfoData(null);
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
                title="Edit Basic Info"
                modalWidth="w-[920px]"
                contentHeight="h-[65vh]"
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
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Full Name</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <Inputs label="LAST NAME" placeholder="Lee" />
                                <Inputs label="FIRST NAME" placeholder="Frederick" />
                                <Inputs label="MIDDLE NAME" placeholder="Hill" />
                                <Inputs label="EXTENSION" placeholder="Fred" />
                                <Inputs label="CONTACT NUMBER" placeholder="0955-021-1889" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Birthday</h6>
                            </div>
                            <Inputs label="PLACE OF BIRTH" placeholder="1905 Apple Lane, Chicago, Illinois(IL)" />
                        </div>

                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Others</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <Inputs label="RELIGION" placeholder="Roman Catholic" />
                                <Inputs label="SEX" placeholder="Male" />
                                <Inputs label="CIVIL STATUS" placeholder="Married" />
                                <Inputs label="GENDER / GENDER IDENTITY" placeholder="Cisgender" />
                                <Inputs label="PRONOUNS" placeholder="His" />
                                <Inputs label="BLOOD TYPE" placeholder="AB" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Addresses</h6>
                            </div>
                            <div className="grid gap-4 items-start">
                                <p className="text-body-base-strong text-szBlack700">Permanent Address</p>
                                {/* Address Row 1: 4 dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] relative z-50">
                                    <Dropdown label="REGION" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PROVINCE" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="CITY / MUNICIPALITY" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="BARANGAY" placeholder="" options={[]} onSelectionChange={() => {}} />
                                </div>
                                {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs label="STREET / HOUSE NUMBER / LOT" placeholder="Blk 5 Lot 3, Villa Luz Subdivision" />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs label="POSTAL CODE" placeholder="9000" />
                                    </div>
                                </div>
                                <Checkbox label="Set as present address" onChange={() => {}} checked={false} />
                            </div>
                            <div className="grid gap-4 items-start">
                                <p className="text-body-base-strong text-szBlack700">Present Address</p>
                                {/* Address Row 1: 4 dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] relative z-50">
                                    <Dropdown label="REGION" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PROVINCE" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="CITY / MUNICIPALITY" placeholder="" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="BARANGAY" placeholder="" options={[]} onSelectionChange={() => {}} />
                                </div>
                                {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs label="STREET / HOUSE NUMBER / LOT" placeholder="Blk 5 Lot 3, Villa Luz Subdivision" />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs label="POSTAL CODE" placeholder="9000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            <BasicInfoConfirmationModal
                isOpen={showConfirmationModal}
                onClose={handleConfirmationClose}
                basicInfoData={currentBasicInfoData ? [currentBasicInfoData] : []}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default BasicInfoModal;

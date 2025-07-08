import { useState } from "react";
import { Avatar, Button, Inputs, Modal, Document, Dropdown } from "enterprisze-global-components";
import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
import { Trash, Calendar } from "iconsax-reactjs";
import EmployeeConfirmationModal from "./EmployeeConfirmationModal";

export interface addEmployeeData {
    fullName: {
        lastName: string;
        firstName: string;
        middleName: string;
        nickname: string;
        extension: string;
        dateOfBirth: string;
    };
    work: {
        dateHired: string;
        position: string;
        positionStatus: string;
        employmentStatus: string;
        workEmail: string;
    };
    address: {
        region: string;
        province: string;
        cityMunicipality: string;
        barangay: string;
        streetHouseNoLot: string;
        postalCode: string;
        country: string;
    };
    others: {
        religion: string;
        sex: string;
        civilStatus: string;
        gender: string;
        pronouns: string;
        bloodType: string;
    };
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    addEmployeeData?: addEmployeeData;
    mode: "add" | "edit";
}
const EmployeeModal = ({ isOpen, onClose, onSubmitSuccess, addEmployeeData, mode }: EmployeeModalProps) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentAddEmployeeData, setCurrentAddEmployeeData] = useState<addEmployeeData | null>(
        mode === "edit" && addEmployeeData ? addEmployeeData : null
    );
    const [profileImg, setProfileImg] = useState<string | undefined>();

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentAddEmployeeData(null);
    };

    const handleProceed = () => {
        setShowConfirmationModal(true);
        onClose();
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title={mode === "edit" ? "Edit Employee" : "Add Employee"}
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
                        label: mode === "edit" ? "Update" : "Proceed",
                        variant: "primary",
                        onClick: handleProceed,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Set up profile</h6>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center justify-center gap-[20px]">
                                <Avatar size="medium" src={profileImg || SZOfficialLogo} />

                                <div className="lg:w-[300px]">
                                    <Button
                                        variant="secondary"
                                        disabled={!SZOfficialLogo}
                                        size="large"
                                        leftIcon={<Trash />}
                                        label={"Remove photo"}
                                        className={`whitespace-nowrap ${!SZOfficialLogo ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => setProfileImg(undefined)}
                                        fullWidth={true}
                                    />
                                </div>
                                <div className="lg:w-[300px]">
                                    <Document
                                        label="Upload New Profile Picture"
                                        onFileChange={(file) => {
                                            if (file) {
                                                console.log("Selected file:", file);
                                            } else {
                                                console.log("File removed.");
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Name and Birthday</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <Inputs label="LAST NAME" placeholder="Lee" />
                                <Inputs label="FIRST NAME" placeholder="Frederick" />
                                <Inputs label="MIDDLE NAME" placeholder="Hill" />
                                <Inputs label="EXTENSION" placeholder="Fred" />
                                <Inputs label="NICKNAME" placeholder="Red" />
                                <Inputs label="BIRTHDAY" placeholder="12/01/2000" icon={Calendar} />
                                {/*<CustomDatePicker label="BIRTHDAY" value="12/01/2000" />*/}
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Work</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[15px]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                    <Inputs label="DATE HIRED" placeholder="12/01/2000" icon={Calendar} />
                                    <Dropdown label="POSITION" placeholder="Junior Developer 2" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="POSITION STATUS" placeholder="Trainee" options={[]} onSelectionChange={() => {}} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <Dropdown label="EMPLOYMENT STATUS" placeholder="Regular" options={[]} onSelectionChange={() => {}} />
                                    <Inputs label="WORK EMAIL" placeholder="justin.baldoni@supportzebra.com" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Address</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[15px]">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                                    <Dropdown label="REGION" placeholder="Region X" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PROVINCE" placeholder="Misamis Oriental" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown
                                        label="CITY / MUNICIPALITY"
                                        placeholder="CDO City"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                    <Dropdown label="BARANGAY" placeholder="Carmen" options={[]} onSelectionChange={() => {}} />
                                </div>
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
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Others</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[15px]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                    <Dropdown label="RELIGION" placeholder="Roman Catholic" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="CIVIL STATUS" placeholder="Single" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="BLOOD TYPE" placeholder="B+" options={[]} onSelectionChange={() => {}} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                    <Dropdown label="GENDER" placeholder="Male" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PRONOUNS" placeholder="She/Her" options={[]} onSelectionChange={() => {}} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
            <EmployeeConfirmationModal
                isOpen={showConfirmationModal}
                onClose={handleConfirmationClose}
                addEmployeeData={currentAddEmployeeData ? [currentAddEmployeeData] : []}
                onSubmitSuccess={onSubmitSuccess}
            />
        </div>
    );
};

export default EmployeeModal;

import { useState } from "react";
import { Inputs, Modal, Dropdown, CustomDatePicker } from "enterprisze-global-components";
// import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
// import { Trash, Calendar } from "iconsax-reactjs";
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
    const [formData, setFormData] = useState<addEmployeeData>({
        fullName: {
            lastName: "",
            firstName: "",
            middleName: "",
            nickname: "",
            extension: "",
            dateOfBirth: "",
        },
        work: {
            dateHired: "",
            position: "",
            positionStatus: "",
            employmentStatus: "",
            workEmail: "",
        },
        address: {
            region: "",
            province: "",
            cityMunicipality: "",
            barangay: "",
            streetHouseNoLot: "",
            postalCode: "",
            country: "",
        },
        others: {
            religion: "",
            sex: "",
            civilStatus: "",
            gender: "",
            pronouns: "",
            bloodType: "",
        },
    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentAddEmployeeData, setCurrentAddEmployeeData] = useState<addEmployeeData | null>(
        mode === "edit" && addEmployeeData ? addEmployeeData : null
    );
    // const [profileImg, setProfileImg] = useState<string | undefined>();

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
                        {/* <div className="flex flex-col w-full gap-[8px]">
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
                        </div> */}
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Name and Birthday</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <Inputs label="LAST NAME" value={formData.fullName.lastName || ""} />
                                <Inputs label="FIRST NAME" value={formData.fullName.firstName || ""} />
                                <Inputs label="MIDDLE NAME" value={formData.fullName.middleName || ""} />
                                <Inputs label="EXTENSION" value={formData.fullName.extension || ""} />
                                <Inputs label="NICKNAME" value={formData.fullName.nickname || ""} />
                                {/* <Inputs label="BIRTHDAY" value={formData.fullName.dateOfBirth || ""} icon={Calendar} /> */}
                                <CustomDatePicker label="BIRTHDAY" value="12/01/2000" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Work</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[15px]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center z-[50]">
                                    {/* <Inputs label="DATE HIRED" value={formData.work.dateHired || ""} icon={Calendar} /> */}
                                    <CustomDatePicker label="DATE HIRED" value="12/01/2000" />

                                    <Dropdown
                                        label="POSITION"
                                        placeholder="Select position"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                        value={
                                            formData.work.position
                                                ? { label: formData.work.position, value: formData.work.position }
                                                : undefined
                                        }
                                    />
                                    <Dropdown
                                        label="POSITION STATUS"
                                        placeholder="Select position status"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <Dropdown
                                        label="EMPLOYMENT STATUS"
                                        placeholder="Select employment status"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                    <Inputs label="WORK EMAIL" value={formData.work.workEmail || ""} />
                                </div>
                            </div>
                            <p className="text-caption-reg">
                                The employee your about to add will be in the{" "}
                                <span className="text-szPrimary700">Business Solutions and Innovation Team</span>.
                            </p>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">Address</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[15px]">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center z-[50]">
                                    <Dropdown label="REGION" placeholder="Select region" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PROVINCE" placeholder="Select province" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown
                                        label="CITY / MUNICIPALITY"
                                        placeholder="Select city"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                    <Dropdown label="BARANGAY" placeholder="Select barangay" options={[]} onSelectionChange={() => {}} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs label="STREET / HOUSE NUMBER / LOT" value={formData.address.streetHouseNoLot || ""} />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs label="POSTAL CODE" value={formData.address.postalCode || ""} />
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
                                    <Dropdown label="RELIGION" placeholder="Select religion" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown
                                        label="CIVIL STATUS"
                                        placeholder="Select civil status"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                    <Dropdown
                                        label="BLOOD TYPE"
                                        placeholder="Select blood type"
                                        options={[]}
                                        onSelectionChange={() => {}}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                    <Dropdown label="GENDER" placeholder="Select gender" options={[]} onSelectionChange={() => {}} />
                                    <Dropdown label="PRONOUNS" placeholder="Select pronouns" options={[]} onSelectionChange={() => {}} />
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

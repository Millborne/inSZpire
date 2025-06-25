import { Button, Checkbox, Dropdown, Inputs, Modal, PurpleTaggedCard, TextContent } from "enterprisze-global-components";

// icons
import { ArrowDown2, TickCircle, Trash, Edit2 } from "iconsax-reactjs";
import { useState } from "react";

// components
//   import DeleteConfirmation from "../../../../components/DeleteConfirmation";
import FamilyConfirmationModal from "./FamilyConfirmationModal";

const relationshipOptions = ["Mother", "Father", "Spouse", "Child", "Sibling", "Live In / Partner", "Friend", "Guardian"];

export interface FamilyMemberDataType {
    id: number;
    relationship: string;
    lastName: string;
    firstName: string;
    middleName: string;
    extension: string;
    contactNumber: string;
    email: string;
    address: {
        region: string;
        province: string;
        cityMunicipality: string;
        barangay: string;
        streetHouseNoLot: string;
        postalCode: string;
        country: string;
    };
}

interface FamilyModalProps {
    isOpen: boolean;
    onClose: () => void;
    familyMembersData: FamilyMemberDataType[];
    onSubmitSuccess?: () => void;
}

const FamilyModal: React.FC<FamilyModalProps> = ({ isOpen, onClose, familyMembersData, onSubmitSuccess }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showInputContainer, setShowInputContainer] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
    const [relationship, setRelationship] = useState("Relation with the family member");
    const [currentFamilyData, setCurrentFamilyData] = useState<FamilyMemberDataType | null>(null);

    // For Adding Family
    const handleAddFamilyClick = () => {
        setShowInputContainer(true);
        setIsEditMode(false);
        setEditingIndex(null);
    };

    //For adding family once finished
    const handleAddClick = () => {
        const newFamilyData: FamilyMemberDataType = {
            id: 1,
            relationship: "",
            lastName: "",
            firstName: "",
            middleName: "",
            extension: "",
            contactNumber: "",
            email: "",
            address: {
                region: "",
                province: "",
                cityMunicipality: "",
                barangay: "",
                streetHouseNoLot: "",
                postalCode: "",
                country: "",
            },
        };
        setCurrentFamilyData(newFamilyData);
        setShowInputContainer(false);
        setRelationship("Relation with the family member");
        setShowRelationshipDropdown(false);
    };

    // For Editing Family
    const handleEditClick = (index: number) => {
        setShowInputContainer(true);
        setIsEditMode(true);
        setEditingIndex(index);
    };

    // For Editing Family once finished
    const handleDoneClick = () => {
        if (editingIndex !== null) {
            setCurrentFamilyData(familyMembersData[editingIndex]);
            setShowInputContainer(false);
            setRelationship("Relation with the family member");
            setShowRelationshipDropdown(false);
        }
    };

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setShowInputContainer(false);
        setIsEditMode(false);
        setEditingIndex(null);
        setCurrentFamilyData(null);
    };

    const handleProceed = () => {
        if (currentFamilyData) {
            setShowConfirmationModal(true);
            onClose();
        }
    };

    const handleDeleteClick = (index: number) => {
        setIsDeleteModalOpen(true);
    };

    // for add or edit family inputs
    const InputContainer = ({ isEditMode, index }: { isEditMode: boolean; index: number | null }) => {
        return (
            <div className="flex flex-col gap-[8px] w-full border rounded-[12px] border-szPrimary200 pt-[4px] pr-[12px] pb-[8px] pl-[12px]">
                <div className="flex gap-[16px] items-center min-h-[32px] justify-between ">
                    <div className="flex gap-[16px] items-center">
                        <div className="relative">
                            <div
                                className="flex gap-[16px] items-center cursor-pointer"
                                onClick={() => setShowRelationshipDropdown((prev) => !prev)}
                            >
                                <h6 className="text-h6 text-szPrimary700 min-w-[130px] sm:max-w-fit">{relationship}</h6>
                                <ArrowDown2 className="icon-sm" />
                            </div>
                            {showRelationshipDropdown && (
                                <div
                                    className="absolute z-20 mt-2 bg-white border rounded-lg shadow-lg w-full"
                                    style={{ maxHeight: "150px", overflowY: "auto" }}
                                >
                                    {relationshipOptions.map((option) => (
                                        <p
                                            key={option}
                                            className="px-[12px] py-[8px] hover:bg-szPrimary100 cursor-pointer text-body-small-reg"
                                            onClick={() => {
                                                setRelationship(option);
                                                setShowRelationshipDropdown(false);
                                            }}
                                        >
                                            {option}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <Inputs label="LAST NAME" placeholder="Lee" />
                    <Inputs label="FIRST NAME" placeholder="Keith Lloyd" />
                    <Inputs label="MIDDLE NAME" placeholder="RIDGLEY" />
                    <Inputs label="EXTENSION" placeholder="" />
                    <Inputs label="CONTACT NUMBER" placeholder="0955-021-1889" />
                    <Inputs label="EMAIL" placeholder="freddyhill@gmail.com" />
                    <div className="col-span-1 sm:col-span-2">
                        <p className="text-caption-all-caps uppercase mb-[16px] text-szGrey500">INPUT THEIR ADDRESS</p>
                        {/* Address Row 1: 4 dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] mb-[16px]">
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
                <Checkbox label="Add as your Emergency Contact" onChange={() => {}} checked={false} />

                <div className="flex w-full justify-end">
                    <Button
                        label={isEditMode ? "Done" : "Add"}
                        variant="primary"
                        size="small"
                        leftIcon={<TickCircle />}
                        onClick={isEditMode ? handleDoneClick : handleAddClick}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Edit Family"
                buttonLabel="Family"
                buttonOnClick={handleAddFamilyClick}
                modalWidth="w-[920px]"
                contentHeight="h-[65vh]"
                headerOptions="left"
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
                        disabled: !currentFamilyData,
                    },
                ]}
                content={
                    <div className="flex flex-col h-full gap-[16px]">
                        <div className="flex flex-col gap-[16px] pt-3">
                            {showInputContainer && !isEditMode && <InputContainer isEditMode={false} index={null} />}
                            <div className="flex flex-col gap-[24px] ">
                                {familyMembersData.map((familyMember, index) => (
                                    <div key={index} className="flex flex-col gap-[24px]">
                                        <PurpleTaggedCard
                                            label={"Father"}
                                            children={
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                                    <div className="break-all">
                                                        <TextContent header="last name" text={familyMember.lastName} />
                                                    </div>
                                                    <div className="break-all">
                                                        <TextContent header="first name" text={familyMember.firstName} />
                                                    </div>
                                                    <div className="break-all">
                                                        <TextContent header="middle name" text={familyMember.middleName} />
                                                    </div>
                                                    <div className="break-all">
                                                        <TextContent header="extensions" text={familyMember.extension} />
                                                    </div>
                                                    <div className="break-all">
                                                        <TextContent header="contact number" text={familyMember.contactNumber} />
                                                    </div>
                                                    <div className="break-all">
                                                        <TextContent header="email" text={familyMember.email} />
                                                    </div>
                                                    <div className="sm:col-span-3 col-span-1  flex justify-between items-end">
                                                        <TextContent
                                                            header="address"
                                                            text={`${familyMember.address.streetHouseNoLot}, ${familyMember.address.barangay}, ${familyMember.address.cityMunicipality}, ${familyMember.address.province}, ${familyMember.address.postalCode}, Philippines`}
                                                        />
                                                        <div className="flex gap-[16px]">
                                                            <Edit2
                                                                className="icon-sm text-szPrimary900 cursor-pointer"
                                                                onClick={() => handleEditClick(index)}
                                                            />
                                                            <Trash
                                                                className="icon-sm text-szPrimary900 cursor-pointer"
                                                                onClick={() => handleDeleteClick(index)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                        {showInputContainer && isEditMode && editingIndex === index && (
                                            <InputContainer isEditMode={true} index={editingIndex} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            {currentFamilyData && (
                <FamilyConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={handleConfirmationClose}
                    familyData={currentFamilyData ? [currentFamilyData] : []}
                    onSubmitSuccess={onSubmitSuccess}
                />
            )}

            {/* Delete Confirmation Modal --------------------------- */}
            {/* <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onClick={() => {}}
          description="This contact is part of your family. Are you sure you want to delete them?"
          subDescription="All information from the contact will also be deleted from your family."
        /> */}
        </>
    );
};

export default FamilyModal;

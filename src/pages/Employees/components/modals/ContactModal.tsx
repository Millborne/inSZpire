import {
  Button,
  Checkbox,
  Chip,
  Inputs,
  Modal,
  PurpleTaggedCard,
  TextContent,
} from "enterprisze-global-components";

// icons
import { ArrowDown2, TickCircle, Trash, Edit2 } from "iconsax-reactjs";
import { useState, useEffect } from "react";

// components
import DeleteConfirmation from "../../../../components/DeleteConfirmation";
// import ContactConfirmationModal from "./ContactConfirmationModal";

export interface ContactDataType {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  extensions: string;
  contactNumber: string;
  email: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  postalCode: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyContacts: ContactDataType[];
  onSubmitSuccess?: () => void;
  currentContactData?: {
    mobile_number?: string;
    personal_email?: string;
  } | null;
}

const relationshipOptions = [
  "Mother",
  "Father",
  "Spouse",
  "Child",
  "Sibling",
  "Live-In / Partner",
  "Friend",
  "Guardian",
];

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  emergencyContacts,
  onSubmitSuccess,
  currentContactData,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showInputContainer, setShowInputContainer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showRelationshipDropdown, setShowRelationshipDropdown] =
    useState(false);
  const [relationship, setRelationship] = useState(
    "Relationship to the Contact"
  );

  // Form state for contact information
  const [contactFormData, setContactFormData] = useState({
    mobileNumber: currentContactData?.mobile_number || "",
    personalEmail: currentContactData?.personal_email || "",
  });

  // Update form data when currentContactData changes
  useEffect(() => {
    if (currentContactData) {
      setContactFormData({
        mobileNumber: currentContactData.mobile_number || "",
        personalEmail: currentContactData.personal_email || "",
      });
    }
  }, [currentContactData]);

  // For Adding Education
  const handleAddContactClick = () => {
    setShowInputContainer(true);
    setIsEditMode(false);
    setEditingIndex(null);
  };

  //For adding contact once finished
  const handleAddClick = () => {
    setShowInputContainer(false);
    setRelationship("Relationship to the Contact");
    setShowRelationshipDropdown(false);
  };

  // For Editing Contact
  const handleEditClick = (index: number) => {
    setShowInputContainer(true);
    setIsEditMode(true);
    setEditingIndex(index);
  };

  // For Editing Contact once finished
  const handleDoneClick = () => {
    if (editingIndex !== null) {
      setShowInputContainer(false);
      setRelationship("Relationship to the Contact");
      setShowRelationshipDropdown(false);
    }
  };

  const handleSubmit = () => {
    onClose();

    // Call success callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleDeleteClick = (index: number) => {
    setIsDeleteModalOpen(true);
  };

  // Handle contact form input changes
  const handleContactInputChange = (field: string, value: string) => {
    setContactFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // for add or edit contact inputs
  const InputContainer = ({
    isEditMode,
    index,
  }: {
    isEditMode: boolean;
    index: number | null;
  }) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-[8px] w-full border rounded-[12px] border-szPrimary200 pt-[4px] pr-[12px] pb-[8px] pl-[12px]"
      >
        <div className="flex gap-[16px] items-center min-h-[32px] justify-between ">
          <div className="flex gap-[16px] items-center">
            <div className="relative">
              <div
                className="flex gap-[16px] items-center cursor-pointer"
                onClick={() => setShowRelationshipDropdown((prev) => !prev)}
              >
                <h6 className="text-h6 text-szPrimary700 min-w-[130px] sm:max-w-fit">
                  {relationship}
                </h6>
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
            <Chip
              label="LISTED IN FAMILY"
              type="custom"
              customClass="px-[4px] bg-szPrimary100 text-caption-all-caps uppercase"
            />{" "}
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
            <p className="text-caption-all-caps uppercase mb-[16px] text-szGrey500">
              INPUT THEIR ADDRESS
            </p>
            {/* Address Row 1: 4 dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] mb-[16px]">
              <Inputs label="REGION" placeholder="Region X" />
              <Inputs label="PROVINCE" placeholder="Misamis Oriental" />
              <Inputs label="CITY / MUNICIPALITY" placeholder="City of CDO" />
              <Inputs label="BARANGAY" placeholder="Brgy. 26" />
            </div>
            {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
              <div className="sm:col-span-4 col-span-1">
                <Inputs
                  label="STREET / HOUSE NUMBER / LOT"
                  placeholder="Blk 5 Lot 3, Villa Luz Subdivision"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <Inputs label="POSTAL CODE" placeholder="9000" />
              </div>
            </div>
          </div>
        </div>
        <Checkbox
          label="Add as your Emergency Contact"
          onChange={() => {}}
          checked={false}
        />

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
        title="Edit Contacts"
        buttonLabel="Contacts"
        buttonOnClick={handleAddContactClick}
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
            label: "Submit",
            variant: "primary",
            onClick: handleSubmit,
            size: "medium",
          },
        ]}
        content={
          <div className="flex flex-col h-full gap-[16px]">
            {/* Input Section -----------------------------------------------------*/}
            <div className="flex flex-col gap-[16px]">
              <h6 className="text-h6 text-szPrimary700 max-w-[160px] sm:max-w-fit">
                Contact Information
              </h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <Inputs 
                  label="CONTACT NUMBER" 
                  placeholder="0919-207-5631"
                  value={contactFormData.mobileNumber}
                  onChange={(e) => handleContactInputChange("mobileNumber", e.target.value)}
                />
                <Inputs
                  label="PERSONAL EMAIL"
                  placeholder="example@gmail.com"
                  value={contactFormData.personalEmail}
                  onChange={(e) => handleContactInputChange("personalEmail", e.target.value)}
                />
              </div>
            </div>
            {/* Emergency Contact Section -----------------------------------------*/}
            <div className="flex flex-col gap-[16px]">
              <h6 className="text-h6 text-szPrimary700 max-w-[160px] sm:max-w-fit">
                Emergency Contact
              </h6>
              {showInputContainer && !isEditMode && (
                <InputContainer isEditMode={false} index={null} />
              )}{" "}
              <div className="flex flex-col gap-[24px] ">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex flex-col gap-[24px]">
                    <PurpleTaggedCard
                      label={"Father"}
                      children={
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                          <div className="break-all">
                            <TextContent
                              header="last name"
                              text={contact.lastName}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="first name"
                              text={contact.firstName}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="middle name"
                              text={contact.middleName}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="extensions"
                              text={contact.extensions}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="contact number"
                              text={contact.contactNumber}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent header="email" text={contact.email} />
                          </div>
                          <div className="sm:col-span-3 col-span-1  flex justify-between items-end">
                            <TextContent
                              header="address"
                              text={`${contact.street}, ${contact.barangay}, ${contact.city}, ${contact.province}, ${contact.postalCode}, Philippines`}
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
                    {showInputContainer &&
                      isEditMode &&
                      editingIndex === index && (
                        <InputContainer
                          isEditMode={true}
                          index={editingIndex}
                        />
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* Delete Confirmation Modal --------------------------- */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onClick={() => {}}
        description="This contact is part of your family. Are you sure you want to delete them?"
        subDescription="All information from the contact will also be deleted from your family."
      />
    </>
  );
};

export default ContactModal;

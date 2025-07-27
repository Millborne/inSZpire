import {
  PurpleTaggedCard,
  TextContent,
  Divider,
  Button,
  SnackbarAlert,
} from "enterprisze-global-components";

//icons
import { Edit2, Trash } from "iconsax-react";

//components
import ContactModal from "./modals/ContactModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/store";
import {
  useBasicInfoService,
} from "../../../services/employee-profile/personal/basic-info/use-basic-info";

const emergencyContacts = [
  {
    id: "1",
    lastName: "Lee",
    firstName: "Keith Lloyd",
    middleName: "Ridgely",
    extensions: "N/A",
    contactNumber: "0955-021-1889",
    email: "graciathefirst@gmail.com",
    region: "Region X",
    province: "Misamis Oriental",
    city: "City of Cagayan de Oro",
    barangay: "Brgy. 26",
    street: "Blk 5 Lot 3, Villa Luz Subdivision",
    postalCode: "9000",
  },
  {
    id: "2",
    lastName: "Germannotta",
    firstName: "Stephanie",
    middleName: "Ridgely",
    extensions: "N/A",
    contactNumber: "0955-021-1888",
    email: "freddyhill@gmail.com",
    region: "Region X",
    province: "Misamis Oriental",
    city: "City of Cagayan de Oro",
    barangay: "Brgy. 26",
    street: "Blk 5 Lot 3, Villa Luz Subdivision",
    postalCode: "9000",
  },
  {
    id: "3",
    lastName: "Lee",
    firstName: "Stephanie",
    middleName: "Ridgely",
    extensions: "N/A",
    contactNumber: "0955-021-1887",
    email: "sibling@gmail.com",
    region: "Region X",
    province: "Misamis Oriental",
    city: "City of Cagayan de Oro",
    barangay: "Brgy. 26",
    street: "Blk 5 Lot 3, Villa Luz Subdivision",
    postalCode: "9000",
  },
];

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [contactData, setContactData] = useState<{
    mobile_number?: string;
    personal_email?: string;
  } | null>(null);

  // Employee RTK State
  const selectedEmployee = useSelector(
    (state: RootState) => state.employeeState.selectedEmployee
  );

  const {
    getById,
    actionIsLoading,
    actionIsError,
    actionError,
  } = useBasicInfoService();

  const fetchContactData = async () => {
    if (!selectedEmployee?.employee_ID) return;
    
    try {
      const result = await getById({
        employeeId: selectedEmployee.employee_ID,
      });
      
      if (result.data?.data?.profile) {
        setContactData({
          mobile_number: result.data.data.profile.mobile_number,
          personal_email: result.data.data.profile.personal_email,
        });
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      fetchContactData();
    }
  }, [selectedEmployee]);

  const handleSubmitSuccess = () => {
    setIsSnackbarOpen(true);
    // Refresh contact data after successful update
    fetchContactData();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Contact Information</h6>
          <Button
            variant="secondary"
            size="small"
            label="Edit Contact Information"
            onClick={() => setIsModalOpen(true)}
          />
          <ContactModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            emergencyContacts={emergencyContacts}
            onSubmitSuccess={handleSubmitSuccess}
            currentContactData={contactData}
          />
        </div>

        <div className="grid grid-cols-2 pb-4 gap-4 items-start max-w-2xl flex-grow">
          <TextContent 
            header="contact number" 
            text={contactData?.mobile_number || "N/A"} 
          />
          <TextContent 
            header="personal emails" 
            text={contactData?.personal_email || "N/A"} 
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Emergency Contact</h6>
        </div>
        <div className="flex flex-col gap-[24px]">
          {emergencyContacts.map((contact, idx) => (
            <PurpleTaggedCard
              key={idx}
              label={contact.lastName + "," + " " + contact.firstName}
              children={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  <div className="break-all">
                    <TextContent header="last name" text={contact.lastName} />
                  </div>
                  <div className="break-all">
                    <TextContent header="first name" text={contact.firstName} />
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
                  <div className="sm:col-span-3 col-span-1 break-all flex justify-between items-end">
                    <TextContent
                      header="address"
                      text={`${contact.street}, ${contact.barangay}, ${contact.city}, ${contact.province}, ${contact.postalCode}, Philippines`}
                    />
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>

      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        showCloseButton={true}
        type="success"
        title="Successfully updated Contact Information"
        animation="slide-up"
      />
    </div>
  );
};

export default Contacts;

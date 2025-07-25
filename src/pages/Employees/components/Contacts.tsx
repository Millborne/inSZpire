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
import { useContactService } from "../../../services/employee-profile/personal/contact/use-contact";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/store";

// const PROFILE_ID = "11111111-0000-0000-0000-000000000002";



const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState< "error" | "success" | "warning" | "info" | undefined>("success");
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const contactService = useContactService();

  // Employee RTK State - commented out until employeeState is added to store
  const selectedEmployee = useSelector(
    (state: RootState) => state.employeeState.selectedEmployee
  );
  const PROFILE_ID = selectedEmployee?.profile_ID;

   // Don't render if PROFILE_ID is not available
   if (!PROFILE_ID) {
    return <div>No employee selected</div>;
}


  // Fetch contact data
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await contactService.viewContact({ profile_ID: PROFILE_ID });
      console.log("contact data", result.data.contacts)
      if (result.data?.contacts) {
        setEmergencyContacts(result.data.contacts);
        console.log(emergencyContacts)
      } else {
        setEmergencyContacts([]);
      }
    } catch (err) {
      setError("Failed to fetch emergency contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, [PROFILE_ID]);

  const handleSubmitSuccess = (message = "Successfully updated Contact Information") => {
    setSnackbarMessage(message);
    setSnackbarType("success");
    setIsSnackbarOpen(true);
    fetchContacts();
  };

  const handleError = (message = "An error occurred") => {
    setSnackbarMessage(message);
    setSnackbarType("error");
    setIsSnackbarOpen(true);
  };

  // Map API data to UI data structure
  const mapContactData = (contact: any) => ({
    id: contact.profile_family_ID,
    lastName: contact.last_name,
    firstName: contact.first_name,
    middleName: contact.middle_name,
    extensions: contact.name_ext,
    contactNumber: contact.contact_number,
    email: contact.email || "",
    region: "Region X", // This would need to be parsed from address if structured
    province: "Misamis Oriental",
    city: "City of Cagayan de Oro",
    barangay: "Brgy. 26",
    street: "Blk 5 Lot 3, Villa Luz Subdivision",
    postalCode: "9000",
  });

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
            onError={handleError}
            contactService={contactService}
            profileId={PROFILE_ID}
            employeeId={selectedEmployee?.employee_ID || ""}
          />
        </div>

        <div className="grid grid-cols-2 pb-4 gap-4 items-start max-w-2xl flex-grow">
          <TextContent header="contact number" text={selectedEmployee?.mobile_number} />
          <TextContent header="personal emails" text={selectedEmployee?.personal_email} />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Emergency Contact</h6>
        </div>
        <div className="flex flex-col gap-[24px]">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : emergencyContacts.filter(contact => (contact.is_emergency_contact === 1)).length === 0 ? (
            <div>No emergency contacts found.</div>
          ) : (
            emergencyContacts
              .filter(contact => (contact.is_emergency_contact === 1))
              .map((contact, idx) => {
                const mapped = mapContactData(contact);
                return (
                  <PurpleTaggedCard
                    key={mapped.id || idx}
                    label={contact.relation || "Emergency Contact"}
                    children={
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                        <div className="break-all">
                          <TextContent header="last name" text={mapped.lastName} />
                        </div>
                        <div className="break-all">
                          <TextContent header="first name" text={mapped.firstName} />
                        </div>
                        <div className="break-all">
                          <TextContent
                            header="middle name"
                            text={mapped.middleName}
                          />
                        </div>
                        <div className="break-all">
                          <TextContent
                            header="extensions"
                            text={mapped.extensions}
                          />
                        </div>
                        <div className="break-all">
                          <TextContent
                            header="contact number"
                            text={mapped.contactNumber}
                          />
                        </div>
                        <div className="break-all">
                          <TextContent header="email" text={mapped.email} />
                        </div>
                        <div className="sm:col-span-3 col-span-1 break-all flex justify-between items-end">
                          <TextContent
                            header="address"
                            text={`${mapped.street}, ${mapped.barangay}, ${mapped.city}, ${mapped.province}, ${mapped.postalCode}, Philippines`}
                          />
                        </div>
                      </div>
                    }
                  />
                );
              })
          )}
        </div>
      </div>

      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        showCloseButton={true}
        type={snackbarType}
        title={snackbarMessage}
        animation="slide-up"
      />
    </div>
  );
};

export default Contacts;

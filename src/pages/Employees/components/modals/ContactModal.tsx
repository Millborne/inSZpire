import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  Inputs,
  Modal,
  PurpleTaggedCard,
  TextContent,
} from "enterprisze-global-components";

// icons
import { ArrowDown2, TickCircle, Trash, Edit2 } from "iconsax-reactjs";
import { useState } from "react";
import React from "react";
import { useLocationsService } from "../../../../services/locations-options/use-locations";

// components
import DeleteConfirmation from "../../../../components/DeleteConfirmation";

// services
import { useBasicInfoService } from "../../../../services/employee-profile/personal/basic-info/use-basic-info";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers/store";

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
  emergencyContacts: any[];
  onSubmitSuccess?: (msg?: string) => void;
  onError?: (msg?: string) => void;
  contactService: any;
  profileId: string;
  employeeId: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  emergencyContacts,
  onSubmitSuccess,
  onError,
  contactService,
  profileId,
  employeeId,
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
  const [currentContactData, setCurrentContactData] = useState<any | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Basic info service for updating mobile number and personal email
  const { updateBasicInfo, actionIsLoading: basicInfoLoading } = useBasicInfoService();

  // Get selected employee from Redux store
  const selectedEmployee = useSelector(
    (state: RootState) => state.employeeState.selectedEmployee
  );

  // Contact information state
  const [contactInfo, setContactInfo] = useState({
    mobileNumber: "",
    personalEmail: "",
  });

  // Populate contact information when modal opens
  React.useEffect(() => {
    if (isOpen && selectedEmployee) {
      setContactInfo({
        mobileNumber: selectedEmployee.mobile_number || "",
        personalEmail: selectedEmployee.personal_email || "",
      });
    }
  }, [isOpen, selectedEmployee]);

  // For Adding Contact
  const handleAddContactClick = () => {
    setShowInputContainer(true);
    setIsEditMode(false);
    setEditingIndex(null);
    setCurrentContactData(null);
  };

  //For adding contact once finished
  const handleAddClick = async (formData?: any) => {
    setFormLoading(true);
    try {
      const payload = {
        profile_ID: profileId,
        first_name: formData?.firstName || "",
        last_name: formData?.lastName || "",
        middle_name: formData?.middleName || "",
        name_ext: formData?.extension || "",
        relation: relationship,
        contact_number: formData?.contactNumber || "",
        address: formData?.address || "",
        email: formData?.email || "",
        is_emergency_contact: 1,
        is_family_contact: 0,
      };
      const result = await contactService.createContact(payload);
      if (result.data?.success) {
        onSubmitSuccess && onSubmitSuccess("Emergency contact added successfully");
        setShowInputContainer(false);
      } else {
        onError && onError("Failed to add emergency contact");
      }
    } catch (err) {
      onError && onError("Failed to add emergency contact");
    } finally {
      setFormLoading(false);
    }
  };

  // For Editing Contact
  const handleEditClick = (index: number) => {
    setShowInputContainer(true);
    setIsEditMode(true);
    setEditingIndex(index);
    setCurrentContactData(emergencyContacts[index]);
    setRelationship(emergencyContacts[index]?.relation || "Relationship to the Contact");
  };

  // For Editing Contact once finished
  const handleDoneClick = async (formData?: any) => {
    if (editingIndex !== null) {
      setFormLoading(true);
      try {
        const contact = emergencyContacts[editingIndex];
        const payload = {
          profile_family_ID: contact.profile_family_ID,
          first_name: formData?.firstName || contact.first_name,
          last_name: formData?.lastName || contact.last_name,
          middle_name: formData?.middleName || contact.middle_name,
          name_ext: formData?.extension || contact.name_ext,
          relation: relationship,
          contact_number: formData?.contactNumber || contact.contact_number,
          address: formData?.address || contact.address,
          email: formData?.email || contact.email,
          is_emergency_contact: 1,
          is_family_contact: 0,
        };
        const result = await contactService.updateContact(payload);
        if (result.data?.success) {
          onSubmitSuccess && onSubmitSuccess("Emergency contact updated successfully");
          setShowInputContainer(false);
        } else {
          onError && onError("Failed to update emergency contact");
        }
      } catch (err) {
        onError && onError("Failed to update emergency contact");
      } finally {
        setFormLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      // Update basic info (mobile number and personal email)
      if (employeeId && (contactInfo.mobileNumber || contactInfo.personalEmail)) {
        const updateData: any = {
          employee_ID: employeeId,
          profile: {},
        };

        if (contactInfo.mobileNumber) {
          updateData.profile.mobile_number = contactInfo.mobileNumber;
        }

        if (contactInfo.personalEmail) {
          updateData.profile.personal_email = contactInfo.personalEmail;
        }

        const result = await updateBasicInfo(updateData);
        if (!result.data?.success) {
          onError && onError("Failed to update contact information");
          setFormLoading(false);
          return;
        }
      }

      onClose();
      onSubmitSuccess && onSubmitSuccess("Contact information updated successfully");
    } catch (err) {
      onError && onError("Failed to update contact information");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteIndex !== null) {
      setFormLoading(true);
      try {
        const contact = emergencyContacts[deleteIndex];
        const payload = { profile_family_ID: contact.profile_family_ID };
        const result = await contactService.deleteContact(payload);
        if (result.data?.success) {
          onSubmitSuccess && onSubmitSuccess("Emergency contact deleted successfully");
        } else {
          onError && onError("Failed to delete emergency contact");
        }
      } catch (err) {
        onError && onError("Failed to delete emergency contact");
      } finally {
        setFormLoading(false);
        setIsDeleteModalOpen(false);
        setDeleteIndex(null);
      }
    }
  };

  // for add or edit contact inputs
  const InputContainer = ({
    isEditMode,
    index,
  }: {
    isEditMode: boolean;
    index: number | null;
  }) => {
    console.log("currentContactData", currentContactData);
    // For controlled form, you may want to use useState for each field, but for brevity, we'll use a simple ref
    const [formData, setFormData] = useState<any>(
      isEditMode && currentContactData
        ? {
            firstName: currentContactData.first_name,
            lastName: currentContactData.last_name,
            middleName: currentContactData.middle_name,
            extension: currentContactData.name_ext,
            contactNumber: currentContactData.contact_number,
            address: currentContactData.address,
            email: currentContactData.email,
            region: "",
            province: "",
            city: "",
            barangay: "",
            street: "",
            postalCode: ""
          }
        : {
            firstName: "",
            lastName: "",
            middleName: "",
            extension: "",
            contactNumber: "",
            address: "",
            email: "",
            region: "",
            province: "",
            city: "",
            barangay: "",
            street: "",
            postalCode: ""
          }
    );

    // Location dropdown state
    const { getRegionStates, getProvinces, getMunicipalities, getBarangays } = useLocationsService();
    const [regions, setRegions] = useState<{ value: string; label: string }[]>([]);
    const [provinces, setProvinces] = useState<{ value: string; label: string }[]>([]);
    const [municipalities, setMunicipalities] = useState<{ value: string; label: string }[]>([]);
    const [barangays, setBarangays] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState({
      regions: false,
      provinces: false,
      municipalities: false,
      barangays: false,
    });

    // Fetch regions on mount/show
    React.useEffect(() => {
      const fetchRegions = async () => {
        setLoading((prev) => ({ ...prev, regions: true }));
        try {
          const result = await getRegionStates({ page: 1, limit: 100, sortBy: "region_name", sortOrder: "ASC" });
          if (result.data?.data) {
            setRegions(result.data.data.map((region: any) => ({ value: region.region_state_ID.toString(), label: region.region_name || "" })));
          }
        } catch (e) { /* handle error if needed */ }
        setLoading((prev) => ({ ...prev, regions: false }));
      };
      fetchRegions();
    }, []);

    // Fetch provinces when region changes
    React.useEffect(() => {
      if (!formData.region) { setProvinces([]); return; }
      const fetchProvinces = async () => {
        setLoading((prev) => ({ ...prev, provinces: true }));
        try {
          const result = await getProvinces({ region_ID: parseInt(formData.region), limit: 100 });
          if (result.data?.data) {
            setProvinces(result.data.data.map((province: any) => ({ value: province.province_ID.toString(), label: province.province_name || "" })));
          }
        } catch (e) { setProvinces([]); }
        setLoading((prev) => ({ ...prev, provinces: false }));
      };
      fetchProvinces();
    }, [formData.region]);

    // Fetch municipalities when region or province changes
    React.useEffect(() => {
      const fetchMunicipalities = async () => {
        setLoading((prev) => ({ ...prev, municipalities: true }));
        try {
            const params: { region_ID?: number, province_ID?: number, limit: number } = { limit: 2000 };
            if (formData.province) {
                params.province_ID = parseInt(formData.province);
            } else if (formData.region) {
                params.region_ID = parseInt(formData.region);
            } else {
                setMunicipalities([]);
                setLoading((prev) => ({ ...prev, municipalities: false }));
                return;
            }
            const result = await getMunicipalities(params);
            if (result.data?.data) {
                setMunicipalities(result.data.data.map((city: any) => ({ value: city.city_municipality_ID.toString(), label: city.city_name || "" })));
            } else {
                setMunicipalities([]);
            }
        } catch (e) { setMunicipalities([]); }
        setLoading((prev) => ({ ...prev, municipalities: false }));
    };
    if (formData.region) {
        fetchMunicipalities();
    } else {
        setMunicipalities([]);
    }
    }, [formData.region, formData.province]);

    // Fetch barangays when city changes
    React.useEffect(() => {
      if (!formData.city) { setBarangays([]); return; }
      const fetchBarangays = async () => {
        setLoading((prev) => ({ ...prev, barangays: true }));
        try {
          const result = await getBarangays({ city_municipality_ID: parseInt(formData.city), limit: 45000 });
          if (result.data?.data) {
            setBarangays(result.data.data.map((barangay: any) => ({ value: barangay.barangay_ID.toString(), label: barangay.barangay_name || "" })));
          }
        } catch (e) { setBarangays([]); }
        setLoading((prev) => ({ ...prev, barangays: false }));
      };
      fetchBarangays();
    }, [formData.city]);

    // Dropdown change handlers
    const handleDropdownChange = (field: string, value: any) => {
      setFormData((prev: any) => {
        if (field === "region") {
          setProvinces([]);
          setMunicipalities([]);
          setBarangays([]);
          return { ...prev, region: value.value, province: "", city: "", barangay: "" };
        } else if (field === "province") {
          setMunicipalities([]);
          setBarangays([]);
          return { ...prev, province: value?.value || "", city: "", barangay: "" };
        } else if (field === "city") {
          setBarangays([]);
          return { ...prev, city: value.value, barangay: "" };
        } else if (field === "barangay") {
          return { ...prev, barangay: value.value };
        }
        return prev;
      });
    };

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
              label="EMERGENCY CONTACT"
              type="custom"
              customClass="px-[4px] bg-szPrimary100 text-caption-all-caps uppercase"
            />{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Inputs label="LAST NAME" placeholder="Lee" value={formData.lastName} onChange={e => setFormData((f:any) => ({ ...f, lastName: e.target.value }))} />
          <Inputs label="FIRST NAME" placeholder="Keith Lloyd" value={formData.firstName} onChange={e => setFormData((f:any)  => ({ ...f, firstName: e.target.value }))} />
          <Inputs label="MIDDLE NAME" placeholder="RIDGLEY" value={formData.middleName} onChange={e => setFormData((f:any)  => ({ ...f, middleName: e.target.value }))} />
          <Inputs label="EXTENSION" placeholder="" value={formData.extension} onChange={e => setFormData((f:any)  => ({ ...f, extension: e.target.value }))} />
          <Inputs label="CONTACT NUMBER" placeholder="0955-021-1889" value={formData.contactNumber} onChange={e => setFormData((f:any)  => ({ ...f, contactNumber: e.target.value }))} />
          <Inputs label="EMAIL" placeholder="freddyhill@gmail.com" value={formData.email} onChange={e => setFormData((f:any)  => ({ ...f, email: e.target.value }))} />
         
          <div className="col-span-1 sm:col-span-2">
            <p className="text-caption-all-caps uppercase mb-[16px] text-szGrey500">
              INPUT THEIR ADDRESS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] mb-[16px] relative z-50">
              <Dropdown
                label="REGION"
                placeholder={loading.regions ? "Loading..." : "Select region"}
                options={regions}
                value={regions.find(opt => opt.value === formData.region) || undefined}
                onSelectionChange={val => handleDropdownChange("region", val)}
                disabled={loading.regions}
              />
              <Dropdown
                label="PROVINCE"
                placeholder={loading.provinces ? "Loading..." : "Select province (optional)"}
                options={provinces}
                value={provinces.find(opt => opt.value === formData.province) || undefined}
                onSelectionChange={val => handleDropdownChange("province", val)}
                disabled={loading.provinces || !formData.region}
              />
              <Dropdown
                label="CITY / MUNICIPALITY"
                placeholder={loading.municipalities ? "Loading..." : "Select city/municipality"}
                options={municipalities}
                value={municipalities.find(opt => opt.value === formData.city) || undefined}
                onSelectionChange={val => handleDropdownChange("city", val)}
                disabled={loading.municipalities || !formData.region}
              />
              <Dropdown
                label="BARANGAY"
                placeholder={loading.barangays ? "Loading..." : "Select barangay"}
                options={barangays}
                value={barangays.find(opt => opt.value === formData.barangay) || undefined}
                onSelectionChange={val => handleDropdownChange("barangay", val)}
                disabled={loading.barangays || !formData.city}
              />
            </div>
            {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
              <div className="sm:col-span-4 col-span-1">
                <Inputs
                  label="STREET / HOUSE NUMBER / LOT"
                  placeholder="Blk 5 Lot 3, Villa Luz Subdivision"
                  value={formData.street}
                  onChange={e => setFormData((f: any) => ({ ...f, street: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <Inputs
                  label="POSTAL CODE"
                  placeholder="9000"
                  value={formData.postalCode}
                  onChange={e => setFormData((f: any) => ({ ...f, postalCode: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button
            label={isEditMode ? "Done" : "Add"}
            variant="primary"
            size="small"
            leftIcon={<TickCircle />}
            onClick={() => {
              const regionLabel = regions.find(r => r.value === formData.region)?.label;
              const provinceLabel = provinces.find(p => p.value === formData.province)?.label;
              const cityLabel = municipalities.find(c => c.value === formData.city)?.label;
              const barangayLabel = barangays.find(b => b.value === formData.barangay)?.label;

              const address = [
                formData.street,
                barangayLabel,
                cityLabel,
                provinceLabel,
                regionLabel,
                formData.postalCode,
              ]
                .filter(Boolean)
                .join(", ");

              const submissionData = { ...formData, address };
              if (isEditMode) {
                handleDoneClick(submissionData);
              } else {
                handleAddClick(submissionData);
              }
            }}
            loading={formLoading}
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
            loading: formLoading || basicInfoLoading,
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
                  value={contactInfo.mobileNumber}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, mobileNumber: e.target.value }))}
                />
                <Inputs
                  label="PERSONAL EMAIL"
                  placeholder="example@gmail.com"
                  value={contactInfo.personalEmail}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, personalEmail: e.target.value }))}
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
                {emergencyContacts
                  .filter(contact => (contact.is_emergency_contact === 1))
                  .map((contact, index) => (
                  <div key={index} className="flex flex-col gap-[24px]">
                    <PurpleTaggedCard
                      label={contact.relation || "Emergency Contact"}
                      children={
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                          <div className="break-all">
                            <TextContent
                              header="last name"
                              text={contact.last_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="first name"
                              text={contact.first_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="middle name"
                              text={contact.middle_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="extensions"
                              text={contact.name_ext}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="contact number"
                              text={contact.contact_number}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent header="email" text={contact.email} />
                          </div>
                          <div className="sm:col-span-3 col-span-1  flex justify-between items-end">
                            <TextContent
                              header="address"
                              text={contact.address}
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
        onClick={handleDeleteConfirm}
        description="Are you sure you want to delete this emergency contact?"
        subDescription="This person will be removed from your emergency contacts."
      />
    </>
  );
};

export default ContactModal;

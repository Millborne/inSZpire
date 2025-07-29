import {
  Button,
  Checkbox,
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
//   import DeleteConfirmation from "../../../../components/DeleteConfirmation";
// import FamilyConfirmationModal from "./FamilyConfirmationModal";
import DeleteConfirmation from "../../../../components/DeleteConfirmation";

const relationshipOptions = [
  "Mother",
  "Father",
  "Spouse",
  "Child",
  "Sibling",
  "Live In / Partner",
  "Friend",
  "Guardian",
];

export interface FamilyMemberDataType {
  id: number;
  relationship: string;
  lastName: string;
  firstName: string;
  middleName: string;
  extension: string;
  contactNumber: string;
  email: string;
  dateOfBirth: string;
  isFamilyContact: number,
  isEmergencyContact: number,
  addressObj: {
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
  familyMembersData: any[];
  onSubmitSuccess?: (msg?: string) => void;
  onError?: (msg?: string) => void;
  familyService: any;
  profileId: string;
}

const FamilyModal: React.FC<FamilyModalProps> = ({
  isOpen,
  onClose,
  familyMembersData,
  onSubmitSuccess,
  onError,
  familyService,
  profileId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showInputContainer, setShowInputContainer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [relationship, setRelationship] = useState("Relation with the family member");
  const [currentFamilyData, setCurrentFamilyData] = useState<any | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // For Adding Family
  const handleAddFamilyClick = () => {
    setShowInputContainer(true);
    setIsEditMode(false);
    setEditingIndex(null);
    setCurrentFamilyData(null);
  };

  // For adding family once finished
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
        // addressObj: JSON.stringify({
        //   region: formData?.region || "",
        //   province: formData?.province || "",
        //   city: formData?.city || "",
        //   barangay: formData?.barangay || "",
        //   street: formData?.street || "",
        //   postalCode: formData?.postalCode || "",
        // }),
        address: formData?.address || "",
        email: formData?.email || "",
        // date_of_birth: formData?.dateOfBirth || "2000-01-01",
        is_family_contact: 1,
        is_emergency_contact: Number(formData?.isEmergencyContact) || 0,
      };
      const result = await familyService.createFamily(payload);
      if (result.data?.success) {
        onSubmitSuccess && onSubmitSuccess("Family member added successfully");
        setShowInputContainer(false);
        
      } else {
        onError && onError("Failed to add family member");
      }
    } catch (err) {
      onError && onError("Failed to add family member");
    } finally {
      setFormLoading(false);
    }
  };

  // For Editing Family
  const handleEditClick = (index: number) => {
    setShowInputContainer(true);
    setIsEditMode(true);
    setEditingIndex(index);
    setCurrentFamilyData(familyMembersData[index]);
    setRelationship(familyMembersData[index]?.relation || "Relation with the family member");
  };

  // For Editing Family once finished
  const handleDoneClick = async (formData?: any) => {
    if (editingIndex !== null) {
      setFormLoading(true);
      try {
        const member = familyMembersData[editingIndex];
        const payload = {
          profile_family_ID: member.profile_family_ID,
          first_name: formData?.firstName || member.first_name,
          last_name: formData?.lastName || member.last_name,
          middle_name: formData?.middleName || member.middle_name,
          name_ext: formData?.extension || member.name_ext,
          relation: relationship,
          contact_number: formData?.contactNumber || member.contact_number,
          // date_of_birth: formData?.dateOfBirth || member.date_of_birth,
          // addressObj: JSON.stringify({
          //   region: formData?.region || "",
          //   province: formData?.province || "",
          //   city: formData?.city || "",
          //   barangay: formData?.barangay || "",
          //   street: formData?.street || "",
          //   postalCode: formData?.postalCode || "",
          // }),
          address: formData?.address || "",
          email: formData?.email || member.email,
          is_family_contact: 1,
          is_emergency_contact: Number(formData?.isEmergencyContact) || Number(member.is_emergency_contact),
          
        };
        const result = await familyService.updateFamily(payload);
        if (result.data?.success) {
          onSubmitSuccess && onSubmitSuccess("Family member updated successfully");
          setShowInputContainer(false);
        } else {
          onError && onError("Failed to update family member");
        }
      } catch (err) {
        onError && onError("Failed to update family member");
      } finally {
        setFormLoading(false);
      }
    }
  };

  const handleSubmit = () => {
    onClose();
    onSubmitSuccess && onSubmitSuccess();
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteIndex !== null) {
      setFormLoading(true);
      try {
        const member = familyMembersData[deleteIndex];
        const payload = { profile_family_ID: member.profile_family_ID };
        const result = await familyService.deleteFamily(payload);
        if (result.data?.success) {
          onSubmitSuccess && onSubmitSuccess("Family member deleted successfully");
        } else {
          onError && onError("Failed to delete family member");
        }
      } catch (err) {
        onError && onError("Failed to delete family member");
      } finally {
        setFormLoading(false);
        setIsDeleteModalOpen(false);
        setDeleteIndex(null);
      }
    }
  };

  // for add or edit family inputs
  const InputContainer = ({
    isEditMode,
    index,
  }: {
    isEditMode: boolean;
    index: number | null;
  }) => {
    console.log("currentFamilyData",currentFamilyData)
    // For controlled form, you may want to use useState for each field, but for brevity, we'll use a simple ref
    const [formData, setFormData] = useState<any>(
      isEditMode && currentFamilyData
        ? {
            firstName: currentFamilyData.first_name,
            lastName: currentFamilyData.last_name,
            middleName: currentFamilyData.middle_name,
            extension: currentFamilyData.name_ext,
            contactNumber: currentFamilyData.contact_number,
            address: currentFamilyData.address,
            dateOfBirth: "2000-01-01",
            isFamily: 1,
            isEmergency:currentFamilyData.is_emergency_contact || 0,
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
            Address: "",
            isFamily: 1,
            isEmergency: 0,
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
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Inputs label="LAST NAME" placeholder="" value={formData.lastName} onChange={e => setFormData((f:any) => ({ ...f, lastName: e.target.value }))} />
          <Inputs label="FIRST NAME" placeholder="" value={formData.firstName} onChange={e => setFormData((f:any)  => ({ ...f, firstName: e.target.value }))} />
          <Inputs label="MIDDLE NAME" placeholder="" value={formData.middleName} onChange={e => setFormData((f:any)  => ({ ...f, middleName: e.target.value }))} />
          <Inputs label="EXTENSION" placeholder="" value={formData.extension} onChange={e => setFormData((f:any)  => ({ ...f, extension: e.target.value }))} />
          <Inputs label="CONTACT NUMBER" placeholder="" value={formData.contactNumber} onChange={e => setFormData((f:any)  => ({ ...f, contactNumber: e.target.value }))} />
          {/* <Inputs label="DATE OF BIRTH" placeholder="2000-01-01" value={formData.dateOfBirth} onChange={e => setFormData((f:any)  => ({ ...f, dateOfBirth: e.target.value }))} /> */}
          <Inputs label="EMAIL" placeholder="" value={formData.email} onChange={e => setFormData((f:any)  => ({ ...f, email: e.target.value }))} /> 
         
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
                  placeholder=""
                  value={formData.street}
                  onChange={e => setFormData((f: any) => ({ ...f, street: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <Inputs
                  label="POSTAL CODE"
                  placeholder=""
                  value={formData.postalCode}
                  onChange={e => setFormData((f: any) => ({ ...f, postalCode: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
        <Checkbox
          label="Add as your Emergency Contact"
          onChange={() => setFormData((f: any) => ({ ...f, isEmergencyContact: !f.isEmergencyContact }))}
          checked={!!formData.isEmergencyContact}
        />

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
            label: "Submit",
            variant: "primary",
            onClick: handleSubmit,
            size: "medium",
            loading: formLoading,
          },
        ]}
        content={
          <div className="flex flex-col h-full gap-[16px]">
            <div className="flex flex-col gap-[16px] pt-3">
              {showInputContainer && !isEditMode && (
                <InputContainer isEditMode={false} index={null} />
              )}
              <div className="flex flex-col gap-[24px] ">
                {familyMembersData
                .filter(member => (member.is_family_contact === 1))
                .map((familyMember, index) => (
                  <div key={index} className="flex flex-col gap-[24px]">
                    <PurpleTaggedCard
                      label={familyMember.relation || "Family"}
                      children={
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                          <div className="break-all">
                            <TextContent
                              header="last name"
                              text={familyMember.last_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="first name"
                              text={familyMember.first_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="middle name"
                              text={familyMember.middle_name}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="extensions"
                              text={familyMember.name_ext}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="contact number"
                              text={familyMember.contact_number}
                            />
                          </div>
                          <div className="break-all">
                            <TextContent
                              header="email"
                              text={familyMember.email}
                            />
                          </div>
                          <div className="sm:col-span-3 col-span-1  flex justify-between items-end">
                            <TextContent
                              header="address"
                              text={familyMember.address}
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
        description="Are you sure you want to delete this family?"
        subDescription="This person will also be removed from emergency contacts."
      />
    </>
  );
};

export default FamilyModal;

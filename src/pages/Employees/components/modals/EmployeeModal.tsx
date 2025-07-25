import { useState, useEffect } from "react";
import { Inputs, Modal, Dropdown, CustomDatePicker } from "enterprisze-global-components";
// import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
// import { Trash, Calendar } from "iconsax-reactjs";
import EmployeeConfirmationModal from "./EmployeeConfirmationModal";
import EmployeeUpdateConfirmationModal from "./EmployeeUpdateConfirmationModal";

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
        birthAddress: string;
        telephoneNumber: string;
        mobileNumber: string;
    };
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    addEmployeeData?: addEmployeeData;
    mode: "add" | "edit";
    employeeId?: string; // For edit mode
}
const EmployeeModal = ({ isOpen, onClose, onSubmitSuccess, addEmployeeData, mode, employeeId }: EmployeeModalProps) => {
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
            birthAddress: "",
            telephoneNumber: "",
            mobileNumber: "",
        },
    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showUpdateConfirmationModal, setShowUpdateConfirmationModal] = useState(false);
    const [currentAddEmployeeData, setCurrentAddEmployeeData] = useState<addEmployeeData | null>(
        mode === "edit" && addEmployeeData ? addEmployeeData : null
    );
    const [setAsPresentAddress, setSetAsPresentAddress] = useState(false);
    // const [profileImg, setProfileImg] = useState<string | undefined>();

    // Populate form data when in edit mode
    useEffect(() => {
        if (mode === "edit" && addEmployeeData) {
            setFormData(addEmployeeData);
        }
    }, [mode, addEmployeeData]);

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentAddEmployeeData(null);
    };

    const handleProceed = () => {
        setCurrentAddEmployeeData(formData);
        if (mode === "edit") {
            setShowUpdateConfirmationModal(true);
        } else {
            setShowConfirmationModal(true);
        }
    };

    // Handle input changes for form fields
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (section: keyof addEmployeeData, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Helper function to get dropdown display value
    const getDropdownValue = (value: string, options: { label: string; value: string }[]) => {
        if (!value) return undefined;
        const option = options.find(opt => opt.value === value);
        return option ? { label: option.label, value: option.value } : undefined;
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
                    <div className="flex flex-col w-full gap-[24px]">
                        {/* Name and Birthday Section */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 font-semibold text-szPrimary700">Name and Birthday</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                <Inputs 
                                    label="LAST NAME *" 
                                    value={formData.fullName.lastName || ""} 
                                    onChange={(e: any) => handleNestedInputChange('fullName', 'lastName', e.target.value)}
                                />
                                <Inputs 
                                    label="FIRST NAME *" 
                                    value={formData.fullName.firstName || ""} 
                                    onChange={(e: any) => handleNestedInputChange('fullName', 'firstName', e.target.value)}
                                />
                                <Inputs 
                                    label="MIDDLE NAME" 
                                    value={formData.fullName.middleName || ""} 
                                    onChange={(e: any) => handleNestedInputChange('fullName', 'middleName', e.target.value)}
                                />
                                <Inputs 
                                    label="EXTENSION" 
                                    value={formData.fullName.extension || ""} 
                                    onChange={(e: any) => handleNestedInputChange('fullName', 'extension', e.target.value)}
                                />
                                <Inputs 
                                    label="NICKNAME" 
                                    value={formData.fullName.nickname || ""} 
                                    onChange={(e: any) => handleNestedInputChange('fullName', 'nickname', e.target.value)}
                                />
                                <CustomDatePicker 
                                    label="BIRTHDATE" 
                                    value={formData.fullName.dateOfBirth || ""} 
                                    onChange={(value: Date) => handleNestedInputChange('fullName', 'dateOfBirth', value.toISOString())}
                                />
                            </div>
                        </div>

                        {/* Others Section */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 font-semibold text-szPrimary700">Others</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                <Inputs 
                                    label="RELIGION" 
                                    value={formData.others.religion || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'religion', e.target.value)}
                                />
                                <Dropdown
                                    label="GENDER"
                                    placeholder="Select gender"
                                    options={[
                                        { label: "Male", value: "M" },
                                        { label: "Female", value: "F" },
                                        { label: "Other", value: "O" }
                                    ]}
                                    onSelectionChange={(selected: any) => handleNestedInputChange('others', 'gender', selected?.value || '')}
                                    value={formData.others.gender ? { 
                                        label: formData.others.gender === "M" ? "Male" : 
                                               formData.others.gender === "F" ? "Female" : "Other", 
                                        value: formData.others.gender 
                                    } : undefined}
                                    usePortal={true}
                                    size="small"
                                />
                                <Dropdown
                                    label="CIVIL STATUS *"
                                    placeholder="Select civil status"
                                    options={[
                                        { label: "Single", value: "S" },
                                        { label: "Married", value: "M" },
                                        { label: "Divorced", value: "D" },
                                        { label: "Widowed", value: "W" },
                                        { label: "Separated", value: "SEP" }
                                    ]}
                                    onSelectionChange={(selected: any) => handleNestedInputChange('others', 'civilStatus', selected?.value || '')}
                                    value={formData.others.civilStatus ? { 
                                        label: formData.others.civilStatus === "S" ? "Single" : 
                                               formData.others.civilStatus === "M" ? "Married" : 
                                               formData.others.civilStatus === "D" ? "Divorced" : 
                                               formData.others.civilStatus === "W" ? "Widowed" : "Separated", 
                                        value: formData.others.civilStatus 
                                    } : undefined}
                                    usePortal={true}
                                    size="small"
                                />
                                <Inputs 
                                    label="PRONOUNS" 
                                    value={formData.others.pronouns || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'pronouns', e.target.value)}
                                />
                                <Inputs 
                                    label="BLOOD TYPE" 
                                    value={formData.others.bloodType || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'bloodType', e.target.value)}
                                />
                                <Inputs 
                                    label="BIRTH ADDRESS" 
                                    value={formData.others.birthAddress || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'birthAddress', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                <Inputs 
                                    label="TELEPHONE NUMBER" 
                                    value={formData.others.telephoneNumber || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'telephoneNumber', e.target.value)}
                                />
                                <Inputs 
                                    label="MOBILE NUMBER" 
                                    value={formData.others.mobileNumber || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'mobileNumber', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Address Section - Permanent Address */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 font-semibold text-szPrimary700">Address</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[12px]">
                                <h6 className="text-body-regular font-medium text-szGrey700">Permanent Address</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] items-center">
                                    <Dropdown 
                                        label="REGION" 
                                        placeholder="Select region" 
                                        options={[
                                            { label: "Region X (Northern Mindanao)", value: "10" },
                                            { label: "Region XI (Davao Region)", value: "11" },
                                            { label: "Region XII (SOCCSKSARGEN)", value: "12" },
                                            { label: "National Capital Region (NCR)", value: "13" },
                                            { label: "Cordillera Administrative Region (CAR)", value: "14" },
                                            { label: "Region I (Ilocos Region)", value: "01" },
                                            { label: "Region II (Cagayan Valley)", value: "02" },
                                            { label: "Region III (Central Luzon)", value: "03" },
                                            { label: "Region IV-A (CALABARZON)", value: "04" },
                                            { label: "Region IV-B (MIMAROPA)", value: "05" },
                                            { label: "Region V (Bicol Region)", value: "06" },
                                            { label: "Region VI (Western Visayas)", value: "07" },
                                            { label: "Region VII (Central Visayas)", value: "08" },
                                            { label: "Region VIII (Eastern Visayas)", value: "09" }
                                        ]} 
                                        onSelectionChange={(selected: any) => handleNestedInputChange('address', 'region', selected?.value || '')}
                                        value={formData.address.region ? { 
                                            label: formData.address.region === "09" ? "Region IX (Zamboanga Peninsula)" :
                                                   formData.address.region === "10" ? "Region X (Northern Mindanao)" :
                                                   formData.address.region === "11" ? "Region XI (Davao Region)" :
                                                   formData.address.region === "12" ? "Region XII (SOCCSKSARGEN)" :
                                                   formData.address.region === "13" ? "National Capital Region (NCR)" :
                                                   formData.address.region === "14" ? "Cordillera Administrative Region (CAR)" :
                                                   formData.address.region === "01" ? "Region I (Ilocos Region)" :
                                                   formData.address.region === "02" ? "Region II (Cagayan Valley)" :
                                                   formData.address.region === "03" ? "Region III (Central Luzon)" :
                                                   formData.address.region === "04" ? "Region IV-A (CALABARZON)" :
                                                   formData.address.region === "05" ? "Region IV-B (MIMAROPA)" :
                                                   formData.address.region === "06" ? "Region VI (Western Visayas)" :
                                                   formData.address.region === "07" ? "Region VII (Central Visayas)" :
                                                   formData.address.region === "08" ? "Region VIII (Eastern Visayas)" : formData.address.region,
                                            value: formData.address.region 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                    <Dropdown 
                                        label="PROVINCE" 
                                        placeholder="Select province" 
                                        options={[
                                            { label: "Davao del Sur", value: "1182" },
                                            { label: "Davao del Norte", value: "1183" },
                                            { label: "Davao Oriental", value: "1184" },
                                            { label: "Davao de Oro", value: "1186" },
                                            { label: "Davao Occidental", value: "1187" },
                                            { label: "Zamboanga del Sur", value: "0972" },
                                            { label: "Zamboanga del Norte", value: "0971" },
                                            { label: "Zamboanga Sibugay", value: "0973" },
                                            { label: "Bukidnon", value: "1013" },
                                            { label: "Camiguin", value: "1014" },
                                            { label: "Lanao del Norte", value: "1015" },
                                            { label: "Misamis Occidental", value: "1016" },
                                            { label: "Misamis Oriental", value: "1017" }
                                        ]} 
                                        onSelectionChange={(selected: any) => handleNestedInputChange('address', 'province', selected?.value || '')}
                                        value={formData.address.province ? { 
                                            label: formData.address.province === "1182" ? "Davao del Sur" :
                                                   formData.address.province === "1183" ? "Davao del Norte" :
                                                   formData.address.province === "1184" ? "Davao Oriental" :
                                                   formData.address.province === "1186" ? "Davao de Oro" :
                                                   formData.address.province === "1187" ? "Davao Occidental" :
                                                   formData.address.province === "0972" ? "Zamboanga del Sur" :
                                                   formData.address.province === "0971" ? "Zamboanga del Norte" :
                                                   formData.address.province === "0973" ? "Zamboanga Sibugay" :
                                                   formData.address.province === "1013" ? "Bukidnon" :
                                                   formData.address.province === "1014" ? "Camiguin" :
                                                   formData.address.province === "1015" ? "Lanao del Norte" :
                                                   formData.address.province === "1016" ? "Misamis Occidental" :
                                                   formData.address.province === "1017" ? "Misamis Oriental" : formData.address.province,
                                            value: formData.address.province 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                    <Dropdown 
                                        label="CITY / MUNICIPALITY" 
                                        placeholder="Select city" 
                                        options={[
                                            { label: "Davao City", value: "1182022" },
                                            { label: "Digos City", value: "1182064" },
                                            { label: "Tagum City", value: "1183024" },
                                            { label: "Panabo City", value: "1183019" },
                                            { label: "Island Garden City of Samal", value: "1183023" },
                                            { label: "Mati City", value: "1184037" },
                                            { label: "Nabunturan", value: "1186017" },
                                            { label: "Mawab", value: "1186012" },
                                            { label: "Monkayo", value: "1186008" },
                                            { label: "Compostela", value: "1186004" },
                                            { label: "New Bataan", value: "1186015" },
                                            { label: "Laak", value: "1186007" },
                                            { label: "Montevista", value: "1186014" },
                                            { label: "Pantukan", value: "1186020" },
                                            { label: "Maco", value: "1186009" },
                                            { label: "Maragusan", value: "1186011" }
                                        ]} 
                                        onSelectionChange={(selected: any) => handleNestedInputChange('address', 'cityMunicipality', selected?.value || '')}
                                        value={formData.address.cityMunicipality ? { 
                                            label: formData.address.cityMunicipality === "1182022" ? "Davao City" :
                                                   formData.address.cityMunicipality === "1182064" ? "Digos City" :
                                                   formData.address.cityMunicipality === "1183024" ? "Tagum City" :
                                                   formData.address.cityMunicipality === "1183019" ? "Panabo City" :
                                                   formData.address.cityMunicipality === "1183023" ? "Island Garden City of Samal" :
                                                   formData.address.cityMunicipality === "1184037" ? "Mati City" :
                                                   formData.address.cityMunicipality === "1186017" ? "Nabunturan" :
                                                   formData.address.cityMunicipality === "1186012" ? "Mawab" :
                                                   formData.address.cityMunicipality === "1186008" ? "Monkayo" :
                                                   formData.address.cityMunicipality === "1186004" ? "Compostela" :
                                                   formData.address.cityMunicipality === "1186015" ? "New Bataan" :
                                                   formData.address.cityMunicipality === "1186007" ? "Laak" :
                                                   formData.address.cityMunicipality === "1186014" ? "Montevista" :
                                                   formData.address.cityMunicipality === "1186020" ? "Pantukan" :
                                                   formData.address.cityMunicipality === "1186009" ? "Maco" :
                                                   formData.address.cityMunicipality === "1186011" ? "Maragusan" : formData.address.cityMunicipality,
                                            value: formData.address.cityMunicipality 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                    <Dropdown 
                                        label="BARANGAY" 
                                        placeholder="Select barangay" 
                                        options={[
                                            { label: "1-A", value: "001" },
                                            { label: "1-B", value: "002" },
                                            { label: "1-C", value: "003" },
                                            { label: "2-A", value: "004" },
                                            { label: "2-B", value: "005" },
                                            { label: "2-C", value: "006" },
                                            { label: "3-A", value: "007" },
                                            { label: "3-B", value: "008" },
                                            { label: "4-A", value: "009" },
                                            { label: "4-B", value: "010" },
                                            { label: "5-A", value: "011" },
                                            { label: "5-B", value: "012" },
                                            { label: "6-A", value: "013" },
                                            { label: "6-B", value: "014" },
                                            { label: "7-A", value: "015" },
                                            { label: "7-B", value: "016" },
                                            { label: "8-A", value: "017" },
                                            { label: "8-B", value: "018" },
                                            { label: "9-A", value: "019" },
                                            { label: "9-B", value: "020" },
                                            { label: "10-A", value: "021" },
                                            { label: "10-B", value: "022" }
                                        ]} 
                                        onSelectionChange={(selected: any) => handleNestedInputChange('address', 'barangay', selected?.value || '')}
                                        value={formData.address.barangay ? { 
                                            label: formData.address.barangay === "001" ? "1-A" :
                                                   formData.address.barangay === "002" ? "1-B" :
                                                   formData.address.barangay === "003" ? "1-C" :
                                                   formData.address.barangay === "004" ? "2-A" :
                                                   formData.address.barangay === "005" ? "2-B" :
                                                   formData.address.barangay === "006" ? "2-C" :
                                                   formData.address.barangay === "007" ? "3-A" :
                                                   formData.address.barangay === "008" ? "3-B" :
                                                   formData.address.barangay === "009" ? "4-A" :
                                                   formData.address.barangay === "010" ? "4-B" :
                                                   formData.address.barangay === "011" ? "5-A" :
                                                   formData.address.barangay === "012" ? "5-B" :
                                                   formData.address.barangay === "013" ? "6-A" :
                                                   formData.address.barangay === "014" ? "6-B" :
                                                   formData.address.barangay === "015" ? "7-A" :
                                                   formData.address.barangay === "016" ? "7-B" :
                                                   formData.address.barangay === "017" ? "8-A" :
                                                   formData.address.barangay === "018" ? "8-B" :
                                                   formData.address.barangay === "019" ? "9-A" :
                                                   formData.address.barangay === "020" ? "9-B" :
                                                   formData.address.barangay === "021" ? "10-A" :
                                                   formData.address.barangay === "022" ? "10-B" : formData.address.barangay,
                                            value: formData.address.barangay 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs 
                                            label="STREET / HOUSE NUMBER / LOT" 
                                            value={formData.address.streetHouseNoLot || ""} 
                                            onChange={(e: any) => handleNestedInputChange('address', 'streetHouseNoLot', e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs 
                                            label="POSTAL CODE" 
                                            value={formData.address.postalCode || ""} 
                                            onChange={(e: any) => handleNestedInputChange('address', 'postalCode', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-[8px] mt-[8px]">
                                    <input 
                                        type="checkbox" 
                                        id="setAsPresent" 
                                        checked={setAsPresentAddress}
                                        onChange={(e) => setSetAsPresentAddress(e.target.checked)}
                                        className="w-[16px] h-[16px] rounded border-szGrey300 text-szPrimary700 focus:ring-szPrimary700 focus:ring-2 focus:ring-offset-0" 
                                    />
                                    <label htmlFor="setAsPresent" className="text-body-regular text-szGrey700 cursor-pointer">
                                        Set as present address
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Present Address Section */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-body-regular font-medium text-szGrey700">Present Address</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] items-center">
                                <Dropdown 
                                    label="REGION" 
                                    placeholder="Select region" 
                                    options={[
                                        { label: "Region X (Northern Mindanao)", value: "10" },
                                        { label: "Region XI (Davao Region)", value: "11" },
                                        { label: "Region XII (SOCCSKSARGEN)", value: "12" },
                                        { label: "National Capital Region (NCR)", value: "13" },
                                        { label: "Cordillera Administrative Region (CAR)", value: "14" },
                                        { label: "Region I (Ilocos Region)", value: "01" },
                                        { label: "Region II (Cagayan Valley)", value: "02" },
                                        { label: "Region III (Central Luzon)", value: "03" },
                                        { label: "Region IV-A (CALABARZON)", value: "04" },
                                                                                                                                { label: "Region IV-B (MIMAROPA)", value: "05" },
                                            { label: "Region V (Bicol Region)", value: "06" },
                                            { label: "Region VI (Western Visayas)", value: "07" },
                                                                                    { label: "Region VII (Central Visayas)", value: "08" },
                                            { label: "Region VIII (Eastern Visayas)", value: "09" }
                                    ]} 
                                    onSelectionChange={(selected: any) => handleNestedInputChange('address', 'region', selected?.value || '')}
                                                                            value={formData.address.region ? { 
                                            label: formData.address.region === "09" ? "Region IX (Zamboanga Peninsula)" :
                                                   formData.address.region === "10" ? "Region X (Northern Mindanao)" :
                                                   formData.address.region === "11" ? "Region XI (Davao Region)" :
                                                   formData.address.region === "12" ? "Region XII (SOCCSKSARGEN)" :
                                                   formData.address.region === "13" ? "National Capital Region (NCR)" :
                                                   formData.address.region === "14" ? "Cordillera Administrative Region (CAR)" :
                                                   formData.address.region === "01" ? "Region I (Ilocos Region)" :
                                                   formData.address.region === "02" ? "Region II (Cagayan Valley)" :
                                                   formData.address.region === "03" ? "Region III (Central Luzon)" :
                                                   formData.address.region === "04" ? "Region IV-A (CALABARZON)" :
                                                   formData.address.region === "05" ? "Region IV-B (MIMAROPA)" :
                                                   formData.address.region === "06" ? "Region VI (Western Visayas)" :
                                                   formData.address.region === "07" ? "Region VII (Central Visayas)" :
                                                   formData.address.region === "08" ? "Region VIII (Eastern Visayas)" : formData.address.region,
                                            value: formData.address.region 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                />
                                <Dropdown 
                                    label="PROVINCE" 
                                    placeholder="Select province" 
                                    options={[
                                        { label: "Davao del Sur", value: "1182" },
                                        { label: "Davao del Norte", value: "1183" },
                                        { label: "Davao Oriental", value: "1184" },
                                        { label: "Davao de Oro", value: "1186" },
                                        { label: "Davao Occidental", value: "1187" },
                                        { label: "Zamboanga del Sur", value: "0972" },
                                        { label: "Zamboanga del Norte", value: "0971" },
                                        { label: "Zamboanga Sibugay", value: "0973" },
                                        { label: "Bukidnon", value: "1013" },
                                        { label: "Camiguin", value: "1014" },
                                        { label: "Lanao del Norte", value: "1015" },
                                        { label: "Misamis Occidental", value: "1016" },
                                        { label: "Misamis Oriental", value: "1017" }
                                    ]} 
                                    onSelectionChange={(selected: any) => handleNestedInputChange('address', 'province', selected?.value || '')}
                                                                            value={formData.address.province ? { 
                                            label: formData.address.province === "1182" ? "Davao del Sur" :
                                                   formData.address.province === "1183" ? "Davao del Norte" :
                                                   formData.address.province === "1184" ? "Davao Oriental" :
                                                   formData.address.province === "1186" ? "Davao de Oro" :
                                                   formData.address.province === "1187" ? "Davao Occidental" :
                                                   formData.address.province === "0972" ? "Zamboanga del Sur" :
                                                   formData.address.province === "0971" ? "Zamboanga del Norte" :
                                                   formData.address.province === "0973" ? "Zamboanga Sibugay" :
                                                   formData.address.province === "1013" ? "Bukidnon" :
                                                   formData.address.province === "1014" ? "Camiguin" :
                                                   formData.address.province === "1015" ? "Lanao del Norte" :
                                                   formData.address.province === "1016" ? "Misamis Occidental" :
                                                   formData.address.province === "1017" ? "Misamis Oriental" : formData.address.province,
                                            value: formData.address.province 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                />
                                <Dropdown 
                                    label="CITY / MUNICIPALITY" 
                                    placeholder="Select city" 
                                    options={[
                                        { label: "Davao City", value: "1182022" },
                                        { label: "Digos City", value: "1182064" },
                                        { label: "Tagum City", value: "1183024" },
                                        { label: "Panabo City", value: "1183019" },
                                        { label: "Island Garden City of Samal", value: "1183023" },
                                        { label: "Mati City", value: "1184037" },
                                        { label: "Nabunturan", value: "1186017" },
                                        { label: "Mawab", value: "1186012" },
                                        { label: "Monkayo", value: "1186008" },
                                        { label: "Compostela", value: "1186004" },
                                        { label: "New Bataan", value: "1186015" },
                                        { label: "Laak", value: "1186007" },
                                        { label: "Montevista", value: "1186014" },
                                        { label: "Pantukan", value: "1186020" },
                                        { label: "Maco", value: "1186009" },
                                        { label: "Maragusan", value: "1186011" }
                                    ]} 
                                    onSelectionChange={(selected: any) => handleNestedInputChange('address', 'cityMunicipality', selected?.value || '')}
                                                                            value={formData.address.cityMunicipality ? { 
                                            label: formData.address.cityMunicipality === "1182022" ? "Davao City" :
                                                   formData.address.cityMunicipality === "1182064" ? "Digos City" :
                                                   formData.address.cityMunicipality === "1183024" ? "Tagum City" :
                                                   formData.address.cityMunicipality === "1183019" ? "Panabo City" :
                                                   formData.address.cityMunicipality === "1183023" ? "Island Garden City of Samal" :
                                                   formData.address.cityMunicipality === "1184037" ? "Mati City" :
                                                   formData.address.cityMunicipality === "1186017" ? "Nabunturan" :
                                                   formData.address.cityMunicipality === "1186012" ? "Mawab" :
                                                   formData.address.cityMunicipality === "1186008" ? "Monkayo" :
                                                   formData.address.cityMunicipality === "1186004" ? "Compostela" :
                                                   formData.address.cityMunicipality === "1186015" ? "New Bataan" :
                                                   formData.address.cityMunicipality === "1186007" ? "Laak" :
                                                   formData.address.cityMunicipality === "1186014" ? "Montevista" :
                                                   formData.address.cityMunicipality === "1186020" ? "Pantukan" :
                                                   formData.address.cityMunicipality === "1186009" ? "Maco" :
                                                   formData.address.cityMunicipality === "1186011" ? "Maragusan" : formData.address.cityMunicipality,
                                            value: formData.address.cityMunicipality 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                />
                                <Dropdown 
                                    label="BARANGAY" 
                                    placeholder="Select barangay" 
                                    options={[
                                        { label: "1-A", value: "001" },
                                        { label: "1-B", value: "002" },
                                        { label: "1-C", value: "003" },
                                        { label: "2-A", value: "004" },
                                        { label: "2-B", value: "005" },
                                        { label: "2-C", value: "006" },
                                        { label: "3-A", value: "007" },
                                        { label: "3-B", value: "008" },
                                        { label: "4-A", value: "009" },
                                        { label: "4-B", value: "010" },
                                        { label: "5-A", value: "011" },
                                        { label: "5-B", value: "012" },
                                        { label: "6-A", value: "013" },
                                        { label: "6-B", value: "014" },
                                        { label: "7-A", value: "015" },
                                        { label: "7-B", value: "016" },
                                        { label: "8-A", value: "017" },
                                        { label: "8-B", value: "018" },
                                        { label: "9-A", value: "019" },
                                        { label: "9-B", value: "020" },
                                        { label: "10-A", value: "021" },
                                        { label: "10-B", value: "022" }
                                    ]} 
                                    onSelectionChange={(selected: any) => handleNestedInputChange('address', 'barangay', selected?.value || '')}
                                                                            value={formData.address.barangay ? { 
                                            label: formData.address.barangay === "001" ? "1-A" :
                                                   formData.address.barangay === "002" ? "1-B" :
                                                   formData.address.barangay === "003" ? "1-C" :
                                                   formData.address.barangay === "004" ? "2-A" :
                                                   formData.address.barangay === "005" ? "2-B" :
                                                   formData.address.barangay === "006" ? "2-C" :
                                                   formData.address.barangay === "007" ? "3-A" :
                                                   formData.address.barangay === "008" ? "3-B" :
                                                   formData.address.barangay === "009" ? "4-A" :
                                                   formData.address.barangay === "010" ? "4-B" :
                                                   formData.address.barangay === "011" ? "5-A" :
                                                   formData.address.barangay === "012" ? "5-B" :
                                                   formData.address.barangay === "013" ? "6-A" :
                                                   formData.address.barangay === "014" ? "6-B" :
                                                   formData.address.barangay === "015" ? "7-A" :
                                                   formData.address.barangay === "016" ? "7-B" :
                                                   formData.address.barangay === "017" ? "8-A" :
                                                   formData.address.barangay === "018" ? "8-B" :
                                                   formData.address.barangay === "019" ? "9-A" :
                                                   formData.address.barangay === "020" ? "9-B" :
                                                   formData.address.barangay === "021" ? "10-A" :
                                                   formData.address.barangay === "022" ? "10-B" : formData.address.barangay,
                                            value: formData.address.barangay 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                <div className="sm:col-span-4 col-span-1">
                                    <Inputs 
                                        label="STREET / HOUSE NUMBER / LOT" 
                                        value={formData.address.streetHouseNoLot || ""} 
                                        onChange={(e: any) => handleNestedInputChange('address', 'streetHouseNoLot', e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-1 col-span-2">
                                    <Inputs 
                                        label="POSTAL CODE" 
                                        value={formData.address.postalCode || ""} 
                                        onChange={(e: any) => handleNestedInputChange('address', 'postalCode', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Work Section */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 font-semibold text-szPrimary700">Work</h6>
                            </div>
                            <div className="flex flex-col w-full gap-[16px]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] items-center">
                                    <CustomDatePicker 
                                        label="DATE HIRED" 
                                        value={formData.work.dateHired || ""} 
                                        onChange={(value: Date) => handleNestedInputChange('work', 'dateHired', value.toISOString())}
                                    />
                                    <Dropdown
                                        label="POSITION"
                                        placeholder="Select position"
                                        options={[
                                            { label: "Software Engineer", value: "SE001" },
                                            { label: "Senior Software Engineer", value: "SSE001" },
                                            { label: "Team Lead", value: "TL001" },
                                            { label: "Project Manager", value: "PM001" },
                                            { label: "Business Analyst", value: "BA001" },
                                            { label: "Quality Assurance Engineer", value: "QA001" },
                                            { label: "UI/UX Designer", value: "UX001" },
                                            { label: "DevOps Engineer", value: "DE001" },
                                            { label: "Data Analyst", value: "DA001" },
                                            { label: "Product Manager", value: "PDM001" },
                                            { label: "Scrum Master", value: "SM001" },
                                            { label: "Technical Writer", value: "TW001" }
                                        ]}
                                        onSelectionChange={(selected: any) => handleNestedInputChange('work', 'position', selected?.value || '')}
                                        value={formData.work.position ? { 
                                            label: formData.work.position === "SE001" ? "Software Engineer" :
                                                   formData.work.position === "SSE001" ? "Senior Software Engineer" :
                                                   formData.work.position === "TL001" ? "Team Lead" :
                                                   formData.work.position === "PM001" ? "Project Manager" :
                                                   formData.work.position === "BA001" ? "Business Analyst" :
                                                   formData.work.position === "QA001" ? "Quality Assurance Engineer" :
                                                   formData.work.position === "UX001" ? "UI/UX Designer" :
                                                   formData.work.position === "DE001" ? "DevOps Engineer" :
                                                   formData.work.position === "DA001" ? "Data Analyst" :
                                                   formData.work.position === "PDM001" ? "Product Manager" :
                                                   formData.work.position === "SM001" ? "Scrum Master" :
                                                   formData.work.position === "TW001" ? "Technical Writer" : formData.work.position,
                                            value: formData.work.position 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                    <Dropdown
                                        label="POSITION STATUS"
                                        placeholder="Select position status"
                                        options={[
                                            { label: "Trainee", value: "TRAINEE" },
                                            { label: "Probationary", value: "PROBATIONARY" },
                                            { label: "Regular", value: "REGULAR" },
                                            { label: "Contract", value: "CONTRACT" },
                                            { label: "Part-time", value: "PART_TIME" },
                                            { label: "Intern", value: "INTERN" }
                                        ]}
                                        onSelectionChange={(selected: any) => handleNestedInputChange('work', 'positionStatus', selected?.value || '')}
                                        value={getDropdownValue(formData.work.positionStatus, [
                                            { label: "Trainee", value: "TRAINEE" },
                                            { label: "Probationary", value: "PROBATIONARY" },
                                            { label: "Regular", value: "REGULAR" },
                                            { label: "Contract", value: "CONTRACT" },
                                            { label: "Part-time", value: "PART_TIME" },
                                            { label: "Intern", value: "INTERN" }
                                        ])}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                    <Dropdown
                                        label="EMPLOYMENT STATUS"
                                        placeholder="Select employment status"
                                        options={[
                                            { label: "Active", value: "ACTIVE" },
                                            { label: "Inactive", value: "INACTIVE" },
                                            { label: "Terminated", value: "TERMINATED" },
                                            { label: "Resigned", value: "RESIGNED" },
                                            { label: "Retired", value: "RETIRED" },
                                            { label: "Suspended", value: "SUSPENDED" }
                                        ]}
                                        onSelectionChange={(selected: any) => handleNestedInputChange('work', 'employmentStatus', selected?.value || '')}
                                        value={getDropdownValue(formData.work.employmentStatus, [
                                            { label: "Active", value: "ACTIVE" },
                                            { label: "Inactive", value: "INACTIVE" },
                                            { label: "Terminated", value: "TERMINATED" },
                                            { label: "Resigned", value: "RESIGNED" },
                                            { label: "Retired", value: "RETIRED" },
                                            { label: "Suspended", value: "SUSPENDED" }
                                        ])}
                                    />
                                    <Inputs 
                                        label="WORK EMAIL" 
                                        value={formData.work.workEmail || ""} 
                                        onChange={(e: any) => handleNestedInputChange('work', 'workEmail', e.target.value)}
                                    />
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
            <EmployeeUpdateConfirmationModal
                isOpen={showUpdateConfirmationModal}
                onClose={() => setShowUpdateConfirmationModal(false)}
                updateEmployeeData={currentAddEmployeeData ? [currentAddEmployeeData] : []}
                employeeId={employeeId || ""}
                onSubmitSuccess={onSubmitSuccess}
            />
        </div>
    );
};

export default EmployeeModal;

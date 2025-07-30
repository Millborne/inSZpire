import { useState, useEffect, useMemo } from "react";
import { Inputs, Modal, Dropdown, CustomDatePicker } from "enterprisze-global-components";
// import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
// import { Trash, Calendar } from "iconsax-reactjs";
import EmployeeConfirmationModal from "./EmployeeConfirmationModal";
import EmployeeUpdateConfirmationModal from "./EmployeeUpdateConfirmationModal";
import { usePositionService } from "../../../../services/settings/positions/list/use-positions";
import { getReligionName } from "../../../../utils/employeeTransformers";
import { formatDateForBackend, parseDateForDatePicker } from "../../../../utils";

import SZOfficialLogo from "../../../assets/SZ Official Logo_circle.png";

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
    permanentAddress: {
        region: string;
        province: string;
        cityMunicipality: string;
        barangay: string;
        streetHouseNoLot: string;
        postalCode: string;
        country: string;
    };
    presentAddress: {
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
        personalEmail: string;
    };
    address?: any
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    addEmployeeData?: addEmployeeData;
    originalEmployeeData?: any; // Original employee data from API
    mode: "add" | "edit";
    employeeId?: string; // For edit mode
}
const EmployeeModal = ({ isOpen, onClose, onSubmitSuccess, addEmployeeData, originalEmployeeData, mode, employeeId }: EmployeeModalProps) => {
    console.log("Original employee data:", originalEmployeeData, addEmployeeData, mode, employeeId);
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
        permanentAddress: {
            region: "",
            province: "",
            cityMunicipality: "",
            barangay: "",
            streetHouseNoLot: "",
            postalCode: "",
            country: "",
        },
        presentAddress: {
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
            personalEmail: "",
        },
    });



    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showUpdateConfirmationModal, setShowUpdateConfirmationModal] = useState(false);
    const [currentAddEmployeeData, setCurrentAddEmployeeData] = useState<addEmployeeData | null>(
        mode === "edit" && addEmployeeData ? addEmployeeData : null
    );

    const [setAsPresentAddress, setSetAsPresentAddress] = useState(false);

    // Fetch positions from API
    const fetchPositions = async () => {
        setIsLoadingPositions(true);
        try {
            const response = await fetch('https://erp-team-and-position-api-dev.supportzebra.net/api/v1/position/getPositions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.positions) {
                    const transformedPositions = data.positions.map((position: any) => ({
                        label: `${position.position_name} - ${position.position_code}`,
                        value: position.position_ID,
                    }));
                    setPositions(transformedPositions);
                }
            } else {
                console.error('Failed to fetch positions');
            }
        } catch (error) {
            console.error('Error fetching positions:', error);
        } finally {
            setIsLoadingPositions(false);
        }
    };

    // Load positions when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchPositions();
        }
    }, [isOpen]);

    // Handle "Set as present address" checkbox effect
    const handleSetAsPresentAddressChange = (checked: boolean) => {
        setSetAsPresentAddress(checked);
        if (checked) {
            // Copy permanent address to present address
            setFormData(prev => ({
                ...prev,
                presentAddress: {
                    ...prev.permanentAddress
                }
            }));
        }
    };

    console.log("Form data:", formData);
    // const [profileImg, setProfileImg] = useState<string | undefined>();

    // Separate state for present address
    const [presentAddress, setPresentAddress] = useState({
        region: "",
        province: "",
        cityMunicipality: "",
        barangay: "",
        streetHouseNoLot: "",
        postalCode: "",
        country: "",
    });

    // Position service for fetching positions
    const positionService = usePositionService();
    const [positions, setPositions] = useState<any[]>([]);
    const [isLoadingPositions, setIsLoadingPositions] = useState(false);
    
    // Debug: Log the environment variable
    console.log("VITE_TEAM_AND_POSITION_SERVICE:", import.meta.env.VITE_TEAM_AND_POSITION_SERVICE);

    // Populate form data when in edit mode
    useEffect(() => {
        console.log("-----------------------------------------------------------------------", mode, addEmployeeData)
        if (mode === "edit" && addEmployeeData) {
            console.log("Setting form data for edit mode:", addEmployeeData);
            setFormData(addEmployeeData);
        }
    }, [mode, addEmployeeData, isOpen]);



    // Fetch positions when modal opens
    useEffect(() => {
        const fetchPositions = async () => {
            if (isOpen) {
                setIsLoadingPositions(true);
                try {
                    // Use the direct API URL you provided
                    const response = await fetch('https://erp-team-and-position-api-dev.supportzebra.net/api/v1/position/getPositions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            is_archived: 0,
                            offset: 0,
                            limit: 1000,
                        })
                    });
                    
                    console.log("API Response status:", response.status);
                    console.log("API Response headers:", response.headers);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log("API Response data:", data);
                        
                        if (data.positions && Array.isArray(data.positions)) {
                            setPositions(data.positions);
                            console.log("Successfully set positions:", data.positions.length, "positions");
                        } else {
                            console.log("No positions array found in response:", data);
                        }
                    } else {
                        console.error("API request failed:", response.status, response.statusText);
                        const errorText = await response.text();
                        console.error("Error response:", errorText);
                    }
                } catch (error) {
                    console.error("Error fetching positions:", error);
                } finally {
                    setIsLoadingPositions(false);
                }
            }
        };

        fetchPositions();
    }, [isOpen]);

    // Transform positions to dropdown options
    const positionOptions = useMemo(() => {
        console.log("Transforming positions:", positions);
        return positions.map((position) => ({
            label: position.position_name || position.position_code || "Unknown Position",
            value: position.position_ID || "",
        }));
    }, [positions]);

    // Religion options
    const religionOptions = useMemo(() => [
        { label: "Judaism", value: "judaism" },
        { label: "Buddhism", value: "buddhism" },
        { label: "Sikhism", value: "sikhism" },
        { label: "Born Again", value: "born again" },
        { label: "Iglesia sa Dios", value: "iglesia sa dios" },
        { label: "Christian", value: "christian" },
        { label: "Roman Catholic", value: "roman catholic" },
        { label: "Iglesia ni Cristo", value: "iglesia ni cristo" },
        { label: "Islam", value: "islam" },
        { label: "Hinduism", value: "hinduism" },
        { label: "Seventh Day Adventist", value: "seventh day adventist" },
    ], []);

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentAddEmployeeData(null);
    };

  const handleProceed = () => {
       // For edit mode, include present address data
       if (mode === "edit") {
        const formDataWithPresentAddress = {
            ...formData,
            address: {
                ...formData.address,
                // Include present address data if checkbox is checked
                ...(setAsPresentAddress ? presentAddress : {})
            }
        };
        console.log("Edit mode - formData being passed to confirmation:", formDataWithPresentAddress);
        setCurrentAddEmployeeData(formDataWithPresentAddress);
        setShowUpdateConfirmationModal(true);
    } else {
        setCurrentAddEmployeeData(formData);
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

    // Handle "Set as present address" checkbox effect
    useEffect(() => {
        if (setAsPresentAddress) {
            // Copy permanent address to present address
            setPresentAddress({
                ...formData.permanentAddress,
            });
        }
    }, [setAsPresentAddress, formData.permanentAddress]);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center relative z-50">
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
                                    value={parseDateForDatePicker(formData.fullName.dateOfBirth)} 
                                    onChange={(value: Date) => {
                                        const formattedDate = formatDateForBackend(value);
                                        console.log("Date picker change:", {
                                            selectedDate: value.toDateString(),
                                            formattedForBackend: formattedDate,
                                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                                        });
                                        handleNestedInputChange('fullName', 'dateOfBirth', formattedDate);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Others Section */}
                        <div className="flex flex-col w-full gap-[12px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 font-semibold text-szPrimary700">Others</h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                <Dropdown
                                    label="RELIGION"
                                    placeholder="Select religion"
                                    options={religionOptions}
                                    onSelectionChange={(selected: any) => handleNestedInputChange('others', 'religion', selected?.value || '')}
                                    value={formData.others.religion ? { 
                                        label: religionOptions.find(option => option.value === formData.others.religion)?.label || formData.others.religion,
                                        value: formData.others.religion 
                                    } : undefined}
                                    usePortal={true}
                                    size="small"
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-center">
                                <Inputs 
                                    label="PERSONAL EMAIL" 
                                    value={formData.others.personalEmail || ""} 
                                    onChange={(e: any) => handleNestedInputChange('others', 'personalEmail', e.target.value)}
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
                                        onSelectionChange={(selected: any) => handleNestedInputChange('permanentAddress', 'region', selected?.value || '')}
                                        value={formData.permanentAddress.region ? { 
                                            label: formData.permanentAddress.region === "09" ? "Region IX (Zamboanga Peninsula)" :
                                                   formData.permanentAddress.region === "10" ? "Region X (Northern Mindanao)" :
                                                   formData.permanentAddress.region === "11" ? "Region XI (Davao Region)" :
                                                   formData.permanentAddress.region === "12" ? "Region XII (SOCCSKSARGEN)" :
                                                   formData.permanentAddress.region === "13" ? "National Capital Region (NCR)" :
                                                   formData.permanentAddress.region === "14" ? "Cordillera Administrative Region (CAR)" :
                                                   formData.permanentAddress.region === "01" ? "Region I (Ilocos Region)" :
                                                   formData.permanentAddress.region === "02" ? "Region II (Cagayan Valley)" :
                                                   formData.permanentAddress.region === "03" ? "Region III (Central Luzon)" :
                                                   formData.permanentAddress.region === "04" ? "Region IV-A (CALABARZON)" :
                                                   formData.permanentAddress.region === "05" ? "Region IV-B (MIMAROPA)" :
                                                   formData.permanentAddress.region === "06" ? "Region VI (Western Visayas)" :
                                                   formData.permanentAddress.region === "07" ? "Region VII (Central Visayas)" :
                                                   formData.permanentAddress.region === "08" ? "Region VIII (Eastern Visayas)" : formData.permanentAddress.region,
                                            value: formData.permanentAddress.region 
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
                                        onSelectionChange={(selected: any) => handleNestedInputChange('permanentAddress', 'province', selected?.value || '')}
                                        value={formData.permanentAddress.province ? { 
                                            label: formData.permanentAddress.province === "1182" ? "Davao del Sur" :
                                                   formData.permanentAddress.province === "1183" ? "Davao del Norte" :
                                                   formData.permanentAddress.province === "1184" ? "Davao Oriental" :
                                                   formData.permanentAddress.province === "1186" ? "Davao de Oro" :
                                                   formData.permanentAddress.province === "1187" ? "Davao Occidental" :
                                                   formData.permanentAddress.province === "0972" ? "Zamboanga del Sur" :
                                                   formData.permanentAddress.province === "0971" ? "Zamboanga del Norte" :
                                                   formData.permanentAddress.province === "0973" ? "Zamboanga Sibugay" :
                                                   formData.permanentAddress.province === "1013" ? "Bukidnon" :
                                                   formData.permanentAddress.province === "1014" ? "Camiguin" :
                                                   formData.permanentAddress.province === "1015" ? "Lanao del Norte" :
                                                   formData.permanentAddress.province === "1016" ? "Misamis Occidental" :
                                                   formData.permanentAddress.province === "1017" ? "Misamis Oriental" : formData.permanentAddress.province,
                                            value: formData.permanentAddress.province 
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
                                        onSelectionChange={(selected: any) => handleNestedInputChange('permanentAddress', 'cityMunicipality', selected?.value || '')}
                                        value={formData.permanentAddress.cityMunicipality ? { 
                                            label: formData.permanentAddress.cityMunicipality === "1182022" ? "Davao City" :
                                                   formData.permanentAddress.cityMunicipality === "1182064" ? "Digos City" :
                                                   formData.permanentAddress.cityMunicipality === "1183024" ? "Tagum City" :
                                                   formData.permanentAddress.cityMunicipality === "1183019" ? "Panabo City" :
                                                   formData.permanentAddress.cityMunicipality === "1183023" ? "Island Garden City of Samal" :
                                                   formData.permanentAddress.cityMunicipality === "1184037" ? "Mati City" :
                                                   formData.permanentAddress.cityMunicipality === "1186017" ? "Nabunturan" :
                                                   formData.permanentAddress.cityMunicipality === "1186012" ? "Mawab" :
                                                   formData.permanentAddress.cityMunicipality === "1186008" ? "Monkayo" :
                                                   formData.permanentAddress.cityMunicipality === "1186004" ? "Compostela" :
                                                   formData.permanentAddress.cityMunicipality === "1186015" ? "New Bataan" :
                                                   formData.permanentAddress.cityMunicipality === "1186007" ? "Laak" :
                                                   formData.permanentAddress.cityMunicipality === "1186014" ? "Montevista" :
                                                   formData.permanentAddress.cityMunicipality === "1186020" ? "Pantukan" :
                                                   formData.permanentAddress.cityMunicipality === "1186009" ? "Maco" :
                                                   formData.permanentAddress.cityMunicipality === "1186011" ? "Maragusan" : formData.permanentAddress.cityMunicipality,
                                            value: formData.permanentAddress.cityMunicipality 
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
                                        onSelectionChange={(selected: any) => handleNestedInputChange('permanentAddress', 'barangay', selected?.value || '')}
                                        value={formData.permanentAddress.barangay ? { 
                                            label: formData.permanentAddress.barangay === "001" ? "1-A" :
                                                   formData.permanentAddress.barangay === "002" ? "1-B" :
                                                   formData.permanentAddress.barangay === "003" ? "1-C" :
                                                   formData.permanentAddress.barangay === "004" ? "2-A" :
                                                   formData.permanentAddress.barangay === "005" ? "2-B" :
                                                   formData.permanentAddress.barangay === "006" ? "2-C" :
                                                   formData.permanentAddress.barangay === "007" ? "3-A" :
                                                   formData.permanentAddress.barangay === "008" ? "3-B" :
                                                   formData.permanentAddress.barangay === "009" ? "4-A" :
                                                   formData.permanentAddress.barangay === "010" ? "4-B" :
                                                   formData.permanentAddress.barangay === "011" ? "5-A" :
                                                   formData.permanentAddress.barangay === "012" ? "5-B" :
                                                   formData.permanentAddress.barangay === "013" ? "6-A" :
                                                   formData.permanentAddress.barangay === "014" ? "6-B" :
                                                   formData.permanentAddress.barangay === "015" ? "7-A" :
                                                   formData.permanentAddress.barangay === "016" ? "7-B" :
                                                   formData.permanentAddress.barangay === "017" ? "8-A" :
                                                   formData.permanentAddress.barangay === "018" ? "8-B" :
                                                   formData.permanentAddress.barangay === "019" ? "9-A" :
                                                   formData.permanentAddress.barangay === "020" ? "9-B" :
                                                   formData.permanentAddress.barangay === "021" ? "10-A" :
                                                   formData.permanentAddress.barangay === "022" ? "10-B" : formData.permanentAddress.barangay,
                                            value: formData.permanentAddress.barangay 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs 
                                            label="STREET / HOUSE NUMBER / LOT" 
                                            value={formData.permanentAddress.streetHouseNoLot || ""} 
                                            onChange={(e: any) => handleNestedInputChange('permanentAddress', 'streetHouseNoLot', e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs 
                                            label="POSTAL CODE" 
                                            value={formData.permanentAddress.postalCode || ""} 
                                            onChange={(e: any) => handleNestedInputChange('permanentAddress', 'postalCode', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-[8px] mt-[8px]">
                                    <input 
                                        type="checkbox" 
                                        id="setAsPresent" 
                                        checked={setAsPresentAddress}
                                        onChange={(e) => handleSetAsPresentAddressChange(e.target.checked)}
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
                                    onSelectionChange={(selected: any) => setPresentAddress(prev => ({ ...prev, region: selected?.value || '' }))}
                                                                            value={presentAddress.region ? { 
                                            label: presentAddress.region === "09" ? "Region IX (Zamboanga Peninsula)" :
                                                   presentAddress.region === "10" ? "Region X (Northern Mindanao)" :
                                                   presentAddress.region === "11" ? "Region XI (Davao Region)" :
                                                   presentAddress.region === "12" ? "Region XII (SOCCSKSARGEN)" :
                                                   presentAddress.region === "13" ? "National Capital Region (NCR)" :
                                                   presentAddress.region === "14" ? "Cordillera Administrative Region (CAR)" :
                                                   presentAddress.region === "01" ? "Region I (Ilocos Region)" :
                                                   presentAddress.region === "02" ? "Region II (Cagayan Valley)" :
                                                   presentAddress.region === "03" ? "Region III (Central Luzon)" :
                                                   presentAddress.region === "04" ? "Region IV-A (CALABARZON)" :
                                                   presentAddress.region === "05" ? "Region IV-B (MIMAROPA)" :
                                                   presentAddress.region === "06" ? "Region VI (Western Visayas)" :
                                                   presentAddress.region === "07" ? "Region VII (Central Visayas)" :
                                                   presentAddress.region === "08" ? "Region VIII (Eastern Visayas)" : presentAddress.region,
                                            value: presentAddress.region 
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
                                    onSelectionChange={(selected: any) => setPresentAddress(prev => ({ ...prev, province: selected?.value || '' }))}
                                                                            value={presentAddress.province ? { 
                                            label: presentAddress.province === "1182" ? "Davao del Sur" :
                                                   presentAddress.province === "1183" ? "Davao del Norte" :
                                                   presentAddress.province === "1184" ? "Davao Oriental" :
                                                   presentAddress.province === "1186" ? "Davao de Oro" :
                                                   presentAddress.province === "1187" ? "Davao Occidental" :
                                                   presentAddress.province === "0972" ? "Zamboanga del Sur" :
                                                   presentAddress.province === "0971" ? "Zamboanga del Norte" :
                                                   presentAddress.province === "0973" ? "Zamboanga Sibugay" :
                                                   presentAddress.province === "1013" ? "Bukidnon" :
                                                   presentAddress.province === "1014" ? "Camiguin" :
                                                   presentAddress.province === "1015" ? "Lanao del Norte" :
                                                   presentAddress.province === "1016" ? "Misamis Occidental" :
                                                   presentAddress.province === "1017" ? "Misamis Oriental" : presentAddress.province,
                                            value: presentAddress.province 
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
                                    onSelectionChange={(selected: any) => setPresentAddress(prev => ({ ...prev, cityMunicipality: selected?.value || '' }))}
                                                                            value={presentAddress.cityMunicipality ? { 
                                            label: presentAddress.cityMunicipality === "1182022" ? "Davao City" :
                                                   presentAddress.cityMunicipality === "1182064" ? "Digos City" :
                                                   presentAddress.cityMunicipality === "1183024" ? "Tagum City" :
                                                   presentAddress.cityMunicipality === "1183019" ? "Panabo City" :
                                                   presentAddress.cityMunicipality === "1183023" ? "Island Garden City of Samal" :
                                                   presentAddress.cityMunicipality === "1184037" ? "Mati City" :
                                                   presentAddress.cityMunicipality === "1186017" ? "Nabunturan" :
                                                   presentAddress.cityMunicipality === "1186012" ? "Mawab" :
                                                   presentAddress.cityMunicipality === "1186008" ? "Monkayo" :
                                                   presentAddress.cityMunicipality === "1186004" ? "Compostela" :
                                                   presentAddress.cityMunicipality === "1186015" ? "New Bataan" :
                                                   presentAddress.cityMunicipality === "1186007" ? "Laak" :
                                                   presentAddress.cityMunicipality === "1186014" ? "Montevista" :
                                                   presentAddress.cityMunicipality === "1186020" ? "Pantukan" :
                                                   presentAddress.cityMunicipality === "1186009" ? "Maco" :
                                                   presentAddress.cityMunicipality === "1186011" ? "Maragusan" : presentAddress.cityMunicipality,
                                            value: presentAddress.cityMunicipality 
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
                                    onSelectionChange={(selected: any) => setPresentAddress(prev => ({ ...prev, barangay: selected?.value || '' }))}
                                                                            value={presentAddress.barangay ? { 
                                            label: presentAddress.barangay === "001" ? "1-A" :
                                                   presentAddress.barangay === "002" ? "1-B" :
                                                   presentAddress.barangay === "003" ? "1-C" :
                                                   presentAddress.barangay === "004" ? "2-A" :
                                                   presentAddress.barangay === "005" ? "2-B" :
                                                   presentAddress.barangay === "006" ? "2-C" :
                                                   presentAddress.barangay === "007" ? "3-A" :
                                                   presentAddress.barangay === "008" ? "3-B" :
                                                   presentAddress.barangay === "009" ? "4-A" :
                                                   presentAddress.barangay === "010" ? "4-B" :
                                                   presentAddress.barangay === "011" ? "5-A" :
                                                   presentAddress.barangay === "012" ? "5-B" :
                                                   presentAddress.barangay === "013" ? "6-A" :
                                                   presentAddress.barangay === "014" ? "6-B" :
                                                   presentAddress.barangay === "015" ? "7-A" :
                                                   presentAddress.barangay === "016" ? "7-B" :
                                                   presentAddress.barangay === "017" ? "8-A" :
                                                   presentAddress.barangay === "018" ? "8-B" :
                                                   presentAddress.barangay === "019" ? "9-A" :
                                                   presentAddress.barangay === "020" ? "9-B" :
                                                   presentAddress.barangay === "021" ? "10-A" :
                                                   presentAddress.barangay === "022" ? "10-B" : presentAddress.barangay,
                                            value: presentAddress.barangay 
                                        } : undefined}
                                        usePortal={true}
                                        size="small"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                <div className="sm:col-span-4 col-span-1">
                                    <Inputs 
                                        label="STREET / HOUSE NUMBER / LOT" 
                                        value={presentAddress.streetHouseNoLot || ""} 
                                        onChange={(e: any) => setPresentAddress(prev => ({ ...prev, streetHouseNoLot: e.target.value }))}
                                    />
                                </div>
                                <div className="sm:col-span-1 col-span-2">
                                    <Inputs 
                                        label="POSTAL CODE" 
                                        value={presentAddress.postalCode || ""} 
                                        onChange={(e: any) => setPresentAddress(prev => ({ ...prev, postalCode: e.target.value }))}
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
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] items-center relative z-50">
                                    <CustomDatePicker 
                                        label="DATE HIRED" 
                                        value={parseDateForDatePicker(formData.work.dateHired)} 
                                        onChange={(value: Date) => {
                                            const formattedDate = formatDateForBackend(value);
                                            console.log("Hire date picker change:", {
                                                selectedDate: value.toDateString(),
                                                formattedForBackend: formattedDate,
                                                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                                            });
                                            handleNestedInputChange('work', 'dateHired', formattedDate);
                                        }}
                                    />
                                    <Dropdown
                                        label="POSITION"
                                        placeholder={isLoadingPositions ? "Loading positions..." : "Select position"}
                                        options={positionOptions}
                                        onSelectionChange={(selected: any) => handleNestedInputChange('work', 'position', selected?.value || '')}
                                        value={formData.work.position ? positionOptions.find(option => option.value === formData.work.position) : undefined}
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
            {showConfirmationModal && (
                <EmployeeConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={handleConfirmationClose}
                    addEmployeeData={currentAddEmployeeData ? [currentAddEmployeeData] : []}
                    onSubmitSuccess={onSubmitSuccess}
                />
            )}
            {showUpdateConfirmationModal && (
                <EmployeeUpdateConfirmationModal
                    isOpen={showUpdateConfirmationModal}
                    onClose={() => setShowUpdateConfirmationModal(false)}
                    updateEmployeeData={currentAddEmployeeData ? [currentAddEmployeeData] : []}
                    originalEmployeeData={originalEmployeeData}
                    employeeId={employeeId || ""}
                    onSubmitSuccess={onSubmitSuccess}
                    onCloseParent={onClose}
                />
            )}
        </div>
    );
};

export default EmployeeModal;
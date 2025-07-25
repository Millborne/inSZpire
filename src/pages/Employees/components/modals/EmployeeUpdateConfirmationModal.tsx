import { Avatar, ConfirmationContent, Modal, TextContent, SnackbarAlert } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import { addEmployeeData } from "./EmployeeModal";
import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
import { useUpdateEmployeeMutation } from "../../../../services/employee/update/employeeUpdateAPI";
import { getReligionId, getReligionName } from "../../../../utils/employeeTransformers";

interface EmployeeUpdateConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    updateEmployeeData: addEmployeeData[];
    originalEmployeeData: any; // Original employee data from API
    employeeId: string;
    onSubmitSuccess?: () => void;
}

const EmployeeUpdateConfirmationModal: React.FC<EmployeeUpdateConfirmationModalProps> = ({ 
    isOpen, 
    onClose, 
    updateEmployeeData, 
    originalEmployeeData,
    employeeId,
    onSubmitSuccess 
}) => {
    const [profileImg, setProfileImg] = useState<string | undefined>();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");
    
    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

    // Get the first employee data (since we're updating one employee)
    const employeeData = updateEmployeeData[0];

    // Helper function to convert position ID to display name
    const getPositionDisplayName = (positionId: string): string => {
        // Map position IDs to readable names
        switch (positionId) {
            case "fc01fee95e8a11f0b4b102dcb324866b": return "Software Engineer";
            case "7bcd1724451611f0b6b802dcb324866b": return "Senior Software Engineer";
            case "a50ebaca58b311f0b6b802dcb324866b": return "Team Lead";
            case "f639b02d459e11f0b6b802dcb324866b": return "Project Manager";
            case "f639d0d3459e11f0b6b802dcb324866b": return "Business Analyst";
            case "f89bb5af459111f0b6b802dcb324866b": return "Quality Assurance Engineer";
            case "ab88ede7459b11f0b6b802dcb324866b": return "UI/UX Designer";
            case "cc8413ec58d611f0b6b802dcb324866b": return "DevOps Engineer";
            case "5382919b5e6211f0b4b102dcb324866b": return "Data Analyst";
            case "04ba80e2615d11f0b4b102dcb324866b": return "Product Manager";
            case "c92cf16b5e8b11f0b4b102dcb324866b": return "Scrum Master";
            case "c7f05146615011f0b4b102dcb324866b": return "Technical Writer";
            case "69c0f9fe614311f0b4b102dcb324866b": return "Software Engineer"; // New position ID
            case "69c0f9fe614311f0b4b102dcb324866c": return "Senior Software Engineer"; // Another new position ID
            case "69c0f9fe614311f0b4b102dcb324866d": return "Team Lead"; // Another new position ID
            case "69c0f9fe614311f0b4b102dcb324866e": return "Project Manager"; // Another new position ID
            default: {
                // If we have the position ID but no mapping, try to make it more readable
                if (positionId && positionId.length > 0) {
                    // Try to extract some meaning from the ID or return a generic name
                    return `Position (${positionId.substring(0, 8)}...)`;
                }
                return "Unknown Position";
            }
        }
    };

    // Helper function to convert position status ID to display name
    const getPositionStatusDisplayName = (statusId: string): string => {
        switch (statusId) {
            case "1a23aec4526211f0b6b802dcb324866b": return "Active";
            case "1a23b074526211f0b6b802dcb324866b": return "Training";
            case "1a23b100526211f0b6b802dcb324866b": return "Promoted";
            case "1a23b128526211f0b6b802dcb324866b": return "Transferred";
            case "1a23b14a526211f0b6b802dcb324866b": return "Closed";
            default: return statusId || "Unknown Status";
        }
    };

    // Helper function to convert employment status ID to display name
    const getEmploymentStatusDisplayName = (statusId: string): string => {
        switch (statusId) {
            case "6d6f5ba9526111f0b6b802dcb324866b": return "Active";
            case "6d6f5c00526111f0b6b802dcb324866b": return "Inactive";
            case "6d6f5c01526111f0b6b802dcb324866b": return "Terminated";
            case "6d6f5c02526111f0b6b802dcb324866b": return "Resigned";
            case "6d6f5c03526111f0b6b802dcb324866b": return "Retired";
            case "6d6f5c04526111f0b6b802dcb324866b": return "Suspended";
            default: return statusId || "Unknown Status";
        }
    };

    // Helper function to convert position status display name to ID
    const getPositionStatusID = (status: string): string => {
        switch (status) {
            case "TRAINEE": return "1a23b074526211f0b6b802dcb324866b"; // Training
            case "PROBATIONARY": return "1a23aec4526211f0b6b802dcb324866b"; // Active
            case "REGULAR": return "1a23aec4526211f0b6b802dcb324866b"; // Active
            case "CONTRACT": return "1a23b100526211f0b6b802dcb324866b"; // Promoted
            case "PART_TIME": return "1a23b128526211f0b6b802dcb324866b"; // Transferred
            case "INTERN": return "1a23b14a526211f0b6b802dcb324866b"; // Closed
            default: return "1a23aec4526211f0b6b802dcb324866b"; // Default to Active
        }
    };

    // Helper function to convert employment status display name to ID
    const getEmploymentStatusID = (status: string): string => {
        switch (status) {
            case "ACTIVE": return "6d6f5ba9526111f0b6b802dcb324866b";
            case "INACTIVE": return "6d6f5c00526111f0b6b802dcb324866b";
            case "TERMINATED": return "6d6f5c01526111f0b6b802dcb324866b";
            case "RESIGNED": return "6d6f5c02526111f0b6b802dcb324866b";
            case "RETIRED": return "6d6f5c03526111f0b6b802dcb324866b";
            case "SUSPENDED": return "6d6f5c04526111f0b6b802dcb324866b";
            default: return status || "";
        }
    };

    // Helper function to convert gender to display name
    const getGenderDisplayName = (gender: string): string => {
        switch (gender?.toLowerCase()) {
            case "male": return "Male";
            case "female": return "Female";
            case "other": return "Other";
            default: return gender || "Unknown";
        }
    };

    // Helper function to convert civil status to display name
    const getCivilStatusDisplayName = (status: string): string => {
        switch (status?.toLowerCase()) {
            case "single": return "Single";
            case "married": return "Married";
            case "divorced": return "Divorced";
            case "widowed": return "Widowed";
            case "separated": return "Separated";
            default: return status || "Unknown";
        }
    };

    // Helper function to convert database codes to display labels
    const getDisplayLabel = (value: string, type: string) => {
        switch (type) {
            case 'gender':
                return value === "M" ? "Male" : value === "F" ? "Female" : value === "O" ? "Other" : value;
            case 'civilStatus':
                return value === "S" ? "Single" : value === "M" ? "Married" : value === "D" ? "Divorced" : value === "W" ? "Widowed" : value === "SEP" ? "Separated" : value;
            case 'position':
                return value === "SE001" ? "Software Engineer" : value === "SSE001" ? "Senior Software Engineer" : value === "TL001" ? "Team Lead" : value === "PM001" ? "Project Manager" : value === "BA001" ? "Business Analyst" : value === "QA001" ? "Quality Assurance Engineer" : value === "UX001" ? "UI/UX Designer" : value === "DE001" ? "DevOps Engineer" : value === "DA001" ? "Data Analyst" : value === "PDM001" ? "Product Manager" : value === "SM001" ? "Scrum Master" : value === "TW001" ? "Technical Writer" : value;
            case 'positionStatus':
                return value === "TRAINEE" ? "Trainee" : value === "PROBATIONARY" ? "Probationary" : value === "REGULAR" ? "Regular" : value === "CONTRACT" ? "Contract" : value === "PART_TIME" ? "Part-time" : value === "INTERN" ? "Intern" : value;
            case 'employmentStatus':
                return value === "ACTIVE" ? "Active" : value === "INACTIVE" ? "Inactive" : value === "TERMINATED" ? "Terminated" : value === "RESIGNED" ? "Resigned" : value === "RETIRED" ? "Retired" : value === "SUSPENDED" ? "Suspended" : value;
            case 'region':
                return value === "10" ? "Region X (Northern Mindanao)" : value === "11" ? "Region XI (Davao Region)" : value === "12" ? "Region XII (SOCCSKSARGEN)" : value === "13" ? "National Capital Region (NCR)" : value === "14" ? "Cordillera Administrative Region (CAR)" : value === "01" ? "Region I (Ilocos Region)" : value === "02" ? "Region II (Cagayan Valley)" : value === "03" ? "Region III (Central Luzon)" : value === "04" ? "Region IV-A (CALABARZON)" : value === "05" ? "Region IV-B (MIMAROPA)" : value === "06" ? "Region V (Bicol Region)" : value === "07" ? "Region VI (Western Visayas)" : value === "08" ? "Region VII (Central Visayas)" : value === "09" ? "Region VIII (Eastern Visayas)" : value;
            case 'province':
                return value === "1182" ? "Davao del Sur" : value === "1183" ? "Davao del Norte" : value === "1184" ? "Davao Oriental" : value === "1186" ? "Davao de Oro" : value === "1187" ? "Davao Occidental" : value === "0972" ? "Zamboanga del Sur" : value === "0971" ? "Zamboanga del Norte" : value === "0973" ? "Zamboanga Sibugay" : value === "1013" ? "Bukidnon" : value === "1014" ? "Camiguin" : value === "1015" ? "Lanao del Norte" : value === "1016" ? "Misamis Occidental" : value === "1017" ? "Misamis Oriental" : value;
            case 'city':
                return value === "1182022" ? "Davao City" : value === "1182064" ? "Digos City" : value === "1183024" ? "Tagum City" : value === "1183019" ? "Panabo City" : value === "1183023" ? "Island Garden City of Samal" : value === "1184037" ? "Mati City" : value === "1186017" ? "Nabunturan" : value === "1186012" ? "Mawab" : value === "1186008" ? "Monkayo" : value === "1186004" ? "Compostela" : value === "1186015" ? "New Bataan" : value === "1186007" ? "Laak" : value === "1186014" ? "Montevista" : value === "1186020" ? "Pantukan" : value === "1186009" ? "Maco" : value === "1186011" ? "Maragusan" : value;
            case 'barangay':
                return value === "001" ? "1-A" : value === "002" ? "1-B" : value === "003" ? "1-C" : value === "004" ? "2-A" : value === "005" ? "2-B" : value === "006" ? "2-C" : value === "007" ? "3-A" : value === "008" ? "3-B" : value === "009" ? "4-A" : value === "010" ? "4-B" : value === "011" ? "5-A" : value === "012" ? "5-B" : value === "013" ? "6-A" : value === "014" ? "6-B" : value === "015" ? "7-A" : value === "016" ? "7-B" : value === "017" ? "8-A" : value === "018" ? "8-B" : value === "019" ? "9-A" : value === "020" ? "9-B" : value === "021" ? "10-A" : value === "022" ? "10-B" : value;
            default:
                return value;
        }
    };

    // Convert form data to display format - show all fields that have values
    const nameAndBirthdayData = employeeData && employeeData.fullName ? [
        { label: "Extension", value: employeeData.fullName.extension || "" },
        { label: "First Name", value: employeeData.fullName.firstName || "" },
        { label: "Middle Name", value: employeeData.fullName.middleName || "" },
        { label: "Last Name", value: employeeData.fullName.lastName || "" },
        { label: "Nickname", value: employeeData.fullName.nickname || "" },
        { label: "Date of Birth", value: employeeData.fullName.dateOfBirth || "" },
    ].filter(item => item.value.trim() !== "") : [];
    
    console.log("nameAndBirthdayData:", nameAndBirthdayData);

    const workData = employeeData && employeeData.work ? [
        { label: "Date Hired", value: employeeData.work.dateHired || "" },
        { label: "Position", value: getDisplayLabel(employeeData.work.position || "", "position") },
        { label: "Position Status", value: getDisplayLabel(employeeData.work.positionStatus || "", "positionStatus") },
        { label: "Employment Status", value: getDisplayLabel(employeeData.work.employmentStatus || "", "employmentStatus") },
        { label: "Work Email", value: employeeData.work.workEmail || "" },
    ].filter(item => item.value.trim() !== "") : [];
    
    console.log("workData:", workData);

    const otherData = employeeData && employeeData.others ? [
        { label: "Religion", value: employeeData.others.religion || "" },
        { label: "Gender", value: getDisplayLabel(employeeData.others.gender || "", "gender") },
        { label: "Civil Status", value: getDisplayLabel(employeeData.others.civilStatus || "", "civilStatus") },
        { label: "Pronouns", value: employeeData.others.pronouns || "" },
        { label: "Blood Type", value: employeeData.others.bloodType || "" },
        { label: "Birth Address", value: employeeData.others.birthAddress || "" },
        { label: "Telephone Number", value: employeeData.others.telephoneNumber || "" },
        { label: "Mobile Number", value: employeeData.others.mobileNumber || "" },
    ].filter(item => item.value.trim() !== "") : [];

    const addressData = employeeData && employeeData.address ? [
        { label: "Region", value: getDisplayLabel(employeeData.address.region || "", "region") },
        { label: "Province", value: getDisplayLabel(employeeData.address.province || "", "province") },
        { label: "City / Municipality", value: getDisplayLabel(employeeData.address.cityMunicipality || "", "city") },
        { label: "Barangay", value: getDisplayLabel(employeeData.address.barangay || "", "barangay") },
        { label: "Street / House Number / Lot", value: employeeData.address.streetHouseNoLot || "" },
        { label: "Postal Code", value: employeeData.address.postalCode || "" },
    ].filter(item => item.value.trim() !== "") : [];

    // Get employee full name for display
    const employeeFullName = employeeData && employeeData.fullName ? 
        `${employeeData.fullName.firstName || ""} ${employeeData.fullName.middleName || ""} ${employeeData.fullName.lastName || ""}`.trim() : 
        "Employee Name";

    // Get employee position for display
    const employeePosition = employeeData && employeeData.work ? getDisplayLabel(employeeData.work.position || "", "position") : "Position";

    // Helper function to create comparison data
    const createComparisonData = (originalData: any, updatedData: any) => {
        const originalProfile = originalData?.data?.profile || {};
        const originalEmployee = originalData?.data?.employee || {};
        const originalAddresses = originalData?.data?.addresses || [];
        
        // Find permanent address from original data
        const originalPermanentAddress = originalAddresses.find((addr: any) => addr.address_type_ID === 1) || {};
        
        const createComparisonItem = (label: string, original: any, updated: any, hasChanged: boolean) => ({
            label,
            value: "",
            oldValue: original || "—",
            newValue: updated || "—"
        });
        
        const comparisonData = {
            nameAndBirthday: [
                createComparisonItem("Extension", originalProfile.name_ext, updatedData.fullName.extension, originalProfile.name_ext !== updatedData.fullName.extension),
                createComparisonItem("First Name", originalProfile.first_name, updatedData.fullName.firstName, originalProfile.first_name !== updatedData.fullName.firstName),
                createComparisonItem("Middle Name", originalProfile.middle_name, updatedData.fullName.middleName, originalProfile.middle_name !== updatedData.fullName.middleName),
                createComparisonItem("Last Name", originalProfile.last_name, updatedData.fullName.lastName, originalProfile.last_name !== updatedData.fullName.lastName),
                createComparisonItem("Nickname", originalProfile.preferred_name, updatedData.fullName.nickname, originalProfile.preferred_name !== updatedData.fullName.nickname),
                createComparisonItem("Date of Birth", 
                    originalProfile.date_of_birth ? new Date(originalProfile.date_of_birth).toLocaleDateString('en-CA') : "", 
                    updatedData.fullName.dateOfBirth ? new Date(updatedData.fullName.dateOfBirth).toLocaleDateString('en-CA') : "", 
                    originalProfile.date_of_birth !== updatedData.fullName.dateOfBirth
                )
            ],
            work: [
                createComparisonItem("Date Hired", 
                    originalEmployee.hire_date ? new Date(originalEmployee.hire_date).toLocaleDateString('en-CA') : "", 
                    updatedData.work.dateHired ? new Date(updatedData.work.dateHired).toLocaleDateString('en-CA') : "", 
                    originalEmployee.hire_date !== updatedData.work.dateHired
                ),
                createComparisonItem("Position", 
                    getPositionDisplayName(originalEmployee.current_position_ID || ""), 
                    getPositionDisplayName(updatedData.work.position || ""), 
                    originalEmployee.current_position_ID !== updatedData.work.position
                ),
                createComparisonItem("Position Status", 
                    getPositionStatusDisplayName(originalEmployee.position_status_ID || ""), 
                    getPositionStatusDisplayName(updatedData.work.positionStatus || ""), 
                    originalEmployee.position_status_ID !== getPositionStatusID(updatedData.work.positionStatus || "")
                ),
                createComparisonItem("Employment Status", 
                    getEmploymentStatusDisplayName(originalEmployee.employee_status_ID || ""), 
                    getEmploymentStatusDisplayName(updatedData.work.employmentStatus || ""), 
                    originalEmployee.employee_status_ID !== getEmploymentStatusID(updatedData.work.employmentStatus || "")
                ),
                createComparisonItem("Work Email", 
                    originalEmployee.work_email, 
                    updatedData.work.workEmail, 
                    originalEmployee.work_email !== updatedData.work.workEmail
                )
            ],
            others: [
                createComparisonItem("Religion", 
                    getReligionName(originalProfile.religion_ID || ""), 
                    updatedData.others.religion, 
                    originalProfile.religion_ID !== getReligionId(updatedData.others.religion || "")
                ),
                createComparisonItem("Gender", 
                    getGenderDisplayName(originalProfile.gender || ""), 
                    getGenderDisplayName(updatedData.others.gender || ""), 
                    originalProfile.gender !== updatedData.others.gender
                ),
                createComparisonItem("Civil Status", 
                    getCivilStatusDisplayName(originalProfile.marital_status || ""), 
                    getCivilStatusDisplayName(updatedData.others.civilStatus || ""), 
                    originalProfile.marital_status !== updatedData.others.civilStatus
                ),
                createComparisonItem("Pronouns", 
                    originalProfile.pronoun, 
                    updatedData.others.pronouns, 
                    originalProfile.pronoun !== updatedData.others.pronouns
                ),
                createComparisonItem("Blood Type", 
                    originalProfile.blood_type, 
                    updatedData.others.bloodType, 
                    originalProfile.blood_type !== updatedData.others.bloodType
                ),
                createComparisonItem("Birth Address", 
                    originalProfile.birth_address, 
                    updatedData.others.birthAddress, 
                    originalProfile.birth_address !== updatedData.others.birthAddress
                ),
                createComparisonItem("Telephone Number", 
                    originalProfile.telephone_number, 
                    updatedData.others.telephoneNumber, 
                    originalProfile.telephone_number !== updatedData.others.telephoneNumber
                ),
                createComparisonItem("Mobile Number", 
                    originalProfile.mobile_number, 
                    updatedData.others.mobileNumber, 
                    originalProfile.mobile_number !== updatedData.others.mobileNumber
                )
            ],
            address: [
                createComparisonItem("Region", 
                    getDisplayLabel(originalPermanentAddress.region_state_ID?.toString() || "", "region"), 
                    getDisplayLabel(updatedData.address.region || "", "region"), 
                    originalPermanentAddress.region_state_ID?.toString() !== updatedData.address.region
                ),
                createComparisonItem("Province", 
                    getDisplayLabel(originalPermanentAddress.province_ID?.toString() || "", "province"), 
                    getDisplayLabel(updatedData.address.province || "", "province"), 
                    originalPermanentAddress.province_ID?.toString() !== updatedData.address.province
                ),
                createComparisonItem("City / Municipality", 
                    getDisplayLabel(originalPermanentAddress.city_municipality_ID?.toString() || "", "city"), 
                    getDisplayLabel(updatedData.address.cityMunicipality || "", "city"), 
                    originalPermanentAddress.city_municipality_ID?.toString() !== updatedData.address.cityMunicipality
                ),
                createComparisonItem("Barangay", 
                    getDisplayLabel(originalPermanentAddress.barangay_ID?.toString() || "", "barangay"), 
                    getDisplayLabel(updatedData.address.barangay || "", "barangay"), 
                    originalPermanentAddress.barangay_ID?.toString() !== updatedData.address.barangay
                ),
                createComparisonItem("Street / House Number / Lot", 
                    originalPermanentAddress.address_line_1, 
                    updatedData.address.streetHouseNoLot, 
                    originalPermanentAddress.address_line_1 !== updatedData.address.streetHouseNoLot
                ),
                createComparisonItem("Postal Code", 
                    originalPermanentAddress.postal_code, 
                    updatedData.address.postalCode, 
                    originalPermanentAddress.postal_code !== updatedData.address.postalCode
                )
            ]
        };

        return comparisonData;
    };

    // Create comparison data
    const comparisonData = createComparisonData(originalEmployeeData, employeeData);

    const handleUpdateEmployee = async () => {
        try {
            if (employeeData) {
                console.log("Starting employee update...");
                console.log("Employee data to update:", employeeData);
                console.log("Employee ID being used:", employeeId);

                // Transform data to match backend API structure
                const transformedData: any = {
                    employee_ID: employeeId, // Consistent with backend using employee_ID
                };

                // Use the helper functions defined at the top of the component

                // Include employee data if work-related fields changed
                console.log("Checking work fields for changes:", {
                    position: employeeData.work.position,
                    positionStatus: employeeData.work.positionStatus,
                    employmentStatus: employeeData.work.employmentStatus,
                    dateHired: employeeData.work.dateHired,
                    workEmail: employeeData.work.workEmail
                });
                
                // Always include employee data for work fields to ensure date_hired updates
                if (employeeData.work.position || employeeData.work.positionStatus || employeeData.work.employmentStatus || employeeData.work.dateHired || employeeData.work.workEmail) {
                    console.log("Processing hire_date:", {
                        originalDate: employeeData.work.dateHired,
                        processedDate: employeeData.work.dateHired ? new Date(employeeData.work.dateHired).toISOString().replace('T', ' ').replace('.000Z', '') : undefined
                    });
                    
                    transformedData.employee = {
                        current_position_ID: employeeData.work.position || undefined,
                        position_status_ID: employeeData.work.positionStatus ? getPositionStatusID(employeeData.work.positionStatus) : undefined,
                        employee_status_ID: employeeData.work.employmentStatus ? getEmploymentStatusID(employeeData.work.employmentStatus) : undefined,
                        hire_date: employeeData.work.dateHired ? new Date(employeeData.work.dateHired).toLocaleDateString('en-CA') : undefined,
                        work_email: employeeData.work.workEmail || undefined,
                        salary_frequency: "monthly", // Default value
                        sched_type: "flexible", // Default value
                        has_atm: 1, // Default value
                        is_agency: 0, // Default value
                        is_confidential: 1, // Default value
                        is_leave_earned: 1, // Default value
                        e_sig_url: "https://example.com/signatures/mixed_case.png", // Default value
                        qr_code_url: "https://example.com/qr/mixed_case.png", // Default value
                        separation_date: null, // Changed from empty string to null
                        reason_for_leaving: null, // Changed from empty string to null
                        not_for_rehire: 0, // Default value
                        is_archived: 0 // Default value
                    };
                }

                // Include profile data if any profile fields changed
                if (employeeData.fullName.firstName || employeeData.fullName.lastName || employeeData.fullName.middleName || 
                    employeeData.fullName.extension || employeeData.fullName.nickname || employeeData.fullName.dateOfBirth ||
                    employeeData.others.gender || employeeData.others.pronouns || employeeData.others.birthAddress ||
                    employeeData.others.civilStatus || employeeData.others.bloodType || employeeData.others.telephoneNumber ||
                    employeeData.others.mobileNumber || employeeData.others.religion) {
                    
                    transformedData.profile = {
                        first_name: employeeData.fullName.firstName || undefined,
                        last_name: employeeData.fullName.lastName || undefined,
                        middle_name: employeeData.fullName.middleName || undefined,
                        name_ext: employeeData.fullName.extension || undefined,
                        preferred_name: employeeData.fullName.nickname || undefined,
                        gender: employeeData.others.gender === "M" ? "male" : 
                               employeeData.others.gender === "F" ? "female" : 
                               employeeData.others.gender === "O" ? "other" : undefined,
                        pronoun: employeeData.others.pronouns || undefined,
                        date_of_birth: employeeData.fullName.dateOfBirth ? new Date(employeeData.fullName.dateOfBirth).toLocaleDateString('en-CA') : undefined,
                        birth_address: employeeData.others.birthAddress || undefined,
                        marital_status: employeeData.others.civilStatus === "S" ? "single" : 
                                     employeeData.others.civilStatus === "M" ? "married" : 
                                     employeeData.others.civilStatus === "D" ? "divorced" : 
                                     employeeData.others.civilStatus === "W" ? "widowed" : 
                                     employeeData.others.civilStatus === "SEP" ? "separated" : undefined,
                        religion_ID: employeeData.others.religion ? getReligionId(employeeData.others.religion) : "0c3b8bd02fa111f0b6b802dcb324866b", // Convert religion name to ID
                        blood_type: employeeData.others.bloodType || undefined,
                        telephone_number: employeeData.others.telephoneNumber || undefined,
                        mobile_number: employeeData.others.mobileNumber || undefined,
                        personal_email: "fortestinglangupdate@example.com", // Required field with valid email format
                        educational_attainment_ID: "7cbd3ea82b1111f0b6b802dcb324866b" // Default value
                    };
                }

                // Include address data if address fields changed
                if (employeeData.address.region || employeeData.address.province || employeeData.address.cityMunicipality ||
                    employeeData.address.barangay || employeeData.address.streetHouseNoLot || employeeData.address.postalCode) {
                    
                    // Get original address data to extract IDs
                    const originalAddresses = originalEmployeeData?.data?.addresses || [];
                    const originalPermanentAddress = originalAddresses.find((addr: any) => addr.address_type_ID === 1) || {};
                    const originalPresentAddress = originalAddresses.find((addr: any) => addr.address_type_ID === 2) || {};
                    
                    transformedData.permanent_address = {
                        address_ID: originalPermanentAddress.address_ID, // Include address ID for update
                        address_line_1: employeeData.address.streetHouseNoLot || "",
                        address_line_2: "",
                        country_ID: 1, // Default to Philippines
                        region_state_ID: parseInt(employeeData.address.region) || 14,
                        province_ID: parseInt(employeeData.address.province) || 62,
                        city_municipality_ID: parseInt(employeeData.address.cityMunicipality) || 1357,
                        barangay_ID: parseInt(employeeData.address.barangay) || 35769,
                        postal_code: employeeData.address.postalCode || "",
                        service_identifier: "HOME",
                        address_type_ID: 1,
                        entity: "PROFILE"
                    };

                    // If present address is different, include it too
                    transformedData.present_address = {
                        address_ID: originalPresentAddress.address_ID, // Include address ID for update
                        address_line_1: employeeData.address.streetHouseNoLot || "",
                        address_line_2: "",
                        country_ID: 1, // Default to Philippines
                        region_state_ID: parseInt(employeeData.address.region) || 14,
                        province_ID: parseInt(employeeData.address.province) || 62,
                        city_municipality_ID: parseInt(employeeData.address.cityMunicipality) || 1357,
                        barangay_ID: parseInt(employeeData.address.barangay) || 35770,
                        postal_code: employeeData.address.postalCode || "",
                        service_identifier: "WORK",
                        address_type_ID: 2,
                        entity: "PROFILE"
                    };
                }

                // Remove undefined values
                Object.keys(transformedData).forEach(key => {
                    if (transformedData[key] && typeof transformedData[key] === 'object') {
                        Object.keys(transformedData[key]).forEach(subKey => {
                            if (transformedData[key][subKey] === undefined) {
                                delete transformedData[key][subKey];
                            }
                        });
                        if (Object.keys(transformedData[key]).length === 0) {
                            delete transformedData[key];
                        }
                    }
                });

                console.log("Transformed data for API:", transformedData);
                console.log("Calling update endpoint: /employee/update");
                console.log("Employee ID in transformed data:", transformedData.employee_ID);

                const result = await updateEmployee(transformedData).unwrap();
                console.log("Update successful:", result);
                
                // Show success message immediately
                setSnackbarMessage("Employee updated successfully!");
                setSnackbarType("success");
                setShowSnackbar(true);
                
                // Call success callback first
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
                
                // Keep modal open longer to show success message clearly
                setTimeout(() => {
                    setShowSnackbar(false); // Hide snackbar first
                    setTimeout(() => {
                        onClose(); // Then close modal
                    }, 500);
                }, 4000);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            console.error('Full error details:', JSON.stringify(error, null, 2));
            
            // Show error message
            let errorMessage = "An error occurred while updating the employee";
            if (error && typeof error === 'object' && 'data' in error) {
                const errorData = (error as any).data;
                if (errorData?.message) {
                    errorMessage = errorData.message;
                } else if (errorData?.error) {
                    errorMessage = errorData.error;
                }
            }
            
            setSnackbarMessage(errorMessage);
            setSnackbarType("error");
            setShowSnackbar(true);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                showFooterDivider={false}
                icon={<InfoCircle />}
                title="Confirmation"
                showButton={false}
                modalWidth="w-[600px]"
                contentHeight="h-[65vh]"
                headerOptions="left"
                footerOptions="center"
                showCloseIcon={false}
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                    },
                    {
                        label: "Update",
                        variant: "primary",
                        onClick: handleUpdateEmployee,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to update this employee.</p>
                            <div className="flex flex-row items-center justify-center gap-[8px]">
                                <Avatar size="xsmall" src={profileImg || SZOfficialLogo} />
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong font-dmsans text-szBlack800">{employeeFullName}</p>
                                    <TextContent header={employeePosition} />
                                </div>
                            </div>
                                                    <div className="flex flex-col gap-[16px]">
                            <ConfirmationContent 
                                variant="edit" 
                                sectionLabel="NAME AND BIRTHDAY" 
                                data={comparisonData.nameAndBirthday.filter(item => item.oldValue !== item.newValue)} 
                            />
                            <ConfirmationContent 
                                variant="edit" 
                                sectionLabel="WORK" 
                                data={comparisonData.work.filter(item => item.oldValue !== item.newValue)} 
                            />
                            <ConfirmationContent 
                                variant="edit" 
                                sectionLabel="ADDRESS" 
                                data={comparisonData.address.filter(item => item.oldValue !== item.newValue)} 
                            />
                            <ConfirmationContent 
                                variant="edit" 
                                sectionLabel="OTHERS" 
                                data={comparisonData.others.filter(item => item.oldValue !== item.newValue)} 
                            />
                        </div>
                        </div>
                    </div>
                }
            />
            <SnackbarAlert
                isOpen={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                showCloseButton={true}
                type={snackbarType}
                title={snackbarMessage}
                animation="slide-up"
            />
        </>
    );
};

export default EmployeeUpdateConfirmationModal; 
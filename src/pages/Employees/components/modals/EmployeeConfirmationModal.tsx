import React, { useState } from "react";
import { Modal, Inputs, Dropdown, Avatar, SnackbarAlert, ConfirmationContent, TextContent } from "enterprisze-global-components";
import { InfoCircle, Warning2 } from "iconsax-reactjs";
import { useCreateEmployeeMutation } from "../../../../services/employee/create/employeeCreateAPI";
import { addEmployeeData } from "./EmployeeModal";
import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
import { useCreateEmployeeMutation } from "../../../../services/employee/create/employeeCreateAPI";
import { getReligionId } from "../../../../utils/employeeTransformers";
import { safeFormatDateForBackend } from "../../../../utils";

interface EmployeeConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    addEmployeeData: addEmployeeData[];
    onSubmitSuccess?: () => void;
}

const EmployeeConfirmationModal: React.FC<EmployeeConfirmationModalProps> = ({ isOpen, onClose, addEmployeeData, onSubmitSuccess }) => {
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBasicInfoPendingModalOpen, setIsBasicInfoPendingModalOpen] = useState(false);
    const [profileImg, setProfileImg] = useState<string | undefined>();
    
    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

    // Get the first employee data (since we're adding one employee)
    const employeeData = addEmployeeData[0];

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
            case "region":
                switch (value) {
                    case "09": return "Region IX (Zamboanga Peninsula)";
                    case "10": return "Region X (Northern Mindanao)";
                    case "11": return "Region XI (Davao Region)";
                    case "12": return "Region XII (SOCCSKSARGEN)";
                    case "13": return "National Capital Region (NCR)";
                    case "14": return "Cordillera Administrative Region (CAR)";
                    case "01": return "Region I (Ilocos Region)";
                    case "02": return "Region II (Cagayan Valley)";
                    case "03": return "Region III (Central Luzon)";
                    case "04": return "Region IV-A (CALABARZON)";
                    case "05": return "Region IV-B (MIMAROPA)";
                    case "06": return "Region V (Bicol Region)";
                    case "07": return "Region VI (Western Visayas)";
                    case "08": return "Region VII (Central Visayas)";
                    default: return value;
                }
            case "province":
                switch (value) {
                    case "1182": return "Davao del Sur";
                    case "1183": return "Davao del Norte";
                    case "1184": return "Davao Oriental";
                    case "1186": return "Davao de Oro";
                    case "1187": return "Davao Occidental";
                    case "0972": return "Zamboanga del Sur";
                    case "0971": return "Zamboanga del Norte";
                    case "0973": return "Zamboanga Sibugay";
                    case "1013": return "Bukidnon";
                    case "1014": return "Camiguin";
                    case "1015": return "Lanao del Norte";
                    case "1016": return "Misamis Occidental";
                    case "1017": return "Misamis Oriental";
                    default: return value;
                }
            case "city":
                switch (value) {
                    case "1182022": return "Davao City";
                    case "1182064": return "Digos City";
                    case "1183024": return "Tagum City";
                    case "1183019": return "Panabo City";
                    case "1183023": return "Island Garden City of Samal";
                    case "1184037": return "Mati City";
                    case "1186017": return "Nabunturan";
                    case "1186012": return "Mawab";
                    case "1186008": return "Monkayo";
                    case "1186004": return "Compostela";
                    case "1186015": return "New Bataan";
                    case "1186007": return "Laak";
                    case "1186014": return "Montevista";
                    case "1186020": return "Pantukan";
                    case "1186009": return "Maco";
                    case "1186011": return "Maragusan";
                    default: return value;
                }
            case "barangay":
                switch (value) {
                    case "001": return "1-A";
                    case "002": return "1-B";
                    case "003": return "1-C";
                    case "004": return "2-A";
                    case "005": return "2-B";
                    case "006": return "2-C";
                    case "007": return "3-A";
                    case "008": return "3-B";
                    case "009": return "4-A";
                    case "010": return "4-B";
                    case "011": return "5-A";
                    case "012": return "5-B";
                    case "013": return "6-A";
                    case "014": return "6-B";
                    case "015": return "7-A";
                    case "016": return "7-B";
                    case "017": return "8-A";
                    case "018": return "8-B";
                    case "019": return "9-A";
                    case "020": return "9-B";
                    case "021": return "10-A";
                    case "022": return "10-B";
                    default: return value;
                }
            default:
                return value;
        }
    };

    // Convert form data to display format
    const nameAndBirthdayData = employeeData && employeeData.fullName ? [
        { label: "Extension", value: employeeData.fullName.extension || "" },
        { label: "First Name", value: employeeData.fullName.firstName || "" },
        { label: "Middle Name", value: employeeData.fullName.middleName || "" },
        { label: "Last Name", value: employeeData.fullName.lastName || "" },
        { label: "Nickname", value: employeeData.fullName.nickname || "" },
        { label: "Date of Birth", value: employeeData.fullName.dateOfBirth || "" },
    ] : [];

    const workData = employeeData && employeeData.work ? [
        { label: "Date Hired", value: employeeData.work.dateHired || "" },
        { label: "Position", value: getDisplayLabel(employeeData.work.position || "", "position") },
        { label: "Position Status", value: getDisplayLabel(employeeData.work.positionStatus || "", "positionStatus") },
        { label: "Employment Status", value: getDisplayLabel(employeeData.work.employmentStatus || "", "employmentStatus") },
        { label: "Work Email", value: employeeData.work.workEmail || "" },
    ] : [];

    const otherData = employeeData && employeeData.others ? [
        { label: "Religion", value: employeeData.others.religion || "" },
        { label: "Gender", value: getDisplayLabel(employeeData.others.gender || "", "gender") },
        { label: "Civil Status", value: getDisplayLabel(employeeData.others.civilStatus || "", "civilStatus") },
        { label: "Pronouns", value: employeeData.others.pronouns || "" },
        { label: "Blood Type", value: employeeData.others.bloodType || "" },
        { label: "Birth Address", value: employeeData.others.birthAddress || "" },
        { label: "Telephone Number", value: employeeData.others.telephoneNumber || "" },
        { label: "Mobile Number", value: employeeData.others.mobileNumber || "" },
    ] : [];

    const addressData = employeeData && employeeData.address ? [
        { label: "Region", value: getDisplayLabel(employeeData.address.region || "", "region") },
        { label: "Province", value: getDisplayLabel(employeeData.address.province || "", "province") },
        { label: "City / Municipality", value: getDisplayLabel(employeeData.address.cityMunicipality || "", "city") },
        { label: "Barangay", value: getDisplayLabel(employeeData.address.barangay || "", "barangay") },
        { label: "Street / House Number / Lot", value: employeeData.address.streetHouseNoLot || "" },
        { label: "Postal Code", value: employeeData.address.postalCode || "" },
    ] : [];

    // Get employee full name for display
    const employeeFullName = employeeData && employeeData.fullName ? 
        `${employeeData.fullName.firstName || ""} ${employeeData.fullName.middleName || ""} ${employeeData.fullName.lastName || ""}`.trim() : 
        "Employee Name";

    // Get employee position for display - show position name if available, otherwise show the ID
    const getPositionDisplayName = (positionId: string) => {
        // For now, return the position ID as a fallback since we don't have access to the positions data here
        // In a real implementation, you might want to pass the positions data to this modal
        return positionId || "Position";
    };

    const employeePosition = employeeData ? 
        (employeeData.work.position ? getPositionDisplayName(employeeData.work.position) : "Position") : 
        "Position";

    const handlePendingCheck = async () => {
        try {
            const employeeData = addEmployeeData[0];
            if (employeeData) {
                const transformedData = {
                    work_email: employeeData.work.workEmail || "",
                    current_position_ID: employeeData.work.position || "", // Use the actual position_ID from the dropdown
                    sched_type: "flexible", // Default value
                    hire_date: safeFormatDateForBackend(employeeData.work.dateHired),
                    has_atm: 1,
                    salary_frequency: "monthly", // Default value
                    is_agency: 0,
                    is_confidential: 1,
                    is_leave_earned: 1,
                    e_sig_url: "https://example.com/signatures/mixed_case.png",
                    qr_code_url: "https://example.com/qr/mixed_case.png",
                    separation_date: "",
                    reason_for_leaving: "",
                    not_for_rehire: 0,
                    is_archived: 0,
                    profile: {
                        first_name: employeeData.fullName.firstName || "",
                        last_name: employeeData.fullName.lastName || "",
                        middle_name: employeeData.fullName.middleName || "",
                        name_ext: employeeData.fullName.extension || "",
                        preferred_name: employeeData.fullName.nickname || "",
                        profile_image: "https://example.com/profiles/alice.jpg",
                        gender: employeeData.others.gender === "M" ? "male" : employeeData.others.gender === "F" ? "female" : "other",
                        pronoun: employeeData.others.pronouns || "",
                        date_of_birth: safeFormatDateForBackend(employeeData.fullName.dateOfBirth),
                        birth_address: employeeData.others.birthAddress || "London, England", // Use form value or default
                        marital_status: employeeData.others.civilStatus === "S" ? "single" : 
                                     employeeData.others.civilStatus === "M" ? "married" : 
                                     employeeData.others.civilStatus === "D" ? "divorced" : 
                                     employeeData.others.civilStatus === "W" ? "widowed" : 
                                     employeeData.others.civilStatus === "SEP" ? "separated" : "single",
                        religion_ID: employeeData.others.religion ? getReligionId(employeeData.others.religion) : "0c3b8bd02fa111f0b6b802dcb324866b", // Convert religion name to ID
                        blood_type: employeeData.others.bloodType || "",
                        telephone_number: employeeData.others.telephoneNumber || "",
                        mobile_number: employeeData.others.mobileNumber || "",
                        personal_email: employeeData.others.personalEmail || "", // Use dynamic personal email from form
                        educational_attainment_ID: "7cbd3ea82b1111f0b6b802dcb324866b" // Default value
                    },
                    // Create permanent address record
                    permanent_address: {
                        address_line_1: employeeData.permanentAddress.streetHouseNoLot || "",
                        address_line_2: "",
                        country_ID: 1, // Default to Philippines
                        region_state_ID: parseInt(employeeData.permanentAddress.region) || 14,
                        province_ID: parseInt(employeeData.permanentAddress.province) || 62,
                        city_municipality_ID: parseInt(employeeData.permanentAddress.cityMunicipality) || 1357,
                        barangay_ID: parseInt(employeeData.permanentAddress.barangay) || 35769,
                        postal_code: employeeData.permanentAddress.postalCode || "",
                        service_identifier: "HOME",
                        address_type_ID: 1, // Permanent address type
                        entity: "PROFILE"
                    },
                    // Create present address record
                    present_address: {
                        address_line_1: employeeData.presentAddress.streetHouseNoLot || "",
                        address_line_2: "",
                        country_ID: 1, // Default to Philippines
                        region_state_ID: parseInt(employeeData.presentAddress.region) || 14,
                        province_ID: parseInt(employeeData.presentAddress.province) || 62,
                        city_municipality_ID: parseInt(employeeData.presentAddress.cityMunicipality) || 1357,
                        barangay_ID: parseInt(employeeData.presentAddress.barangay) || 35770,
                        postal_code: employeeData.presentAddress.postalCode || "",
                        service_identifier: "WORK",
                        address_type_ID: 2, // Present address type
                        entity: "PROFILE"
                    }
                };

                await createEmployee(transformedData).unwrap();
                
                // Show success notification
                setShowSuccessSnackbar(true);
                
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            }
        } catch (error: any) {
            console.error('Error creating employee:', error);
            console.error('Full error details:', JSON.stringify(error, null, 2));
            
            // Parse error message to show specific error
            let errorMsg = "An error occurred while creating the employee.";
            
            if (error?.data?.error) {
                const errorString = error.data.error;
                
                // Check for duplicate position error
                if (errorString.includes("Duplicate entry") && errorString.includes("current_position_ID")) {
                    const positionName = employeeData?.work.position ? getPositionDisplayName(employeeData.work.position) : "Selected position";
                    errorMsg = `The position "${positionName}" is already assigned to another employee. Please select a different position.`;
                } else if (errorString.includes("Duplicate entry")) {
                    errorMsg = "A duplicate entry was found. Please check your input and try again.";
                } else if (errorString.includes("foreign key constraint")) {
                    errorMsg = "Invalid reference data. Please check the selected options.";
                } else {
                    errorMsg = errorString;
                }
            } else if (error?.data?.message) {
                errorMsg = error.data.message;
            }
            
            setErrorMessage(errorMsg);
            setShowErrorModal(true);
        }
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setErrorMessage("");
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
                        label: isLoading ? "Creating..." : "Proceed",
                        variant: "primary",
                        onClick: handlePendingCheck,
                        size: "medium",
                        disabled: isLoading,
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to add this employee.</p>
                            <div className="flex flex-row items-center justify-center gap-[8px]">
                                <Avatar size="xsmall" src={SZOfficialLogo} />
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong font-dmsans text-szBlack800">{employeeFullName}</p>
                                    <TextContent header={employeePosition} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[16px]">
                            <ConfirmationContent 
                                variant="add" 
                                sectionLabel="NAME AND BIRTHDAY" 
                                data={[
                                    { label: "EXTENSION", value: employeeData?.fullName.extension || "—" },
                                    { label: "NICKNAME", value: employeeData?.fullName.nickname || "—" },
                                    { label: "BIRTHDATE", value: employeeData?.fullName.dateOfBirth || "—" }
                                ]} 
                            />
                            <ConfirmationContent 
                                variant="add" 
                                sectionLabel="WORK" 
                                data={[
                                    { label: "DATE HIRED", value: employeeData?.work.dateHired || "—" },
                                    { label: "POSITION", value: employeePosition },
                                    { label: "POSITION STATUS", value: getDisplayLabel(employeeData?.work.positionStatus || "", "positionStatus") },
                                    { label: "EMPLOYMENT STATUS", value: getDisplayLabel(employeeData?.work.employmentStatus || "", "employmentStatus") },
                                    { label: "WORK EMAIL", value: employeeData?.work.workEmail || "—" }
                                ]} 
                            />
                            <ConfirmationContent 
                                variant="add" 
                                sectionLabel="ADDRESS" 
                                data={addressData} 
                            />
                            <ConfirmationContent 
                                variant="add" 
                                sectionLabel="OTHERS" 
                                data={[
                                    { label: "RELIGION", value: employeeData?.others.religion || "—" },
                                    { label: "GENDER", value: getDisplayLabel(employeeData?.others.gender || "", "gender") },
                                    { label: "CIVIL STATUS", value: getDisplayLabel(employeeData?.others.civilStatus || "", "civilStatus") },
                                    { label: "PRONOUNS", value: employeeData?.others.pronouns || "—" },
                                    { label: "BLOOD TYPE", value: employeeData?.others.bloodType || "—" },
                                    { label: "BIRTH ADDRESS", value: employeeData?.others.birthAddress || "—" },
                                    { label: "TELEPHONE NUMBER", value: employeeData?.others.telephoneNumber || "—" },
                                    { label: "MOBILE NUMBER", value: employeeData?.others.mobileNumber || "—" }
                                ]} 
                            />
                        </div>
                    </div>
                }
            />

            {/* Error Modal */}
            <Modal
                isOpen={showErrorModal}
                onClose={handleErrorModalClose}
                showHeaderDivider={false}
                showFooterDivider={false}
                icon={<Warning2 />}
                title="Error"
                showButton={false}
                modalWidth="w-[500px]"
                contentHeight="h-auto"
                headerOptions="left"
                footerOptions="center"
                showCloseIcon={false}
                footerButtons={[
                    {
                        label: "OK",
                        variant: "primary",
                        onClick: handleErrorModalClose,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">Employee creation failed</p>
                            <p className="text-body-regular text-szGrey700 text-center">{errorMessage}</p>
                        </div>
                    </div>
                }
            />

            {/* Success Snackbar */}
            <SnackbarAlert
                isOpen={showSuccessSnackbar}
                onClose={() => setShowSuccessSnackbar(false)}
                showCloseButton={true}
                type="success"
                title="Employee created successfully!"
                animation="slide-up"
            />
        </>
    );
};

export default EmployeeConfirmationModal;
import { Avatar, ConfirmationContent, Modal, TextContent } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import BasicInfoPendingModal from "./BasicInfoPendingModal";
import { addEmployeeData } from "./EmployeeModal";
import SZOfficialLogo from "../../../../assets/SZ Official Logo_circle.png";
import { useCreateEmployeeMutation } from "../../../../services/employee/create/employeeCreateAPI";
import { getReligionId } from "../../../../utils/employeeTransformers";

interface EmployeeConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    addEmployeeData: addEmployeeData[];
    onSubmitSuccess?: () => void;
}

const EmployeeConfirmationModal: React.FC<EmployeeConfirmationModalProps> = ({ isOpen, onClose, addEmployeeData, onSubmitSuccess }) => {
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

    // Get employee position for display
    const employeePosition = employeeData && employeeData.work ? getDisplayLabel(employeeData.work.position || "", "position") : "Position";

    const handlePendingCheck = async () => {
        // setIsBasicInfoPendingModalOpen(true);
        try {
            const employeeData = addEmployeeData[0];
            if (employeeData) {
                // Transform the form data to match the backend API structure
                // Helper function to convert position codes to UUIDs based on actual database
                const getPositionUUID = (positionCode: string) => {
                    switch (positionCode) {
                        case "SE001": return "fc01fee95e8a11f0b4b102dcb324866b"; // pos 5
                        case "SSE001": return "7bcd1724451611f0b6b802dcb324866b"; // another coo for bsi
                        case "TL001": return "a50ebaca58b311f0b6b802dcb324866b"; // another coo for bsi
                        case "PM001": return "f639b02d459e11f0b6b802dcb324866b"; // another newest bsi project manager
                        case "BA001": return "f639d0d3459e11f0b6b802dcb324866b"; // another coo for bsi
                        case "QA001": return "f89bb5af459111f0b6b802dcb324866b"; // bsi-dir-01
                        case "UX001": return "ab88ede7459b11f0b6b802dcb324866b"; // special projects manager 1 edit
                        case "DE001": return "cc8413ec58d611f0b6b802dcb324866b"; // new coo for bsi
                        case "DA001": return "5382919b5e6211f0b4b102dcb324866b"; // coo mngr 4
                        case "PDM001": return "04ba80e2615d11f0b4b102dcb324866b"; // position mill new
                        case "SM001": return "c92cf16b5e8b11f0b4b102dcb324866b"; // pos 73
                        case "TW001": return "c7f05146615011f0b4b102dcb324866b"; // position mill edit
                        default: return "fc01fee95e8a11f0b4b102dcb324866b"; // Default to pos 5
                    }
                };

                const transformedData = {
                    work_email: employeeData.work.workEmail || "",
                    current_position_ID: getPositionUUID(employeeData.work.position || ""),
                    sched_type: "flexible", // Default value
                    hire_date: employeeData.work.dateHired ? new Date(employeeData.work.dateHired).toISOString().split('T')[0] : "",
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
                        date_of_birth: employeeData.fullName.dateOfBirth ? new Date(employeeData.fullName.dateOfBirth).toISOString().split('T')[0] : "",
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
                        personal_email: "fortestinglangupdate@example.com", // Required field with valid email format
                        educational_attainment_ID: "7cbd3ea82b1111f0b6b802dcb324866b" // Default value
                    },
                    permanent_address: {
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
                    },
                    present_address: {
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
                    }
                };

                await createEmployee(transformedData).unwrap();
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            console.error('Full error details:', JSON.stringify(error, null, 2));
            // You might want to show an error message here
        }
        onClose();
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
                        label: "Proceed",
                        variant: "primary",
                        onClick: handlePendingCheck,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to add this employee.</p>
                            <div className="flex flex-row items-center justify-center gap-[8px]">
                                <Avatar size="xsmall" src={profileImg || SZOfficialLogo} />
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong font-dmsans text-szBlack800">{employeeFullName}</p>
                                    <TextContent header={employeePosition} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[16px]">
                                <ConfirmationContent variant="add" sectionLabel="NAME AND BIRTHDAY" data={nameAndBirthdayData} />
                                <ConfirmationContent variant="add" sectionLabel="WORK" data={workData} />
                                <ConfirmationContent variant="add" sectionLabel="ADDRESS" data={addressData} />
                                <ConfirmationContent variant="add" sectionLabel="OTHERS" data={otherData} />
                            </div>
                        </div>
                    </div>
                }
            />
            <BasicInfoPendingModal
                isOpen={isBasicInfoPendingModalOpen}
                onClose={() => setIsBasicInfoPendingModalOpen(false)}
                onCloseConfirmation={onClose}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default EmployeeConfirmationModal;
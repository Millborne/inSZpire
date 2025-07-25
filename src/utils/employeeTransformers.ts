import { EmployeeData } from "../services/employee/list/use-employee";
import { addEmployeeData } from "../pages/Employees/components/modals/EmployeeModal";

// Transform fetched employee data to form format
export const transformEmployeeToFormData = (employee: any): addEmployeeData => {
    console.log("Transforming employee data:", employee);
    console.log("Employee data structure:", {
        hasData: !!employee.data,
        hasEmployee: !!employee.data?.employee,
        hasProfile: !!employee.data?.profile,
        hasAddresses: !!employee.data?.addresses,
        addressesLength: employee.data?.addresses?.length || 0
    });
    
    // Handle the new API response structure
    const employeeData = employee.data?.employee || employee;
    const profileData = employee.data?.profile || employeeData.profile || {};
    const addressesData = employee.data?.addresses || employeeData.addresses || [];
    
    // Find permanent address (address_type_ID: 1) and present address (address_type_ID: 2)
    const permanentAddress = addressesData.find((addr: any) => addr.address_type_ID === 1) || {};
    const presentAddress = addressesData.find((addr: any) => addr.address_type_ID === 2) || {};
    
    // Use permanent address as the main address, fallback to present address if no permanent
    const addressData = {
        region: permanentAddress.region_state_ID?.toString() || presentAddress.region_state_ID?.toString() || "",
        province: permanentAddress.province_ID?.toString() || presentAddress.province_ID?.toString() || "",
        cityMunicipality: permanentAddress.city_municipality_ID?.toString() || presentAddress.city_municipality_ID?.toString() || "",
        barangay: permanentAddress.barangay_ID?.toString() || presentAddress.barangay_ID?.toString() || "",
        streetHouseNoLot: permanentAddress.address_line_1 || presentAddress.address_line_1 || "",
        postalCode: permanentAddress.postal_code || presentAddress.postal_code || "",
        country: permanentAddress.country_ID?.toString() || presentAddress.country_ID?.toString() || "",
    };
    
    // Map position status from employee data
    let positionStatus = "";
    if (employeeData.position_status_ID) {
        // Map position status IDs to display values
        switch (employeeData.position_status_ID) {
            case "1a23aec4526211f0b6b802dcb324866b": // Active
                positionStatus = "ACTIVE";
                break;
            case "1a23b100526211f0b6b802dcb324866b": // Training
                positionStatus = "TRAINEE";
                break;
            case "1a23b074526211f0b6b802dcb324866b": // Promoted
                positionStatus = "REGULAR";
                break;
            default:
                positionStatus = "ACTIVE"; // Default
        }
    }
    
    // Map employment status from employee data
    let employmentStatus = "";
    if (employeeData.employee_status_ID) {
        // Map employment status IDs to display values
        switch (employeeData.employee_status_ID) {
            case "6d6f5ba9526111f0b6b802dcb324866b": // Active
                employmentStatus = "ACTIVE";
                break;
            case "6d6f5c00526111f0b6b802dcb324866b": // Inactive
                employmentStatus = "INACTIVE";
                break;
            case "6d6f5c0a526111f0b6b802dcb324866b": // Terminated
                employmentStatus = "TERMINATED";
                break;
            default:
                employmentStatus = "ACTIVE"; // Default
        }
    }
    
    // Convert gender from profile data
    let gender = "";
    if (profileData.gender) {
        switch (profileData.gender.toLowerCase()) {
            case "male":
                gender = "M";
                break;
            case "female":
                gender = "F";
                break;
            case "other":
                gender = "O";
                break;
            default:
                gender = profileData.gender;
        }
    }
    
    // Convert marital status from profile data
    let civilStatus = "";
    if (profileData.marital_status) {
        switch (profileData.marital_status.toLowerCase()) {
            case "single":
                civilStatus = "S";
                break;
            case "married":
                civilStatus = "M";
                break;
            case "divorced":
                civilStatus = "D";
                break;
            case "widowed":
                civilStatus = "W";
                break;
            case "separated":
                civilStatus = "SEP";
                break;
            default:
                civilStatus = profileData.marital_status;
        }
    }
    
    const transformedData = {
        fullName: {
            lastName: profileData.last_name || "",
            firstName: profileData.first_name || "",
            middleName: profileData.middle_name || "",
            nickname: profileData.preferred_name || "",
            extension: profileData.name_ext || "",
            dateOfBirth: profileData.date_of_birth ? new Date(profileData.date_of_birth).toISOString().split('T')[0] : "",
        },
        work: {
            dateHired: employeeData.hire_date ? new Date(employeeData.hire_date).toISOString().split('T')[0] : "",
            position: employeeData.current_position_ID || "", // Use current_position_ID for edit mode
            positionStatus: positionStatus,
            employmentStatus: employmentStatus,
            workEmail: employeeData.work_email || "",
        },
        address: addressData,
        others: {
            religion: getReligionName(profileData.religion_ID || ""),
            sex: "",
            civilStatus: civilStatus,
            gender: gender,
            pronouns: profileData.pronoun || "",
            bloodType: profileData.blood_type || "",
            birthAddress: profileData.birth_address || "",
            telephoneNumber: profileData.telephone_number || "",
            mobileNumber: profileData.mobile_number || "",
        },
    };
    
    console.log("Transformed data:", transformedData);
    return transformedData;
};

// Helper function to get specific employee data by ID
export const getEmployeeById = async (employeeId: string, getEmployeeByIdMutation: any) => {
    try {
        const response = await getEmployeeByIdMutation({ employee_ID: employeeId }).unwrap();
        return response;
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
};

// Helper function to convert position codes to display names
export const getPositionDisplayName = (positionCode: string): string => {
    switch (positionCode) {
        case "SE001": return "Software Engineer";
        case "SSE001": return "Senior Software Engineer";
        case "TL001": return "Team Lead";
        case "PM001": return "Project Manager";
        case "BA001": return "Business Analyst";
        case "QA001": return "Quality Assurance Engineer";
        case "UX001": return "UI/UX Designer";
        case "DE001": return "DevOps Engineer";
        case "DA001": return "Data Analyst";
        case "PDM001": return "Product Manager";
        case "SM001": return "Scrum Master";
        case "TW001": return "Technical Writer";
        default: return positionCode;
    }
};

// Helper function to convert gender codes to display names
export const getGenderDisplayName = (gender: string): string => {
    switch (gender?.toLowerCase()) {
        case "male": return "M";
        case "female": return "F";
        case "other": return "O";
        default: return gender || "";
    }
};

// Helper function to convert civil status to display names
export const getCivilStatusDisplayName = (status: string): string => {
    switch (status?.toLowerCase()) {
        case "single": return "S";
        case "married": return "M";
        case "divorced": return "D";
        case "widowed": return "W";
        case "separated": return "SEP";
        default: return status || "";
    }
}; 

// Helper function to convert religion ID to name
export const getReligionName = (religionId: string): string => {
    switch (religionId) {
        case "0c3b8bd02fa111f0b6b802dcb324866b": return "judaism";
        case "37db5e9c2c7911f0b6b802dcb324866b": return "buddhism";
        case "68cff78b313411f0b6b802dcb324866b": return "sikhism";
        case "6b296f11e143419eab057dfc5b139f19": return "born again";
        case "7dc813102c7a11f0b6b802dcb324866b": return "iglesia sa dios";
        case "838085062bbb11f0b6b802dcb324866b": return "christian";
        case "869d29dc2c7a11f0b6b802dcb324866b": return "roman catholic";
        case "90266f9a2bd411f0b6b802dcb324866b": return "iglesia ni cristo";
        case "e0e9e2f62c7911f0b6b802dcb324866b": return "islam";
        case "e1c55f542fd211f0b6b802dcb324866b": return "hinduism";
        case "fa3d4f312cce11f0b6b802dcb324866b": return "seventh day adventist";
        default: return religionId || "";
    }
};

// Helper function to convert religion name to ID
export const getReligionId = (religionName: string): string => {
    switch (religionName.toLowerCase()) {
        case "judaism": return "0c3b8bd02fa111f0b6b802dcb324866b";
        case "buddhism": return "37db5e9c2c7911f0b6b802dcb324866b";
        case "sikhism": return "68cff78b313411f0b6b802dcb324866b";
        case "born again": return "6b296f11e143419eab057dfc5b139f19";
        case "iglesia sa dios": return "7dc813102c7a11f0b6b802dcb324866b";
        case "christian": return "838085062bbb11f0b6b802dcb324866b";
        case "roman catholic": return "869d29dc2c7a11f0b6b802dcb324866b";
        case "iglesia ni cristo": return "90266f9a2bd411f0b6b802dcb324866b";
        case "islam": return "e0e9e2f62c7911f0b6b802dcb324866b";
        case "hinduism": return "e1c55f542fd211f0b6b802dcb324866b";
        case "seventh day adventist": return "fa3d4f312cce11f0b6b802dcb324866b";
        default: return religionName || "";
    }
}; 
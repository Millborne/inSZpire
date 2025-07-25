import { EmployeeData } from "../services/employee/list/use-employee";
import { addEmployeeData } from "../pages/Employees/components/modals/EmployeeModal";

// Transform fetched employee data to form format
export const transformEmployeeToFormData = (employee: EmployeeData): addEmployeeData => {
    return {
        fullName: {
            lastName: employee.last_name || "",
            firstName: employee.first_name || "",
            middleName: employee.middle_name || "",
            nickname: employee.preferred_name || "",
            extension: employee.name_ext || "",
            dateOfBirth: employee.date_of_birth || "",
        },
        work: {
            dateHired: employee.hire_date || "",
            position: employee.position_code || "",
            positionStatus: "", // This might need to be fetched separately
            employmentStatus: employee.employment_status || "",
            workEmail: employee.work_email || "",
        },
        address: {
            region: "", // These might need to be parsed from address strings
            province: "",
            cityMunicipality: "",
            barangay: "",
            streetHouseNoLot: "",
            postalCode: "",
            country: "",
        },
        others: {
            religion: employee.religion || "",
            sex: "",
            civilStatus: employee.marital_status || "",
            gender: employee.gender || "",
            pronouns: employee.pronoun || "",
            bloodType: employee.blood_type || "",
            birthAddress: employee.birth_address || "",
            telephoneNumber: "", // Not available in current data
            mobileNumber: employee.mobile_number || "",
        },
    };
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
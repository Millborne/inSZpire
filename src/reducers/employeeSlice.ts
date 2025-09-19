import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

// Employee data interface based on the existing EmployeeData type
export interface EmployeeData {
    employee_ID: string;
    employee_number: string;
    old_employee_number?: string;
    profile_ID: string;
    position_ID: string;
    team_ID: string;
    employment_status: string;
    employee_status_ID: string;
    employee_status:
        | "Active"
        | "On Leave"
        | "Suspended"
        | "AWOL"
        | "Terminated";
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    profile_image?: string;
    gender?: string;
    pronoun?: string;
    date_of_birth?: string;
    marital_status?: string;
    birth_address?: string;
    blood_type?: string;
    mobile_number?: string;
    personal_email?: string;
    religion?: string;
    religion_ID?: string;
    educational_attainment?: string;
    work_email: string;
    sched_type?: string;
    hire_date: string;
    has_atm?: number;
    salary_frequency?: string;
    is_agency?: number;
    is_confidential?: number;
    is_leave_earned?: number;
    e_sig_url?: string;
    qr_code_url?: string;
    separation_date?: string;
    reason_for_leaving?: string;
    not_for_rehire?: number;
    is_archived: number;
    created_at?: string;
    updated_at?: string;
    permanent_address?: string;
    present_address?: string;
    position_code: string;
    position_name: string;
    team_code?: string;
    team_name: string;
    type_name?: string;
    setup_name?: string;
    job_code: string;
    job_title: string;
    supervisor_first_name?: string;
    supervisor_last_name?: string;

    filters?: {
        is_archived: number;
        offset: number;
        limit: number;
    };
}

interface EmployeeState {
    // Selected employee for detailed view
    selectedEmployee: EmployeeData | null;
}

const initialState: EmployeeState = {
    selectedEmployee: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        // Set selected employee
        setSelectedEmployee: (
            state,
            action: PayloadAction<EmployeeData | null>
        ) => {
            state.selectedEmployee = action.payload;
        },

        // Clear selected employee
        clearSelectedEmployee: (state) => {
            state.selectedEmployee = null;
        },
    },
});

export const { setSelectedEmployee, clearSelectedEmployee } =
    employeeSlice.actions;

export default employeeSlice.reducer;

export const resetAndFetchEmployee = async (
    dispatch: AppDispatch,
    selectedEmployee: any,
    employeeService: any
) => {
    if (selectedEmployee?.filters) {
        const employeesResponse = await employeeService.listEmployees(
            selectedEmployee?.filters
        );

        let employeeData = employeesResponse.data.data.employees.find(
            (employee: any) =>
                employee.employee_ID === selectedEmployee.employee_ID
        );

        dispatch(
            setSelectedEmployee({
                ...employeeData,
                filters: selectedEmployee.filters,
            })
        );
    }
};

export {
    employeeDetailsAPI,
    useFetchEmployeeDetailsQuery,
    useActionEmployeeDetailsMutation,
} from "./employeeDetailsAPI";
export {
    employeeSupervisionAPI,
    useFetchEmployeeSupervisionQuery,
    useActionEmployeeSupervisionMutation,
} from "./employeeSupervisionAPI";
export {
    useEmployeeDetails,
    useEmployeeDetailsService,
    useEmployeeSupervisionService,
    type EmployeeDetailsData,
    type CreateEmployeeDetailsRequest,
    type UpdateEmployeeDetailsRequest,
    type ViewEmployeeDetailsRequest,
    type GetEmployeeDetailsRequest,
    type BatchCreateEmployeeDetailsRequest,
    type EmployeeSupervisionData,
    type UpdateSupervisorRequest,
    type GetEmployeeSupervisionRequest,
    type ViewEmployeeSupervisionRequest,
} from "./use-employee-details";

import {
    useFetchEmployeeDetailsQuery,
    useActionEmployeeDetailsMutation,
} from "./employeeDetailsAPI";
import {
    useFetchEmployeeSupervisionQuery,
    useActionEmployeeSupervisionMutation,
} from "./employeeSupervisionAPI";

export const useEmployeeDetails = ({
    queryParameters,
    method,
    disableFetch = false,
}: {
    queryParameters?: string;
    method?: string;
    disableFetch?: boolean;
}) => {
    // fetch
    const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
        useFetchEmployeeDetailsQuery(
            {
                queryParameters: queryParameters ?? "",
                method: method,
            },
            { skip: disableFetch }
        );

    // action
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeeDetailsMutation();

    return {
        // fetching
        data,
        isSuccess,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,

        // mutation
        generalAction,
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,
    };
};

// Employee Details interfaces based on API documentation
export interface EmployeeDetailsData {
    profile_ID?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    personal_email: string;
    date_of_birth: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateEmployeeDetailsRequest {
    first_name: string;
    last_name: string;
    middle_name?: string;
    name_ext?: string;
    preferred_name?: string;
    personal_email: string;
    date_of_birth: string;
}

export interface UpdateEmployeeDetailsRequest {
    profile_ID: string;
    fields: {
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        name_ext?: string;
        preferred_name?: string;
        personal_email?: string;
        date_of_birth?: string;
    };
}

export interface ViewEmployeeDetailsRequest {
    filters?: {
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        name_ext?: string;
        preferred_name?: string;
        personal_email?: string;
        date_of_birth?: string;
    };
}

export interface GetEmployeeDetailsRequest {
    profile_ID: string;
}

export interface BatchCreateEmployeeDetailsRequest {
    profiles: CreateEmployeeDetailsRequest[];
}

// Employee Supervision interfaces based on API documentation
export interface EmployeeSupervisionData {
    position_ID?: string;
    employee_ID?: string;
    supervisor_position_ID?: string;
    supervisor_employee_ID?: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    position_name?: string;
    supervisor_name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateSupervisorRequest {
    position_ID: string;
    reports_to_position_ID?: string;
    reports_to_node?: string;
    team_level?: string;
    updated_by: string;
}

export interface GetEmployeeSupervisionRequest {
    position_ID?: string;
    employee_ID?: string;
}

export interface ViewEmployeeSupervisionRequest {
    search?: string;
    is_archived?: number;
    position_ID?: string;
    employee_ID?: string;
    offset?: number;
    limit?: number;
}

// Specific employee details service methods based on API documentation
export const useEmployeeDetailsService = () => {
    const [
        generalAction,
        {
            data: actionData,
            isError: actionIsError,
            isLoading: actionIsLoading,
            isSuccess: actionIsSuccess,
            error: actionError,
            reset: actionReset,
        },
    ] = useActionEmployeeDetailsMutation();

    const listEmployeeDetails = async (filters: ViewEmployeeDetailsRequest) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: filters,
        });
    };

    const createEmployeeDetails = async (
        employeeData: CreateEmployeeDetailsRequest
    ) => {
        return generalAction({
            queryParameters: "/batch",
            method: "POST",
            body: [employeeData], // API expects array for batch create
        });
    };

    const batchCreateEmployeeDetails = async (
        batchData: BatchCreateEmployeeDetailsRequest
    ) => {
        return generalAction({
            queryParameters: "/batch",
            method: "POST",
            body: batchData.profiles,
        });
    };

    const updateEmployeeDetails = async (
        employeeData: UpdateEmployeeDetailsRequest
    ) => {
        return generalAction({
            queryParameters: "/update",
            method: "PUT",
            body: employeeData,
        });
    };

    const getEmployeeDetails = async (
        employeeData: GetEmployeeDetailsRequest
    ) => {
        return generalAction({
            queryParameters: "/view",
            method: "POST",
            body: { filters: { profile_ID: employeeData.profile_ID } },
        });
    };

    return {
        // mutation
        actionData,
        actionIsError,
        actionIsLoading,
        actionIsSuccess,
        actionError,
        actionReset,

        // methods
        listEmployeeDetails,
        createEmployeeDetails,
        batchCreateEmployeeDetails,
        updateEmployeeDetails,
        getEmployeeDetails,
    };
};

// Specific employee supervision service methods based on API documentation
export const useEmployeeSupervisionService = () => {
    const [
        supervisionAction,
        {
            data: supervisionActionData,
            isError: supervisionActionIsError,
            isLoading: supervisionActionIsLoading,
            isSuccess: supervisionActionIsSuccess,
            error: supervisionActionError,
            reset: supervisionActionReset,
        },
    ] = useActionEmployeeSupervisionMutation();

    const updateDirectHead = async (
        supervisionData: UpdateSupervisorRequest
    ) => {
        return supervisionAction({
            queryParameters: "/updatePosition",
            method: "PUT",
            body: supervisionData,
        });
    };

    const updateSupervisor = async (
        supervisionData: UpdateSupervisorRequest
    ) => {
        return supervisionAction({
            queryParameters: "/updatePosition",
            method: "PUT",
            body: supervisionData,
        });
    };

    const getEmployeeSupervision = async (
        request: GetEmployeeSupervisionRequest
    ) => {
        return supervisionAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: { position_ID: request.position_ID },
        });
    };

    const viewEmployeeSupervision = async (
        filters: ViewEmployeeSupervisionRequest
    ) => {
        return supervisionAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: filters,
        });
    };

    const listSubordinates = async (position_ID: string) => {
        return supervisionAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: { reports_to_position_ID: position_ID },
        });
    };

    const getSupervisorHierarchy = async (position_ID: string) => {
        return supervisionAction({
            queryParameters: "/getPositions",
            method: "POST",
            body: { position_ID: position_ID },
        });
    };

    return {
        // mutation
        supervisionActionData,
        supervisionActionIsError,
        supervisionActionIsLoading,
        supervisionActionIsSuccess,
        supervisionActionError,
        supervisionActionReset,

        // methods
        updateDirectHead,
        updateSupervisor,
        getEmployeeSupervision,
        viewEmployeeSupervision,
        listSubordinates,
        getSupervisorHierarchy,
    };
};

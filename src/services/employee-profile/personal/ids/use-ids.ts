import {
  useFetchIdsQuery,
  useFetchEmployeeIdentifiersQuery,
  useFetchIdentifiersQuery,
  useActionIdsMutation,
} from "./idsAPI";

export const useIds = ({
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
    useFetchIdsQuery(
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
  ] = useActionIdsMutation();

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

// Employee Identifier interfaces based on API documentation
export interface EmployeeIdentifier {
  employee_identifier_ID: string;
  card_number: string;
  account_number: string;
  employee_ID: string;
  identifier_ID: string;
  issued_date: string;
  validity_date: string;
  is_archived: number;
  created_by?: string;
  updated_by?: string;
  identifier_name?: string;
  identifier_type?: string;
  old_employee_number?: string;
}

// Identifier interface for dropdown options
export interface Identifier {
  identifier_ID: string;
  name: string;
  type?: string;
  is_archived?: number;
}

export interface CreateEmployeeIdentifier {
  card_number: string;
  account_number: string;
  employee_ID: string;
  identifier_ID: string;
  issued_date: string;
  validity_date: string;
  is_archived?: number;
  created_by?: string;
  updated_by?: string;
}

export interface UpdateEmployeeIdentifier {
  employee_identifier_ID: string;
  card_number?: string;
  account_number?: string;
  employee_ID?: string;
  identifier_ID?: string;
  issued_date?: string;
  validity_date?: string;
  is_archived?: number;
  created_by?: string;
  updated_by?: string;
}

export interface ViewEmployeeIdentifiersRequest {
  search?: string;
  is_archived?: number;
  limit?: number;
  offset?: number;
}

// Specific Employee Identifier service methods
export const useIdsService = () => {
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
  ] = useActionIdsMutation();

  // Create Employee Identifier
  const createEmployeeIdentifier = async (
    identifierData: CreateEmployeeIdentifier
  ) => {
    return generalAction({
      queryParameters: "",
      method: "POST",
      body: identifierData,
    });
  };

  // Update Employee Identifier
  const updateEmployeeIdentifier = async (
    identifierData: UpdateEmployeeIdentifier
  ) => {
    return generalAction({
      queryParameters: "",
      method: "PUT",
      body: identifierData,
    });
  };

  // View Employee Identifiers
  const viewEmployeeIdentifiers = async (
    filters: ViewEmployeeIdentifiersRequest
  ) => {
    return generalAction({
      queryParameters: "/view",
      method: "POST",
      body: filters,
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
    createEmployeeIdentifier,
    updateEmployeeIdentifier,
    viewEmployeeIdentifiers,
  };
};

// Hook for fetching employee identifiers by employee ID with RTK Query caching
export const useEmployeeIdentifiers = (employeeId: string) => {
  // Use RTK Query hook for automatic caching and deduplication
  const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
    useFetchEmployeeIdentifiersQuery(
      {
        search: employeeId, // Try to search by employee ID
        is_archived: 0,
        limit: 100,
        offset: 0,
      },
      {
        // Skip if no employee ID provided
        skip: !employeeId,
        // Refetch on window focus (optional)
        refetchOnFocus: false,
        // Refetch on reconnect (optional)
        refetchOnReconnect: false,
      }
    );

  // Filter results by employee ID on frontend if backend doesn't support it
  const filterByEmployeeId = (
    identifiers: EmployeeIdentifier[]
  ): EmployeeIdentifier[] => {
    return identifiers.filter(
      (identifier) => identifier.employee_ID === employeeId
    );
  };

  // Get filtered data
  const filteredData = data?.data ? filterByEmployeeId(data.data) : [];

  return {
    // RTK Query state
    data: filteredData,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
    refetch,

    // Helper methods
    filterByEmployeeId,
  };
};

// Hook for fetching all identifiers for dropdown options
export const useIdentifiers = () => {
  const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
    useFetchIdentifiersQuery(undefined, {
      // Refetch on window focus (optional)
      refetchOnFocus: false,
      // Refetch on reconnect (optional)
      refetchOnReconnect: false,
    });

  // Transform identifiers to dropdown options format
  const getDropdownOptions = () => {
    if (!data?.data) return [];

    return data.data
      .filter((identifier: Identifier) => !identifier.is_archived)
      .map((identifier: Identifier) => ({
        label: identifier.name,
        value: identifier.identifier_ID,
      }));
  };

  return {
    // RTK Query state
    data: data?.data || [],
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
    refetch,

    // Helper methods
    getDropdownOptions,
  };
};

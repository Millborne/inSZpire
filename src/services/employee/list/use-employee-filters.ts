import { useState, useEffect, useCallback } from "react";
import { useEmployeeService, type ViewEmployeesRequest } from "./use-employee";
import { 
    FrontendFilters, 
    mapFiltersToBackend, 
    cleanRequestBody, 
    handleFilterChange as handleFilterChangeUtil,
    hasActiveFilters,
    getFilterCount,
    FILTER_OPTIONS 
} from "./filterAPI";

export interface UseEmployeeFiltersReturn {
    // State
    employees: any[];
    isLoading: boolean;
    error: string | null;
    filters: FrontendFilters;
    searchText: string;
    pagination: {
        total: number;
        offset: number;
        limit: number;
        hasMore: boolean;
    };
    
    // Actions
    setSearchText: (text: string) => void;
    handleFilterChange: (category: keyof FrontendFilters, value: string, checked: boolean) => void;
    applyFilters: () => void;
    clearFilters: () => void;
    handlePageChange: (page: number) => void;
    
    // Computed
    hasActiveFilters: boolean;
    filterCount: number;
    filterOptions: typeof FILTER_OPTIONS;
}

export const useEmployeeFilters = (): UseEmployeeFiltersReturn => {
    const employeeService = useEmployeeService();
    
    // State management
    const [employees, setEmployees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState<FrontendFilters>({
        class: [],
        type: [],
        status: []
    });
    
    // Pagination state
    const [pagination, setPagination] = useState({
        total: 0,
        offset: 0,
        limit: 10,
        hasMore: false
    });

    // Apply filters function
    const applyFilters = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Map frontend filters to backend parameters
            const backendFilters = mapFiltersToBackend(filters);
            
            // Create request body
            const requestBody: ViewEmployeesRequest = {
                ...backendFilters,
                search: searchText,
                offset: pagination.offset,
                limit: pagination.limit
            };

            // Clean request body by removing empty arrays
            const cleanedRequestBody = cleanRequestBody(requestBody);

            console.log("Sending request with filters:", cleanedRequestBody);
            
            // Call the API
            const response = await employeeService.listEmployees(cleanedRequestBody);
            console.log("Employees response:", response);

            // Handle different response structures
            if (response.data?.success && response.data?.data?.employees) {
                // Response structure: { success: true, data: { employees: [...], pagination: {...} } }
                const responseData = response.data.data;
                setEmployees(responseData.employees || []);
                setPagination(responseData.pagination || {
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            } else if (response.data?.success && response.data?.employees) {
                // Direct response structure: { success: true, employees: [...], pagination: {...} }
                const responseData = response.data;
                setEmployees(responseData.employees || []);
                setPagination(responseData.pagination || {
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            } else {
                console.error("No employee data received - response structure:", response.data);
                setEmployees([]);
                setPagination({
                    total: 0,
                    offset: 0,
                    limit: 10,
                    hasMore: false
                });
            }

        } catch (err) {
            console.error("Error applying filters:", err);
            
            // Check if it's a CORS error
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as any;
                if (error.status === 'FETCH_ERROR' || error.status === 'CORS_ERROR') {
                    setError("CORS Error: Backend needs to allow requests from frontend. Please check backend CORS configuration.");
                } else {
                    setError(`Failed to load employees. Status: ${error.status}`);
                }
            } else {
                setError("Failed to load employees. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [filters, searchText, pagination.offset, pagination.limit]);

    // Handle filter changes
    const handleFilterChange = useCallback((category: keyof FrontendFilters, value: string, checked: boolean) => {
        setFilters(prev => handleFilterChangeUtil(prev, category, value, checked));
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setFilters({
            class: [],
            type: [],
            status: []
        });
        setSearchText("");
        setPagination(prev => ({ ...prev, offset: 0 }));
    }, []);

    // Handle page change
    const handlePageChange = useCallback((page: number) => {
        const newOffset = (page - 1) * pagination.limit;
        setPagination(prev => ({ ...prev, offset: newOffset }));
    }, [pagination.limit]);

    // Initial load effect - only run once on mount
    useEffect(() => {
        applyFilters();
    }, []); // Empty dependency array - only run once

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPagination(prev => ({ ...prev, offset: 0 }));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchText]);

    // Apply filters when dependencies change (but not on initial load)
    useEffect(() => {
        // Skip the initial load since we have a separate effect for that
        const hasFilters = Object.values(filters).some(array => array.length > 0);
        if (employees.length > 0 || hasFilters || searchText.length > 0) {
            applyFilters();
        }
    }, [filters, searchText, pagination.offset, pagination.limit]);

    // Computed values
    const hasActiveFiltersComputed = hasActiveFilters(filters);
    const filterCount = getFilterCount(filters);

    return {
        // State
        employees,
        isLoading,
        error,
        filters,
        searchText,
        pagination,
        
        // Actions
        setSearchText,
        handleFilterChange,
        applyFilters,
        clearFilters,
        handlePageChange,
        
        // Computed
        hasActiveFilters: hasActiveFiltersComputed,
        filterCount,
        filterOptions: FILTER_OPTIONS
    };
}; 
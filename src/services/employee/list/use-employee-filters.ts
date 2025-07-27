import { useState, useEffect } from 'react';
import { useFetchAllFilterOptionsQuery } from './filterAPI';
import { useEmployeeListView } from './use-employee';

export interface FilterState {
    employmentStatuses: string[];
    employeeStatuses: string[];
    positionTypes: string[];
}

export interface FilterOptions {
    employment_statuses: Array<{
        status_ID: string;
        status_name: string;
        status_description: string;
    }>;
    employee_statuses: Array<{
        employee_status_ID: string;
        emp_status_name: string;
        emp_description: string;
    }>;
    position_types: Array<{
        position_type_ID: string;
        type_name: string;
    }>;
}

export const useEmployeeFilters = () => {
    const { data: filterOptions, isLoading: filterOptionsLoading } = useFetchAllFilterOptionsQuery();
    const { fetchEmployeeListView, data: employeeData, isLoading: employeeLoading, error: employeeError } = useEmployeeListView();

    const [filters, setFilters] = useState<FilterState>({
        employmentStatuses: [],
        employeeStatuses: [],
        positionTypes: []
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
        total: 0,
        hasMore: false
    });

    // Apply filters to backend
    const applyFilters = async (newFilters: FilterState, search?: string, pageOffset?: number) => {
        const requestBody: any = {
            is_archived: 0,
            offset: pageOffset || 0,
            limit: pagination.limit,
            include_supervisor: true
        };

        // Add search term
        if (search) {
            requestBody.search = search;
        }

        // Add employment status filters
        if (newFilters.employmentStatuses.length > 0) {
            requestBody.employment_status = newFilters.employmentStatuses;
        }

        // Add employee status filters
        if (newFilters.employeeStatuses.length > 0) {
            requestBody.employee_status = newFilters.employeeStatuses;
        }

        // Add position type filters
        if (newFilters.positionTypes.length > 0) {
            requestBody.position_status = newFilters.positionTypes;
        }

        try {
            await fetchEmployeeListView({
                queryParameters: "",
                body: requestBody
            });
        } catch (error) {
            console.error('Error applying filters:', error);
            throw error;
        }
    };

    // Update filters and refetch data
    const updateFilters = async (newFilters: FilterState) => {
        setFilters(newFilters);
        await applyFilters(newFilters, searchTerm, 0);
    };

    // Update search term and refetch data
    const updateSearch = async (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        await applyFilters(filters, newSearchTerm, 0);
    };

    // Change page
    const changePage = async (page: number) => {
        const newOffset = (page - 1) * pagination.limit;
        setPagination(prev => ({ ...prev, offset: newOffset }));
        await applyFilters(filters, searchTerm, newOffset);
    };

    // Clear all filters
    const clearAllFilters = async () => {
        const clearedFilters: FilterState = {
            employmentStatuses: [],
            employeeStatuses: [],
            positionTypes: []
        };
        setFilters(clearedFilters);
        await applyFilters(clearedFilters, searchTerm, 0);
    };

    // Get selected count for each category
    const getSelectedCount = (category: keyof FilterState) => {
        return filters[category].length;
    };

    // Get total count for each category
    const getTotalCount = (category: keyof FilterState) => {
        if (!filterOptions) return 0;
        switch (category) {
            case 'employmentStatuses':
                return filterOptions.employment_statuses.length;
            case 'employeeStatuses':
                return filterOptions.employee_statuses.length;
            case 'positionTypes':
                return filterOptions.position_types.length;
            default:
                return 0;
        }
    };

    // Check if any filters are applied
    const hasActiveFilters = () => {
        return filters.employmentStatuses.length > 0 || 
               filters.employeeStatuses.length > 0 || 
               filters.positionTypes.length > 0 ||
               searchTerm.length > 0;
    };

    return {
        // State
        filters,
        searchTerm,
        pagination,
        filterOptions,
        employeeData,
        
        // Loading states
        filterOptionsLoading,
        employeeLoading,
        employeeError,
        
        // Actions
        updateFilters,
        updateSearch,
        changePage,
        clearAllFilters,
        applyFilters,
        
        // Utilities
        getSelectedCount,
        getTotalCount,
        hasActiveFilters
    };
}; 
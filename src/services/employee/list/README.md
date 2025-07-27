# Employee Multi-Selection Filtering System

This document describes the comprehensive employee filtering system that supports multiple selections using checkboxes and integrates with the backend API.

## Overview

The filtering system allows users to select multiple options within each filter category and combines them with search functionality and pagination. The system maps frontend filter values to backend API parameters and handles the request/response cycle.

## Architecture

### Core Components

1. **`filterAPI.ts`** - Core filtering logic and utilities
2. **`use-employee-filters.ts`** - React hook for filter state management
3. **`EmployeeFilterModal.tsx`** - UI component for filter selection
4. **`EmployeeList.tsx`** - Main component using the filtering system

### Data Flow

```
User Input → Filter Modal → useEmployeeFilters Hook → API Call → Backend → Response → UI Update
```

## API Integration

### Backend Endpoint
```
POST http://localhost:3000/api/v1/employee/list-view
```

### Request Body Structure

The system supports both single values and arrays for filter parameters:

```typescript
interface ViewEmployeesRequest {
    // Multi-selection filters (arrays)
    employment_status?: string[];
    employee_status?: string[];
    team_name?: string[];
    position_name?: string[];
    blood_type?: string[];
    
    // Single value filters
    search?: string;
    employee_ID?: string;
    employee_number?: string;
    company_email?: string;
    first_name?: string;
    last_name?: string;
    personal_email?: string;
    mobile_number?: string;
    hire_date_from?: string;
    hire_date_to?: string;
    is_archived?: number;
    
    // Pagination
    offset?: number;
    limit?: number;
}
```

### Example Request Bodies

#### Single Selection
```json
{
    "employment_status": ["Probationary"],
    "employee_status": ["Active"],
    "team_name": ["Service Delivery"],
    "offset": 0,
    "limit": 10
}
```

#### Multiple Selections
```json
{
    "employment_status": ["Probationary", "Regular"],
    "employee_status": ["Active", "Inactive"],
    "team_name": ["Service Delivery", "SZ Team"],
    "offset": 0,
    "limit": 10
}
```

#### With Search
```json
{
    "employment_status": ["Probationary", "Regular"],
    "employee_status": ["Active"],
    "team_name": ["Service Delivery"],
    "search": "john",
    "offset": 0,
    "limit": 10
}
```

## Frontend Implementation

### Filter Categories

1. **CLASS** (maps to `team_name`)
   - Service Delivery
   - SZ Team
   - Business Solutions and Innovation

2. **TYPE** (maps to `employment_status`)
   - Probationary
   - Regular
   - Contractual
   - Trainee
   - Part-time
   - On-the-Job Trainee

3. **STATUS** (maps to `employee_status`)
   - Active
   - Inactive
   - Floating
   - Clearance
   - On Leave
   - Suspended
   - AWOL

4. **POSITION** (maps to `position_name`)
   - Dynamically populated from backend

5. **BLOOD TYPE** (maps to `blood_type`)
   - A+, A-, B+, B-, AB+, AB-, O+, O-

### State Management

```typescript
interface FrontendFilters {
    class: string[];      // Maps to team_name
    type: string[];       // Maps to employment_status
    status: string[];     // Maps to employee_status
    position: string[];   // Maps to position_name
    bloodType: string[];  // Maps to blood_type
}
```

### Hook Usage

```typescript
const {
    employees,
    isLoading,
    error,
    filters,
    searchText,
    pagination,
    setSearchText,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handlePageChange,
    hasActiveFilters,
    filterCount,
    filterOptions
} = useEmployeeFilters();
```

## Key Features

### Multi-Selection Support
- Users can select multiple options within each filter category
- Checkboxes provide clear visual feedback
- OR logic - results match ANY of the selected criteria

### Real-time Search
- Debounced search input (500ms delay)
- Searches across multiple fields
- Integrates with filter selections

### Pagination
- Handles large result sets efficiently
- Maintains filter state across page changes
- Responsive pagination controls

### Error Handling
- CORS error detection and messaging
- Network error handling
- User-friendly error messages

### Loading States
- Loading indicators during API calls
- Disabled interactions during loading
- Smooth transitions

## Usage Examples

### Basic Filtering
```typescript
// Apply filters
const handleFilterApply = (newFilters: FrontendFilters) => {
    // The hook automatically handles the API call
    console.log('Filters applied:', newFilters);
};
```

### Search Integration
```typescript
// Search with debouncing
const handleSearch = (text: string) => {
    setSearchText(text);
    // API call is automatically triggered after 500ms
};
```

### Pagination
```typescript
// Change page
const handlePageChange = (page: number) => {
    handlePageChange(page);
    // API call is automatically triggered
};
```

## Styling

The system includes comprehensive CSS styling for:
- Modern, clean design
- Responsive layout
- Hover effects and transitions
- Loading and empty states
- Filter badges and counters

## Backward Compatibility

The backend supports both:
- **Arrays**: `["Active", "Inactive"]`
- **Single values**: `"Active"`

This ensures compatibility with existing implementations while enabling the new multi-selection functionality.

## Performance Considerations

1. **Debounced Search**: 500ms delay prevents excessive API calls
2. **Clean Request Body**: Empty arrays are removed before sending
3. **Memoized Callbacks**: Prevents unnecessary re-renders
4. **Efficient State Updates**: Only updates changed filter categories

## Error Handling

The system handles various error scenarios:
- Network errors
- CORS issues
- Invalid response formats
- Backend errors

All errors are logged and displayed to users with appropriate messaging.

## Future Enhancements

1. **Filter Persistence**: Save filter state in localStorage
2. **Advanced Filters**: Date ranges, numeric ranges
3. **Filter Templates**: Save and reuse filter combinations
4. **Export Filtered Data**: Export filtered results
5. **Bulk Actions**: Apply actions to filtered results

## Testing

The system should be tested for:
- Multi-selection functionality
- Search integration
- Pagination
- Error scenarios
- Responsive design
- Performance with large datasets 
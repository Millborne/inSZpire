# Employee History API Integration

This document describes the integration of the `vw_employee_history` table with the frontend Company History timeline component.

## API Endpoint

**POST** `/api/v1/employee-history/view`

### Request Format
```typescript
{
  employee_ID: "378b9040ffff4c9085f0e4810f7c5100", // UUID string
  offset: 0,
  limit: 25
}
```

### Response Format
```typescript
{
  success: true,
  message: "Employee history view retrieved successfully",
  data: {
    history: [
      {
        employee_history_ID: "0049a33aa1004f0dbc04d7a103201ce5",
        employee_ID: "378b9040ffff4c9085f0e4810f7c5100",
        employee_number: "2025072400001",
        employee_full_name: "ralph anthony fuentes",
        first_name: "ralph anthony",
        last_name: "fuentes",
        employment_status: "Probationary",
        employee_status: "Active",
        previous_position_ID: null,
        current_position_ID: "fc01fee95e8a11f0b4b102dcb324866b",
        previous_position_code: null,
        previous_position_name: null,
        current_position_code: "124",
        current_position_name: "pos 5",
        basic_salary: null,
        start_date: "2025-07-21",
        end_date: null,
        change_type: "hired",
        is_archived: 0,
        created_at: "2025-07-24 19:35:23",
        updated_at: "2025-07-24 19:35:23"
      }
    ],
    pagination: {
      total: 25,
      offset: 0,
      limit: 25,
      hasMore: false
    }
  }
}
```

## Data Mapping

The following fields from `vw_employee_history` are mapped to the timeline display:

| Timeline Field | Database Field | Description |
|----------------|----------------|-------------|
| Job Title | `current_position_name` | Position name (e.g., "Senior Web Developer") |
| Position Code | `current_position_code` | Position code displayed in blue |
| Duration | `start_date` & `end_date` | Calculated duration (months/years) |
| Company/Department | `employment_status` | Employment status as department |
| Change Type | `change_type` | Type of change (hired, promoted, etc.) |

## Implementation Files

### 1. API Service
- **File**: `employeeHistoryAPI.ts`
- **Purpose**: Defines the API endpoints and TypeScript interfaces
- **Key Features**:
  - `useFetchEmployeeHistoryViewMutation` hook
  - Request/response type definitions
  - Error handling

### 2. Utility Functions
- **File**: `employeeHistoryUtils.ts`
- **Purpose**: Data transformation and formatting
- **Key Functions**:
  - `calculateDuration()` - Calculate employment duration
  - `formatDateForDisplay()` - Format dates for display
  - `transformToTimelineData()` - Transform API data to timeline format
  - `sortHistoryByDate()` - Sort history by date (newest first)

### 3. Custom Hook
- **File**: `use-employee-history.ts`
- **Purpose**: Provides easy-to-use hook for employee history operations
- **Key Features**:
  - `useEmployeeHistoryView()` - Main hook for fetching history
  - Error handling and loading states
  - Type-safe API calls

### 4. Component
- **File**: `EmploymentHistory.tsx`
- **Purpose**: Main timeline component
- **Key Features**:
  - Vertical timeline with blue circular bullets
  - Connecting lines between entries
  - Loading states and error handling
  - Expandable entries with chevron icons

## Usage Example

```typescript
import { useEmployeeHistoryView } from '../services/employee-profile/work/employee-history/use-employee-history';

const MyComponent = () => {
  const { fetchEmployeeHistory, isLoading, error } = useEmployeeHistoryView();

  const loadEmployeeHistory = async () => {
    try {
      const response = await fetchEmployeeHistory({
        employee_ID: "378b9040ffff4c9085f0e4810f7c5100",
        offset: 0,
        limit: 25
      });
      
      if (response.success) {
        // Handle successful response
        console.log(response.data.history);
      }
    } catch (error) {
      console.error('Failed to fetch employee history:', error);
    }
  };

  return (
    <EmploymentHistory employeeId="378b9040ffff4c9085f0e4810f7c5100" />
  );
};
```

## Features Implemented

✅ **Vertical Timeline Layout** - Blue circular bullets with connecting lines
✅ **Real-time Data Integration** - Fetches from `vw_employee_history` table
✅ **Duration Calculations** - Automatically calculates employment duration
✅ **Loading States** - Shows spinner during API calls
✅ **Error Handling** - Displays error messages on API failures
✅ **Expandable Entries** - Chevron icons for detailed information
✅ **Responsive Design** - Works on different screen sizes
✅ **Type Safety** - Full TypeScript support with proper interfaces

## Database Schema Compatibility

The implementation is designed to work with the `vw_employee_history` table structure:

- **Primary Key**: `employee_history_ID`
- **Employee Reference**: `employee_ID`
- **Position Data**: `current_position_name`, `current_position_code`
- **Timeline Data**: `start_date`, `end_date`, `change_type`
- **Status Information**: `employment_status`, `employee_status`

## Next Steps

1. **Backend Implementation**: Ensure the API endpoint is implemented on the backend
2. **Testing**: Test with real employee data from the database
3. **Pagination**: Implement pagination for large history datasets
4. **Filtering**: Add filters for specific date ranges or change types
5. **Export**: Add functionality to export history data

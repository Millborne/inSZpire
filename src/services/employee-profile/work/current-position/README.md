# Current Position API Integration

## Overview
This service handles the integration with the `/api/v1/employee/current-position` endpoint to fetch and display current employee position data.

## Files Structure
```
current-position/
├── currentPositionAPI.ts      # RTK Query API configuration
├── use-current-position.ts    # Custom hooks and TypeScript interfaces
├── index.ts                  # Service exports
└── README.md                 # This documentation
```

## API Endpoint
- **URL**: `/api/v1/employee/current-position`
- **Method**: POST
- **Authentication**: Bearer token from cookies
- **Base URL**: `VITE_EMPLOYMENT_SERVICE` environment variable

## Data Mapping
The API response is mapped to the following UI fields:

| UI Field | API Field | Format |
|----------|-----------|---------|
| Position Title (Blue Pill) | `position_name` | Text |
| Job Code | `job_code` | Text |
| Start Date | `start_date` | Date (formatted as "Feb 21, 2023") |
| Status (Date) | `hire_date` | Date (formatted as "October 21, 1996") |
| Status (Type) | `employment_status` | Text |

## Usage in Components

### Basic Usage
```typescript
import { useCurrentPositionService } from "../../../services/employee-profile/work/current-position";

const { getCurrentPosition, actionIsLoading, actionIsError } = useCurrentPositionService();

// Fetch current position
const result = await getCurrentPosition({
    employeeId: selectedEmployee.employee_ID,
});

if (result.data?.data) {
    setCurrentPositionData(result.data.data);
}
```

### Component Integration
The service is integrated in `EmploymentHistory.tsx` with:
- Loading states
- Error handling
- Date formatting with fallbacks
- Responsive design
- Refresh functionality

## Error Handling
- Invalid dates are handled gracefully
- API errors are logged to console
- Loading states prevent UI flickering
- Fallback "N/A" values for missing data

## Redux Store Integration
The service is registered in the Redux store at `src/reducers/store.ts`:
- Reducer: `currentPositionAPI.reducer`
- Middleware: `currentPositionAPI.middleware`

## TypeScript Interfaces
```typescript
export interface CurrentPositionData {
    position_name?: string;
    job_code?: string;
    hire_date?: string;
    start_date?: string;
    employment_status?: string;
}

export interface GetCurrentPositionRequest {
    employeeId: string;
}
```

## Testing
The integration can be tested by:
1. Opening the employee work page
2. Navigating to "Employment History" tab
3. Checking the "Current Position" section
4. Verifying API calls in browser network tab
5. Checking console logs for debugging information

## Future Enhancements
- Add caching for better performance
- Implement optimistic updates
- Add retry logic for failed requests
- Add unit tests for the service 
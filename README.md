# HRMSZ Frontend

This is the frontend application for the HRMSZ (HR Management System) built with React, TypeScript, and Vite.

## Team and Position Integration

The application now includes comprehensive integration with the backend team and position management system.

### Backend Integration

The frontend integrates with the following backend endpoints:

#### Teams API (`/api/v1/teams`)
- `POST /view` - Get teams with search and pagination
- `POST /create` - Create new team
- `PUT /update` - Update existing team

#### Positions API (`/api/v1/position`)
- `POST /getPositions` - Get positions with filters
- `POST /create` - Create new position
- `PUT /updatePosition` - Update existing position
- `DELETE /deletePosition` - Delete position

### Database Schema Integration

The frontend interfaces match the backend database schema:

#### Team Data Structure
```typescript
interface TeamData {
    team_ID: string;           // 32-char hex UUID
    node_reference: number;    // Node reference number
    team_code: string;         // e.g., "bsi", "spt"
    team_name: string;         // e.g., "Business Solutions and Innovation"
    team_description: string;  // Team description
    team_logo: string | null;  // filename or null
    acc_ID: string | null;     // account ID or null
    parent_team_ID: string | null; // parent team UUID or null
    node: string;              // hierarchy path e.g., "1.4", "1.4.5"
    is_archived: number;       // 0 = active, 1 = archived
    created_by: string;        // Created by UUID
    updated_by: string;        // Updated by UUID
    created_at: string;        // ISO date string
    updated_at: string;        // ISO date string
    tags?: string;             // Associated tags (comma-separated)
}
```

#### Position Data Structure
```typescript
interface PositionData {
    position_ID: string;       // 32-char hex UUID
    node_reference: number;    // Node reference number
    position_code: string;     // Position code
    position_name: string;     // Position name
    team_ID: string;           // Links to the team
    site_ID: string | null;    // Site ID
    job_ID: string;            // Links to job title
    reports_to_position_ID: string | null; // Reports to position ID
    reports_to_node: string | null; // Reports to node
    team_level: string;        // Team level
    position_type_ID: string;  // Position type ID
    work_setup_ID: string;     // Work setup ID
    basic_salary: number;      // Basic salary
    is_approved: number;       // Approval status
    is_archived: number;       // Archive status
    created_by: string;        // Created by UUID
    updated_by: string;        // Updated by UUID
    created_at: string;        // ISO date string
    updated_at: string;        // ISO date string
    
    // Additional fields from view (vw_position_details)
    job_title?: string;        // Job title (e.g., "Web Dev", "UX Designer")
    job_code?: string;         // Job code
    team_name?: string;        // Team name
    team_code?: string;        // Team code
    position_type?: string;    // Position type
    work_setup?: string;       // Work setup
    company_ID?: string;       // Company ID
    company_name?: string;     // Company name
    site_name?: string;        // Site name
    position_status?: string;  // Position status
    reports_to_position?: string; // Reports to position
    employee_number?: string;  // Employee number
    employee_name?: string;    // Employee name
    preferred_name?: string;   // Preferred name
    reports_to_employee_name?: string; // Reports to employee name
    reports_to_preferred_name?: string; // Reports to preferred name
    reports_to_employee_number?: string; // Reports to employee number
    tags?: string;             // Associated tags
}
```

### Key Features

1. **Team Management**: View team details, members, and hierarchy
2. **Position Management**: Manage positions within teams
3. **Employee Profile Integration**: Team members are displayed in employee profiles
4. **Hierarchical Structure**: Support for team and position hierarchies
5. **Tag System**: Teams and positions can have associated tags

### Components

- `TeamMember.tsx` - Displays team information and members in employee profiles
- `useTeamMemberService` - Service hook for team and position operations
- `teamMemberAPI` - RTK Query API for backend communication

### Usage

The team and position integration is primarily used in the employee profile pages, specifically in the "Work" tab under "Team Members". The component displays:

- Team name and description
- Team reference (parent team or organization)
- Team member counts
- Tags associated with the team
- List of team members with their names and job titles

### Development

To work with the team and position integration:

1. Ensure the backend server is running on `http://localhost:4172`
2. The frontend will automatically connect to the backend APIs
3. Team data is loaded when viewing employee profiles
4. Mock data is provided for demonstration when backend is not available

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

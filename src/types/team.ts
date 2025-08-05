// export interface Employee {
//   id: string; // ✅ use string everywhere (UUID-safe)
//   name: string;
//   position: string;
//   avatar: string;
//   subordinates: number;
//   yearsOfPosition: string;
// }

// export interface Team {
//   team_ID: string;
//   team_name: string;
//   team_description?: string; // ✅ Add this line
//   employees: Employee[];
// }

// types/team.ts

export interface Employee {
  id: string;
  name: string;
  position: string;
  jobTitle: string;
  avatar?: string;
  nodeReference: number;
}

export interface Team {
  team_ID: string;
  team_name: string;
  team_code: string;
  team_description?: string;
  employees: Employee[];
}



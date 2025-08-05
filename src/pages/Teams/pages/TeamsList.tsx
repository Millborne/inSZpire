// import TeamCard from "../components/TeamCard";
// import TeamsTable from "../components/TeamsTable";
// import { Employee } from "..";

// interface Team {
//     id: number | string;
//     name: string;
//     employees: Employee[];
// }

// interface TeamsListProps {
//     teams: Team[];
//     viewType: "card" | "table";
//     onTeamSave?: (data: any) => void;
// }

// const TeamsList = ({ teams, viewType = "card", onTeamSave }: TeamsListProps) => {
//     return (
//         <div className="grid grid-cols-1 gap-[20px] w-full">
//             {viewType === "card"
//                 ? teams.map((team) => <TeamCard id={team.id} teamName={team.name} employees={team.employees} onSave={onTeamSave} />)
//                 : teams.map((team) => <TeamsTable key={team.id} teamName={team.name} employees={team.employees} onSave={onTeamSave} />)}
//         </div>
//     );
// };

// export default TeamsList;

import { Team } from "../../../types/team";
import TeamCard from "../../Teams/components/TeamCard";

interface TeamsListProps {
  teams: Team[];
  viewType: "card" | "table";
  onTeamSave: () => void; // ✅ renamed to match TeamCard
}

const TeamsList = ({ teams, viewType, onTeamSave }: TeamsListProps) => {
  if (viewType === "table") {
    return (
      <div className="text-center text-body-base-strong text-gray-500">
        Table view is not yet implemented.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      {teams.length === 0 ? (
        <p className="text-body-base text-center text-gray-500">No teams found.</p>
      ) : (
        teams.map((team) => {
          // console.log("🟡 Rendering team:", team.team_name);
          // console.log("👥 team.employees:", team.employees);

          return (
            <TeamCard
              key={team.team_ID}
              team={team}
              onTeamSave={onTeamSave} // ✅ now clearly triggers parent reload
            />
          );
        })
      )}
    </div>
  );
};

export default TeamsList;




























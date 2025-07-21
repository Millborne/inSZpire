import TeamCard from "../components/TeamCard";
import TeamsTable from "../components/TeamsTable";
import { Employee } from "..";

interface Team {
    id: number | string;
    name: string;
    employees: Employee[];
}

interface TeamsListProps {
    teams: Team[];
    viewType: "card" | "table";
    onTeamSelect?: (teamId: string) => void;
    onTeamSave?: (data: any) => void;
}

const TeamsList = ({ teams, viewType = "card", onTeamSelect, onTeamSave }: TeamsListProps) => {
    return (
        <div className="grid grid-cols-1 gap-[20px] w-full">
            {viewType === "card"
                ? teams.map((team) => (
                    <TeamCard 
                        key={team.id} 
                        id={team.id} 
                        teamName={team.name} 
                        employees={team.employees} 
                        onSelect={onTeamSelect}
                        onSave={onTeamSave} 
                    />
                ))
                : teams.map((team) => (
                    <TeamsTable 
                        key={team.id} 
                        id={team.id}
                        teamName={team.name} 
                        employees={team.employees} 
                        onSave={onTeamSave} 
                    />
                ))}
        </div>
    );
};

export default TeamsList;

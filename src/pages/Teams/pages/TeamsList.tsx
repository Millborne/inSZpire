import { Team } from "../../../types/team";
import TeamCard from "../../Teams/components/TeamCard";
import TeamsTable from "../components/TeamsTable";

interface TeamsListProps {
    teams: Team[];
    viewType: "card" | "table";
    onTeamSave: () => void; // ✅ renamed to match TeamCard
}

const TeamsList = ({ teams, viewType, onTeamSave }: TeamsListProps) => {
    if (viewType === "table") {
        return (
            <div className="text-center text-body-base-strong text-gray-500 flex flex-col gap-[24px]">
                {teams.map((team) => (
                    <TeamsTable
                        key={team.team_ID}
                        id={team.team_ID}
                        teamName={team.team_name}
                        employees={team.employees}
                        onSave={onTeamSave}
                        team={team}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[24px]">
            {teams.length === 0 ? (
                <p className="text-body-base text-center text-gray-500">
                    No teams found.
                </p>
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

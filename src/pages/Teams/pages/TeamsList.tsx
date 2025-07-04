import React from "react";
import TeamCard from "../components/TeamCard";
import TeamsTable from "../components/TeamsTable";
import { Employee } from "..";

interface Team {
  id: number;
  name: string;
  employees: Employee[];
}

interface TeamsListProps {
  teams: Team[];
  viewType: "card" | "table";
}

const TeamsList = ({ teams, viewType = "card" }: TeamsListProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      {viewType === "card"
        ? teams.map((team) => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              employees={team.employees}
            />
          ))
        : teams.map((team) => (
            <TeamsTable
              key={team.id}
              teamName={team.name}
              employees={team.employees}
            />
          ))}
    </div>
  );
};

export default TeamsList;

import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
import TeamModal, { TeamDataType } from "./modals/TeamModal";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  name: string;
  position: string;
  avatar: string;
}

interface TeamCardProps {
  id: number;
  teamName: string;
  employees: Employee[];
  onSave?: (data: any) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  teamName,
  employees,
  onSave,
}) => {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //! Show only 6 employees initially, or all if showAll is true
  const displayedEmployees = showAll ? employees : employees.slice(0, 6);

  // Create team data for the modal
  const teamData: TeamDataType = {
    id: "1", // You might want to pass this as a prop
    name: teamName,
    description: "", // Add description if available
    reference: "",
    manager: "",
    tags: [],
  };

  const handleSave = async (data: TeamDataType) => {
    // TODO: Implement save logic
    console.log("Saving team data:", data);
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <>
      <div
        className="flex flex-col gap-[12px] p-[16px] border border-szPrimary200 rounded-lg cursor-pointer"
        onClick={() => navigate(`/home/teams/${id}/specificteam`)}
      >
        <p className="text-body-base-strong">{teamName}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
          {displayedEmployees.map((employee, index) => (
            <EmployeeCard key={index} {...employee} />
          ))}
        </div>
        {employees.length > 6 && (
          <div
            className="flex gap-[8px] py-[8px] items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(!showAll);
            }}
          >
            {showAll ? (
              <>
                <ArrowUp2 className="icon-md" />
                <p className="text-body-small-strong">See Less</p>
              </>
            ) : (
              <>
                <ArrowDown2 className="icon-md" />
                <p className="text-body-small-strong">See More</p>
              </>
            )}
          </div>
        )}
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="edit"
        selectedTeam={teamData}
        onSave={handleSave}
      />
    </>
  );
};

export default TeamCard;

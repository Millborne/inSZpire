// import { useState } from "react";
// import EmployeeCard from "./EmployeeCard";
// import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
// import TeamModal, { TeamDataType } from "./modals/TeamModal";
// import { useNavigate } from "react-router-dom";

// interface Employee {
//   id: number;
//   name: string;
//   position: string;
//   avatar: string;
// }

// interface TeamCardProps {
//   id: number;
//   teamName: string;
//   employees: Employee[];
//   onSave?: (data: any) => void;
// }

// const TeamCard: React.FC<TeamCardProps> = ({
//   id,
//   teamName,
//   employees,
//   onSave,
// }) => {
//   const navigate = useNavigate();

//   const [showAll, setShowAll] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   //! Show only 6 employees initially, or all if showAll is true
//   const displayedEmployees = showAll ? employees : employees.slice(0, 6);

//   // Create team data for the modal
//   const teamData: TeamDataType = {
//     id: "1", // You might want to pass this as a prop
//     name: teamName,
//     description: "", // Add description if available
//     reference: "",
//     manager: "",
//     tags: [],
//   };

//   const handleSave = async (data: TeamDataType) => {
//     // TODO: Implement save logic
//     console.log("Saving team data:", data);
//     if (onSave) {
//       onSave(data);
//     }
//   };

//   return (
//     <>
//       <div
//         className="flex flex-col gap-[12px] p-[16px] border border-szPrimary200 rounded-lg cursor-pointer"
//         onClick={() => navigate(`/home/teams/${id}/specificteam`)}
//       >
//         <p className="text-body-base-strong">{teamName}</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
//           {displayedEmployees.map((employee, index) => (
//             <EmployeeCard key={index} {...employee} />
//           ))}
//         </div>
//         {employees.length > 6 && (
//           <div
//             className="flex gap-[8px] py-[8px] items-center justify-center cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowAll(!showAll);
//             }}
//           >
//             {showAll ? (
//               <>
//                 <ArrowUp2 className="icon-md" />
//                 <p className="text-body-small-strong">See Less</p>
//               </>
//             ) : (
//               <>
//                 <ArrowDown2 className="icon-md" />
//                 <p className="text-body-small-strong">See More</p>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <TeamModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         mode="edit"
//         selectedTeam={teamData}
//         onSave={handleSave}
//       />
//     </>
//   );
// };

// export default TeamCard;

import { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
import TeamModal, { TeamDataType } from "./modals/TeamModal";
import { useNavigate } from "react-router-dom";
import { useActionTeamsMutation } from "../../../services/teams/list/teamsAPI";
import { More } from "iconsax-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  jobTitle: string;
  nodeReference: number;
}

interface Team {
  team_ID: string;
  team_name: string;
  team_code: string;
  team_description?: string;
  employees: Employee[];
  acc_ID?: string | null;
  parent_team_ID?: string | null;
  team_logo?: string;
  node?: string;
  is_archived?: number;
  created_by?: string;
  updated_by?: string;
  tag_IDs?: string[];
}

interface TeamCardProps {
  team: Team;
  onTeamSave?: () => void; // ✅ ensure correct name
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onTeamSave }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [teamReferenceOptions, setTeamReferenceOptions] = useState<{ label: string; value: string }[]>([]);
  const [actionTeams] = useActionTeamsMutation();

  const displayedEmployees = showAll
    ? team.employees
    : team.employees.slice(0, 6);

  const teamData: TeamDataType = {
    team_ID: team.team_ID,
    team_code: team.team_code,
    team_name: team.team_name,
    team_description: team.team_description || "",
    parent_team_ID: team.parent_team_ID || null,
    team_logo: team.team_logo || "",
    node: team.node,
    is_archived: team.is_archived,
    created_by: team.created_by,
    updated_by: team.updated_by,
    tag_IDs: team.tag_IDs || [],
  };

  const handleSave = async (data: TeamDataType) => {
    try {
      console.log("📤 Updating team:", data);

      const result = await actionTeams({
        queryParameters: "/update",
        method: "PUT",
        body: {
          ...data,
          parent_team_ID: data.parent_team_ID || null,
          tag_IDs: data.tag_IDs || [],
        },
      }).unwrap();

      console.log("✅ Update successful:", result);

      // ✅ Call parent refresh method
      if (onTeamSave) {
        console.log("🔁 Triggering parent reload via onTeamSave");
        onTeamSave(); // No arguments, just a signal to reload
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("❌ Failed to update team:", err);
    }
  };

  // Fetch team references when the modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    actionTeams({
      queryParameters: "/view",
      method: "POST",
      body: { is_archived: 0, offset: 0, limit: 1000 },
    })
      .unwrap()
      .then((res) => {
        // Log the members for debugging
        console.log("Members:", res.members);

        const options = res.data.map((t: any) => ({
          label: t.team_name,
          value: t.team_ID,
        }));
        setTeamReferenceOptions(options);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch team references:", err);
        setTeamReferenceOptions([]);
      });
  }, [isModalOpen]);

  return (
    <>
      <div
        className="relative flex flex-col gap-[12px] p-[16px] border border-szPrimary200 rounded-lg cursor-pointer"
        onClick={() => {
          console.log("🟢 TeamCard clicked! team_ID:", team.team_ID);
          console.log("📦 Full team object:", team);
          navigate(`/home/teams/${team.team_ID}/specificteam`, { state: { team } });
        }}
      >
        {/* 3-dot menu */}
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        >
          <More size={20} className="cursor-pointer" />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            className="absolute top-10 right-2 bg-white border border-gray-300 rounded-md shadow-md z-20 w-[140px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsModalOpen(true);
                setDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              ✏️ Edit Team Info
            </button>
          </div>
        )}

        {/* Team Info */}
        <p className="text-body-base-strong">{team.team_name}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
          {displayedEmployees.map((emp, idx) => (
            <EmployeeCard
              key={`${emp.id}-${idx}`}
              name={emp.name}
              position={emp.position}
              avatar={emp.avatar || ""}
            />
          ))}
        </div>

        {team.employees.length > 6 && (
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































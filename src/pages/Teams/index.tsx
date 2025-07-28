// import { useState, useMemo } from "react";
// import {
//     CardContainer,
//     PopoverMenu,
//     Inputs,
//     //   ButtonsIcon,
//     Tab,
//     Pagination,
//     //   Tabs,
//     SnackbarAlert,
// } from "enterprisze-global-components";
// import {
//     Add,
//     ExportCurve,
//     //   Filter,
//     Firstline,
//     Grid2,
//     SearchNormal,
// } from "iconsax-reactjs";

// // components
// import TeamsList from "./pages/TeamsList";
// import TeamModal, { ModalMode, TeamDataType } from "./components/modals/TeamModal";

// export interface Employee {
//     id: string;
//     name: string;
//     position: string;
//     avatar: string;
//     subordinates: number;
//     yearsOfPosition: string;
// }

// // dummy data, remove later in integration
// const teamsData = [
//     {
//         id: 1,
//         name: "The Executive Team",
//         employees: [
//             {
//                 id: "1",
//                 name: "John Mark Pangilinan",
//                 position: "Chief People and Culture Officer",
//                 avatar: "https://i.pravatar.cc/100?img=32",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "2",
//                 name: "Sarah Johnson",
//                 position: "Chief Executive Officer",
//                 avatar: "https://i.pravatar.cc/100?img=1",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "3",
//                 name: "Michael Chen",
//                 position: "Chief Technology Officer",
//                 avatar: "https://i.pravatar.cc/100?img=2",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "4",
//                 name: "Emily Rodriguez",
//                 position: "Chief Financial Officer",
//                 avatar: "https://i.pravatar.cc/100?img=3",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "5",
//                 name: "David Kim",
//                 position: "Chief Marketing Officer",
//                 avatar: "https://i.pravatar.cc/100?img=4",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "6",
//                 name: "Lisa Thompson",
//                 position: "Chief Operations Officer",
//                 avatar: "https://i.pravatar.cc/100?img=5",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "7",
//                 name: "Robert Wilson",
//                 position: "Chief Legal Officer",
//                 avatar: "https://i.pravatar.cc/100?img=6",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "8",
//                 name: "Jennifer Lee",
//                 position: "Chief Strategy Officer",
//                 avatar: "https://i.pravatar.cc/100?img=7",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//         ],
//     },
//     {
//         id: 2,
//         name: "Development Team",
//         employees: [
//             {
//                 id: "9",
//                 name: "Alex Martinez",
//                 position: "Senior Software Engineer",
//                 avatar: "https://i.pravatar.cc/100?img=8",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "10",
//                 name: "Priya Patel",
//                 position: "Frontend Developer",
//                 avatar: "https://i.pravatar.cc/100?img=9",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "11",
//                 name: "Carlos Rodriguez",
//                 position: "Backend Developer",
//                 avatar: "https://i.pravatar.cc/100?img=10",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "12",
//                 name: "Sophie Anderson",
//                 position: "Full Stack Developer",
//                 avatar: "https://i.pravatar.cc/100?img=11",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "13",
//                 name: "James Wilson",
//                 position: "DevOps Engineer",
//                 avatar: "https://i.pravatar.cc/100?img=12",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "14",
//                 name: "Maria Garcia",
//                 position: "QA Engineer",
//                 avatar: "https://i.pravatar.cc/100?img=13",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "15",
//                 name: "Kevin O'Connor",
//                 position: "Mobile Developer",
//                 avatar: "https://i.pravatar.cc/100?img=14",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "16",
//                 name: "Anna Kowalski",
//                 position: "UI/UX Designer",
//                 avatar: "https://i.pravatar.cc/100?img=15",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "17",
//                 name: "Tom Brown",
//                 position: "Data Engineer",
//                 avatar: "https://i.pravatar.cc/100?img=16",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "18",
//                 name: "Rachel Green",
//                 position: "Product Manager",
//                 avatar: "https://i.pravatar.cc/100?img=17",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//         ],
//     },
//     {
//         id: 3,
//         name: "Marketing Team",
//         employees: [
//             {
//                 id: "19",
//                 name: "Amanda Foster",
//                 position: "Marketing Director",
//                 avatar: "https://i.pravatar.cc/100?img=18",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "20",
//                 name: "Ryan Cooper",
//                 position: "Digital Marketing Specialist",
//                 avatar: "https://i.pravatar.cc/100?img=19",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "21",
//                 name: "Nina Patel",
//                 position: "Content Strategist",
//                 avatar: "https://i.pravatar.cc/100?img=20",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "22",
//                 name: "Chris Taylor",
//                 position: "SEO Specialist",
//                 avatar: "https://i.pravatar.cc/100?img=21",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "23",
//                 name: "Jessica Wong",
//                 position: "Social Media Manager",
//                 avatar: "https://i.pravatar.cc/100?img=22",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "24",
//                 name: "Daniel Lewis",
//                 position: "Brand Manager",
//                 avatar: "https://i.pravatar.cc/100?img=23",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//         ],
//     },
//     {
//         id: 4,
//         name: "Sales Team",
//         employees: [
//             {
//                 id: "25",
//                 name: "Mark Davis",
//                 position: "Sales Director",
//                 avatar: "https://i.pravatar.cc/100?img=24",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "26",
//                 name: "Laura Smith",
//                 position: "Senior Sales Representative",
//                 avatar: "https://i.pravatar.cc/100?img=25",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "27",
//                 name: "Jason Miller",
//                 position: "Account Executive",
//                 avatar: "https://i.pravatar.cc/100?img=26",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "28",
//                 name: "Stephanie White",
//                 position: "Sales Development Representative",
//                 avatar: "https://i.pravatar.cc/100?img=27",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "29",
//                 name: "Brian Johnson",
//                 position: "Regional Sales Manager",
//                 avatar: "https://i.pravatar.cc/100?img=28",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "30",
//                 name: "Melissa Clark",
//                 position: "Customer Success Manager",
//                 avatar: "https://i.pravatar.cc/100?img=29",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "31",
//                 name: "Andrew Moore",
//                 position: "Sales Operations Manager",
//                 avatar: "https://i.pravatar.cc/100?img=30",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//             {
//                 id: "32",
//                 name: "Katherine Hall",
//                 position: "Business Development Representative",
//                 avatar: "https://i.pravatar.cc/100?img=31",
//                 subordinates: 10,
//                 yearsOfPosition: "10 years",
//             },
//         ],
//     },
// ];

// const Teams = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState<ModalMode>("add");
//     const [selectedTeam, setSelectedTeam] = useState<TeamDataType | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [viewType, setViewType] = useState<"card" | "table">("card");
//     const teamsPerPage = 3;
//     const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");

//     // Calculate paginated teams
//     const paginatedTeams = useMemo(() => {
//         const startIndex = (currentPage - 1) * teamsPerPage;
//         const endIndex = startIndex + teamsPerPage;
//         return teamsData.slice(startIndex, endIndex);
//     }, [currentPage]);

//     // Calculate total pages
//     const totalPages = Math.ceil(teamsData.length / teamsPerPage);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleOpenModal = (team: TeamDataType, mode: ModalMode) => {
//         setSelectedTeam(team);
//         setModalMode(mode);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedTeam(null);
//     };

//     const handleTeamSuccess = (message: string) => {
//         setSnackbarMessage(message);
//         setShowSuccessSnackbar(true);
//         setTimeout(() => setShowSuccessSnackbar(false), 3000);
//     };

//     return (
//         <div className="flex flex-col h-full">
//             <CardContainer
//                 content={
//                     <div className="flex flex-col gap-[20px] h-full">
//                         <section className="flex gap-[12px] items-center ">
//                             <h3 className="text-h3">Teams</h3>
//                             <div className="flex-1">
//                                 <PopoverMenu
//                                     size="small"
//                                     items={[
//                                         {
//                                             label: "Add Team",
//                                             icon: <Add />,
//                                             onClick: () => handleOpenModal({} as TeamDataType, "add"),
//                                         },
//                                         {
//                                             label: "Export",
//                                             icon: <ExportCurve />,
//                                             onClick: () => {},
//                                         },
//                                     ]}
//                                 />
//                             </div>
//                             {/* <div className="flex w-fit">
//                 <Tabs
//                   options={[
//                     { label: "SZ Teams", value: "sz-teams" },
//                     {
//                       label: "Organizational Chart",
//                       value: "organizational-chart",
//                     },
//                   ]}
//                   activeIndex={0}
//                   onTabChange={() => {}}
//                 />
//               </div> */}
//                         </section>
//                         <section className="flex flex-wrap justify-end sm:justify-between gap-[12px]  items-center w-full ">
//                             <div className="flex flex-row flex-1 gap-[12px] w-fit">
//                                 <div className="w-full max-w-[335px] min-w-[150px] ">
//                                     <Inputs
//                                         placeholder="Search by Team Name or Employee Name"
//                                         icon={SearchNormal}
//                                         // TODO: Backend Integration - Add search functionality
//                                         // onChange={(value) => handleSearch(value)}
//                                     />
//                                 </div>
//                                 {/* <ButtonsIcon
//                 icon={<Filter />}
//                 size="medium"
//                 variant="ghost"
//                 onClick={() => {}}
//               /> */}
//                             </div>
//                             <div className="flex w-fit">
//                                 <Tab
//                                     type="left"
//                                     active={viewType === "card"}
//                                     icon={<Grid2 />}
//                                     isFirst
//                                     onClick={() => setViewType("card")}
//                                 />
//                                 <Tab type="right" active={viewType === "table"} icon={<Firstline />} onClick={() => setViewType("table")} />
//                             </div>
//                         </section>
//                         <TeamsList
//                             teams={paginatedTeams}
//                             viewType={viewType}
//                             onTeamSave={(data) => {
//                                 const message = "Successfully updated team";
//                                 handleTeamSuccess(message);
//                             }}
//                         />
//                         {totalPages > 1 && (
//                             <section className="flex justify-end">
//                                 <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
//                             </section>
//                         )}
//                     </div>
//                 }
//             />
//             <TeamModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 mode={modalMode}
//                 selectedTeam={selectedTeam}
//                 onSave={(_data) => {
//                     const message = modalMode === "add" ? "Successfully added a new Team" : "Successfully updated team";
//                     handleTeamSuccess(message);
//                     handleCloseModal();
//                 }}
//             />
//             <SnackbarAlert
//                 isOpen={showSuccessSnackbar}
//                 onClose={() => setShowSuccessSnackbar(false)}
//                 showCloseButton={true}
//                 type="success"
//                 title={snackbarMessage}
//                 animation="slide-up"
//             />
//         </div>
//     );
// };

// export default Teams;

import { useState, useEffect } from "react";
import {
  CardContainer,
  PopoverMenu,
  Inputs,
  Tab,
  Pagination,
  SnackbarAlert,
} from "enterprisze-global-components";
import {
  Add,
  ExportCurve,
  Firstline,
  Grid2,
  SearchNormal,
} from "iconsax-reactjs";

import TeamsList from "./pages/TeamsList";
import TeamModal, {
  ModalMode,
  TeamDataType,
} from "./components/modals/TeamModal";
import { useActionTeamsMutation } from "../../services/teams/list/teamsAPI";

export interface Employee {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  jobTitle: string;
  nodeReference: number;
}

const Teams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedTeam, setSelectedTeam] = useState<TeamDataType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const teamsPerPage = 3;
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [actionTeam] = useActionTeamsMutation();
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadTeams = async (page = 1) => {
    const offset = (page - 1) * teamsPerPage;

    try {
      setIsLoading(true);
      const res = await actionTeam({
        queryParameters: "/view",
        method: "POST",
        body: {
          offset,
          limit: teamsPerPage,
        },
      }).unwrap();

      const teams = res.data || [];
      const allMembers = res.members || [];

      const enrichedTeams = teams.map((team: any) => {
        const employees = allMembers
          .filter((member: any) => member.team_ID === team.team_ID)
          .map((member: any) => ({
            id: member.employee_ID || member.id || "unknown",
            name: member.employee_name || member.name || "Unnamed",
            position: member.position_name || member.position || "Unknown",
            avatar: member.avatar || "",
            jobTitle: member.job_title || member.jobTitle || "Unknown",
            nodeReference: member.node_reference ?? 0,
          }));

        return {
          ...team,
          employees,
        };
      });

      setTeamsData(enrichedTeams);
      setTotalCount(res.total_count || 0);
    } catch (error) {
      console.error("❌ Error loading teams or employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (team: TeamDataType, mode: ModalMode) => {
    setSelectedTeam(team);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  const handleTeamSuccess = (message: string) => {
    setSnackbarMessage(message);
    setShowSuccessSnackbar(true);

    // Auto-hide snackbar after 3s
    setTimeout(() => {
      setShowSuccessSnackbar(false);
    }, 3000);

    // Clear current team list to force UI refresh
    setTeamsData([]);

    // Slight delay to let backend commit changes
    setTimeout(() => {
      loadTeams(currentPage);
    }, 500);
  };

  const totalPages = Math.ceil(totalCount / teamsPerPage);

  return (
    <div className="flex flex-col h-full">
      <CardContainer
        content={
          <div className="flex flex-col gap-[20px] h-full">
            {/* Header & Menu */}
            <section className="flex gap-[12px] items-center">
              <h3 className="text-h3">Teams</h3>
              <div className="flex-1">
                <PopoverMenu
                  size="small"
                  items={[
                    {
                      label: "Add Team",
                      icon: <Add />,
                      onClick: () =>
                        handleOpenModal({} as TeamDataType, "add"),
                    },
                    {
                      label: "Export",
                      icon: <ExportCurve />,
                      onClick: () => {},
                    },
                  ]}
                />
              </div>
            </section>

            {/* Search and View Type */}
            <section className="flex flex-wrap justify-end sm:justify-between gap-[12px] items-center w-full">
              <div className="flex flex-row flex-1 gap-[12px] w-fit">
                <div className="w-full max-w-[335px] min-w-[150px]">
                  <Inputs
                    placeholder="Search by Team Name or Employee Name"
                    icon={SearchNormal}
                  />
                </div>
              </div>
              <div className="flex w-fit">
                <Tab
                  type="left"
                  active={viewType === "card"}
                  icon={<Grid2 />}
                  isFirst
                  onClick={() => setViewType("card")}
                />
                <Tab
                  type="right"
                  active={viewType === "table"}
                  icon={<Firstline />}
                  onClick={() => setViewType("table")}
                />
              </div>
            </section>

            {/* Teams Display */}
            {isLoading ? (
              <div className="text-center text-body-base-strong py-10">
                Loading teams...
              </div>
            ) : (
              <TeamsList
                teams={teamsData}
                viewType={viewType}
                onTeamSave={() => {
                  handleTeamSuccess("Successfully updated team");
                }}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <section className="flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </section>
            )}
          </div>
        }
      />

      {/* Modal */}
      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        selectedTeam={selectedTeam}
        onSave={() => {
          const message =
            modalMode === "add"
              ? "Successfully added a new Team"
              : "Successfully updated team";

          handleTeamSuccess(message);
          handleCloseModal();
        }}
      />

      {/* Snackbar */}
      <SnackbarAlert
        isOpen={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
        showCloseButton={true}
        type="success"
        title={snackbarMessage}
        animation="slide-up"
      />
    </div>
  );
};

export default Teams;













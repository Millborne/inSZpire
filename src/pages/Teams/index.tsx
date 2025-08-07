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

    const [search, setSearch] = useState("");

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
                    search: search,
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
                        position:
                            member.position_name ||
                            member.position ||
                            "Unknown",
                        avatar: member.avatar || "",
                        jobTitle:
                            member.job_title || member.jobTitle || "Unknown",
                        nodeReference: member.node_reference ?? 0,
                        subordinates_count: member.subordinates_count ?? 0,
                        years_in_position: member.years_in_position ? 
                            member.years_in_position.replace(/year:(\d+), month:(\d+)/, (_: string, y: string, m: string) => 
                                `${y} ${y === '1' ? 'year' : 'years'} and ${m} ${m === '1' ? 'month' : 'months'}`
                            ) : "0 years and 0 months",
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
    }, [currentPage, search]);

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
                                                handleOpenModal(
                                                    {} as TeamDataType,
                                                    "add"
                                                ),
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
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
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
                                    handleTeamSuccess(
                                        "Successfully updated team"
                                    );
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

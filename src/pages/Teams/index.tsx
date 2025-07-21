import { useState, useMemo, useEffect } from "react";
import {
    CardContainer,
    PopoverMenu,
    Inputs,
    Tab,
    Pagination,
    SnackbarAlert,
    Chip,
    Avatar,
} from "enterprisze-global-components";
import {
    Add,
    ExportCurve,
    SearchNormal,
    Edit2,
    ArchiveBox,
    People,
    Data2,
    Hierarchy2,
    Information,
    Tag,
} from "iconsax-reactjs";

// components
import TeamsList from "./pages/TeamsList";
import TeamModal, { ModalMode, TeamDataType } from "./components/modals/TeamModal";

export interface Employee {
    id: string | number;
    name: string;
    position: string;
    avatar: string;
    subordinates: number;
    yearsOfPosition: string;
}

// Import teams service
import { useTeamService, type TeamData } from "../../services/teams/list";
// Import team member service for detailed team data
import { useTeamMemberService, type TeamData as DetailedTeamData, type PositionData } from "../../services/employee-profile/work/team-member";

const Teams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [selectedTeam, setSelectedTeam] = useState<TeamDataType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewType, setViewType] = useState<"card" | "table">("card");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Teams service
    const teamService = useTeamService();
    const teamMemberService = useTeamMemberService();
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Detailed team data for integrated view
    const [selectedTeamDetails, setSelectedTeamDetails] = useState<DetailedTeamData | null>(null);
    const [teamMembers, setTeamMembers] = useState<PositionData[]>([]);
    const [viewMode, setViewMode] = useState<"list" | "detail">("list");
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

    // Load teams on component mount
    useEffect(() => {
        const loadTeams = async () => {
            try {
                setIsLoading(true);
                const response = await teamService.viewTeams({
                    search: "",
                    is_archived: 0,
                    offset: 0,
                    limit: 50
                });

                if (response.data?.data) {
                    setTeams(response.data.data);
                }
            } catch (err) {
                setError("Failed to load teams");
                console.error("Error loading teams:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTeams();
    }, []);

    // Load detailed team data when a team is selected
    useEffect(() => {
        const loadTeamDetails = async () => {
            if (!selectedTeamId) return;

            try {
                setIsLoading(true);
                
                // Get team details
                const teamResponse = await teamMemberService.getTeamDetails({
                    team_ID: selectedTeamId,
                    is_archived: 0,
                    offset: 0,
                    limit: 10
                });

                if (teamResponse.data?.data && Array.isArray(teamResponse.data.data) && teamResponse.data.data.length > 0) {
                    const team = teamResponse.data.data[0];
                    setSelectedTeamDetails(team);
                    
                    // Get team members
                    const membersResponse = await teamMemberService.getTeamMembers({
                        team_ID: selectedTeamId,
                        is_archived: 0,
                        offset: 0,
                        limit: 50
                    });

                    if (membersResponse.data?.success && membersResponse.data?.data) {
                        const members = Array.isArray(membersResponse.data.data) 
                            ? membersResponse.data.data 
                            : [membersResponse.data.data];
                        setTeamMembers(members);
                    } else {
                        setTeamMembers([]);
                    }
                }
            } catch (err) {
                console.error("Error loading team details:", err);
                setError("Failed to load team details");
            } finally {
                setIsLoading(false);
            }
        };

        loadTeamDetails();
    }, [selectedTeamId]);

    // Transform API data to match TeamsList interface
    const transformedTeams = useMemo(() => {
        return teams.map((team) => ({
            id: team.team_ID || "",
            name: team.team_name,
            employees: [] // TODO: Fetch team members when needed
        }));
    }, [teams]);

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
        setTimeout(() => setShowSuccessSnackbar(false), 3000);
    };

    const handleTeamSelect = (teamId: string) => {
        setSelectedTeamId(teamId);
        setViewMode("detail");
    };

    const handleBackToList = () => {
        setViewMode("list");
        setSelectedTeamId(null);
        setSelectedTeamDetails(null);
        setTeamMembers([]);
    };

    // Get team reference name
    const getTeamReference = () => {
        if (selectedTeamDetails?.parent_team_ID) {
            return "Parent Team";
        }
        return "Office of the President and COO";
    };

    // Get team member counts
    const teamMemberCount = teamMembers.length;
    const underlingsCount = 9; // TODO: Calculate from hierarchy

    // Loading state
    if (isLoading) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-32">
                        <div className="text-szPrimary700">Loading teams...</div>
                    </div>
                }
            />
        );
    }

    // Error state
    if (error) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-32">
                        <div className="text-red-600">{error}</div>
                    </div>
                }
            />
        );
    }

    // Detailed team view
    if (viewMode === "detail" && selectedTeamDetails) {
        return (
            <div className="flex flex-col h-full">
                <CardContainer
                    content={
                        <div className="flex flex-col gap-[20px]">
                            {/* Back button and team header */}
                            <div className="flex items-center gap-[8px]">
                                <button
                                    onClick={handleBackToList}
                                    className="text-szPrimary700 hover:text-szPrimary600"
                                >
                                    ← Back to Teams
                                </button>
                                <h5 className="text-h5 text-szPrimary700">{selectedTeamDetails.team_name}</h5>
                                <div className="flex-1">
                                    <PopoverMenu
                                        size="small"
                                        items={[
                                            {
                                                label: "Edit Team Info",
                                                icon: <Edit2 />,
                                                onClick: () => handleOpenModal({} as TeamDataType, "edit"),
                                            },
                                            {
                                                label: "Archive Team",
                                                icon: <ArchiveBox />,
                                                onClick: () => {},
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Team Description */}
                            <div className="flex flex-col gap-[20px]">
                                <p className="text-body-small-strong text-szDarkGrey600">
                                    {selectedTeamDetails.team_description || "The Business Solutions and Innovations team is dedicated to developing cutting-edge system applications that enhance operational efficiency across the company. Comprising talented developers, this team ensures that all software solutions are user-friendly and tailored to meet the diverse needs of our employees. Their commitment to innovation drives continuous improvement, empowering teams to achieve their goals effectively."}
                                </p>

                                {/* Team Reference and Tags Section */}
                                <div>
                                    <div className="flex flex-row justify-between">
                                        {/* Team Reference */}
                                        <div className="flex flex-row gap-[8px]">
                                            <Hierarchy2 className="text-szPrimary700" />
                                            <div className="flex flex-col lg:flex-row lg:gap-[75px]">
                                                <p className="text-caption-all-caps text-szGrey500">TEAM REFERENCE</p>
                                                <p className="text-body-small-strong">
                                                    {getTeamReference()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tags Section */}
                                        <div className="flex flex-col gap-[8px]">
                                            <div className="flex flex-row justify-end gap-[8px]">
                                                <p className="text-caption-all-caps text-szGrey500">TAGS</p>
                                                <Information className="text-szPrimary700" />
                                            </div>

                                            <div className="flex flex-col lg:flex-row gap-[8px]">
                                                {selectedTeamDetails.tags ? (
                                                    selectedTeamDetails.tags.split(',').map((tag: string, index: number) => (
                                                        <div key={index} className="relative group">
                                                            <Chip label={tag.trim()} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <Chip label="Tag 1" />
                                                        <Chip label="Tag 2" />
                                                        <Chip label="Tag 3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Member Counts */}
                                    <div className="flex gap-4 mt-4">
                                        <div className="flex items-center gap-2">
                                            <People className="text-szPrimary700" />
                                            <span className="text-body-small-strong">{teamMemberCount}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Data2 className="text-szPrimary700" />
                                            <span className="text-body-small-strong">{underlingsCount}</span>
                                        </div>
                                    </div>

                                    {/* Tab Navigation */}
                                    <div className="relative flex w-full justify-center items-center mt-6">
                                        {/* center line */}
                                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-szGrey300 z-0" />

                                        {/* Tab group overlapping the line */}
                                        <div className="flex w-fit z-10">
                                            <Tab
                                                type="left"
                                                active={true}
                                                icon={
                                                    <div className="flex flex-row items-center gap-2">
                                                        <People />
                                                        <div className="w-[1px] h-[16px] bg-szGrey300" />
                                                        <p className="text-caption-strong text-szSecondary500">
                                                            {teamMemberCount}
                                                        </p>
                                                    </div>
                                                }
                                                onClick={() => {}}
                                            />
                                            <Tab
                                                type="right"
                                                active={false}
                                                icon={
                                                    <div className="flex flex-row gap-2">
                                                        <Data2 />
                                                        <div className="w-[1px] h-[16px] bg-szGrey300" />
                                                        <p className="text-caption-strong text-szGrey500">
                                                            {underlingsCount}
                                                        </p>
                                                    </div>
                                                }
                                                onClick={() => {}}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Team Members List */}
                                    <div className="mt-6">
                                        <h6 className="text-h6 text-szPrimary700 mb-4">These are user's teammates</h6>
                                        {teamMembers.length > 0 ? (
                                            <div className="space-y-0">
                                                {teamMembers.map((member, index) => {
                                                    // Format the name properly
                                                    const displayName = member.employee_name || 
                                                        (member.first_name && member.last_name ? 
                                                            `${member.last_name}, ${member.first_name}${member.middle_name ? ` ${member.middle_name}` : ''}` : 
                                                            member.position_name || "Unknown");
                                                    
                                                    const jobTitle = member.job_title || member.position_name || "No title";
                                                    
                                                    return (
                                                        <div key={member.position_ID}>
                                                            <div className="flex items-center gap-3 p-3">
                                                                <Avatar size="small" src="/src/assets/noAvatar.png" />
                                                                <div className="flex flex-col">
                                                                    <p className="text-body-small-strong text-szBlack800">
                                                                        {displayName}
                                                                    </p>
                                                                    <p className="text-caption-reg text-szDarkGrey600">
                                                                        {jobTitle}
                                                                    </p>
                                                                    {member.employee_number && (
                                                                        <p className="text-caption-reg text-szGrey500">
                                                                            #{member.employee_number}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* Add separator line after each member except the last one */}
                                                            {index < teamMembers.length - 1 && (
                                                                <div className="border-b border-szGrey200"></div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-szGrey500">
                                                No team members found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        );
    }

    // Teams list view
    return (
        <div className="flex flex-col h-full">
            <CardContainer
                content={
                    <div className="flex flex-col gap-[20px] h-full">
                        <section className="flex gap-[12px] items-center ">
                            <h3 className="text-h3">Teams</h3>
                            <div className="flex-1">
                                <PopoverMenu
                                    size="small"
                                    items={[
                                        {
                                            label: "Add Team",
                                            icon: <Add />,
                                            onClick: () => handleOpenModal({} as TeamDataType, "add"),
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
                        <section className="flex flex-wrap justify-end sm:justify-between gap-[12px]  items-center w-full ">
                            <div className="flex flex-row flex-1 gap-[12px] w-fit">
                                <div className="w-full max-w-[335px] min-w-[150px] ">
                                    <Inputs
                                        placeholder="Search by Team Name or Employee Name"
                                        icon={SearchNormal}
                                        // TODO: Backend Integration - Add search functionality
                                        // onChange={(value) => handleSearch(value)}
                                    />
                                </div>
                            </div>
                            <div className="flex w-fit">
                                <Tab
                                    type="left"
                                    active={viewType === "card"}
                                    icon={<People />}
                                    isFirst
                                    onClick={() => setViewType("card")}
                                />
                                <Tab type="right" active={viewType === "table"} icon={<Data2 />} onClick={() => setViewType("table")} />
                            </div>
                        </section>
                        <TeamsList
                            teams={transformedTeams}
                            viewType={viewType}
                            onTeamSelect={handleTeamSelect}
                            onTeamSave={(data) => {
                                const message = "Successfully updated team";
                                handleTeamSuccess(message);
                            }}
                        />
                    </div>
                }
            />
            <TeamModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                selectedTeam={selectedTeam}
                onSave={(_data) => {
                    const message = modalMode === "add" ? "Successfully added a new Team" : "Successfully updated team";
                    handleTeamSuccess(message);
                    handleCloseModal();
                }}
            />
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

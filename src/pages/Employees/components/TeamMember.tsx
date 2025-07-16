import { useState, useEffect, useRef } from "react";
import { CardContainer, Chip, PopoverMenu, SnackbarAlert, Tab, TextContent } from "enterprisze-global-components";
import { ArchiveBox, Data2, Edit2, Hierarchy2, People, Tag } from "iconsax-reactjs";
import SpecificTeamCard from "../../Teams/components/SpecificTeamCard";
import SpecificTeamModal, { ModalMode, SpecificTeamDataType } from "../../Teams/components/modals/SpecificTeamModal";
import ConfirmSpecificTeamArchive from "../../Teams/components/modals/ConfirmSpecificTeamArchive";

// Import the team member service
import { useTeamMemberService, type TeamData, type PositionData } from "../../../services/employee-profile/work/team-member";

const TeamMember = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [selectedSpecificTeam, setSelectedSpecificTeam] = useState<SpecificTeamDataType | null>(null);
    const [viewType, setViewType] = useState<"team" | "underlings">("team");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // State for team data
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [teamMembers, setTeamMembers] = useState<PositionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get team member service
    const teamMemberService = useTeamMemberService();
    const hasLoadedRef = useRef(false);

    // Load team data on component mount
    useEffect(() => {
        // Prevent multiple calls
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        const loadTeamData = async () => {
            try {
                setIsLoading(true);
                
                // TODO: Get the current employee's team from context or props
                // For now, we'll use a default team - this should be replaced with actual employee data
                const currentEmployeeTeam = "business solutions and innovation"; // This should come from employee context
                
                // Get team details for the current employee's team
                const teamResponse = await teamMemberService.getTeamDetails({
                    search: currentEmployeeTeam,
                    is_archived: 0,
                    offset: 0,
                    limit: 10
                });

                if (teamResponse.data?.data && Array.isArray(teamResponse.data.data) && teamResponse.data.data.length > 0) {
                    const employeeTeam = teamResponse.data.data.find(
                        (team: TeamData) => team.team_name.toLowerCase().includes(currentEmployeeTeam.toLowerCase())
                    );
                    
                    if (employeeTeam) {
                        setTeamData(employeeTeam);
                        
                        // Get team members for this team
                        const membersResponse = await teamMemberService.getTeamMembers({
                            team_ID: employeeTeam.team_ID,
                            is_archived: 0,
                            offset: 0,
                            limit: 50
                        });

                        if (membersResponse.data?.positions) {
                            setTeamMembers(membersResponse.data.positions);
                        }
                    } else {
                        setError("Employee's team not found");
                    }
                } else {
                    setError("No team data available");
                }
            } catch (err) {
                setError("Failed to load team data");
                console.error("Error loading team data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTeamData();
    }, []); // Remove teamMemberService from dependency array

    const handleOpenModal = (team: SpecificTeamDataType, mode: ModalMode) => {
        setSelectedSpecificTeam(team);
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSpecificTeam(null);
    };

    const handleSpecificTeamSuccess = (message: string) => {
        setSnackbarMessage(message);
        setShowSuccessSnackbar(true);
        setTimeout(() => setShowSuccessSnackbar(false), 3000);
    };

    const handleOpenArchiveModal = () => {
        setIsArchiveModalOpen(true);
    };

    // Loading state
    if (isLoading) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-32">
                        <div className="text-szPrimary700">Loading team data...</div>
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

    // No team data
    if (!teamData) {
        return (
            <CardContainer
                content={
                    <div className="flex items-center justify-center h-32">
                        <div className="text-szPrimary700">No team data found for this employee</div>
                    </div>
                }
            />
        );
    }

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex items-center gap-[8px]">
                            <h5 className="text-h5 text-szPrimary700">{teamData.team_name}</h5>
                            <div className="flex-1">
                                <PopoverMenu
                                    size="small"
                                    items={[
                                        {
                                            label: "Edit Team Info",
                                            icon: <Edit2 />,
                                            onClick: () => handleOpenModal({} as SpecificTeamDataType, "edit"),
                                        },
                                        {
                                            label: "Archive Team",
                                            icon: <ArchiveBox />,
                                            onClick: () => handleOpenArchiveModal(),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <p className="text-body-small-strong text-szDarkGrey600">
                                {teamData.team_description || "No description available"}
                            </p>
                            <div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-[8px]">
                                        <Hierarchy2 />
                                        <div className="flex flex-col lg:flex-row lg:gap-[75px]">
                                            <p className="text-caption-all-caps text-szGrey500">TEAM REFERENCE</p>
                                            <p className="text-body-small-strong">
                                                {teamData.parent_team_ID ? "Parent Team" : "No parent team"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[8px]">
                                        <div className="flex flex-row justify-end gap-[8px]">
                                            <p className="text-caption-all-caps text-szGrey500">TAGS</p>
                                            <Tag className="text-szPrimary700" />
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-[8px]">
                                            {teamData.tags ? (
                                                teamData.tags.split(',').map((tag: string, index: number) => (
                                                    <div key={index} className="relative group">
                                                        <Chip label={tag.trim()} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-szGrey500 text-sm">No tags available</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex w-full justify-center items-center">
                                    {/* center line */}
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-szGrey300 z-0" />

                                    {/* Tab group overlapping the line */}
                                    <div className="flex w-fit z-10">
                                        <Tab
                                            type="left"
                                            active={viewType === "team"}
                                            icon={
                                                <div className="flex flex-row items-center gap-2">
                                                    <People />
                                                    <div className="w-[1px] h-[16px] bg-szGrey300" />
                                                    <p
                                                        className={`text-caption-strong ${
                                                            viewType === "team" ? "text-szSecondary500" : "text-szGrey500"
                                                        }`}
                                                    >
                                                        {teamMembers.length}
                                                    </p>
                                                </div>
                                            }
                                            onClick={() => setViewType("team")}
                                        />
                                        <Tab
                                            type="right"
                                            active={viewType === "underlings"}
                                            icon={
                                                <div className="flex flex-row gap-2">
                                                    <Data2 />
                                                    <div className="w-[1px] h-[16px] bg-szGrey300" />
                                                    <p
                                                        className={`text-caption-strong ${
                                                            viewType === "underlings" ? "text-szSecondary500" : "text-szGrey500"
                                                        }`}
                                                    >
                                                        9
                                                    </p>
                                                </div>
                                            }
                                            onClick={() => setViewType("underlings")}
                                        />
                                    </div>
                                </div>
                                
                                {/* Team Members List */}
                                {teamMembers.length > 0 ? (
                                    teamMembers.map((member) => (
                                        <SpecificTeamCard 
                                            key={member.position_ID}
                                            name={member.position_name || member.employee_name || "Unknown"}
                                            jobTitle={member.job_title || "No title"}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-szGrey500">
                                        No team members found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            />
            <SpecificTeamModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                selectedTeam={selectedSpecificTeam}
                onSave={(data) => {
                    const message = modalMode === "add" ? "Successfully added a new Team" : "Successfully updated team";
                    handleSpecificTeamSuccess(message);
                    handleCloseModal();
                }}
            />

            <ConfirmSpecificTeamArchive
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                onClick={async () => {
                    try {
                        // TODO: Backend Integration - Call archive API
                        setIsArchiveModalOpen(false);
                    } catch (error) {
                        // TODO: Add error handling
                        console.error("Error in confirmation action:", error);
                    }
                    handleSpecificTeamSuccess("Successfully archived team");
                }}
                description="Are you sure to archive this Team?"
                subDescription={`All contents of the ${teamData.team_name} team will be archived. Please ensure all employees are reassigned to new teams to maintain organizational structure.`}
                buttonLabel="Archive Team"
                buttonFooterIcon={<ArchiveBox />}
            />

            <SnackbarAlert
                isOpen={showSuccessSnackbar}
                onClose={() => setShowSuccessSnackbar(false)}
                showCloseButton={true}
                type="success"
                title={snackbarMessage}
                animation="slide-up"
            />
        </>
    );
};

export default TeamMember;

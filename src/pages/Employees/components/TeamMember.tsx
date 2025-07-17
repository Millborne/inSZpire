import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CardContainer, Chip, PopoverMenu, SnackbarAlert, Tab, TextContent, Avatar } from "enterprisze-global-components";
import { ArchiveBox, Data2, Edit2, Hierarchy2, People, Tag, Information } from "iconsax-reactjs";
import SpecificTeamCard from "../../Teams/components/SpecificTeamCard";
import SpecificTeamModal, { ModalMode, SpecificTeamDataType } from "../../Teams/components/modals/SpecificTeamModal";
import ConfirmSpecificTeamArchive from "../../Teams/components/modals/ConfirmSpecificTeamArchive";

// Import the team member service
import { useTeamMemberService, type TeamData, type PositionData } from "../../../services/employee-profile/work/team-member";
// Import the employee service to get employee data
import { useEmployeeService, type EmployeeData } from "../../../services/employee/list/use-employee";

const TeamMember = () => {
    const { id: employeeId } = useParams(); // Get employee ID from URL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [selectedSpecificTeam, setSelectedSpecificTeam] = useState<SpecificTeamDataType | null>(null);
    const [viewType, setViewType] = useState<"team" | "underlings">("team");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // State for employee and team data
    const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [teamMembers, setTeamMembers] = useState<PositionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get services
    const teamMemberService = useTeamMemberService();
    const employeeService = useEmployeeService();
    const hasLoadedRef = useRef(false);

    // Load team data directly using teams endpoint
    useEffect(() => {
        // Reset the ref when employeeId changes
        hasLoadedRef.current = false;
        
        // Prevent multiple calls
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        const loadTeamData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                console.log("Loading team data for employee ID:", employeeId);
                
                // Use the teams endpoint directly to get team data
                // For now, we'll use a search term that matches your working endpoint
                const teamResponse = await teamMemberService.getTeamDetails({
                    search: "business solutions and innovation", // Search for the team name
                    is_archived: 0,
                    offset: 0,
                    limit: 10
                });

                console.log("Team response:", teamResponse);

                if (teamResponse.data?.success && teamResponse.data?.data && Array.isArray(teamResponse.data.data) && teamResponse.data.data.length > 0) {
                    const team = teamResponse.data.data[0]; // Get the first team from the response
                    setTeamData(team);
                    
                    console.log("Team found:", team.team_name);
                    
                    // Get team members for this team
                    const membersResponse = await teamMemberService.getTeamMembers({
                        team_ID: team.team_ID,
                        is_archived: 0,
                        offset: 0,
                        limit: 50
                    });

                    console.log("Members response:", membersResponse);

                    if (membersResponse.data?.positions) {
                        setTeamMembers(membersResponse.data.positions);
                    } else if (membersResponse.data?.data) {
                        setTeamMembers(membersResponse.data.data);
                    } else {
                        console.log("No team members found in response:", membersResponse);
                        setTeamMembers([]);
                    }
                } else {
                    // If no team found, create a mock team for demonstration
                    const mockTeam: TeamData = {
                        team_ID: "mock-team-id",
                        node_reference: 1,
                        team_code: "bsi",
                        team_name: "Business Solutions and Innovation",
                        team_description: "The Business Solutions and Innovations team is dedicated to developing cutting-edge system applications and enhancing operational efficiency. Our talented developers work collaboratively to create user-friendly software solutions that drive continuous improvement and empower teams across the organization.",
                        team_logo: null,
                        acc_ID: null,
                        parent_team_ID: null,
                        node: "1.4",
                        is_archived: 0,
                        created_by: "mock-created-by",
                        updated_by: "mock-updated-by",
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        tags: "Tag 1,Tag 2,Tag 3"
                    };
                    setTeamData(mockTeam);
                    
                    // Create mock team members
                    const mockMembers: PositionData[] = [
                        {
                            position_ID: "pos-1",
                            node_reference: 1,
                            position_code: "web-dev-1",
                            position_name: "Web Developer",
                            team_ID: "mock-team-id",
                            site_ID: null,
                            job_ID: "job-1",
                            reports_to_position_ID: null,
                            reports_to_node: null,
                            team_level: "1",
                            position_type_ID: "type-1",
                            work_setup_ID: "setup-1",
                            basic_salary: 50000,
                            is_approved: 1,
                            is_archived: 0,
                            created_by: "mock-created-by",
                            updated_by: "mock-updated-by",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            employee_name: "Simene, John Daryl B.",
                            job_title: "Web Dev"
                        },
                        {
                            position_ID: "pos-2",
                            node_reference: 2,
                            position_code: "web-dev-2",
                            position_name: "Web Developer",
                            team_ID: "mock-team-id",
                            site_ID: null,
                            job_ID: "job-2",
                            reports_to_position_ID: null,
                            reports_to_node: null,
                            team_level: "1",
                            position_type_ID: "type-1",
                            work_setup_ID: "setup-1",
                            basic_salary: 50000,
                            is_approved: 1,
                            is_archived: 0,
                            created_by: "mock-created-by",
                            updated_by: "mock-updated-by",
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            employee_name: "Simene, John Daryl B.",
                            job_title: "Web Dev"
                        }
                    ];
                    setTeamMembers(mockMembers);
                }
            } catch (err) {
                setError("Failed to load team data");
                console.error("Error loading team data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTeamData();
    }, [employeeId]); // Add employeeId to dependency array

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

    // Get team reference name (parent team or "Office of the President and COO")
    const getTeamReference = () => {
        if (teamData.parent_team_ID) {
            // TODO: Fetch parent team name from API
            return "Parent Team";
        }
        return "Office of the President and COO";
    };

    // Get team member count
    const teamMemberCount = teamMembers.length;
    const underlingsCount = 9; // TODO: Calculate from hierarchy

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[20px]">
                        {/* Team Header */}
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

                        {/* Team Description */}
                        <div className="flex flex-col gap-[20px]">
                            <p className="text-body-small-strong text-szDarkGrey600">
                                {teamData.team_description || "The Business Solutions and Innovations team is dedicated to developing cutting-edge system applications and enhancing operational efficiency. Our talented developers work collaboratively to create user-friendly software solutions that drive continuous improvement and empower teams across the organization."}
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
                                            {teamData.tags ? (
                                                teamData.tags.split(',').map((tag: string, index: number) => (
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
                                                        {teamMemberCount}
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
                                                        {underlingsCount}
                                                    </p>
                                                </div>
                                            }
                                            onClick={() => setViewType("underlings")}
                                        />
                                    </div>
                                </div>
                                
                                {/* Team Members List */}
                                <div className="mt-6">
                                    <h6 className="text-h6 text-szPrimary700 mb-4">These are user's teammates</h6>
                                    {viewType === "team" && teamMembers.length > 0 ? (
                                        <div className="space-y-2">
                                            {teamMembers.map((member) => (
                                                <div key={member.position_ID} className="flex items-center gap-3 p-3 bg-szSecondary50 rounded-lg">
                                                    <Avatar size="small" src="/src/assets/noAvatar.png" />
                                                    <div className="flex flex-col">
                                                        <p className="text-body-small-strong text-szBlack800">
                                                            {member.employee_name || member.position_name || "Unknown"}
                                                        </p>
                                                        <p className="text-caption-reg text-szDarkGrey600">
                                                            {member.job_title || "No title"}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : viewType === "underlings" ? (
                                        <div className="text-center py-8 text-szGrey500">
                                            Underlings view - TODO: Implement hierarchy view
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

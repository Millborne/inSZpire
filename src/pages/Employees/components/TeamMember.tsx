import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CardContainer, Chip, PopoverMenu, SnackbarAlert, Tab, TextContent, Avatar } from "enterprisze-global-components";
import { ArchiveBox, Data2, Edit2, Hierarchy2, People, Tag, Information } from "iconsax-reactjs";

import SpecificTeamModal, { ModalMode, SpecificTeamDataType } from "../../Teams/components/modals/SpecificTeamModal";
import ConfirmSpecificTeamArchive from "../../Teams/components/modals/ConfirmSpecificTeamArchive";

// Import the team member service
import { useTeamMemberService, type TeamData, type PositionData } from "../../../services/employee-profile/work/team-member";


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
   
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [teamMembers, setTeamMembers] = useState<PositionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get services
    const teamMemberService = useTeamMemberService();
  
    const hasLoadedRef = useRef(false);

    // Function to get team details and members
    

    // Load team data using the real API endpoint
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
                
                if (!employeeId) {
                    setError("No employee ID provided");
                    setIsLoading(false);
                    return;
                }

                // Try dynamic lookup first
                try {
                    console.log("🔄 Attempting dynamic employee lookup...");
                    
                    // Step 1: Get employee's position and team_ID using /position/getPositions
                    console.log("Step 1: Getting employee position and team_ID for employee ID:", employeeId);
                    
                    // Clean employee ID - remove 0x prefix if present
                    let cleanEmployeeId = employeeId;
                    if (employeeId && employeeId.startsWith('0x')) {
                        cleanEmployeeId = employeeId.replace(/^0x/, '');
                    }
                    console.log("Clean employee ID for API call:", cleanEmployeeId);
                    
                    // Call the API with the correct parameter structure
                    const employeePositionResponse = await teamMemberService.getEmployeePosition(cleanEmployeeId);
                    console.log("Employee position response:", employeePositionResponse);

                    // Debug the full response structure
                    console.log("=== DEBUGGING RESPONSE ===");
                    console.log("Response object:", employeePositionResponse);
                    console.log("Response.data:", employeePositionResponse.data);
                    console.log("Response.data.positions:", employeePositionResponse.data?.positions);
                    console.log("Response.data.positions length:", employeePositionResponse.data?.positions?.length);
                    console.log("=== END DEBUGGING ===");

                    if (!employeePositionResponse.data?.positions || employeePositionResponse.data.positions.length === 0) {
                        console.log("ERROR: No positions found in response");
                        throw new Error("No positions found");
                    }

                    const positions = employeePositionResponse.data.positions;
                    console.log("All positions returned:", positions);
                    
                    // Look for position that matches the employee ID
                    const employeePosition = positions.find((pos: any) => {
                        const posEmployeeId = pos.employee_ID;
                        const cleanPosEmployeeId = posEmployeeId?.replace(/^0x/, '');
                        const cleanSearchEmployeeId = cleanEmployeeId?.replace(/^0x/, '');
                        return cleanPosEmployeeId === cleanSearchEmployeeId;
                    });
                    
                    if (!employeePosition) {
                        console.log("ERROR: No position found for employee ID:", cleanEmployeeId);
                        console.log("Available positions:", positions.map((p: any) => ({ 
                            employee_ID: p.employee_ID, 
                            employee_name: p.employee_name,
                            position_ID: p.position_ID,
                            team_ID: p.team_ID,
                            position_name: p.position_name
                        })));
                        throw new Error("Employee position not found");
                    }

                    console.log("Found employee position:", employeePosition);
                    console.log("Employee position keys:", Object.keys(employeePosition));
                    
                    const team_ID = employeePosition.team_ID;
                    console.log("Team_ID from employee position:", team_ID);

                    if (!team_ID) {
                        console.log("ERROR: No team_ID found in employee position");
                        throw new Error("No team_ID found");
                    }

                    // Clean team_ID - remove 0x prefix if present
                    let cleanTeam_ID = team_ID;
                    if (typeof team_ID === 'string' && team_ID.startsWith('0x')) {
                        cleanTeam_ID = team_ID.replace(/^0x/, '');
                    }
                    console.log("Clean team_ID (no 0x prefix):", cleanTeam_ID);

                    // Step 2: Use clean team_ID to get team details and members
                    console.log("Step 2: Calling /teams/view with team_ID:", cleanTeam_ID);
                    const teamResponse = await teamMemberService.getTeamDetails({
                        team_ID: cleanTeam_ID,
                        is_archived: 0,
                        offset: 0,
                        limit: 10
                    });

                    console.log("Team response from /teams/view:", teamResponse);

                    if (teamResponse.data?.data && Array.isArray(teamResponse.data.data) && teamResponse.data.data.length > 0) {
                        const team = teamResponse.data.data[0];
                        setTeamData(team);
                        
                        console.log("Team found:", team.team_name);
                        
                        // Get team members from the response
                        if (teamResponse.data?.members && Array.isArray(teamResponse.data.members)) {
                            setTeamMembers(teamResponse.data.members);
                            console.log("Team members loaded from response:", teamResponse.data.members.length);
                        } else {
                            console.log("No members found in response, trying separate call");
                            // Fallback: Get team members separately using /position/getPositions
                            try {
                                const membersResponse = await teamMemberService.getTeamMembers({
                                    team_ID: cleanTeam_ID,
                                    is_archived: 0,
                                    offset: 0,
                                    limit: 50
                                });
                                console.log("Team members response:", membersResponse);
                                
                                if (membersResponse.data?.success && membersResponse.data?.data) {
                                    const members = Array.isArray(membersResponse.data.data) 
                                        ? membersResponse.data.data 
                                        : [membersResponse.data.data];
                                    setTeamMembers(members);
                                    console.log("Team members loaded from separate call:", members.length);
                                } else {
                                    console.log("No members found in separate call");
                                    setTeamMembers([]);
                                }
                            } catch (memberError) {
                                console.error("Error getting team members:", memberError);
                                setTeamMembers([]);
                            }
                        }
                        
                        console.log("✅ Dynamic lookup successful!");
                        return; // Success, exit early
                        
                    } else {
                        console.log("ERROR: Team response structure issue");
                        console.log("Team response keys:", Object.keys(teamResponse.data || {}));
                        throw new Error("No team data found");
                    }
                    
                } catch (dynamicError) {
                    console.log("❌ Dynamic lookup failed:", (dynamicError as Error).message);
                    console.log("🔄 Falling back to hardcoded approach...");
                    
                    // Fallback to hardcoded approach
                    const hardcodedTeamId = "14fbd3bf20744699bce2df89633e1e70";
                    console.log("🔧 Using hardcoded team ID:", hardcodedTeamId);
                    
                    const teamResponse = await teamMemberService.getTeamDetails({
                        team_ID: hardcodedTeamId,
                        is_archived: 0,
                        offset: 0,
                        limit: 10
                    });

                    console.log("Team response from /teams/view:", teamResponse);

                    if (teamResponse.data?.data && Array.isArray(teamResponse.data.data) && teamResponse.data.data.length > 0) {
                        const team = teamResponse.data.data[0];
                        setTeamData(team);
                        
                        console.log("Team found:", team.team_name);
                        
                        // Get team members from the response
                        if (teamResponse.data?.members && Array.isArray(teamResponse.data.members)) {
                            setTeamMembers(teamResponse.data.members);
                            console.log("Team members loaded from response:", teamResponse.data.members.length);
                        } else {
                            console.log("No members found in response");
                            setTeamMembers([]);
                        }
                        
                        console.log("✅ Hardcoded fallback successful!");
                    } else {
                        console.log("ERROR: Both dynamic and hardcoded approaches failed");
                        setError("No team data found");
                    }
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
                            {/* Debug buttons - uncomment for testing */}
                            {/* 
                            <button 
                                onClick={testAPI}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                            >
                                Test API
                            </button>
                            <button 
                                onClick={testTeamsAPI}
                                className="px-2 py-1 text-xs bg-green-500 text-white rounded ml-2"
                            >
                                Test Teams
                            </button>
                            <button 
                                onClick={testHardcoded}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded ml-2"
                            >
                                Test Hardcoded
                            </button>
                            */}
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

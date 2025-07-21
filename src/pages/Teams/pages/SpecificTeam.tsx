import { useState } from "react";
import { CardContainer, Chip, PopoverMenu, SnackbarAlert, Tab, TextContent, Avatar } from "enterprisze-global-components";
import { ArchiveBox, ArrowLeft, Data2, Edit2, Hierarchy2, People, Tag, Information } from "iconsax-reactjs";
import SpecificTeamModal, { ModalMode, SpecificTeamDataType } from "../components/modals/SpecificTeamModal";
import ConfirmSpecificTeamArchive from "../components/modals/ConfirmSpecificTeamArchive";
import { useNavigate } from "react-router-dom";

// Hardcoded team data to match the design exactly
const teamData = {
    team_name: "Business Solutions and Innovation",
    team_description: "The Business Solutions and Innovations team is dedicated to developing cutting-edge system applications and enhancing operational efficiency. Our talented developers work collaboratively to create user-friendly software solutions that drive continuous improvement and empower teams across the organization.",
    team_reference: "Office of the President and COO",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    team_member_count: 15,
    underlings_count: 9
};

const SpecificTeamData = [
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP001"
    },
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP002"
    },
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP003"
    },
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP004"
    },
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP005"
    },
    {
        name: "Simene, John Daryl B.",
        jobTitle: "Web Dev",
        employee_number: "EMP006"
    }
];

const SpecificTeam = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [selectedSpecificTeam, setSelectedSpecificTeam] = useState<SpecificTeamDataType | null>(null);
    const [viewType, setViewType] = useState<"team" | "underlings">("team");
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[20px]">
                        {/* Team Header */}
                        <div className="flex items-center gap-[8px]">
                            <ArrowLeft className="text-szPrimary700 cursor-pointer" onClick={() => navigate("/home/teams")} />
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
                                {teamData.team_description}
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
                                                {teamData.team_reference}
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
                                            {teamData.tags.map((tag, index) => (
                                                <div key={index} className="relative group">
                                                    <Chip label={tag} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Team Member Counts */}
                                <div className="flex gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <People className="text-szPrimary700" />
                                        <span className="text-body-small-strong">{teamData.team_member_count}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Data2 className="text-szPrimary700" />
                                        <span className="text-body-small-strong">{teamData.underlings_count}</span>
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
                                                        {teamData.team_member_count}
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
                                                        {teamData.underlings_count}
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
                                    {viewType === "team" && SpecificTeamData.length > 0 ? (
                                        <div className="space-y-2">
                                            {SpecificTeamData.map((member, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 bg-szSecondary50 rounded-lg">
                                                    <Avatar size="small" src="/src/assets/noAvatar.png" />
                                                    <div className="flex flex-col">
                                                        <p className="text-body-small-strong text-szBlack800">
                                                            {member.name}
                                                        </p>
                                                        <p className="text-caption-reg text-szDarkGrey600">
                                                            {member.jobTitle}
                                                        </p>
                                                        {member.employee_number && (
                                                            <p className="text-caption-reg text-szGrey500">
                                                                #{member.employee_number}
                                                            </p>
                                                        )}
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
                        // TODO: Backend Integration - Call add API
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

export default SpecificTeam;

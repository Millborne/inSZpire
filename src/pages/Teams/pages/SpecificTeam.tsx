import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  CardContainer,
  Chip,
  PopoverMenu,
  SnackbarAlert,
  Tab,
  TextContent,
} from "enterprisze-global-components";
import {
  ArchiveBox,
  ArrowLeft,
  Data2,
  Edit2,
  Hierarchy2,
  People,
  Tag,
} from "iconsax-reactjs";
import SpecificTeamCard from "../components/SpecificTeamCard";
import SpecificTeamModal, {
  ModalMode,
  SpecificTeamDataType,
} from "../components/modals/SpecificTeamModal";
import ConfirmSpecificTeamArchive from "../components/modals/ConfirmSpecificTeamArchive";
import { useActionTeamsMutation } from "../../../services/teams/list/teamsAPI";

const SpecificTeam = () => {
  const navigate = useNavigate();
  const { team_ID } = useParams();
  const location = useLocation();
  const passedTeam = location.state?.team;

  const [fetchTeam] = useActionTeamsMutation();
  const [teamData, setTeamData] = useState<SpecificTeamDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [viewType, setViewType] = useState<"team" | "underlings">("team");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 🔄 Centralized function to load team data
  const loadTeamData = async () => {
    if (!team_ID) return;
    try {
      const res = await fetchTeam({
        queryParameters: "/view",
        method: "POST",
        body: { team_ID },
      }).unwrap();

      // ✅ Always match correct team_ID from the result
      const updatedTeam = res.data.find((t: any) => t.team_ID === team_ID);
      if (updatedTeam) {
        setTeamData(updatedTeam);
      } else {
        console.warn("⚠️ Team not found in refreshed data");
      }
    } catch (err) {
      console.error("❌ Failed to load team:", err);
    }
  };

  // 🔹 Load on mount
  useEffect(() => {
    if (team_ID) {
      loadTeamData();
    } else if (passedTeam) {
      setTeamData(passedTeam);
    }
  }, [team_ID, passedTeam]);

  const handleOpenModal = (mode: ModalMode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSpecificTeamSuccess = (message: string) => {
    setSnackbarMessage(message);
    setShowSuccessSnackbar(true);
    setTimeout(() => setShowSuccessSnackbar(false), 3000);
  };

  const handleOpenArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const members = teamData?.employees || [];

  return (
    <>
      <CardContainer
        content={
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col lg:flex-row items-start gap-[8px]">
              <ArrowLeft
                className="text-szPrimary700 cursor-pointer"
                onClick={() => navigate("/home/teams")}
              />
              <h5 className="text-h5 text-szPrimary700">
                {teamData?.team_name || "Loading..."}
              </h5>
              <div className="flex-1">
                <PopoverMenu
                  size="small"
                  items={[
                    {
                      label: "Edit Team Info",
                      icon: <Edit2 />,
                      onClick: () => handleOpenModal("edit"),
                    },
                    {
                      label: "Archive Team",
                      icon: <ArchiveBox />,
                      onClick: handleOpenArchiveModal,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <p className="text-body-small-strong text-szDarkGrey600">
                {teamData?.team_description || "No description available."}
              </p>
              <div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex flex-row gap-[8px]">
                    <Hierarchy2 />
                    <div className="flex flex-col lg:flex-row lg:gap-[75px]">
                      <p className="text-caption-all-caps text-szGrey500">
                        TEAM REFERENCE
                      </p>
                      <p className="text-body-small-strong">
                        {teamData?.team_reference_name || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <div className="flex flex-row gap-[8px] w-full justify-end">
                      <p className="text-caption-all-caps text-szGrey500">TAGS</p>
                      <Tag className="text-szPrimary700" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-[8px]">
                      {(teamData?.tags || []).map((tag, index) => (
                        <div key={index} className="relative group">
                          <Chip label={tag.tag_name} />
                          <div className="absolute z-50 hidden group-hover:block top-full mt-2 w-[220px] bg-[#EBEFFF] rounded-lg shadow-md p-3 text-sm text-gray-700">
                            <TextContent header="Tag Name" text={tag.tag_name} />
                            <TextContent
                              header="Tag Description"
                              text={tag.description || "No description."}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full justify-center items-center">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-szGrey300 z-0" />
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
                              viewType === "team"
                                ? "text-szSecondary500"
                                : "text-szGrey500"
                            }`}
                          >
                            {members.length}
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
                              viewType === "underlings"
                                ? "text-szSecondary500"
                                : "text-szGrey500"
                            }`}
                          >
                            {teamData?.underlings?.length || 0}
                          </p>
                        </div>
                      }
                      onClick={() => setViewType("underlings")}
                    />
                  </div>
                </div>

                {members.length > 0 ? (
                  members.map((m: any) => (
                    <SpecificTeamCard
                      key={m.team_ID}
                      name={m.name}
                      jobTitle={m.jobTitle}
                    />
                  ))
                ) : (
                  <p>No members available</p>
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
        selectedTeam={teamData}
        onSave={async (updatedTeam) => {
          // 🔄 Re-fetch correct team from backend
          const res = await fetchTeam({
            queryParameters: "/view",
            method: "POST",
            body: { team_ID: updatedTeam?.team_ID },
          }).unwrap();

          const refreshedTeam = res.data.find(
            (t: any) => t.team_ID === updatedTeam?.team_ID
          );
          if (refreshedTeam) {
            setTeamData(refreshedTeam); // ✅ Set correct updated team
            handleSpecificTeamSuccess("Successfully updated team");
          }
        }}
      />

      <ConfirmSpecificTeamArchive
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onClick={async () => {
          try {
            setIsArchiveModalOpen(false);
          } catch (error) {
            console.error("Error in confirmation action:", error);
          }
          handleSpecificTeamSuccess("Successfully archived team");
        }}
        description="Are you sure to archive this Team?"
        subDescription="All contents of the Business Solutions and Innovation team will be archived."
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





import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const SpecificTeamData = [
  {
    name: "Stephanie Germanotta",
    jobTitle: "Web Dev",
    // teamReference: "Office of the President and COO",
    // tags: ["Tag1", "Tag2", "Tag3"],
    // teamMembers: [
    // ]
  },
  {
    name: "Daryl Simene",
    jobTitle: "UX Designer",
  },
  {
    name: "John Doe",
    jobTitle: "Web Developer",
  },
];

const SpecificTeam = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedSpecificTeam, setSelectedSpecificTeam] =
    useState<SpecificTeamDataType | null>(null);
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
            <div className="flex items-center gap-[8px]">
              <ArrowLeft
                className="text-szPrimary700 cursor-pointer"
                onClick={() => navigate("/home/teams")}
              />
              <h5 className="text-h5 text-szPrimary700">
                Business Solutions and Innovation
              </h5>
              <div className="flex-1">
                <PopoverMenu
                  size="small"
                  items={[
                    {
                      label: "Edit Team Info",
                      icon: <Edit2 />,
                      onClick: () =>
                        handleOpenModal({} as SpecificTeamDataType, "edit"),
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
                The Business Solutions and Innovations team is dedicated to
                developing cutting-edge system applications that enhance
                operational efficiency across the company. Comprising talented
                developers, this team ensures that all software solutions are
                user-friendly and tailored to meet the diverse needs of our
                employees. Their commitment to innovation drives continuous
                improvement, empowering teams to achieve their goals
                effectively.
              </p>
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-[8px]">
                    <Hierarchy2 />
                    <div className="flex flex-col lg:flex-row lg:gap-[75px]">
                      <p className="text-caption-all-caps text-szGrey500">
                        TEAM REFERENCE
                      </p>
                      <p className="text-body-small-strong">
                        Office of the President and COO
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-row justify-end gap-[8px]">
                      <p className="text-caption-all-caps text-szGrey500">
                        TAGS
                      </p>
                      <Tag className="text-szPrimary700" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-[8px]">
                      {[
                        {
                          label: "Tag1",
                          description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        },
                        {
                          label: "Tag2",
                          description:
                            "Sed do eiusmod tempor incididunt ut labore.",
                        },
                        {
                          label: "Tag 3",
                          description:
                            "Ut enim ad minim veniam, quis nostrud exercitation.",
                        },
                      ].map((tag, index) => (
                        <div key={index} className="relative group">
                          {/* Chip base */}
                          <Chip label={tag.label} />

                          {/* Tooltip on hover */}
                          <div className="absolute z-50 hidden group-hover:block top-full mt-2 w-[220px] bg-[#EBEFFF] rounded-lg shadow-md p-3 text-sm text-gray-700">
                            <TextContent header="Tag Name" text={tag.label} />
                            <TextContent
                              header="Tag Description"
                              text={tag.description}
                            />
                          </div>
                        </div>
                      ))}
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
                              viewType === "team"
                                ? "text-szSecondary500"
                                : "text-szGrey500"
                            }`}
                          >
                            15
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
                            9
                          </p>
                        </div>
                      }
                      onClick={() => setViewType("underlings")}
                    />
                  </div>
                </div>
                {SpecificTeamData.map((data) => (
                  <SpecificTeamCard name={data.name} jobTitle={data.jobTitle} />
                ))}
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
          const message =
            modalMode === "add"
              ? "Successfully added a new Team"
              : "Successfully updated team";
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
        subDescription="All contents of the Business Solutions and Innovation team will be archived. Please ensure all employees are reassigned to new teams to maintain organizational structure."
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

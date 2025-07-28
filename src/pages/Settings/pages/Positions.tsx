import { useContext, useState, useEffect } from "react";
import {
  CardContainer,
  Inputs,
  PopoverMenu,
  Table,
  HeaderType,
  Pagination,
  SnackbarAlert,
} from "enterprisze-global-components";

//icons
import {
  Add,
  ArchiveBox,
  ArrowLeft,
  Edit2,
  HamburgerMenu,
  RotateLeft,
  SearchNormal,
} from "iconsax-reactjs";

// assets
import archiveConfirmation from "../../../assets/archive_confirmation.png";

// components
import PositionModal, {
  PositionDataType,
  ModalMode,
} from "../components/modals/PositionModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

// services
import {
  usePositionService,
  type PositionData,
} from "../../../services/settings/positions/list";
import { useTeamService, type TeamData } from "../../../services/teams/list";
import {
  useJobTitleService,
  type JobTitleData,
} from "../../../services/settings/job-title/list";

import { SidebarContext } from "../index";
import { useNavigate } from "react-router-dom";
import { capitalizeFirst, sanitizeUUID } from "../../../utils";

//! for page mode
type PositionPageMode = "all-positions" | "archived";

interface PositionPageProps {
  mode: PositionPageMode;
}

//! table headers
const getHeaders = (mode: PositionPageMode): HeaderType[] => {
  const baseHeaders: HeaderType[] = [
    { type: "string", header: "Position", accessor: "position" },
    { type: "string", header: "Team", accessor: "team" },
    { type: "string", header: "Job Title", accessor: "jobTitle" },
    { type: "more", header: <></>, accessor: "more" },
  ];

  if (mode === "archived") {
    return [
      { type: "checkbox", header: <></>, accessor: "checkbox" },
      ...baseHeaders,
    ];
  }

  return baseHeaders;
};

const Position: React.FC<PositionPageProps> = ({ mode }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const positionService = usePositionService();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosition, setSelectedPosition] =
    useState<PositionDataType | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] =
    useState(false);
  const [positionToArchive, setPositionToArchive] =
    useState<PositionDataType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [positions, setPositions] = useState<PositionData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  // Related data for display
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitleData[]>([]);
  const [isLoadingRelatedData, setIsLoadingRelatedData] = useState(false);

  //! Get headers based on mode
  const headers = getHeaders(mode);

  // Helper function to get display names from IDs
  const getTeamName = (teamId: string): string => {
    const team = teams.find((t) => t.team_ID === teamId);
    return team?.team_name || teamId;
  };

  const getJobTitleName = (jobId: string): string => {
    const jobTitle = jobTitles.find((j) => j.job_ID === jobId);
    return jobTitle?.job_title || jobId;
  };

  // Transform API data to table format with proper display names
  const transformPositionsToTableData = (
    positions: PositionData[]
  ): PositionDataType[] => {
    return positions.map((position) => ({
      id: position.position_ID || "",
      position: capitalizeFirst(position.position_name),
      team: capitalizeFirst(position.team_name) || "",
      jobTitle: position.job_title|| "",
      positionCode: position.position_code,
      basicSalary:
        typeof position.basic_salary === "string"
          ? parseFloat(position.basic_salary) || 0
          : position.basic_salary || 0,
      isArchived: position.is_archived || 0,
      // Keep original IDs for API operations
      team_ID: position.team_name || "",
      // job_ID: position.team_code || "",
      site_ID: position.site_ID || "",
      position_status_name: position.position_status_name,
      position_type_ID: position.position_type || undefined,
      work_setup_ID: position.work_setup || undefined,
      reports_to_position: position.reports_to_position,
      is_approved: position.is_approved,
      tag_IDs: position.tags
        ? position.tags.split(",").map((tag) => tag.trim())
        : undefined,
      reports_to_position_ID: position.reports_to_position_ID || "",
      team_level: position.team_level || "",
      updated_at: position.updated_at || "",
      created_at: position.created_at || "",
    }));
  };

  // Transform positions for table display
  const tableData = transformPositionsToTableData(positions).map(
    (row, index) => ({
      ...row,
      position: (
        <span
          onClick={() => {
            if (mode === "all-positions") handleRowClick(index);
          }}
        >
          {row.position}
        </span>
      ),
      team: (
        <span
          onClick={() => {
            if (mode === "all-positions") handleRowClick(index);
          }}
        >
          {row.team}
        </span>
      ),
      jobTitle: (
        <span
          onClick={() => {
            if (mode === "all-positions") handleRowClick(index);
          }}
        >
          {row.jobTitle}
        </span>
      ),
    })
  );

  // Transform positions for modal (keeping original string values)
  const modalData = transformPositionsToTableData(positions);

  // // Fetch related data (teams and job titles) for display
  // const fetchRelatedData = async () => {
  //     setIsLoadingRelatedData(true);
  //     try {
  //         // Fetch teams
  //         const teamsResult = await teamService.viewTeams({
  //             is_archived: 0,
  //             limit: 100,
  //         });
  //         if (teamsResult.data?.data) {
  //             setTeams(teamsResult.data.data);
  //         }

  //         // Fetch job titles
  //         const jobTitlesResult = await jobTitleService.listJobTitles({
  //             is_archived: 0,
  //             page: 1,
  //             limit: 100,
  //         });
  //         if (jobTitlesResult.data?.data) {
  //             setJobTitles(jobTitlesResult.data.data);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching related data:", error);
  //     } finally {
  //         setIsLoadingRelatedData(false);
  //     }
  // };

  // // Fetch related data on component mount
  // useEffect(() => {
  //     fetchRelatedData();
  // }, []);

  // Fetch positions on component mount and when mode changes
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const filters = {
          search: searchTerm,
          is_archived: mode === "archived" ? 1 : 0,
          offset: (currentPage - 1) * 10,
          limit: 10,
        };

        const result = await positionService.viewPositions(filters);
        if (result.data?.positions) {
          setPositions(result.data.positions);
          setTotalCount(result.data.total);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, [mode, currentPage, searchTerm]);

  const handlePageChange = (page: number, _meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (
    position: PositionDataType,
    modalMode: ModalMode
  ) => {
    setSelectedPosition({
      ...position,
      is_archived: mode === "archived" ? 1 : 0,
    });
    setModalMode(modalMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const handleRowClick = (index: number) => {
    const position = modalData[index];
    setSelectedPosition(position);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleSavePosition = async (data: PositionDataType) => {
    try {
      if (modalMode === "add") {
        // Validate required fields according to API documentation
        if (!data.positionCode?.trim()) {
          setSnackbarMessage("Position code is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.position?.trim()) {
          setSnackbarMessage("Position name is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.team?.trim()) {
          setSnackbarMessage("Team is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.jobTitle?.trim()) {
          setSnackbarMessage("Job title is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.position_type_ID?.trim()) {
          setSnackbarMessage("Position type is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.work_setup_ID?.trim()) {
          setSnackbarMessage("Work setup is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.basicSalary || data.basicSalary <= 0) {
          setSnackbarMessage("Basic salary must be greater than 0");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        const positionData = {
          // Required fields according to API documentation
          position_code: data.positionCode?.trim() || "",
          position_name: data.position?.trim() || "",
          team_ID: sanitizeUUID(data.team_ID || data.team) || "",
          job_ID: sanitizeUUID(data.job_ID || data.jobTitle) || "",
          position_type_ID: sanitizeUUID(data.position_type_ID) || "",
          work_setup_ID: sanitizeUUID(data.work_setup_ID) || "",
          basic_salary: data.basicSalary || 0,
          created_by: sanitizeUUID("123e4567e89b12d3a456426614174000"),
          site_ID: data.site_ID ? sanitizeUUID(data.site_ID) : undefined,

          // Optional fields
          reports_to_position_ID: data.reports_to_position_ID
            ? sanitizeUUID(data.reports_to_position_ID)
            : undefined,
          team_level: data.team_level?.toString() || "0",
          tag_IDs:
            data.tag_IDs && data.tag_IDs.length > 0
              ? data.tag_IDs.map((tag) => sanitizeUUID(tag))
              : undefined,
        };

        console.log("Creating position with data:", positionData);

        let result = await positionService.createPosition(positionData);

        if (result.data?.success) {
          console.log("Position created successfully:", result.data);
          setSnackbarMessage(
            result.data?.message || "Position created successfully"
          );
          setSnackbarType("success");
          setIsSnackbarOpen(true);
          setIsModalOpen(false);
        } else {
          // Handle different error response formats from API
          let errorMessage = "An error occurred while creating the position";

          if (result.error) {
            if ("data" in result.error && result.error.data) {
              const errorData = result.error.data as any;
              if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.errors && Array.isArray(errorData.errors)) {
                errorMessage = errorData.errors
                  .map((err: any) => `${err.field}: ${err.message}`)
                  .join(", ");
              }
            } else if ((result.error as any)?.message) {
              errorMessage = (result.error as any).message;
            }
          }

          setSnackbarMessage(errorMessage);
          setSnackbarType("error");
          setIsSnackbarOpen(true);
        }
      } else if (modalMode === "edit" && selectedPosition?.id) {
        // Validate required fields for edit mode
        if (!data.positionCode?.trim()) {
          setSnackbarMessage("Position code is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.position?.trim()) {
          setSnackbarMessage("Position name is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.team?.trim()) {
          setSnackbarMessage("Team is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.jobTitle?.trim()) {
          setSnackbarMessage("Job title is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.position_type_ID?.trim()) {
          setSnackbarMessage("Position type is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.work_setup_ID?.trim()) {
          setSnackbarMessage("Work setup is required");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        if (!data.basicSalary || data.basicSalary <= 0) {
          setSnackbarMessage("Basic salary must be greater than 0");
          setSnackbarType("error");
          setIsSnackbarOpen(true);
          return;
        }

        // const positionData = {
        //     // Required fields according to API documentation
        //     position_code: data.positionCode?.trim() || "",
        //     position_name: data.position?.trim() || "",
        //     team_ID: sanitizeUUID(data.team_ID || data.team) || "",
        //     job_ID: sanitizeUUID(data.job_ID || data.jobTitle) || "",
        //     position_type_ID: sanitizeUUID(data.position_type_ID) || "",
        //     work_setup_ID: sanitizeUUID(data.work_setup_ID) || "",
        //     basic_salary: data.basicSalary || 0,
        //     created_by: sanitizeUUID(
        //         "123e4567e89b12d3a456426614174000"
        //     ),
        //     site_ID: data.site_ID
        //         ? sanitizeUUID(data.site_ID)
        //         : undefined,

        //     // Optional fields
        //     reports_to_position_ID: data.reports_to_position_ID
        //         ? sanitizeUUID(data.reports_to_position_ID)
        //         : undefined,
        //     team_level: data.team_level?.toString() || "0",
        //     tag_IDs:
        //         data.tag_IDs && data.tag_IDs.length > 0
        //             ? data.tag_IDs.map((tag) => sanitizeUUID(tag))
        //             : undefined,
        // };

        const positionDataEdit = {
          position_ID: selectedPosition.id,
          position_code: data.positionCode?.trim() || "",
          position_name: data.position?.trim() || "",
          team_ID: sanitizeUUID(data.team) || "",
          site_ID: data.site_ID ? sanitizeUUID(data.site_ID) : undefined,
          job_ID: sanitizeUUID(data.job_ID || data.jobTitle) || "",
          reports_to_position_ID: data.reports_to_position_ID
            ? sanitizeUUID(data.reports_to_position_ID)
            : undefined,
          reports_to_node: data.reports_to_node || "1.1",
          team_level: data.team_level?.toString() || "0",
          position_type_ID: sanitizeUUID(data.position_type_ID) || "",
          work_setup_ID: sanitizeUUID(data.work_setup_ID) || "",
          basic_salary: data.basicSalary || 0,
          is_approved: data.is_approved || 0,
          updated_by:
            sanitizeUUID("567890abcdef1234567890abcdef1234") ||
            "567890abcdef1234567890abcdef1234",
          tag_IDs:
            data.tag_IDs && data.tag_IDs.length > 0
              ? data.tag_IDs.map((tag) => sanitizeUUID(tag))
              : undefined,
        };

        const positionData = {
          position_ID: selectedPosition.id,
          is_archived: data.is_archived || 0,
          updated_by:
            sanitizeUUID("567890abcdef1234567890abcdef1234") ||
            "567890abcdef1234567890abcdef1234",
        };

        console.log("Updating position with data:", positionDataEdit);

        let resultUpdate = await positionService.updatePosition(
          positionDataEdit
        );
        let resultArchive = await positionService.updatePosition(positionData);

        console.log("Update result:", resultUpdate);
        if (resultUpdate.data?.success) {
          setSnackbarMessage(
            resultUpdate.data?.message || "Position updated successfully"
          );
          setSnackbarType("success");
          setIsSnackbarOpen(true);
          setIsModalOpen(false);
        } else {
          // Handle different error response formats from API
          let errorMessage = "An error occurred while updating the position";

          if (resultUpdate.error) {
            if ("data" in resultUpdate.error && resultUpdate.error.data) {
              const errorData = resultUpdate.error.data as any;
              if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.errors && Array.isArray(errorData.errors)) {
                errorMessage = errorData.errors
                  .map((err: any) => `${err.field}: ${err.message}`)
                  .join(", ");
              }
            } else if ((resultUpdate.error as any)?.message) {
              errorMessage = (resultUpdate.error as any).message;
            }
          }

          setSnackbarMessage(errorMessage);
          setSnackbarType("error");
          setIsSnackbarOpen(true);
        }

        if (data.is_archived === 1) {
          console.log("Archive result:", resultArchive);
          if (resultArchive.data?.success) {
            setSnackbarMessage(
              resultArchive.data?.message || "Position archived successfully"
            );
            setSnackbarType("success");
            setIsSnackbarOpen(true);
            setIsModalOpen(false);
          } else {
            // Handle different error response formats from API
            let errorMessage = "An error occurred while archiving the position";

            if (resultArchive.error) {
              if ("data" in resultArchive.error && resultArchive.error.data) {
                const errorData = resultArchive.error.data as any;
                if (errorData.message) {
                  errorMessage = errorData.message;
                } else if (
                  errorData.errors &&
                  Array.isArray(errorData.errors)
                ) {
                  errorMessage = errorData.errors
                    .map((err: any) => `${err.field}: ${err.message}`)
                    .join(", ");
                }
              } else if ((resultArchive.error as any)?.message) {
                errorMessage = (resultArchive.error as any).message;
              }
            }

            setSnackbarMessage(errorMessage);
            setSnackbarType("error");
            setIsSnackbarOpen(true);
          }
        }
      }

      // Refresh positions after save
      const filters = {
        search: searchTerm,
        is_archived: mode === "archived" ? 1 : 0,
        offset: (currentPage - 1) * 10,
        limit: 10,
      };
      const result = await positionService.viewPositions(filters);
      if (result.data?.positions) {
        setPositions(result.data.positions);
        setTotalCount(result.data.total);
      }
    } catch (error) {
      console.log("Error saving position:", error);
      setSnackbarMessage("Failed to save position. Please try again.");
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    }
  };

  const handleArchivePosition = (index: number) => {
    const position = modalData[index];
    setPositionToArchive(position);
    setIsArchiveConfirmationOpen(true);
  };

  const handleRestoreArchivePosition = async (index: number) => {
    const position = modalData[index];
    try {
      if (position?.id) {
        const positionData = {
          position_ID: sanitizeUUID(position.id) || position.id,
          is_archived: 0,
          updated_by:
            sanitizeUUID("567890abcdef1234567890abcdef1234") ||
            "567890abcdef1234567890abcdef1234",
        };
        console.log("Restoring position with data:", positionData);
        let resultRestore = await positionService.updatePosition(positionData);

        console.log("Restore result:", resultRestore);
        if (resultRestore.data?.success) {
          setSnackbarMessage(
            resultRestore.data?.message || "Position restored successfully"
          );
          setSnackbarType("success");
          setIsSnackbarOpen(true);
        } else {
          // Handle different error response formats from API
          let errorMessage = "An error occurred while restoring the position";

          if (resultRestore.error) {
            if ("data" in resultRestore.error && resultRestore.error.data) {
              const errorData = resultRestore.error.data as any;
              if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.errors && Array.isArray(errorData.errors)) {
                errorMessage = errorData.errors
                  .map((err: any) => `${err.field}: ${err.message}`)
                  .join(", ");
              }
            } else if ((resultRestore.error as any)?.message) {
              errorMessage = (resultRestore.error as any).message;
            }
          }

          setSnackbarMessage(errorMessage);
          setSnackbarType("error");
          setIsSnackbarOpen(true);
        }
        // Refresh positions after restore
        const filters = {
          search: searchTerm,
          is_archived: mode === "archived" ? 1 : 0,
          offset: (currentPage - 1) * 10,
          limit: 10,
        };
        const result = await positionService.viewPositions(filters);
        if (result.data?.positions) {
          setPositions(result.data.positions);
          setTotalCount(result.data.total);
        }
      }
    } catch (error) {
      console.error("Error restoring position:", error);
      setSnackbarMessage("Failed to restore position. Please try again.");
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    } finally {
      setIsArchiveConfirmationOpen(false);
      setPositionToArchive(null);
    }
  };

  const handleArchiveConfirm = async () => {
    try {
      if (positionToArchive?.id) {
        const positionData = {
          position_ID:
            sanitizeUUID(positionToArchive.id) || positionToArchive.id,
          is_archived: 1,
          updated_by:
            sanitizeUUID("567890abcdef1234567890abcdef1234") ||
            "567890abcdef1234567890abcdef1234",
        };
        console.log("Archiving position with data:", positionData);
        await positionService.updatePosition(positionData);

        setSnackbarMessage("Position has been successfully archived");
        setSnackbarType("success");
        setIsSnackbarOpen(true);

        // Refresh positions after archive
        const filters = {
          search: searchTerm,
          is_archived: mode === "archived" ? 1 : 0,
          offset: (currentPage - 1) * 10,
          limit: 10,
        };
        const result = await positionService.viewPositions(filters);
        if (result.data?.positions) {
          setPositions(result.data.positions);
          setTotalCount(result.data.total);
        }
      }
    } catch (error) {
      console.error("Error archiving position:", error);
      setSnackbarMessage("Failed to archive position. Please try again.");
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    } finally {
      setIsArchiveConfirmationOpen(false);
      setPositionToArchive(null);
    }
  };

  const moreOptions = [
    {
      icon: <Edit2 />,
      label: "Edit Position",
      onClick: (index: number) => {
        handleOpenModal(modalData[index], "edit");
      },
    },
    {
      icon: <ArchiveBox />,
      label: "Archive Position",
      onClick: (index: number) => handleArchivePosition(index),
    },
  ];

  const moreOptionsForArchived = [
    {
      icon: <RotateLeft />,
      label: "Restore Position",
      onClick: (index: number) => {
        handleRestoreArchivePosition(index);
      },
    },
  ];

  useEffect(() => {
    if (positionService.actionIsError) {
      // Handle different error response formats from API
      let errorMessage = "An error occurred";

      if (positionService.actionError) {
        if (
          "data" in positionService.actionError &&
          positionService.actionError.data
        ) {
          const errorData = positionService.actionError.data as any;
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.errors && Array.isArray(errorData.errors)) {
            errorMessage = errorData.errors
              .map((err: any) => `${err.field}: ${err.message}`)
              .join(", ");
          }
        } else if ((positionService.actionError as any)?.message) {
          errorMessage = (positionService.actionError as any).message;
        }
      }

      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    }
  }, [positionService.actionError]);

  return (
    <>
      <CardContainer
        content={
          <div className="grid grid-cols-1 gap-[20px]">
            <section className="flex gap-[8px]">
              <div className="flex flex-row gap-[8px] items-center flex-1">
                {mode === "archived" && (
                  <ArrowLeft
                    className="text-szPrimary700 cursor-pointer"
                    onClick={() => {
                      setCurrentPage(1);
                      navigate(-1);
                    }}
                  />
                )}
                <HamburgerMenu
                  className="text-szPrimary700 cursor-pointer block md:hidden"
                  onClick={toggleSidebar}
                />
                <h6 className="text-h6 text-szPrimary700">
                  {mode === "archived" ? "Archived Positions" : "Positions"}
                </h6>
                {mode === "all-positions" && (
                  <div className="flex-1">
                    <PopoverMenu
                      size="small"
                      items={[
                        {
                          label: "Add Position",
                          icon: <Add />,
                          onClick: () =>
                            handleOpenModal({} as PositionDataType, "add"),
                        },
                        {
                          label: "View Archived Positions",
                          icon: <ArchiveBox />,
                          onClick: () => {
                            setCurrentPage(1);
                            navigate("archived-positions");
                          },
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
              <div className="w-full max-w-[260px] min-w-[150px]">
                <Inputs
                  placeholder="Search"
                  icon={SearchNormal}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </section>
            <Table
              headers={headers}
              data={tableData}
              moreOptions={
                mode === "archived" ? moreOptionsForArchived : moreOptions
              }
            />
            <section className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / 10)}
                visiblePages={3}
                onChange={handlePageChange}
              />
            </section>
            <PositionModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              positions={modalData}
              mode={modalMode}
              selectedPosition={selectedPosition}
              onSave={handleSavePosition}
              setModalMode={setModalMode}
            />
          </div>
        }
      />
      <ConfirmationModal
        isOpen={isArchiveConfirmationOpen}
        onClose={() => {
          setIsArchiveConfirmationOpen(false);
          setPositionToArchive(null);
        }}
        onClick={handleArchiveConfirm}
        image={archiveConfirmation}
        description="Are you sure you want to archive this position?"
        buttonLabel="Archive"
        buttonFooterIcon={<ArchiveBox />}
      />

      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        title={snackbarMessage || "Operation completed successfully"}
        type={snackbarType}
      />
    </>
  );
};

export default Position;

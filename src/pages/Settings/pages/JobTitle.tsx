import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    SearchNormal,
} from "iconsax-reactjs";

// components
import JobTitleModal, {
    JobTitleDataType,
    ModalMode,
} from "../components/modals/JobTitleModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

// services
import {
    useJobTitleService,
    type JobTitleData,
} from "../../../services/settings/job-title/list";

import { SidebarContext } from "../index";
//! for page mode
type JobTitlePageMode = "all-job-titles" | "archived";

interface JobTitlePageProps {
    mode: JobTitlePageMode;
}

//! table headers
const getHeaders = (mode: JobTitlePageMode): HeaderType[] => {
    const baseHeaders: HeaderType[] = [
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "string", header: "Description", accessor: "description" },
        { type: "string", header: "Salary", accessor: "salary" },
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

//! for coloring status column
const getColoredStatus = (status: string) => {
    let color = "";
    if (status.toLowerCase() === "active") {
        color = "text-greenText";
    } else if (status.toLowerCase() === "pending") {
        color = "text-szSecondary500";
    } else if (status.toLowerCase() === "inactive") {
        color = "text-gray-400";
    } else if (status.toLowerCase() === "suspended") {
        color = "text-red-500";
    }
    return <span className={color}>{status}</span>;
};

const JobTitle: React.FC<JobTitlePageProps> = ({ mode }) => {
    const { toggleSidebar } = useContext(SidebarContext);
    const jobTitleService = useJobTitleService();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJobTitle, setSelectedJobTitle] =
        useState<JobTitleDataType | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] =
        useState(false);
    const [jobTitleToArchive, setJobTitleToArchive] =
        useState<JobTitleDataType | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [jobTitles, setJobTitles] = useState<JobTitleData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<
        "success" | "error" | "warning" | "info"
    >("success");

    //! Get headers based on mode
    const headers = getHeaders(mode);

    // Transform API data to table format
    const transformJobTitlesToTableData = (jobTitles: JobTitleData[]) => {
        return jobTitles.map((jobTitle) => ({
            id: jobTitle.job_ID || "",
            jobTitle: jobTitle.job_title,
            description: jobTitle.job_description || "",
            salary: jobTitle.basic_salary
                ? `₱ ${jobTitle.basic_salary.toLocaleString()}`
                : "₱ 0",
            status: jobTitle.status || "pending",
        }));
    };

    // Transform job titles for table display with colored status
    const tableData = transformJobTitlesToTableData(jobTitles).map(
        (row, index) => ({
            ...row,
            jobTitle: (
                <span
                    onClick={() => {
                        if (mode === "all-job-titles") handleRowClick(index);
                    }}
                >
                    {row.jobTitle}
                </span>
            ),
            description: (
                <span
                    onClick={() => {
                        if (mode === "all-job-titles") handleRowClick(index);
                    }}
                >
                    {row.description}
                </span>
            ),
            salary: (
                <span
                    onClick={() => {
                        if (mode === "all-job-titles") handleRowClick(index);
                    }}
                >
                    {row.salary}
                </span>
            ),
            status: (
                <span
                    onClick={() => {
                        if (mode === "all-job-titles") handleRowClick(index);
                    }}
                >
                    {getColoredStatus(row.status)}
                </span>
            ),
        })
    );

    // Transform job titles for modal (keeping original string status)
    const modalData = transformJobTitlesToTableData(jobTitles);

    // Fetch job titles on component mount and when mode changes
    useEffect(() => {
        const fetchJobTitles = async () => {
            try {
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    page: currentPage,
                    limit: 10,
                };

                const result = await jobTitleService.listJobTitles(filters);
                if (result.data?.data) {
                    setJobTitles(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            } catch (error) {
                console.error("Error fetching job titles:", error);
            }
        };

        fetchJobTitles();
    }, [mode, currentPage, searchTerm]);

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (
        jobTitle: JobTitleDataType,
        modalMode: ModalMode
    ) => {
        setSelectedJobTitle({
            ...jobTitle,
            is_archived: mode === "archived" ? 1 : 0,
        });
        setModalMode(modalMode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJobTitle(null);
    };

    const handleRowClick = (index: number) => {
        const jobTitle = modalData[index];
        setSelectedJobTitle(jobTitle);
        setModalMode("view");
        setIsModalOpen(true);
    };

    const handleSaveJobTitle = async (data: JobTitleDataType) => {
        try {
            if (modalMode === "add") {
                const jobTitleData = {
                    job_code: data.jobTitle.replace(/\s+/g, "_").toUpperCase(),
                    job_title: data.jobTitle,
                    job_description: data.description || "",
                    basic_salary:
                        parseFloat(data.salary.replace(/[₱,\s]/g, "")) || 0,
                    status: "pending",
                    is_archived: 0,
                };
                let result = await jobTitleService.createJobTitle(jobTitleData);

                if (result.data?.data) {
                    console.log(result);
                    setSnackbarMessage(result.data?.message);
                    setSnackbarType("success");
                    setIsSnackbarOpen(true);
                    setIsModalOpen(false);
                } else {
                    const errorMessage =
                        result.error && "data" in result.error
                            ? (result.error.data as any)?.message
                            : (result.error as any)?.message ||
                              "An error occurred";
                    setSnackbarMessage(errorMessage);
                    setSnackbarType("error");
                    setIsSnackbarOpen(true);
                }
            } else if (modalMode === "edit" && selectedJobTitle?.id) {
                const jobTitleDataEdit = {
                    job_ID: selectedJobTitle.id,
                    job_code: data.jobTitle.replace(/\s+/g, "_").toUpperCase(),
                    job_title: data.jobTitle,
                    job_description: data.description || "",
                    basic_salary:
                        parseFloat(data.salary.replace(/[₱,\s]/g, "")) || 0,
                };

                const jobTitleData = {
                    job_ID: selectedJobTitle.id,
                    is_archived: data.is_archived,
                };
                let resultUpdate = await jobTitleService.updateJobTitle(
                    jobTitleDataEdit
                );
                let resultArchive = await jobTitleService.updateJobTitle(
                    jobTitleData
                );

                if (resultUpdate.data) {
                    setSnackbarMessage(resultUpdate.data?.message);
                    setSnackbarType("success");
                    setIsSnackbarOpen(true);
                    setIsModalOpen(false);
                } else {
                    const errorMessage =
                        resultUpdate.error && "data" in resultUpdate.error
                            ? (resultUpdate.error.data as any)?.message
                            : (resultUpdate.error as any)?.message ||
                              "An error occurred";
                    setSnackbarMessage(errorMessage);
                    setSnackbarType("error");
                    setIsSnackbarOpen(true);
                }

                if (data.is_archived === 1) {
                    if (resultArchive.data?.data) {
                        setSnackbarMessage(resultArchive.data?.message);
                        setSnackbarType("success");
                        setIsSnackbarOpen(true);
                        setIsModalOpen(false);
                    } else {
                        const errorMessage =
                            resultArchive.error && "data" in resultArchive.error
                                ? (resultArchive.error.data as any)?.message
                                : (resultArchive.error as any)?.message ||
                                  "An error occurred";
                        setSnackbarMessage(errorMessage);
                        setSnackbarType("error");
                        setIsSnackbarOpen(true);
                    }
                }
            }

            // Refresh job titles after save
            const filters = {
                search: searchTerm,
                is_archived: mode === "archived" ? 1 : 0,
                page: currentPage,
                limit: 10,
            };
            const result = await jobTitleService.listJobTitles(filters);
            if (result.data?.data) {
                setJobTitles(result.data.data);
                setTotalCount(
                    result.data.total_count || result.data.data.length
                );
            }
        } catch (error) {
            console.log("Error saving job title:", error);
            setSnackbarMessage("Failed to save job title. Please try again.");
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        }
    };

    const handleArchiveJobTitle = (index: number) => {
        const jobTitle = modalData[index];
        setJobTitleToArchive(jobTitle);
        setIsArchiveConfirmationOpen(true);
    };

    const handleRestoreJobTitle = async (index: number) => {
        const jobTitle = modalData[index];
        try {
            if (jobTitle?.id) {
                const jobTitleData = {
                    job_ID: jobTitle.id,
                    is_archived: 0,
                };
                let resultRestore = await jobTitleService.updateJobTitle(
                    jobTitleData
                );

                if (resultRestore.data?.data) {
                    setSnackbarMessage(resultRestore.data?.message);
                    setSnackbarType("success");
                    setIsSnackbarOpen(true);
                } else {
                    const errorMessage =
                        resultRestore.error && "data" in resultRestore.error
                            ? (resultRestore.error.data as any)?.message
                            : (resultRestore.error as any)?.message ||
                              "An error occurred";
                    setSnackbarMessage(errorMessage);
                    setSnackbarType("error");
                    setIsSnackbarOpen(true);
                }
                // Refresh job titles after restore
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    page: currentPage,
                    limit: 10,
                };
                const result = await jobTitleService.listJobTitles(filters);
                if (result.data?.data) {
                    setJobTitles(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            }
        } catch (error) {
            console.error("Error restoring job title:", error);
            setSnackbarMessage(
                "Failed to restore job title. Please try again."
            );
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setJobTitleToArchive(null);
        }
    };

    const handleArchiveConfirm = async () => {
        try {
            if (jobTitleToArchive?.id) {
                const jobTitleData = {
                    job_ID: jobTitleToArchive.id,
                    is_archived: 1,
                };
                let resultArchive = await jobTitleService.updateJobTitle(
                    jobTitleData
                );

                if (resultArchive.data?.data) {
                    setSnackbarMessage(resultArchive.data?.message);
                    setSnackbarType("success");
                    setIsSnackbarOpen(true);
                } else {
                    const errorMessage =
                        resultArchive.error && "data" in resultArchive.error
                            ? (resultArchive.error.data as any)?.message
                            : (resultArchive.error as any)?.message ||
                              "An error occurred";
                    setSnackbarMessage(errorMessage);
                    setSnackbarType("error");
                    setIsSnackbarOpen(true);
                }

                // Refresh job titles after archive
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    page: currentPage,
                    limit: 10,
                };
                const result = await jobTitleService.listJobTitles(filters);
                if (result.data?.data) {
                    setJobTitles(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            }
        } catch (error) {
            console.error("Error archiving job title:", error);
            setSnackbarMessage(
                "Failed to archive job title. Please try again."
            );
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setJobTitleToArchive(null);
        }
    };

    const moreOptions = [
        {
            icon: <Edit2 />,
            label: "Edit Job Title",
            onClick: (index: number) =>
                handleOpenModal(modalData[index], "edit"),
        },
        {
            icon: <ArchiveBox />,
            label: "Archive Job Title",
            onClick: (index: number) => handleArchiveJobTitle(index),
        },
    ];

    const moreOptionsForArchived = [
        {
            icon: <ArchiveBox />,
            label: "Restore Job Title",
            onClick: (index: number) => {
                handleRestoreJobTitle(index);
            },
        },
    ];

    useEffect(() => {
        if (jobTitleService.actionIsError) {
            const errorMessage =
                jobTitleService.actionError &&
                "data" in jobTitleService.actionError
                    ? (jobTitleService.actionError.data as any)?.message
                    : (jobTitleService.actionError as any)?.message ||
                      "An error occurred";
            setSnackbarMessage(errorMessage);
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        }
    }, [jobTitleService.actionError]);

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
                                    className="text-szPrimary700 cursor-pointer blcok md:hidden"
                                    onClick={toggleSidebar}
                                />

                                <h6 className="text-h6 text-szPrimary700">
                                    {mode === "archived"
                                        ? "Archived Job Titles"
                                        : "Job Titles"}
                                </h6>
                                {mode === "all-job-titles" && (
                                    <div className="flex-1">
                                        <PopoverMenu
                                            size="small"
                                            items={[
                                                {
                                                    label: "Add Job Title",
                                                    icon: <Add />,
                                                    onClick: () =>
                                                        handleOpenModal(
                                                            {} as JobTitleDataType,
                                                            "add"
                                                        ),
                                                },
                                                {
                                                    label: "View Archived Job Titles",
                                                    icon: <ArchiveBox />,
                                                    onClick: () => {
                                                        setCurrentPage(1);
                                                        navigate("archived");
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
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </section>
                        <Table
                            headers={headers}
                            data={tableData}
                            moreOptions={
                                mode === "archived"
                                    ? moreOptionsForArchived
                                    : moreOptions
                            }
                            // onRowClick={handleRowClick}
                        />
                        <section className="flex justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(totalCount / 10)}
                                visiblePages={3}
                                onChange={handlePageChange}
                            />
                        </section>
                        <JobTitleModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            jobTitles={modalData}
                            mode={modalMode}
                            selectedJobTitle={selectedJobTitle}
                            onSave={handleSaveJobTitle}
                            setModalMode={setModalMode}
                        />
                    </div>
                }
            />
            <ConfirmationModal
                isOpen={isArchiveConfirmationOpen}
                onClose={() => {
                    setIsArchiveConfirmationOpen(false);
                    setJobTitleToArchive(null);
                }}
                onClick={handleArchiveConfirm}
                image="/src/assets/archive_confirmation.png"
                description="Are you sure you want to archive this job title?"
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

export default JobTitle;

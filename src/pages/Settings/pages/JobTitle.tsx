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
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarAction, setSnackbarAction] = useState<
        "add" | "update" | "archive"
    >("add");

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
    const tableData = transformJobTitlesToTableData(jobTitles).map((row) => ({
        ...row,
        status: getColoredStatus(row.status),
    }));

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
                await jobTitleService.createJobTitle(jobTitleData);

                setSnackbarAction("add");
                setIsSnackbarOpen(true);
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
                await jobTitleService.updateJobTitle(jobTitleDataEdit);
                await jobTitleService.updateJobTitle(jobTitleData);

                setSnackbarAction("update");
                setIsSnackbarOpen(true);
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
            }
        } catch (error) {
            console.error("Error saving job title:", error);
        }
    };

    const handleArchiveJobTitle = (index: number) => {
        const jobTitle = modalData[index];
        setJobTitleToArchive(jobTitle);
        setIsArchiveConfirmationOpen(true);
    };

    const handleArchiveConfirm = async () => {
        try {
            if (jobTitleToArchive?.id) {
                const jobTitleData = {
                    job_ID: jobTitleToArchive.id,
                    is_archived: 1,
                };
                await jobTitleService.updateJobTitle(jobTitleData);

                setSnackbarAction("archive");
                setIsSnackbarOpen(true);

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
                }
            }
        } catch (error) {
            console.error("Error archiving job title:", error);
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
                handleOpenModal(modalData[index], "edit");
            },
        },
    ];

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
                                        onClick={() =>
                                            navigate(
                                                "/home/settings/job-titles"
                                            )
                                        }
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
                                                        navigate(
                                                            "/home/settings/job-titles/archived-job-titles"
                                                        );
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
                            onRowClick={handleRowClick}
                        />
                        <section className="flex justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(
                                    (jobTitles.length || 0) / 10
                                )}
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
                title={
                    snackbarAction === "add"
                        ? "Successfully added Job Title"
                        : snackbarAction === "update"
                        ? "Successfully updated Job Title"
                        : "Successfully archived Job Title"
                }
                type="success"
            />
        </>
    );
};

export default JobTitle;

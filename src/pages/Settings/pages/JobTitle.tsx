import { useContext, useState } from "react";
import { CardContainer, Inputs, PopoverMenu, Table, HeaderType, Pagination } from "enterprisze-global-components";

//icons
import { Add, ArchiveBox, ArrowLeft, Edit2, HamburgerMenu, SearchNormal } from "iconsax-reactjs";

// components
import JobTitleModal, { JobTitleDataType, ModalMode } from "../components/modals/JobTitleModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

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
        return [{ type: "checkbox", header: <></>, accessor: "checkbox" }, ...baseHeaders];
    }

    return baseHeaders;
};

//! sampel dummy data, can be removed during integration
const data = [
    {
        id: "1",
        jobTitle: "Project Manager",
        description: "Develop innovative software solutions to enhance user experience.",
        salary: "₱ 25,000",
    },
    {
        id: "2",
        jobTitle: "UX Designer",
        description: "Design engaging visual graphics for web and mobile applications.",
        salary: "₱ 20,000",
    },
    {
        id: "3",
        jobTitle: "Data Analyst",
        description: "Manage and optimize social media strategies to drive engagement.",
        salary: "₱ 18,000",
    },
    {
        id: "4",
        jobTitle: "Software Developer",
        description: "Build scalable and secure software applications to meet business needs.",
        salary: "₱ 15,000",
    },
    {
        id: "5",
        jobTitle: "Marketing Specialist",
        description: "Implement robust security measures to protect sensitive data.",
        salary: "₱ 12,000",
    },
    {
        id: "6",
        jobTitle: "Sales Executive",
        description: "Collaborate with cross-functional teams to achieve project goals.",
        salary: "₱ 10,000",
    },
    {
        id: "7",
        jobTitle: "Customer Support Lead",
        description: "Analyze data metrics to inform business decisions and strategies.",
        salary: "₱ 10,000",
    },
];

//! Create a version for the modal that keeps the original string salary
const modalData = data.map((row) => ({
    ...row,
    description: "", // Add empty description to match interface
}));

const JobTitle: React.FC<JobTitlePageProps> = ({ mode }) => {
    const { toggleSidebar } = useContext(SidebarContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDataType | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] = useState(false);
    const [jobTitleToArchive, setJobTitleToArchive] = useState<JobTitleDataType | null>(null);

    //! Get headers based on mode
    const headers = getHeaders(mode);

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (jobTitle: JobTitleDataType, mode: ModalMode) => {
        setSelectedJobTitle(jobTitle);
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJobTitle(null);
    };

    const handleSaveJobTitle = async (data: JobTitleDataType) => {
        try {
            if (modalMode === "add") {
                console.log("Adding new job title:", data);
                // TODO: await createJobTitle(data).unwrap();
            } else if (modalMode === "edit") {
                console.log("Updating job title:", data);
                // TODO: await updateJobTitle({ id: selectedJobTitle?.id, ...data }).unwrap();
            }
        } catch (error) {
            // TODO: Add error handling
            console.error("Error saving job title:", error);
        }
    };

    const handleArchiveJobTitle = (index: number) => {
        const jobTitle = data[index];
        setJobTitleToArchive(jobTitle);
        setIsArchiveConfirmationOpen(true);
    };

    const handleArchiveConfirm = async () => {
        try {
            if (jobTitleToArchive) {
                console.log("Archiving job title:", jobTitleToArchive);
                // TODO: await archiveJobTitle(jobTitleToArchive.id).unwrap();
            }
        } catch (error) {
            // TODO: Add error handling
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
            onClick: (index: number) => handleOpenModal(modalData[index], "edit"),
        },
        {
            icon: <ArchiveBox />,
            label: "Archive Job Title",
            onClick: (index: number) => handleArchiveJobTitle(index),
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
                                        // TODO: Backend Integration - Add navigation handler
                                        // onClick={() => navigate("/job-titles")}
                                    />
                                )}
                                <HamburgerMenu className="text-szPrimary700 cursor-pointer blcok md:hidden" onClick={toggleSidebar} />

                                <h6 className="text-h6 text-szPrimary700">{mode === "archived" ? "Archived Job Titles" : "Job Titles"}</h6>
                                {mode === "all-job-titles" && (
                                    <div className="flex-1">
                                        <PopoverMenu
                                            size="small"
                                            items={[
                                                {
                                                    label: "Add Job Title",
                                                    icon: <Add />,
                                                    onClick: () => handleOpenModal({} as JobTitleDataType, "add"),
                                                },
                                                {
                                                    label: "View Archived Job Titles",
                                                    icon: <ArchiveBox />,
                                                    onClick: () => {
                                                        // TODO: Backend Integration - Replace with proper navigation
                                                        window.location.href = "/archived-job-titles";
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
                                    // TODO: Backend Integration - Add search functionality
                                    // onChange={(value) => handleSearch(value)}
                                />
                            </div>
                        </section>
                        <Table headers={headers} data={data} moreOptions={moreOptions} />
                        <section className="flex justify-end">
                            <Pagination currentPage={currentPage} totalPages={3} visiblePages={3} onChange={handlePageChange} />
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
        </>
    );
};

export default JobTitle;

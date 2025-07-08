import { useContext, useState } from "react";
import { CardContainer, Inputs, PopoverMenu, Table, HeaderType, Pagination } from "enterprisze-global-components";

//icons
import { Add, ArchiveBox, ArrowLeft, Edit2, HamburgerMenu, SearchNormal } from "iconsax-reactjs";

// components
import PositionModal, { PositionDataType, ModalMode } from "../components/modals/PositionModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

import { SidebarContext } from "../index";
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
        return [{ type: "checkbox", header: <></>, accessor: "checkbox" }, ...baseHeaders];
    }

    return baseHeaders;
};

//! sampel dummy data, can be removed during integration
const data = [
    {
        id: "1",
        position: "Junior Dev 1",
        team: "Business Solutions and Innovations",
        jobTitle: "Junior Dev",
    },
    {
        id: "2",
        position: "Junior Dev 2",
        team: "Business Solutions and Innovations",
        jobTitle: "Junior Dev",
    },
    {
        id: "3",
        position: "Liaison Officer 2",
        team: "Accounting and Finance Team",
        jobTitle: "Liaison Officer",
    },
    {
        id: "4",
        position: "Liaison Officer 2",
        team: "Accounting and Finance Team",
        jobTitle: "Liaison Officer",
    },
    {
        id: "5",
        position: "Liaison Officer 2",
        team: "Accounting and Finance Team",
        jobTitle: "Liaison Officer",
    },
    {
        id: "6",
        position: "Junior Dev 1",
        team: "Business Solutions and Innovations",
        jobTitle: "Junior Dev",
    },
    {
        id: "7",
        position: "Junior Dev 2",
        team: "Business Solutions and Innovations",
        jobTitle: "Junior Dev",
    },
];

//! Create a version for the modal that keeps the original string jobTitle
const modalData = data.map((row) => ({
    ...row,
    jobTitle: "", // Add empty jobTitle to match interface
}));

const Position: React.FC<PositionPageProps> = ({ mode }) => {
    const { toggleSidebar } = useContext(SidebarContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPosition, setSelectedPosition] = useState<PositionDataType | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] = useState(false);
    const [positionToArchive, setPositionToArchive] = useState<PositionDataType | null>(null);

    //! Get headers based on mode
    const headers = getHeaders(mode);

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (position: PositionDataType, mode: ModalMode) => {
        setSelectedPosition(position);
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPosition(null);
    };

    const handleSavePosition = async (data: PositionDataType) => {
        try {
            if (modalMode === "add") {
                console.log("Adding new position:", data);
                // TODO: await createPosition(data).unwrap();
            } else if (modalMode === "edit") {
                console.log("Updating position:", data);
                // TODO: await updatePosition({ id: selectedPosition?.id, ...data }).unwrap();
            }
        } catch (error) {
            // TODO: Add error handling
            console.error("Error saving position:", error);
        }
    };

    const handleArchivePosition = (index: number) => {
        const position = data[index];
        setPositionToArchive(position);
        setIsArchiveConfirmationOpen(true);
    };

    const handleArchiveConfirm = async () => {
        try {
            if (positionToArchive) {
                console.log("Archiving position:", positionToArchive);
                // TODO: await archivePosition(positionToArchive.id).unwrap();
            }
        } catch (error) {
            // TODO: Add error handling
            console.error("Error archiving position:", error);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setPositionToArchive(null);
        }
    };

    const moreOptions = [
        {
            icon: <Edit2 />,
            label: "Edit Position",
            onClick: (index: number) => handleOpenModal(modalData[index], "edit"),
        },
        {
            icon: <ArchiveBox />,
            label: "Archive Position",
            onClick: (index: number) => handleArchivePosition(index),
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
                                        // onClick={() => navigate("/positions")}
                                    />
                                )}
                                <h6 className="text-h6 text-szPrimary700">{mode === "archived" ? "Archived Positions" : "Positions"}</h6>
                                <HamburgerMenu className="text-szPrimary700 cursor-pointer blcok md:hidden" onClick={toggleSidebar} />
                                {mode === "all-positions" && (
                                    <div className="flex-1">
                                        <PopoverMenu
                                            size="small"
                                            items={[
                                                {
                                                    label: "Add Position",
                                                    icon: <Add />,
                                                    onClick: () => handleOpenModal({} as PositionDataType, "add"),
                                                },
                                                {
                                                    label: "View Archived Positions",
                                                    icon: <ArchiveBox />,
                                                    onClick: () => {
                                                        // TODO: Backend Integration - Replace with proper navigation
                                                        window.location.href = "/archived-positions";
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
                        <PositionModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            positions={modalData}
                            mode={modalMode}
                            selectedPosition={selectedPosition}
                            onSave={handleSavePosition}
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
                image="/src/assets/archive_confirmation.png"
                description="Are you sure you want to archive this position?"
                buttonLabel="Archive"
                buttonFooterIcon={<ArchiveBox />}
            />
        </>
    );
};

export default Position;

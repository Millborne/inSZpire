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
import { capitalizeFirst } from "../../../utils";

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
import TagsModal, {
    TagsDataType,
    ModalMode,
} from "../components/modals/TagsModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { SidebarContext } from "..";

// services
import {
    useTagService,
    type TagData,
} from "../../../services/settings/tags/list";

//! for page mode
type TagPageMode = "all-tags" | "archived";

interface TagsPageProps {
    mode: TagPageMode;
}

//! table headers
const getHeaders = (mode: TagPageMode): HeaderType[] => {
    const baseHeaders: HeaderType[] = [
        { type: "string", header: "Name", accessor: "name" },
        { type: "string", header: "Description", accessor: "description" },
        { type: "string", header: "Type", accessor: "type" },
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

const Tags: React.FC<TagsPageProps> = ({ mode }) => {
    const { toggleSidebar } = useContext(SidebarContext);
    const tagService = useTagService();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState<TagsDataType | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>("add");
    const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] =
        useState(false);
    const [tagToArchive, setTagToArchive] = useState<TagsDataType | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tags, setTags] = useState<TagData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<
        "success" | "error" | "warning" | "info"
    >("success");

    //! Get headers based on mode
    const headers = getHeaders(mode);

    // Transform API data to table format
    const transformTagsToTableData = (tags: TagData[]) => {
        return tags.map((tag) => ({
            id: tag.tag_ID || "",
            name: capitalizeFirst(tag.tag_name),
            description: capitalizeFirst(tag.description) || "",
            type: capitalizeFirst(tag.tag_type),
            updated_at: tag.updated_at || "",
            created_at: tag.created_at || "",
        }));
    };

    // Transform tags for table display
    const tableData = transformTagsToTableData(tags).map((row, index) => ({
        ...row,
        name: (
            <span
                onClick={() => {
                    if (mode === "all-tags") handleRowClick(index);
                }}
            >
                {capitalizeFirst(row.name)}
            </span>
        ),
        description: (
            <span
                onClick={() => {
                    if (mode === "all-tags") handleRowClick(index);
                }}
            >
                {capitalizeFirst(row.description)}
            </span>
        ),
        type: (
            <span
                onClick={() => {
                    if (mode === "all-tags") handleRowClick(index);
                }}
            >
                {capitalizeFirst(row.type)}
            </span>
        ),
    }));

    // Transform tags for modal (keeping original string values)
    const modalData = transformTagsToTableData(tags);

    // Fetch tags on component mount and when mode changes
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const filters = {
                    is_archived: mode === "archived" ? 1 : 0,
                    search: searchTerm,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                };

                const result = await tagService.viewTags(filters);
                if (result.data?.data) {
                    setTags(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, [mode, currentPage, searchTerm]);

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (tag: TagsDataType, modalMode: ModalMode) => {
        setSelectedTag({
            ...tag,
            is_archived: mode === "archived" ? 1 : 0,
        });
        setModalMode(modalMode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTag(null);
    };

    const handleRowClick = (index: number) => {
        const tag = modalData[index];
        setSelectedTag(tag);
        setModalMode("view");
        setIsModalOpen(true);
    };

    const handleSaveTag = async (data: TagsDataType) => {
        try {
            if (modalMode === "add") {
                const tagData = {
                    tag_name: data.name,
                    tag_type: data.type.toLowerCase(),
                    description: data.description || "",
                    is_archived: 0,
                };
                let result = await tagService.createTag(tagData);

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
            } else if (modalMode === "edit" && selectedTag?.id) {
                const tagDataEdit = {
                    tag_ID: selectedTag.id,
                    tag_name: data.name,
                    tag_type: data.type.toLowerCase(),
                    description: data.description || "",
                };

                const tagData = {
                    tag_ID: selectedTag.id,
                    is_archived: data.is_archived,
                };
                let resultUpdate = await tagService.updateTag(tagDataEdit);
                let resultArchive = await tagService.updateTag(tagData);
                console.log(resultUpdate);
                if (resultUpdate.data?.data) {
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

            // Refresh tags after save
            const filters = {
                is_archived: mode === "archived" ? 1 : 0,
                offset: (currentPage - 1) * 10,
                limit: 10,
                search: searchTerm,
            };
            const result = await tagService.viewTags(filters);
            if (result.data?.data) {
                setTags(result.data.data);
                setTotalCount(
                    result.data.total_count || result.data.data.length
                );
            }
        } catch (error) {
            console.log("Error saving tag:", error);
            setSnackbarMessage("Failed to save tag. Please try again.");
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        }
    };

    const handleArchiveTag = (index: number) => {
        const tag = modalData[index];
        setTagToArchive(tag);
        setIsArchiveConfirmationOpen(true);
    };

    const handleRestoreArchiveTag = async (index: number) => {
        const tag = modalData[index];
        try {
            if (tag?.id) {
                const tagData = {
                    tag_ID: tag.id,
                    is_archived: 0,
                    search: searchTerm,
                };
                let resultRestore = await tagService.updateTag(tagData);

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
                // Refresh tags after restore
                const filters = {
                    is_archived: mode === "archived" ? 1 : 0,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                    search: searchTerm,
                };
                const result = await tagService.viewTags(filters);
                if (result.data?.data) {
                    setTags(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            }
        } catch (error) {
            console.error("Error restoring tag:", error);
            setSnackbarMessage("Failed to restore tag. Please try again.");
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setTagToArchive(null);
        }
    };

    const handleArchiveConfirm = async () => {
        try {
            if (tagToArchive?.id) {
                const tagData = {
                    tag_ID: tagToArchive.id,
                    is_archived: 1,
                    search: searchTerm,
                };
                await tagService.updateTag(tagData);

                setSnackbarMessage("Tag has been successfully archived");
                setSnackbarType("success");
                setIsSnackbarOpen(true);

                // Refresh tags after archive
                const filters = {
                    is_archived: mode === "archived" ? 1 : 0,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                    search: searchTerm,
                };
                const result = await tagService.viewTags(filters);
                if (result.data?.data) {
                    setTags(result.data.data);
                    setTotalCount(
                        result.data.total_count || result.data.data.length
                    );
                }
            }
        } catch (error) {
            console.error("Error archiving tag:", error);
            setSnackbarMessage("Failed to archive tag. Please try again.");
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setTagToArchive(null);
        }
    };

    const moreOptions = [
        {
            icon: <Edit2 />,
            label: "Edit Tag",
            onClick: (index: number) => {

                handleOpenModal(modalData[index], "edit");
            },
        },
        {
            icon: <ArchiveBox />,
            label: "Archive Tag",
            onClick: (index: number) => handleArchiveTag(index),
        },
    ];

    const moreOptionsForArchived = [
        {
            icon: <RotateLeft />,
            label: "Restore Tag",
            onClick: (index: number) => {
                handleRestoreArchiveTag(index);
            },
        },
    ];

    useEffect(() => {
        if (tagService.actionIsError) {
            const errorMessage =
                tagService.actionError && "data" in tagService.actionError
                    ? (tagService.actionError.data as any)?.message
                    : (tagService.actionError as any)?.message ||
                      "An error occurred";
            setSnackbarMessage(errorMessage);
            setSnackbarType("error");
            setIsSnackbarOpen(true);
        }
    }, [tagService.actionError]);

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
                                    {mode === "archived"
                                        ? "Archived Tags"
                                        : "Tags"}
                                </h6>
                                {mode === "all-tags" && (
                                    <div className="flex-1">
                                        <PopoverMenu
                                            size="small"
                                            items={[
                                                {
                                                    label: "Add Tag",
                                                    icon: <Add />,
                                                    onClick: () =>
                                                        handleOpenModal(
                                                            {} as TagsDataType,
                                                            "add"
                                                        ),
                                                },
                                                {
                                                    label: "View Archived Tags",
                                                    icon: <ArchiveBox />,
                                                    onClick: () => {
                                                        setCurrentPage(1);
                                                        navigate(
                                                            "archived-tags"
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
                                mode === "archived"
                                    ? moreOptionsForArchived
                                    : moreOptions
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
                        <TagsModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            tags={modalData}
                            mode={modalMode}
                            selectedTag={selectedTag}
                            onSave={handleSaveTag}
                            setModalMode={setModalMode}
                        />
                    </div>
                }
            />
            <ConfirmationModal
                isOpen={isArchiveConfirmationOpen}
                onClose={() => {
                    setIsArchiveConfirmationOpen(false);
                    setTagToArchive(null);
                }}
                onClick={handleArchiveConfirm}
                image={archiveConfirmation}
                description="Are you sure you want to archive this tag?"
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

export default Tags;

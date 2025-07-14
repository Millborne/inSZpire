import { useContext, useState } from "react";
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
  RotateLeft,
  SearchNormal,
} from "iconsax-reactjs";

// components
import TagsModal, {
  TagsDataType,
  ModalMode,
} from "../components/modals/TagsModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { SidebarContext } from "..";

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

// TODO: Backend Integration - Replace with API call to fetch tags
const mockTags = [
  {
    id: "1",
    name: "Tag 1",
    description: "Roses are red, violets are blue.",
    type: "Position",
  },
  {
    id: "2",
    name: "Tag 2",
    description: "Roses are red, violets are blue.",
    type: "Team",
  },
  {
    id: "3",
    name: "Tag 3",
    description: "Roses are red, violets are blue.",
    type: "Position",
  },
  {
    id: "4",
    name: "Tag 4",
    description: "Roses are red, violets are blue.",
    type: "Team",
  },
  {
    id: "5",
    name: "Tag 5",
    description: "Ang rosas ay pula, ang mga violet ay bughaw",
    type: "Position",
  },
];

// TODO: Backend Integration - Remove this mapping when API provides correct data structure
const modalTags = mockTags.map((tag) => ({
  ...tag,
  description: "", // Empty description to match modal interface
}));

const Tags: React.FC<TagsPageProps> = ({ mode }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<TagsDataType | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] =
    useState(false);
  const [tagToArchive, setTagToArchive] = useState<TagsDataType | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState<
    "add" | "update" | "archive"
  >("add");

  // TODO: Backend Integration - Add loading state
  // const [isLoading, setIsLoading] = useState(false);

  //! Get headers based on mode
  const headers = getHeaders(mode);

  const handlePageChange = (page: number, _meta?: { source?: string }) => {
    setCurrentPage(page);
    // TODO: Backend Integration - Refetch data when page changes
  };

  const handleOpenModal = (tag: TagsDataType, mode: ModalMode) => {
    setSelectedTag(tag);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  // TODO: Backend Integration - Replace with RTK mutation
  const handleSaveTag = (data: TagsDataType) => {
    if (modalMode === "add") {
      console.log("Adding new tag:", data);
      // TODO: INSER BACKEND LOGIC
      setSnackbarAction("add");
      setIsSnackbarOpen(true);
    } else if (modalMode === "edit") {
      console.log("Updating tag:", data);
      // TODO: INSER BACKEND LOGIC
      setSnackbarAction("update");
      setIsSnackbarOpen(true);
    }
  };

  const handleArchiveTag = (index: number) => {
    const tag = mockTags[index];
    setTagToArchive(tag);
    setIsArchiveConfirmationOpen(true);
  };

  // TODO: Backend Integration - Replace with RTK mutation
  const handleArchiveConfirm = () => {
    if (tagToArchive) {
      console.log("Archiving tag:", tagToArchive);
      // TODO: INSER BACKEND LOGIC
      setSnackbarAction("archive");
      setIsSnackbarOpen(true);
    }
    setIsArchiveConfirmationOpen(false);
    setTagToArchive(null);
  };

  const moreOptionsForArchived = [
    {
      icon: <RotateLeft />,
      label: "Restore Tags",
      onClick: (index: number) => {
        console.log("Restore Tags", index);
        // handleRestoreArchivePosition(index);
      },
    },
  ];

  const moreOptions = [
    {
      icon: <Edit2 />,
      label: "Edit Tag",
      onClick: (index: number) => handleOpenModal(modalTags[index], "edit"),
    },
    {
      icon: <ArchiveBox />,
      label: "Archive Tag",
      onClick: (index: number) => handleArchiveTag(index),
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
                    onClick={() => navigate("/home/settings/tags")}
                  />
                )}
                <HamburgerMenu
                  className="text-szPrimary700 cursor-pointer block md:hidden"
                  onClick={toggleSidebar}
                />
                <h6 className="text-h6 text-szPrimary700">
                  {mode === "archived" ? "Archived Tags" : "Tags"}
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
                            handleOpenModal({} as TagsDataType, "add"),
                        },
                        {
                          label: "View Archived Tags",
                          icon: <ArchiveBox />,
                          onClick: () => {
                            navigate("/home/settings/tags/archived-tags");
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
            <Table
              headers={headers}
              data={mockTags}
              moreOptions={
                mode === "archived" ? moreOptionsForArchived : moreOptions
              }
            />
            <section className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                visiblePages={3}
                onChange={handlePageChange}
              />
            </section>
            <TagsModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              tags={modalTags}
              mode={modalMode}
              selectedTag={selectedTag}
              onSave={handleSaveTag}
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
        image="/src/assets/archive_confirmation.png"
        description="Are you sure you want to archive this tag?"
        buttonLabel="Archive"
        buttonFooterIcon={<ArchiveBox />}
      />
      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        title={
          snackbarAction === "add"
            ? "Successfully added Tag"
            : snackbarAction === "update"
            ? "Successfully updated Tag"
            : "Successfully archived Tag"
        }
        type="success"
      />
    </>
  );
};

export default Tags;

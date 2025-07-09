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
  SearchNormal,
} from "iconsax-reactjs";

// components
import AccountModal, {
  AccountDataType,
  ModalMode,
} from "../components/modals/AccountModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

import { SidebarContext } from "../index";
//! for page mode
type AccountPageMode = "all-accounts" | "archived";

interface AccountsPageProps {
  mode: AccountPageMode;
}

//! table headers
const getHeaders = (mode: AccountPageMode): HeaderType[] => {
  const baseHeaders: HeaderType[] = [
    { type: "string", header: "Account", accessor: "account" },
    { type: "string", header: "Code", accessor: "code" },
    { type: "string", header: "Status", accessor: "status" },
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

//! sampel dummy data, can be removed during integration
const data = [
  {
    id: "1",
    account: "Athletic Green",
    code: "AGI12",
    status: "Pending",
  },
  {
    id: "2",
    account: "Athletic Green",
    code: "AGI12",
    status: "Active",
  },
  {
    id: "3",
    account: "Energetic Yellow",
    code: "Cool Gray",
    status: "Idle",
  },
  {
    id: "4",
    account: "Vibrant Orange",
    code: "Bold Purple",
    status: "Active",
  },
  {
    id: "5",
    account: "Sporty Blue",
    code: "Lively Pink",
    status: "Active",
  },
  {
    id: "6",
    account: "Dynamic Red",
    code: "Fresh Teal",
    status: "Pending",
  },
  {
    id: "7",
    account: "Athletic Green",
    code: "Athletic Green",
    status: "Active",
  },
];

//! for coloring status column
const getColoredStatus = (status: string) => {
  let color = "";
  if (status.toLowerCase() === "active") {
    color = "text-greenText";
  } else if (status.toLowerCase() === "pending") {
    color = "text-szSecondary500";
  } else if (status.toLowerCase() === "idle") {
    color = "text-gray-400";
  }
  return <span className={color}>{status}</span>;
};

const coloredData = data.map((row) => ({
  ...row,
  status: getColoredStatus(row.status),
}));

//! Create a version for the modal that keeps the original string status
const modalData = data.map((row) => ({
  ...row,
  description: "", // Add empty description to match interface
}));

const Accounts: React.FC<AccountsPageProps> = ({ mode }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] =
    useState<AccountDataType | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] =
    useState(false);
  const [accountToArchive, setAccountToArchive] =
    useState<AccountDataType | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState<
    "add" | "update" | "archive"
  >("add");

  //! Get headers based on mode
  const headers = getHeaders(mode);

  const handlePageChange = (page: number, _meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (account: AccountDataType, mode: ModalMode) => {
    setSelectedAccount(account);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  const handleSaveAccount = async (data: AccountDataType) => {
    try {
      if (modalMode === "add") {
        console.log("Adding new account:", data);
        // TODO: await createAccount(data).unwrap();
      } else if (modalMode === "edit") {
        console.log("Updating account:", data);
        // TODO: await updateAccount({ id: selectedAccount?.id, ...data }).unwrap();
      }
    } catch (error) {
      // TODO: Add error handling
      console.error("Error saving account:", error);
    }
  };

  const handleArchiveAccount = (index: number) => {
    const account = data[index];
    setAccountToArchive(account);
    setIsArchiveConfirmationOpen(true);
  };

  const handleArchiveConfirm = async () => {
    try {
      if (accountToArchive) {
        console.log("Archiving account:", accountToArchive);
        // TODO: await archiveAccount(accountToArchive.id).unwrap();
      }
    } catch (error) {
      // TODO: Add error handling
      console.error("Error archiving account:", error);
    } finally {
      setIsArchiveConfirmationOpen(false);
      setAccountToArchive(null);
    }
  };

  const moreOptions = [
    {
      icon: <Edit2 />,
      label: "Edit Account",
      onClick: (index: number) => handleOpenModal(modalData[index], "edit"),
    },
    {
      icon: <ArchiveBox />,
      label: "Archive Account",
      onClick: (index: number) => handleArchiveAccount(index),
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
                    // onClick={() => navigate("/accounts")}
                  />
                )}
                <HamburgerMenu
                  className="text-szPrimary700 cursor-pointer block md:hidden"
                  onClick={toggleSidebar}
                />
                <h6 className="text-h6 text-szPrimary700">
                  {mode === "archived" ? "Archived Accounts" : "Accounts"}
                </h6>
                {mode === "all-accounts" && (
                  <div className="flex-1">
                    <PopoverMenu
                      size="small"
                      items={[
                        {
                          label: "Add Account",
                          icon: <Add />,
                          onClick: () =>
                            handleOpenModal({} as AccountDataType, "add"),
                        },
                        {
                          label: "View Archived Accounts",
                          icon: <ArchiveBox />,
                          onClick: () => {
                            // TODO: Backend Integration - Replace with proper navigation
                            window.location.href = "/archived-accounts";
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
              data={coloredData}
              moreOptions={moreOptions}
            />
            <section className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                visiblePages={3}
                onChange={handlePageChange}
              />
            </section>
            <AccountModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              accounts={modalData}
              mode={modalMode}
              selectedAccount={selectedAccount}
              onSave={handleSaveAccount}
            />
          </div>
        }
      />
      <ConfirmationModal
        isOpen={isArchiveConfirmationOpen}
        onClose={() => {
          setIsArchiveConfirmationOpen(false);
          setAccountToArchive(null);
        }}
        onClick={handleArchiveConfirm}
        image="/src/assets/archive_confirmation.png"
        description="Are you sure you want to archive this account?"
        buttonLabel="Archive"
        buttonFooterIcon={<ArchiveBox />}
      />
    </>
  );
};

export default Accounts;

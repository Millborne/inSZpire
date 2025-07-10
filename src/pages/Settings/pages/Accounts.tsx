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

// components
import AccountModal, {
    AccountDataType,
    ModalMode,
} from "../components/modals/AccountModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

// services
import {
    useAccountService,
    type AccountData,
} from "../../../services/settings/accounts/list";

import { SidebarContext } from "../index";
import { useNavigate } from "react-router-dom";
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

const Accounts: React.FC<AccountsPageProps> = ({ mode }) => {
    const { toggleSidebar } = useContext(SidebarContext);
    const accountService = useAccountService();
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
    const [searchTerm, setSearchTerm] = useState("");
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarAction, setSnackbarAction] = useState<
        "add" | "update" | "archive" | "restore"
    >("add");

    //! Get headers based on mode
    const headers = getHeaders(mode);

    // Transform API data to table format
    const transformAccountsToTableData = (accounts: AccountData[]) => {
        return accounts.map((account) => ({
            id: account.acc_ID || "",
            account: account.acc_name,
            code: account.acc_code,
            status: account.acc_status,
            description: account.acc_description || "",
        }));
    };

    // Transform accounts for table display with colored status
    const tableData = transformAccountsToTableData(accounts).map(
        (row, index) => ({
            ...row,
            account: (
                <span
                    onClick={() => {
                        if (mode === "all-accounts") handleRowClick(index);
                    }}
                >
                    {row.account}
                </span>
            ),
            code: (
                <span
                    onClick={() => {
                        if (mode === "all-accounts") handleRowClick(index);
                    }}
                >
                    {row.code}
                </span>
            ),
            status: (
                <span
                    onClick={() => {
                        if (mode === "all-accounts") handleRowClick(index);
                    }}
                >
                    {getColoredStatus(row.status)}
                </span>
            ),
        })
    );

    // Transform accounts for modal (keeping original string status)
    const modalData = transformAccountsToTableData(accounts);

    // Fetch accounts on component mount and when mode changes
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                };

                const result = await accountService.viewAccounts(filters);
                if (result.data?.data) {
                    setAccounts(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, [mode, currentPage, searchTerm]);

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (
        account: AccountDataType,
        modalMode: ModalMode
    ) => {
        setSelectedAccount({
            ...account,
            is_archived: mode === "archived" ? 1 : 0,
        });
        setModalMode(modalMode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAccount(null);
    };

    const handleRowClick = (index: number) => {
        const account = modalData[index];
        setSelectedAccount(account);
        setModalMode("view");
        setIsModalOpen(true);
    };

    const handleSaveAccount = async (data: AccountDataType) => {
        try {
            if (modalMode === "add") {
                const accountData = {
                    acc_code: data.code,
                    acc_name: data.account,
                    acc_description: data.description || "",
                    acc_status: data.status as
                        | "active"
                        | "pending"
                        | "inactive"
                        | "suspended",
                    is_archived: 0,
                };
                await accountService.createAccount(accountData);

                setSnackbarAction("add");
                setIsSnackbarOpen(true);
            } else if (modalMode === "edit" && selectedAccount?.id) {
                const accountDataEdit = {
                    acc_ID: selectedAccount.id,
                    acc_code: data.code,
                    acc_name: data.account,
                    acc_description: data.description || "",
                    acc_status: data.status as
                        | "active"
                        | "pending"
                        | "inactive"
                        | "suspended",
                };

                const accountData = {
                    acc_ID: selectedAccount.id,
                    is_archived: data.is_archived,
                };
                await accountService.updateAccount(accountDataEdit);
                await accountService.updateAccount(accountData);

                setSnackbarAction("update");
                setIsSnackbarOpen(true);
            }

            // else if (modalMode === "edit" && selectedAccount?.id) {
            //     const accountData = {
            //         acc_ID: selectedAccount.id,
            //         acc_code: data.code,
            //         acc_name: data.account,
            //         acc_description: data.description || "",
            //         acc_status: data.status as
            //             | "active"
            //             | "pending"
            //             | "inactive"
            //             | "suspended",
            //     };
            //     await accountService.updateAccount(accountData);
            // }
            // Refresh accounts after save
            const filters = {
                search: searchTerm,
                is_archived: mode === "archived" ? 1 : 0,
                offset: (currentPage - 1) * 10,
                limit: 10,
            };
            const result = await accountService.viewAccounts(filters);
            if (result.data?.data) {
                setAccounts(result.data.data);
                // TODO: Set total count for pagination
                // setTotalCount(result.data.total_count);
            }
        } catch (error) {
            console.error("Error saving account:", error);
        }
    };

    const handleArchiveAccount = (index: number) => {
        const account = modalData[index];
        setAccountToArchive(account);
        setIsArchiveConfirmationOpen(true);
    };

    const handleRestotrArchiveAccount = async (index: number) => {
        const account = modalData[index];
        try {
            if (account?.id) {
                const accountData = {
                    acc_ID: account.id,
                    is_archived: 0,
                };
                await accountService.updateAccount(accountData);

                setSnackbarAction("restore");
                setIsSnackbarOpen(true);

                // Refresh accounts after archive
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                };
                const result = await accountService.viewAccounts(filters);
                if (result.data?.data) {
                    setAccounts(result.data.data);
                }
            }
        } catch (error) {
            console.error("Error archiving account:", error);
        } finally {
            setIsArchiveConfirmationOpen(false);
            setAccountToArchive(null);
        }
    };

    const handleArchiveConfirm = async () => {
        try {
            if (accountToArchive?.id) {
                const accountData = {
                    acc_ID: accountToArchive.id,
                    is_archived: 1,
                };
                await accountService.updateAccount(accountData);

                setSnackbarAction("archive");
                setIsSnackbarOpen(true);

                // Refresh accounts after archive
                const filters = {
                    search: searchTerm,
                    is_archived: mode === "archived" ? 1 : 0,
                    offset: (currentPage - 1) * 10,
                    limit: 10,
                };
                const result = await accountService.viewAccounts(filters);
                if (result.data?.data) {
                    setAccounts(result.data.data);
                }
            }
        } catch (error) {
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
            onClick: (index: number) => {
                handleOpenModal(modalData[index], "edit");
            },
        },
        {
            icon: <ArchiveBox />,
            label: "Archive Account",
            onClick: (index: number) => handleArchiveAccount(index),
        },
    ];

    const moreOptionsForArchived = [
        {
            icon: <RotateLeft />,
            label: "Restore Account",
            onClick: (index: number) => {
                handleRestotrArchiveAccount(index);
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
                                        // TODO: Backend Integration - Add navigation handler
                                        onClick={() => navigate(-1)}
                                    />
                                )}
                                <HamburgerMenu
                                    className="text-szPrimary700 cursor-pointer block md:hidden"
                                    onClick={toggleSidebar}
                                />
                                <h6 className="text-h6 text-szPrimary700">
                                    {mode === "archived"
                                        ? "Archived Accounts"
                                        : "Accounts"}
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
                                                        handleOpenModal(
                                                            {} as AccountDataType,
                                                            "add"
                                                        ),
                                                },
                                                {
                                                    label: "View Archived Accounts",
                                                    icon: <ArchiveBox />,
                                                    onClick: () => {
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
                                totalPages={Math.ceil(
                                    (accounts.length || 0) / 10
                                )}
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
                            setModalMode={setModalMode}
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

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                title={
                    snackbarAction === "add"
                        ? "Successfully added Account"
                        : snackbarAction === "update"
                        ? "Successfully updated Account"
                        : snackbarAction === "archive"
                        ? "Successfully archived Account"
                        : "Successfully restored Account"
                }
                type="success"
            />
        </>
    );
};

export default Accounts;

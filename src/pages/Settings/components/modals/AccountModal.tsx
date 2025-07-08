import React, { useState, useEffect } from "react";
import {
    ConfirmationContent,
    Dropdown,
    Inputs,
    Modal,
    Toggle,
} from "enterprisze-global-components";
import { ArchiveBox, Edit2 } from "iconsax-reactjs";
import ConfirmationModal from "../../../../components/ConfirmationModal";

export interface AccountDataType {
    id: string;
    account: string;
    code: string;
    description?: string;
    status: string;
}

export type ModalMode = "view" | "edit" | "add";

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: AccountDataType[];
    mode: ModalMode;
    selectedAccount?: AccountDataType | null;
    onSave?: (data: AccountDataType) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
    isOpen,
    onClose,
    mode,
    selectedAccount,
    onSave,
}) => {
    // Form state
    const [formData, setFormData] = useState<AccountDataType>({
        id: "",
        account: "",
        code: "",
        description: "",
        status: "",
    });
    const [toggle, setToggle] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);
    const [confirmationAction, setConfirmationAction] = useState<
        "update" | "add" | "archive"
    >("update");

    // TODO: Backend Integration - Add loading state for form operations
    // const [isLoading, setIsLoading] = useState(false);

    // Load selected account data when it changes
    useEffect(() => {
        if (selectedAccount) {
            setFormData(selectedAccount);
            // TODO: Backend Integration - Set archived status from API data
            // setToggle(selectedAccount.isArchived || false);
        } else {
            setFormData({
                id: "",
                account: "",
                code: "",
                description: "",
                status: "pending", // Default status for new accounts
            });
            setToggle(false);
        }
    }, [selectedAccount]);

    // Handle input changes
    const handleInputChange = (field: keyof AccountDataType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // TODO: Backend Integration - Add validation before saving
    const handleSave = async () => {
        try {
            // TODO: Add loading state
            // setIsLoading(true);

            if (onSave) {
                await onSave(formData);
            }
            onClose();
        } catch (error) {
            // TODO: Add error handling
            console.error("Error saving account:", error);
        } finally {
            // TODO: Remove loading state
            // setIsLoading(false);
        }
    };

    const handleConfirmationOpen = (action: "update" | "add" | "archive") => {
        setConfirmationAction(action);
        setIsConfirmationModalOpen(true);
    };

    const getConfirmationProps = () => {
        // const accountName = formData.account || "Account";

        switch (confirmationAction) {
            case "add":
                return {
                    image: "/src/assets/account_confirmation.png",
                    description: `Are you sure to add this account?`,
                    buttonLabel: "Add Account",
                };
            case "archive":
                return {
                    image: "/src/assets/archive_confirmation.png",
                    description: `Are you sure you want to archive this account?`,
                    buttonLabel: "Archive",
                    buttonFooterIcon: <ArchiveBox />,
                };
            case "update":
            default:
                return {
                    image: "/src/assets/update_confirmation.png",
                    description: `Are you sure you want to update this account?`,
                    buttonLabel: "Update Account",
                };
        }
    };

    // Get confirmation content based on action
    const getConfirmationContent = () => {
        switch (confirmationAction) {
            case "add":
                return (
                    <ConfirmationContent
                        title="ADD ACCOUNT"
                        variant="add"
                        data={[
                            //change this based on integration
                            {
                                label: "ACCOUNT NAME",
                                value: formData.account || "—",
                            },
                            {
                                label: "ACCOUNT CODE",
                                value: formData.code || "—",
                            },
                            { label: "STATUS", value: formData.status || "—" },
                            {
                                label: "ACCOUNT DESCRIPTION",
                                value: formData.description || "—",
                            },
                        ]}
                    />
                );
            case "update":
                return (
                    <div className="min-h-[100px]">
                        <ConfirmationContent
                            variant="edit"
                            sectionLabel="ACCOUNT"
                            data={[
                                //change this based on integration
                                {
                                    label: "Account Name",
                                    value: "",
                                    oldValue: selectedAccount?.account || "—",
                                    newValue: formData.account || "—",
                                },
                                {
                                    label: "Account Code",
                                    value: "",
                                    oldValue: selectedAccount?.code || "—",
                                    newValue: formData.code || "—",
                                },
                                {
                                    label: "Status",
                                    value: "",
                                    oldValue: selectedAccount?.status || "—",
                                    newValue: formData.status || "—",
                                },
                                {
                                    label: "Description",
                                    value: "",
                                    oldValue:
                                        selectedAccount?.description || "—",
                                    newValue: formData.description || "—",
                                },
                            ]}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    // Get modal title based on mode
    const getTitle = () => {
        if (mode === "add") return "Add Account";
        if (mode === "edit") return "Edit Account";
        if (mode === "view") return "View Account";
        return "Account";
    };

    // Status options for dropdown - matching API documentation
    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
    ];

    // Footer buttons
    const footerButtons: Array<{
        label: string;
        variant: "ghost" | "primary";
        onClick: () => void;
        size: "medium";
    }> = [
        {
            label: "Cancel",
            variant: "ghost",
            onClick: onClose,
            size: "medium",
        },
    ];

    // Add save button if not in view mode
    if (mode !== "view") {
        footerButtons.push({
            label: mode === "add" ? "Add Account" : "Update Account",
            variant: "primary",
            onClick:
                mode === "edit"
                    ? () => handleConfirmationOpen("update")
                    : () => handleConfirmationOpen("add"),
            size: "medium",
        });
    }

    const confirmationProps = getConfirmationProps();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={getTitle()}
                showButton={mode !== "view" ? false : true}
                buttonLabel="Edit Account"
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                buttonIcon={<Edit2 />}
                headerOptions="left"
                footerOptions="stacked-left"
                footerButtons={footerButtons}
                content={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
                        <div className="flex flex-col gap-[24px]">
                            <Inputs
                                label="ACCOUNT NAME"
                                value={formData.account}
                                onChange={(e) =>
                                    handleInputChange("account", e.target.value)
                                }
                                // TODO: Backend Integration - Add validation
                                // error={errors.account}
                                // disabled={isLoading}
                            />
                            <Inputs
                                label="ACCOUNT CODE"
                                value={formData.code}
                                onChange={(e) =>
                                    handleInputChange("code", e.target.value)
                                }
                                // TODO: Backend Integration - Add validation
                                // error={errors.code}
                                // disabled={isLoading}
                            />
                            <div className="z-20">
                                <Dropdown
                                    label="STATUS"
                                    size="small"
                                    options={statusOptions}
                                    placeholder="Select Status"
                                    value={
                                        formData.status
                                            ? {
                                                  label: formData.status,
                                                  value: formData.status,
                                              }
                                            : undefined
                                    }
                                    onSelectionChange={(value) => {
                                        const statusValue = Array.isArray(value)
                                            ? value[0]?.value
                                            : value?.value;
                                        handleInputChange(
                                            "status",
                                            statusValue || ""
                                        );
                                    }}
                                />
                            </div>

                            {mode === "edit" && (
                                <>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <Toggle
                                                isOn={toggle}
                                                onToggle={() => {
                                                    if (!toggle) {
                                                        handleConfirmationOpen(
                                                            "archive"
                                                        );
                                                    } else {
                                                        setToggle(!toggle);
                                                    }
                                                }}
                                            />
                                            <p>Archived</p>
                                        </div>
                                        <p className="text-caption-reg text-szGrey500">
                                            {toggle
                                                ? "Switch this off to restore the account."
                                                : "Switching this on will result in archiving the account."}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        {/* TODO: Backend Integration - Use actual timestamps from API */}
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                                            Updated mar 23, 2025 08:06 AM
                                        </p>
                                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                                            Created Jan 27, 2025 08:03 PM
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right column */}
                        <Inputs
                            label="ACCOUNT DESCRIPTION"
                            className="h-[256px]"
                            maxCharacter={200}
                            isTextarea
                            value={formData.description || ""}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            // TODO: Backend Integration - Add validation
                            // error={errors.description}
                            // disabled={isLoading}
                        />
                    </div>
                }
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onClick={async () => {
                    try {
                        if (confirmationAction === "archive") {
                            // TODO: Backend Integration - Call archive API
                            // await archiveAccount(selectedAccount?.id).unwrap();
                            setToggle(true);
                            setIsConfirmationModalOpen(false);
                        } else {
                            handleSave();
                            setIsConfirmationModalOpen(false);
                        }
                    } catch (error) {
                        // TODO: Add error handling
                        console.error("Error in confirmation action:", error);
                    }
                }}
                image={confirmationProps.image}
                description={confirmationProps.description}
                buttonLabel={confirmationProps.buttonLabel}
                content={getConfirmationContent()}
                buttonFooterIcon={confirmationProps.buttonFooterIcon}
            />
        </>
    );
};

export default AccountModal;

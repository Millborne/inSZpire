import React, { useState, useEffect } from "react";
import {
    ConfirmationContent,
    Dropdown,
    Inputs,
    Modal,
    SnackbarAlert,
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
    is_archived?: number;
}

export type ModalMode = "view" | "edit" | "add";

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: AccountDataType[];
    mode: ModalMode;
    selectedAccount?: AccountDataType | null;
    onSave?: (data: AccountDataType) => void;
    setModalMode?: (mode: ModalMode) => void;
}

interface ValidationErrors {
    account?: string;
    code?: string;
    status?: string;
    description?: string;
}

const AccountModal: React.FC<AccountModalProps> = ({
    isOpen,
    onClose,
    mode,
    selectedAccount,
    onSave,
    setModalMode,
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
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [noUpdatedSnackbarOpen, setNoUpdatedSnackbarOpen] = useState(false);

    // TODO: Backend Integration - Add loading state for form operations
    // const [isLoading, setIsLoading] = useState(false);

    // Load selected account data when it changes
    useEffect(() => {
        if (selectedAccount) {
            setFormData(selectedAccount);
            setToggle(selectedAccount?.is_archived === 1 ? true : false);
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
        // Clear errors when modal opens or data changes
        setErrors({});
    }, [selectedAccount, isOpen]);

    // Handle input changes
    const handleInputChange = (field: keyof AccountDataType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[field as keyof ValidationErrors]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    // Validation function
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!formData.account?.trim()) {
            newErrors.account = "Account name is required";
        }

        if (!formData.code?.trim()) {
            newErrors.code = "Account code is required";
        }

        if (!formData.status?.trim()) {
            newErrors.status = "Status is required";
        }

        if (!formData.description?.trim()) {
            newErrors.description = "Account description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // TODO: Backend Integration - Add validation before saving
    const handleSave = async () => {
        // Validate form before saving
        if (!validateForm()) {
            return;
        }

        try {
            // TODO: Add loading state
            // setIsLoading(true);

            if (onSave) {
                await onSave({ ...formData, is_archived: toggle ? 1 : 0 });
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
        // Always run validation to show errors, but only proceed if validation passes
        if (action !== "archive") {
            const isValid = validateForm();
            if (!isValid) {
                return; // Don't open confirmation modal if validation fails
            }
        }

        if (action === "update") {
            // Check if any data has been updated
            const hasChanges =
                formData.account !== selectedAccount?.account ||
                formData.code !== selectedAccount?.code ||
                formData.status !== selectedAccount?.status ||
                formData.description !== selectedAccount?.description ||
                toggle !== (selectedAccount?.is_archived === 1);

            if (!hasChanges) {
                setNoUpdatedSnackbarOpen(true);
                return; // Exit if no changes detected
            }
        }

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
                                ...(formData.account !==
                                selectedAccount?.account
                                    ? [
                                          {
                                              label: "Account Name",
                                              value: "",
                                              oldValue:
                                                  selectedAccount?.account ||
                                                  "—",
                                              newValue: formData.account || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.code !== selectedAccount?.code
                                    ? [
                                          {
                                              label: "Account Code",
                                              value: "",
                                              oldValue:
                                                  selectedAccount?.code || "—",
                                              newValue: formData.code || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.status !== selectedAccount?.status
                                    ? [
                                          {
                                              label: "Status",
                                              value: "",
                                              oldValue:
                                                  selectedAccount?.status ||
                                                  "—",
                                              newValue: formData.status || "—",
                                          },
                                      ]
                                    : []),
                                ...(formData.description !==
                                selectedAccount?.description
                                    ? [
                                          {
                                              label: "Description",
                                              value: "",
                                              oldValue:
                                                  selectedAccount?.description ||
                                                  "—",
                                              newValue:
                                                  formData.description || "—",
                                          },
                                      ]
                                    : []),
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
                buttonOnClick={() => {
                    if (mode === "view") {
                        setModalMode?.("edit");
                    }
                }}
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
                                onChange={(
                                    e: React.ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) =>
                                    handleInputChange("account", e.target.value)
                                }
                                // TODO: Backend Integration - Add validation
                                error={!!errors.account}
                                disabled={mode === "view"}
                            />
                            <Inputs
                                label="ACCOUNT CODE"
                                value={formData.code}
                                onChange={(
                                    e: React.ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) => handleInputChange("code", e.target.value)}
                                // TODO: Backend Integration - Add validation
                                error={!!errors.code}
                                disabled={mode === "view"}
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
                                    onSelectionChange={(value: any) => {
                                        const statusValue = Array.isArray(value)
                                            ? value[0]?.value
                                            : value?.value;
                                        handleInputChange(
                                            "status",
                                            statusValue || ""
                                        );
                                    }}
                                    disabled={mode === "view"}
                                />
                                {errors.status && (
                                    <p className="text-caption-reg text-red-500 mt-1">
                                        {errors.status}
                                    </p>
                                )}
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
                            onChange={(
                                e: React.ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ) =>
                                handleInputChange("description", e.target.value)
                            }
                            // TODO: Backend Integration - Add validation
                            error={!!errors.description}
                            disabled={mode === "view"}
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

            <SnackbarAlert
                isOpen={noUpdatedSnackbarOpen}
                onClose={() => {
                    setNoUpdatedSnackbarOpen(false);
                }}
                title={"Please update the details to proceed"}
                type="error"
            />
        </>
    );
};

export default AccountModal;

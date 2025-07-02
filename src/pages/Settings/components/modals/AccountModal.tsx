import React, { useState, useEffect } from "react";
import { Dropdown, Inputs, Modal, Toggle } from "enterprisze-global-components";

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

  // Load selected account data when it changes
  useEffect(() => {
    if (selectedAccount) {
      setFormData(selectedAccount);
    } else {
      setFormData({
        id: "",
        account: "",
        code: "",
        description: "",
        status: "",
      });
    }
  }, [selectedAccount]);

  // Handle input changes
  const handleInputChange = (field: keyof AccountDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  // Get modal title based on mode
  const getTitle = () => {
    if (mode === "add") return "Add Account";
    if (mode === "edit") return "Edit Account";
    if (mode === "view") return "View Account";
    return "Account";
  };

  // Status options for dropdown
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Active", value: "Active" },
    { label: "Idle", value: "Idle" },
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
      onClick: handleSave,
      size: "medium",
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      showButton={mode !== "view" ? false : true}
      buttonLabel="Edit Account"
      modalWidth="w-[900px]"
      contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
      headerOptions="left"
      footerOptions="stacked-left"
      footerButtons={footerButtons}
      content={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-1">
          {/* Left column */}
          <div className="grid gap-[24px]">
            <Inputs
              label="ACCOUNT NAME"
              value={formData.account}
              onChange={(e) => handleInputChange("account", e.target.value)}
            />
            <Inputs
              label="ACCOUNT CODE"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
            />
            <Dropdown
              label="STATUS"
              size="small"
              options={statusOptions}
              placeholder="Select Status"
              value={
                formData.status
                  ? { label: formData.status, value: formData.status }
                  : undefined
              }
              onSelectionChange={(value) => {
                const statusValue = Array.isArray(value)
                  ? value[0]?.value
                  : value?.value;
                handleInputChange("status", statusValue || "");
              }}
            />

            {mode === "edit" && (
              <>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Toggle
                      isOn={toggle}
                      onToggle={() => {
                        setToggle(!toggle);
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
                  <p className="text-caption-all-caps text-szGrey500 uppercase">
                    Updated mar 23, 2025 08:06 AM
                  </p>
                  <p className="text-caption-all-caps text-szGrey500 uppercase">
                    Created Jan 27, 2025 08:03 PM{" "}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right column */}
          <Inputs
            label="ACCOUNT DESCRIPTION"
            className="h-[256px]"
            maxCharacter={500}
            isTextarea
            value={formData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      }
    />
  );
};

export default AccountModal;

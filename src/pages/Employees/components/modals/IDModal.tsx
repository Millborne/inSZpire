import React, { useState, useEffect } from "react";

// icons
import { Edit2 } from "iconsax-reactjs";

// components
import {
  CustomDatePicker,
  Dropdown,
  Inputs,
  Modal,
} from "enterprisze-global-components";

export interface IDdata {
  type: string;
  iDnum: string;
  cardNum: string;
  issuedDate: string;
  validity: string;
  dateAdded: string;
  addedBy: React.ReactNode;
}

interface IDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  mode: "add" | "view" | "edit";
  selectedID: any;
}

const IDModal: React.FC<IDModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  mode,
  selectedID,
}) => {
  const [currentMode, setCurrentMode] = useState<"add" | "view" | "edit">(mode);

  const [form, setForm] = useState({
    type: "", // Dropdown value (string)
    iDnum: "", // Input
    cardNum: "", // Input
    issuedDate: null as Date | null, // CustomDatePicker
    validity: null as Date | null, // CustomDatePicker
  });

  // Dropdown options
  const dropdownOptions = [
    { label: "TIN", value: "tin" },
    { label: "SSS", value: "sss" },
    { label: "PASSPORT", value: "passport" },
    { label: "DRIVING LICENSE", value: "driving-license" },
  ];

  // Map selectedID to form state
  useEffect(() => {
    setCurrentMode(mode);

    if (mode === "add" || !selectedID) {
      setForm({
        type: "",
        iDnum: "",
        cardNum: "",
        issuedDate: null,
        validity: null,
      });
    } else {
      setForm({
        type: selectedID.type?.toLowerCase() || "",
        iDnum: selectedID.iDnum || "",
        cardNum: selectedID.cardNum || "",
        issuedDate: selectedID.issuedDate
          ? new Date(selectedID.issuedDate)
          : null,
        validity: selectedID.validity ? new Date(selectedID.validity) : null,
      });
    }
  }, [mode, selectedID, isOpen]);

  // Dropdown value matching helper
  const getDropdownValue = () =>
    dropdownOptions.find((opt) => opt.value === form.type) || undefined;

  const handleEditClick = () => setCurrentMode("edit");

  const handleInputChange = (field: string, value: string | Date | null) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddOrEdit = () => {
    // You can pass `form` here to a backend or parent handler if needed
    onClose();
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeaderDivider={false}
      title={
        currentMode === "add"
          ? "Add ID"
          : currentMode === "edit"
          ? "Edit ID"
          : "ID"
      }
      contentHeight="h-[65vh]"
      modalWidth="w-[920px]"
      showButton={currentMode === "view"}
      buttonLabel="Edit ID"
      buttonIcon={<Edit2 />}
      buttonOnClick={handleEditClick}
      footerOptions="stacked-left"
      showCloseIcon={false}
      showFooter={currentMode === "view" ? false : true}
      footerButtons={
        currentMode === "view"
          ? [
              {
                label: "Cancel",
                variant: "ghost",
                onClick: () => onClose(),
                size: "medium",
              },
            ]
          : [
              {
                label: "Cancel",
                variant: "ghost",
                onClick: () => onClose(),
                size: "medium",
              },
              {
                label: currentMode === "add" ? "Add" : "Submit",
                variant: "primary",
                onClick: handleAddOrEdit,
                size: "medium",
              },
            ]
      }
      content={
        <div className="flex flex-col w-full gap-[16px]">
          <div className="relative w-full mt-2">
            <Dropdown
              label="CARD TYPE"
              placeholder={currentMode === "add" ? "Select Card Type" : ""}
              options={dropdownOptions}
              value={getDropdownValue()}
              onSelectionChange={(selected) => {
                const val = Array.isArray(selected)
                  ? selected[0]?.value
                  : selected?.value;
                handleInputChange("type", val || "");
              }}
              usePortal={true}
              disabled={currentMode === "view"}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-start relative z-50">
            <Inputs
              label="ACCOUNT NUMBER / ID NUMBER"
              placeholder={
                currentMode === "add" ? "Enter Account Number / ID Number" : ""
              }
              value={form.iDnum}
              onChange={(e) => handleInputChange("iDnum", e.target.value)}
              disabled={currentMode === "view"}
            />
            <Inputs
              label="CARD NUMBER"
              placeholder={currentMode === "add" ? "Enter Card Number" : ""}
              value={form.cardNum}
              onChange={(e) => handleInputChange("cardNum", e.target.value)}
              disabled={currentMode === "view"}
            />
            <CustomDatePicker
              label="ISSUED DATE"
              value={form.issuedDate ? new Date(form.issuedDate) : undefined}
              onChange={(v) => handleInputChange("issuedDate", v)}
              disabled={currentMode === "view"}
            />
            <CustomDatePicker
              label="VALIDITY"
              value={form.validity ? new Date(form.validity) : undefined}
              onChange={(v) => handleInputChange("validity", v)}
              disabled={currentMode === "view"}
            />
          </div>
        </div>
      }
    />
  );
};

export default IDModal;

import React, { useState, useEffect } from "react";

// icons
import { Edit2 } from "iconsax-reactjs";

// components
import {
  CustomDatePicker,
  Dropdown,
  Inputs,
  Modal,
  SnackbarAlert,
} from "enterprisze-global-components";

// utils
import { sanitizeUUID, formatDateForBackend, parseDateForDatePicker } from "../../../../utils";

// services
import {
  useIdsService,
  useIdentifiers,
  type CreateEmployeeIdentifier,
  type UpdateEmployeeIdentifier,
} from "../../../../services/employee-profile/personal/ids";

interface IDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  mode: "add" | "view" | "edit";
  selectedID: any;
  employeeId: string;
}

interface ValidationErrors {
  type?: string;
  iDnum?: string;
  cardNum?: string;
  issuedDate?: string;
  validity?: string;
}

const IDModal: React.FC<IDModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  mode,
  selectedID,
  employeeId,
}) => {
  const idsService = useIdsService();
  const { getDropdownOptions, isLoading: isLoadingIdentifiers } =
    useIdentifiers();
  const [currentMode, setCurrentMode] = useState<"add" | "view" | "edit">(mode);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"error" | "success">(
    "error"
  );

  const [form, setForm] = useState({
    type: "",
    iDnum: "",
    cardNum: "",
    issuedDate: null as Date | null, // CustomDatePicker
    validity: null as Date | null, // CustomDatePicker
  });

  // Loading state for submit operations
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get dropdown options from API
  const dropdownOptions = getDropdownOptions();

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
      // For view/edit mode, use the identifier_name for display in the dropdown
      // The actual identifier_ID is stored in selectedID.identifier_ID for API calls
      setForm({
        type: selectedID.type || "", // identifier_name for display
        iDnum: selectedID.iDnum || "",
        cardNum: selectedID.cardNum || "",
        issuedDate: selectedID.issuedDateOriginal
          ? new Date(selectedID.issuedDateOriginal)
          : null,
        validity: selectedID.validityOriginal
          ? new Date(selectedID.validityOriginal)
          : null,
      });
    }
    // Clear errors when modal opens or data changes
    setErrors({});
  }, [mode, selectedID, isOpen]);

  // Handle service errors
  useEffect(() => {
    if (idsService.actionIsError) {
      const errorMessage =
        idsService.actionError && "data" in idsService.actionError
          ? (idsService.actionError.data as any)?.message
          : (idsService.actionError as any)?.message || "An error occurred";
      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  }, [idsService.actionError]);

  // Dropdown value matching helper
  const getDropdownValue = () => {
    // For view/edit mode, find the option by identifier_name
    if (currentMode === "view" || currentMode === "edit") {
      if (form.type) {
        const foundByName = dropdownOptions.find(
          (opt: any) => opt.label === form.type
        );
        if (foundByName) return foundByName;

        // Fallback: return the display name as is
        return {
          label: form.type,
          value: form.type,
        };
      }
      return undefined;
    }

    // For add mode, try to find by value in dropdown options
    const foundByValue = dropdownOptions.find(
      (opt: any) => opt.value === form.type
    );
    if (foundByValue) return foundByValue;

    return undefined;
  };

  const handleEditClick = () => setCurrentMode("edit");

  const handleInputChange = (field: string, value: string | Date | null) => {
    setForm((prev) => ({
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
    if (!form.type?.trim()) {
      newErrors.type = "Card type is required";
    }

    if (!form.iDnum?.trim()) {
      newErrors.iDnum = "Account/ID number is required";
    }

    if (!form.cardNum?.trim()) {
      newErrors.cardNum = "Card number is required";
    }

    if (!form.issuedDate) {
      newErrors.issuedDate = "Issued date is required";
    }

    if (!form.validity) {
      newErrors.validity = "Validity date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // Helper function to handle API errors
  const handleApiError = (result: any, defaultMessage: string) => {
    if (result.data?.data) {
      // Success case - don't show snackbar here, let parent handle it
      onClose();
      if (onSubmitSuccess) onSubmitSuccess();
    } else {
      // Error case - show error snackbar
      const errorMessage =
        result.error && "data" in result.error
          ? (result.error.data as any)?.message
          : (result.error as any)?.message || "An error occurred";
      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddOrEdit = async () => {
    // Validate form before saving
    if (!validateForm()) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarType("error");
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (currentMode === "add") {
        const identifierData: CreateEmployeeIdentifier = {
          card_number: form.cardNum,
          account_number: form.iDnum,
          employee_ID: sanitizeUUID(employeeId),
          identifier_ID: sanitizeUUID(form.type), // For add mode, use the selected dropdown value
          issued_date: formatDateForBackend(form.issuedDate),
          validity_date: formatDateForBackend(form.validity),
          is_archived: 0,
          created_by: sanitizeUUID("00000000000000000000000000000000"), // Fallback user ID
        };

        const result = await idsService.createEmployeeIdentifier(
          identifierData
        );

        handleApiError(result, "ID added successfully");
      } else if (currentMode === "edit" && selectedID?.id) {
        // For edit mode, we need to find the identifier_ID from the dropdown options
        // since form.type contains the display name (label)
        const selectedOption = dropdownOptions.find(
          (opt: any) => opt.label === form.type
        );
        const identifier_ID = selectedOption
          ? selectedOption.value
          : selectedID.identifier_ID;

        const identifierData: UpdateEmployeeIdentifier = {
          employee_identifier_ID: sanitizeUUID(selectedID.id),
          card_number: form.cardNum,
          account_number: form.iDnum,
          employee_ID: sanitizeUUID(employeeId),
          identifier_ID: sanitizeUUID(identifier_ID),
          issued_date: formatDateForBackend(form.issuedDate),
          validity_date: formatDateForBackend(form.validity),
          updated_by: sanitizeUUID("00000000000000000000000000000000"), // Fallback user ID
        };

        const result = await idsService.updateEmployeeIdentifier(
          identifierData
        );

        handleApiError(result, "ID updated successfully");
      }
    } catch (error) {
      console.error("Error saving ID:", error);
      setSnackbarMessage("Failed to save ID. Please try again.");
      setSnackbarType("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                  disabled: isSubmitting,
                },
                {
                  label: isSubmitting
                    ? "Submitting..."
                    : currentMode === "add"
                    ? "Add"
                    : "Submit",
                  variant: "primary",
                  onClick: handleAddOrEdit,
                  size: "medium",
                  loading: isSubmitting,
                  disabled: isSubmitting,
                },
              ]
        }
        content={
          <div className="flex flex-col w-full gap-[16px]">
            <div className="relative w-full mt-2">
              <Dropdown
                label="CARD TYPE"
                size="small"
                placeholder={
                  isLoadingIdentifiers
                    ? "Loading..."
                    : currentMode === "add"
                    ? "Select Card Type"
                    : ""
                }
                options={dropdownOptions}
                value={getDropdownValue()}
                onSelectionChange={(selected) => {
                  const val = Array.isArray(selected)
                    ? selected[0]?.value
                    : selected?.value;

                  if (currentMode === "add") {
                    handleInputChange("type", val || "");
                  } else {
                    // In edit mode, store the display name for the dropdown
                    const selectedOption = dropdownOptions.find(
                      (opt: any) => opt.value === val
                    );
                    handleInputChange(
                      "type",
                      selectedOption ? selectedOption.label : val || ""
                    );
                  }
                }}
                usePortal={true}
                disabled={
                  currentMode === "view" || isLoadingIdentifiers || isSubmitting
                }
              />
              {errors.type && (
                <p className="text-caption-reg text-red-500 mt-1">
                  {errors.type}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-start relative z-50">
              <Inputs
                label="ACCOUNT NUMBER / ID NUMBER"
                placeholder={
                  currentMode === "add"
                    ? "Enter Account Number / ID Number"
                    : ""
                }
                value={form.iDnum}
                onChange={(e) => handleInputChange("iDnum", e.target.value)}
                disabled={currentMode === "view"}
                error={!!errors.iDnum}
              />

              <Inputs
                label="CARD NUMBER"
                placeholder={currentMode === "add" ? "Enter Card Number" : ""}
                value={form.cardNum}
                onChange={(e) => handleInputChange("cardNum", e.target.value)}
                disabled={currentMode === "view"}
                error={!!errors.cardNum}
              />

              <CustomDatePicker
                label="ISSUED DATE"
                value={form.issuedDate ? new Date(form.issuedDate) : undefined}
                onChange={(v) => handleInputChange("issuedDate", v)}
                disabled={currentMode === "view"}
                error={!!errors.issuedDate}
              />

              <CustomDatePicker
                label="VALIDITY"
                value={form.validity ? new Date(form.validity) : undefined}
                onChange={(v) => handleInputChange("validity", v)}
                disabled={currentMode === "view"}
                error={!!errors.validity}
              />
            </div>
          </div>
        }
      />
      <SnackbarAlert
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        title={snackbarMessage}
        type={snackbarType}
      />
    </>
  );
};

export default IDModal;

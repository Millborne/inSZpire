import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import { useUpdateEmployeeMutation } from "../../../services/employee-profile/work/employee-history/employeeHistoryAPI";
import type { EmployeePositionData } from "./EmployeePositionModal";
import Layer2 from "../../../../assets/Layer_2.svg";

interface EmployeePositionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeePositionData: EmployeePositionData[];
  onSubmitSuccess?: () => void;
  employeeID: string;
  updatedBy: string;
}

const EmployeePositionConfirmationModal: React.FC<EmployeePositionConfirmationModalProps> = ({
  isOpen,
  onClose,
  employeePositionData,
  onSubmitSuccess,
  employeeID,
  updatedBy,
}) => {
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePosition = async () => {
    if (!employeePositionData[0]) return;

    const payload = {
      employee_ID: employeeID,
      current_position_ID: employeePositionData[0].position?.value,
      position_status_ID: employeePositionData[0].positionStatus?.value,
      start_date: employeePositionData[0].startDate,
      updated_by: updatedBy,

      // ✅ New: Provide a real change_type_ID from your tbl_change_type
      change_type_ID: "641e194c525f11f0b6b802dcb324866b" // ← Replace this with actual ID (e.g., "Promotion")
    };

    try {
      setIsSubmitting(true);
      await updateEmployee(payload).unwrap();
      onSubmitSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error updating employee:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeaderDivider={false}
      showFooterDivider={false}
      icon={<InfoCircle />}
      title="Confirmation"
      showButton={false}
      modalWidth="w-[600px]"
      contentHeight="h-[383px]"
      headerOptions="left"
      footerOptions="center"
      showCloseIcon={false}
      footerButtons={[
        {
          label: "Cancel",
          variant: "ghost",
          onClick: () => onClose(),
          size: "medium",
        },
        {
          label: isSubmitting ? "Updating..." : "Update Position",
          variant: "primary",
          onClick: handleUpdatePosition,
          size: "medium",
          disabled: isSubmitting,
        },
      ]}
      content={
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <img
              src={Layer2}
              alt="Layer 2"
              className="w-[80px] h-[80px] mx-auto"
            />
            <p className="text-body-base-strong text-szBlack800 text-center">
              You are about to update the position of John Smith Fernandez
            </p>
            <div className="flex flex-col gap-[16px]">
              <ConfirmationContent
                variant="edit"
                sectionLabel="POSITION"
                data={[
                  {
                    label: "START DATE",
                    value: "",
                    oldValue: "",
                    newValue: employeePositionData[0]?.startDate || "",
                  },
                  {
                    label: "POSITION",
                    value: "",
                    oldValue: "Junior Software Developer",
                    newValue: employeePositionData[0]?.position?.label || "",
                  },
                  {
                    label: "POSITION STATUS",
                    value: "",
                    oldValue: "Regular",
                    newValue: employeePositionData[0]?.positionStatus?.label || "",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EmployeePositionConfirmationModal;




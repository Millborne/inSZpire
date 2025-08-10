// Employees/components/modals/EmployeePositionConfirmationModal.tsx
import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { useState } from "react";
import { employeePositionData } from "./EmployeePositionModal";
import Layer2 from "../../../../assets/Layer_2.svg";
import { useActionEmployeeHistoryMutation } from "../../../../services/employee-profile/work/employee-history/employeeHistoryAPI";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  employeePositionData: employeePositionData[];
  onSubmitSuccess?: () => void;
  employeeID: string; // required
  updatedBy: string;  // required
};

const EmployeePositionConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  employeePositionData,
  onSubmitSuccess,
  employeeID,
  updatedBy,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mutate] = useActionEmployeeHistoryMutation();

  // We only ever send one record
  const form = employeePositionData?.[0];

  const handleUpdate = async () => {
    if (!form) return;

    // Guard: must have a position & status selected
    if (!form.position || !form.positionStatus) {
      alert("Please select a Position and a Position Status.");
      return;
    }

    const queryParameters = "/update";

    // Build payload but skip empty/undefined values
    const payload: Record<string, any> = {
      employee_ID: employeeID,
      updated_by: updatedBy,
    };
    if (form.position) payload.current_position_ID = form.position;
    if (form.positionStatus) payload.position_status_ID = form.positionStatus;
    // If you later send these, add them conditionally too:
    // if (form.startDate) payload.start_date = form.startDate;

    try {
      setSubmitLoading(true);
      console.log("🟦 PUT /employee-history/update payload:", payload);

      await mutate({
        queryParameters,
        method: "PUT",
        body: payload,
      }).unwrap();

      onSubmitSuccess?.(); // parent refetch
      onClose();
    } catch (e: any) {
      // Surface a useful error message
      const message =
        e?.data?.message ||
        e?.data?.error ||
        (typeof e?.data === "string" ? e.data : "") ||
        e?.error ||
        "Update failed (no message from server).";

      console.error("🟥 Update position failed:", e);
      alert(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const disabled =
    submitLoading ||
    !form ||
    !form.startDate ||
    !form.position ||
    !form.positionStatus;

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
        { label: "Cancel", variant: "ghost", onClick: onClose, size: "medium" },
        {
          label: submitLoading ? "Updating..." : "Update Position",
          variant: "primary",
          onClick: handleUpdate,
          size: "medium",
          disabled,
        },
      ]}
      content={
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <img src={Layer2} alt="Layer 2" className="w-[80px] h-[80px] mx-auto" />
            <p className="text-body-base-strong text-szBlack800 text-center">
              Please confirm the new position details.
            </p>
            <div className="flex flex-col gap-[16px]">
              <ConfirmationContent
                variant="edit"
                sectionLabel="POSITION"
                data={[
                  { label: "START DATE", value: "", oldValue: "", newValue: form?.startDate ?? "" },
                  { label: "POSITION (ID)", value: "", oldValue: "", newValue: form?.position ?? "" },
                  { label: "POSITION STATUS (ID)", value: "", oldValue: "", newValue: form?.positionStatus ?? "" },
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








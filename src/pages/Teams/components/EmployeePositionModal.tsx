import { useMemo, useState } from "react";
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";
import type { Option } from "enterprisze-global-components";
import EmployeePositionConfirmationModal from "./EmployeePositionConfirmationModal";
import { useGetPositionsQuery } from "../../../services/settings/positions/list/positionsAPI";

export interface EmployeePositionData {
  startDate: string;
  position: Option | null;
  positionStatus: Option | null;
}

export interface EmployeePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  currentPositionID?: string; // 👈 important
}

const EmployeePositionModal: React.FC<EmployeePositionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  currentPositionID,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [form, setForm] = useState<EmployeePositionData>({
    startDate: "",
    position: null,
    positionStatus: null,
  });

  const { data, isLoading, isError } = useGetPositionsQuery({}, { skip: !isOpen });

  const normalizedCurrentPosID = currentPositionID
    ? String(currentPositionID)
    : undefined;

  const allPositionOptions: Option[] = data?.positionOptions ?? [];
  const positionStatusOptions: Option[] = data?.statusOptions ?? [];

  const positionOptions: Option[] = useMemo(() => {
    if (!normalizedCurrentPosID) return allPositionOptions;
    return allPositionOptions.filter((o) => o.value !== normalizedCurrentPosID);
  }, [allPositionOptions, normalizedCurrentPosID]);

  const busy = isLoading;
  const isValid =
    !!form.startDate && !!form.position?.value && !!form.positionStatus?.value;

  const handleProceed = () => {
    if (!isValid) return;
    setShowConfirmationModal(true);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        showHeaderDivider={false}
        title="Update Position for Employee"
        modalWidth="w-[900px]"
        contentHeight="h-[383px]"
        showButton={false}
        footerOptions="stacked-left"
        footerButtons={[
          { label: "Cancel", variant: "ghost", onClick: onClose, size: "medium" },
          {
            label: busy ? "Loading..." : "Proceed",
            variant: "primary",
            onClick: handleProceed,
            size: "medium",
            disabled: busy || isError || !isValid,
          },
        ]}
        content={
          <div className="flex flex-col w-full gap-[16px]">
            <div className="grid grid-cols-1 gap-4 pt-1 items-start relative z-50">
              <Inputs
                label="START DATE"
                placeholder="12/01/2022"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />

              <div className="flex flex-col lg:flex-row gap-[16px] z-50">
                <Dropdown
                  label="POSITION"
                  placeholder={busy ? "Loading..." : "Select Position"}
                  options={positionOptions}
                  value={form.position ?? undefined}
                  disabled={busy || isError}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) setForm({ ...form, position: val });
                  }}
                />

                <Dropdown
                  label="POSITION STATUS"
                  placeholder={busy ? "Loading..." : "Select Status"}
                  options={positionStatusOptions}
                  value={form.positionStatus ?? undefined}
                  disabled={busy || isError}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) setForm({ ...form, positionStatus: val });
                  }}
                />
              </div>

              {isError && (
                <div className="text-red-600 text-sm">
                  Failed to load dropdown data. Please try again.
                </div>
              )}
            </div>
          </div>
        }
      />

      <EmployeePositionConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        employeePositionData={[
          {
            startDate: form.startDate,
            position: form.position,
            positionStatus: form.positionStatus,
          },
        ]}
        employeeID="ab36a77420d74d5490175fdd6b27c5b9"
        updatedBy="ffe063c8dfe942728541670773163f73"
        onSubmitSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default EmployeePositionModal;





















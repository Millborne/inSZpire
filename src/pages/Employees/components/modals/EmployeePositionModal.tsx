// Employees/components/modals/EmployeePositionModal.tsx

import { useMemo, useState } from "react";
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";
import type { Option } from "enterprisze-global-components";
import EmployeePositionConfirmationModal from "./EmployeePositionConfirmationModal";
import { useGetPositionsQuery } from "../../../../services/settings/positions/list/positionsAPI";

export interface employeePositionData {
  startDate: string;
  position: string;        // Option.value (position_ID)
  positionStatus: string;  // Option.value (status ID or name, depending on backend)
}

interface EmployeePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  currentPositionId?: string; // optional: filter this id out of the dropdown
  /** required by the confirmation modal */
  employeeID: string;
  updatedBy: string;
}

const EmployeePositionModal: React.FC<EmployeePositionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  currentPositionId,
  employeeID,
  updatedBy,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [startDate, setStartDate] = useState<string>("");
  const [position, setPosition] = useState<Option | null>(null);
  const [positionStatus, setPositionStatus] = useState<Option | null>(null);

  // fetch dropdowns only when modal is open
  const { data, isLoading, isError } = useGetPositionsQuery({}, { skip: !isOpen });

  const allPositionOptions: Option[] = data?.positionOptions ?? [];
  const statusOptions: Option[] = data?.statusOptions ?? [];

  // optionally remove the "current" position so it can't be selected again
  const positionOptions: Option[] = useMemo(() => {
    if (!currentPositionId) return allPositionOptions;
    return allPositionOptions.filter((o) => o.value !== currentPositionId);
  }, [allPositionOptions, currentPositionId]);

  const busy = isLoading;
  const isValid =
    !!startDate && !!position?.value && !!positionStatus?.value && !busy && !isError;

  const handleConfirmationClose = () => setShowConfirmationModal(false);

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
            disabled: !isValid,
          },
        ]}
        content={
          <div className="flex flex-col w-full gap-[16px]">
            <div className="grid grid-cols-1 gap-4 pt-1 items-start relative z-50">
              <Inputs
                label="START DATE"
                placeholder="2025-08-01"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <div className="flex flex-col lg:flex-row gap-[16px] z-50">
                <Dropdown
                  label="POSITION"
                  placeholder={busy ? "Loading..." : "Select Position"}
                  options={positionOptions}
                  value={position ?? undefined}
                  disabled={busy || isError}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) setPosition(val);
                  }}
                />

                <Dropdown
                  label="POSITION STATUS"
                  placeholder={busy ? "Loading..." : "Select Status"}
                  options={statusOptions}
                  value={positionStatus ?? undefined}
                  disabled={busy || isError}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) setPositionStatus(val);
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

      {/* Pass the selected values + IDs to the confirmation modal */}
      <EmployeePositionConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleConfirmationClose}
        employeePositionData={
          isValid
            ? [
                {
                  startDate,
                  position: String(position?.value),
                  positionStatus: String(positionStatus?.value),
                },
              ]
            : []
        }
        employeeID={employeeID}
        updatedBy={updatedBy}
        onSubmitSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default EmployeePositionModal;








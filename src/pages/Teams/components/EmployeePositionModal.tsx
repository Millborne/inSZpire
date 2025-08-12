import { useState } from "react";
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";
import EmployeePositionConfirmationModal from "./EmployeePositionConfirmationModal";
import type { Option } from "enterprisze-global-components";

export interface EmployeePositionData {
  startDate: string;
  position: Option | null;
  positionStatus: Option | null;
}

interface EmployeePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const EmployeePositionModal: React.FC<EmployeePositionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [form, setForm] = useState<EmployeePositionData>({
    startDate: "",
    position: null,
    positionStatus: null,
  });

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
  };

  const handleProceed = () => {
    setShowConfirmationModal(true);
    onClose();
  };

  // ✅ Replace these values with the actual UUIDs from your DB
  const positionOptions: Option[] = [
    { label: "Developer I", value: "26f3aeef526211f0b6b802dcb324866b" },
    { label: "Developer II", value: "fc01fee95e8a11f0b4b102dcb324866b" },
  ];

  const positionStatusOptions: Option[] = [
  {
    label: "Active",
    value: "1a23aec4526211f0b6b802dcb324866b",
  },
  {
    label: "Training",
    value: "1a23b074526211f0b6b802dcb324866b",
  },
  {
    label: "Promoted",
    value: "1a23b100526211f0b6b802dcb324866b", // ✅ confirmed in DB
  },
  {
    label: "Transferred",
    value: "1a23b128526211f0b6b802dcb324866b",
  },
  {
    label: "Closed",
    value: "1a23b14a526211f0b6b802dcb324866b",
  },
];



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
          {
            label: "Cancel",
            variant: "ghost",
            onClick: () => onClose(),
            size: "medium",
          },
          {
            label: "Proceed",
            variant: "primary",
            onClick: handleProceed,
            size: "medium",
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
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />

              <div className="flex flex-col lg:flex-row gap-[16px] z-50">
                <Dropdown
                  label="POSITION"
                  placeholder="Select Position"
                  options={positionOptions}
                  value={form.position ?? undefined}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) {
                      setForm({ ...form, position: val });
                    }
                  }}
                />

                <Dropdown
                  label="POSITION STATUS"
                  placeholder="Select Status"
                  options={positionStatusOptions}
                  value={form.positionStatus ?? undefined}
                  onSelectionChange={(val) => {
                    if (!Array.isArray(val)) {
                      setForm({ ...form, positionStatus: val });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        }
      />

      <EmployeePositionConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleConfirmationClose}
        employeePositionData={[form]}
        onSubmitSuccess={onSubmitSuccess}
        employeeID="ab36a77420d74d5490175fdd6b27c5b9" // ← your actual employee_ID
        updatedBy="ffe063c8dfe942728541670773163f73"   // ← current user ID (hex string)
      />
    </>
  );
};

export default EmployeePositionModal;








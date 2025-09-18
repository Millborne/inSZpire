import React from "react";
import ConfirmationModal from "../ConfirmationModal";
import { TextContent, Avatar } from "enterprisze-global-components";
import { ArrowRight } from "iconsax-reactjs";
import { Employee } from "../../../../../types/team";

interface BatchAddConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  selectedEmployees: Employee[];
  selectedPosition: string;
  teamName?: string;
}

const BatchAddConfirmationModal: React.FC<BatchAddConfirmationModalProps> = ({
  isOpen,
  onClose,
  onClick,
  selectedEmployees,
  selectedPosition,
  teamName = "Team Name",
}) => {
  // Get position display name from the position value
  const getPositionDisplayName = (positionValue: string) => {
    const positionMap: { [key: string]: string } = {
      "junior-web-developer": "Junior Web Developer",
      "quality-assurance": "Quality Assurance",
      "backend-engineer": "Backend Engineer",
      "ux-designer": "UX Designer",
      "devops-engineer": "DevOps Engineer",
      "product-manager": "Product Manager",
    };
    return positionMap[positionValue] || positionValue;
  };

  const positionDisplayName = getPositionDisplayName(selectedPosition);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onClick={onClick}
      description=""
      content={
        <div className="flex flex-col gap-4">
          <span className="text-body-base-strong text-szBlack800 text-center">
            You are about to add these employees to{" "}
            <span className="text-szPrimary700">{teamName}</span>.
          </span>

          <div className="flex flex-col gap-3">
            {selectedEmployees.map((employee, index) => (
              <div
                key={employee.id}
                className="flex justify-between items-center gap-5"
              >
                <div className="flex-1">
                  <TextContent header="Employee Name" text={employee.name} />
                </div>

                <span>
                  <ArrowRight className="text-szPrimary900" />
                </span>

                <div className="flex-1">
                  <TextContent
                    header="Position"
                    text={`${positionDisplayName} ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      buttonLabel="Batch Add Employee"
      contentHeight="h-auto min-h-[200px] max-h-[60vh]"
    />
  );
};

export default BatchAddConfirmationModal;

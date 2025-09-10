import { Modal, Stepper } from "enterprisze-global-components";
import React, { useState } from "react";

//components
import AddEmployeesStep from "./AddEmployeesStep";
import TeamCheckbox from "../../../../../components/TeamCheckbox";
import EmployeeeChecbox from "../../../../../components/EmployeeeChecbox";

interface BatchAddTeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BatchAddTeamMembersModal: React.FC<BatchAddTeamMembersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={false}
      showButton={false}
      footerOptions="stacked-left"
      footerButtons={[
        { label: "Cancel", variant: "ghost", size: "medium", onClick: onClose },
        {
          label: "Continue",
          variant: "primary",
          size: "medium",
          onClick: () => {
            if (currentStepIndex < 1) {
              setCurrentStepIndex(currentStepIndex + 1);
            }
          },
        },
      ]}
      title="Add Team Member(s)"
      modalWidth="w-[900px]"
      contentHeight="h-[400px] min-h-[120px] max-h-[56vh]"
      content={
        <div className="flex flex-col gap-[8px] justify-center items-center">
          <Stepper
            steps={[
              {
                id: "1",
                stepType: "number",
                stepNumber: 1,
                isActive: currentStepIndex === 0,
                labelText: "EMPLOYEES",
              },
              {
                id: "2",
                stepType: "number",
                stepNumber: 2,
                isActive: currentStepIndex === 1,
                labelText: "POSITION",
              },
            ]}
            connectorType="solid"
            showConnectors={true}
            connected={false}
            currentStepIndex={currentStepIndex}
            orientation="horizontal"
          />
          <p className="text-body-small-strong text-szDarkGrey600">
            You can only add new members to the team if there are available
            positions and that position is enabled for batch transfers.
          </p>
          <div className="w-full my-[8px]">
            {/* <AddEmployeesStep /> */}
            {/* <TeamCheckbox
              teamName="Business Solutions & Innovation"
              managedBy="Dino Flores"
              selectedCount={1}
              totalCount={25}
              onChange={() => {}}
            />
            <EmployeeeChecbox
              name="John Doe"
              team="Business Solutions & Innovation"
              role="Software Engineer"
              avatar="https://i.pravatar.cc/150?img=5"
              onChange={() => {}}
            /> */}
          </div>
        </div>
      }
    />
  );
};

export default BatchAddTeamMembersModal;

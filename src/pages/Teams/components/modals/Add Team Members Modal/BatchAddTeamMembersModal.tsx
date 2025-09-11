import { Modal, Stepper } from "enterprisze-global-components";
import React, { useState } from "react";

//components
import AddEmployeesStep from "./AddEmployeesStep";
import TeamCheckbox from "../../../../../components/TeamCheckbox";
import EmployeeeChecbox from "../../../../../components/EmployeeeChecbox";
import SearchTeamGroup from "../../../../../components/SearchTeamGroup";

interface BatchAddTeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleEmployees = [
  {
    id: 1,
    name: "Stephanie Germanotta",
    team: "Business Solutions & Innovation",
    role: "Senior Web Developer",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    name: "John Smith",
    team: "Business Solutions & Innovation",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    team: "Business Solutions & Innovation",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 4,
    name: "John Brown",
    team: "HR Services",
    role: "Recruitment Manager",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 5,
    name: "Emily Davis",
    team: "HR Services",
    role: "Payroll Manager",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 6,
    name: "David Wilson",
    team: "IT Helpdesk",
    role: "IT Helpdesk 1",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Lisa Anderson",
    team: "IT Helpdesk",
    role: "IT Helpdesk 1",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Robert Taylor",
    team: "Accounting & Finance",
    role: "Finance Manager",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

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
      modalWidth="w-[910px]"
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
          <div className="flex flex-col w-full gap-[8px]">
            <AddEmployeesStep />
            {/* <div className="flex flex-col w-full gap-[8px] max-h-[185px] 2xl:max-h-[270px] overflow-y-auto">
              {sampleEmployees.map((employee) => (
                <div className="flex flex-col w-full gap-[12px] border border-szGrey300 rounded-[8px] px-[16px] py-[8px]">
                  <EmployeeeChecbox
                    name={employee.name}
                    team={employee.team}
                    role={employee.role}
                    avatar={employee.avatar}
                    onChange={() => {}}
                  />
                </div>
              ))}
            </div> */}
            <SearchTeamGroup
              teamCheckboxes={{
                teamName: "Business Solutions & Innovation",
                managedBy: "Dino Flores",
                selectedCount: 1,
                totalCount: 25,
                onChange: () => {},
              }}
              accessModeFilter="all"
              employees={sampleEmployees}
            />
          </div>
        </div>
      }
    />
  );
};

export default BatchAddTeamMembersModal;

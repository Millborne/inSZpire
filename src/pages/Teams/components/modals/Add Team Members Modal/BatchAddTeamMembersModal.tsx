import { Modal, Stepper, SnackbarAlert } from "enterprisze-global-components";
import React, { useState } from "react";

//components
import BatchAddEmployeesStep from "./BatchAddEmployeesStep";
import BatchAddConfirmationModal from "./BatchAddConfirmationModal";

//types
import { Team, Employee } from "../../../../../types/team";
import BatchAddEmployeesStep2 from "./BatchAddEmployeesStep2";
import { Add } from "iconsax-reactjs";

interface BatchAddTeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Team data structure with employees
const teamsData: Team[] = [
  {
    team_ID: "1",
    team_name: "Business Solutions & Innovation",
    team_code: "BSI",
    managedBy: "Dino Flores",
    employees: [
      {
        id: "1",
        name: "Stephanie Germanotta",
        position: "Senior Web Developer",
        jobTitle: "Senior Web Developer",
        team: "Business Solutions & Innovation",
        nodeReference: 1,
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "2",
        name: "John Smith",
        position: "Frontend Developer",
        jobTitle: "Frontend Developer",
        team: "Business Solutions & Innovation",
        nodeReference: 2,
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "3",
        name: "Sarah Johnson",
        position: "Product Manager",
        jobTitle: "Product Manager",
        team: "Business Solutions & Innovation",
        nodeReference: 3,
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "9",
        name: "Michael Chen",
        position: "UX Designer",
        jobTitle: "UX Designer",
        team: "Business Solutions & Innovation",
        nodeReference: 4,
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "10",
        name: "Amanda Rodriguez",
        position: "Backend Developer",
        jobTitle: "Backend Developer",
        team: "Business Solutions & Innovation",
        nodeReference: 5,
        avatar: "https://i.pravatar.cc/150?img=10",
      },
    ],
  },
  {
    team_ID: "2",
    team_name: "HR Services",
    team_code: "HRS",
    managedBy: "Jennifer Martinez",
    employees: [
      {
        id: "4",
        name: "John Brown",
        position: "Recruitment Manager",
        jobTitle: "Recruitment Manager",
        team: "HR Services",
        nodeReference: 6,
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "5",
        name: "Emily Davis",
        position: "Payroll Manager",
        jobTitle: "Payroll Manager",
        team: "HR Services",
        nodeReference: 7,
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      {
        id: "11",
        name: "Kevin Thompson",
        position: "HR Generalist",
        jobTitle: "HR Generalist",
        team: "HR Services",
        nodeReference: 8,
        avatar: "https://i.pravatar.cc/150?img=11",
      },
    ],
  },
  {
    team_ID: "3",
    team_name: "IT Helpdesk",
    team_code: "ITD",
    managedBy: "Alex Johnson",
    employees: [
      {
        id: "6",
        name: "David Wilson",
        position: "IT Helpdesk 1",
        jobTitle: "IT Helpdesk 1",
        team: "IT Helpdesk",
        nodeReference: 9,
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      {
        id: "7",
        name: "Lisa Anderson",
        position: "IT Helpdesk 1",
        jobTitle: "IT Helpdesk 1",
        team: "IT Helpdesk",
        nodeReference: 10,
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      {
        id: "12",
        name: "Mark Stevens",
        position: "IT Support Specialist",
        jobTitle: "IT Support Specialist",
        team: "IT Helpdesk",
        nodeReference: 11,
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
  },
  {
    team_ID: "4",
    team_name: "Accounting & Finance",
    team_code: "ACF",
    managedBy: "Maria Garcia",
    employees: [
      {
        id: "8",
        name: "Robert Taylor",
        position: "Finance Manager",
        jobTitle: "Finance Manager",
        team: "Accounting & Finance",
        nodeReference: 12,
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: "13",
        name: "Jennifer Lee",
        position: "Senior Accountant",
        jobTitle: "Senior Accountant",
        team: "Accounting & Finance",
        nodeReference: 13,
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: "14",
        name: "Carlos Mendez",
        position: "Financial Analyst",
        jobTitle: "Financial Analyst",
        team: "Accounting & Finance",
        nodeReference: 14,
        avatar: "https://i.pravatar.cc/150?img=14",
      },
    ],
  },
  {
    team_ID: "5",
    team_name: "Marketing & Communications",
    team_code: "MKC",
    managedBy: "Rachel Green",
    employees: [
      {
        id: "15",
        name: "Sophie Williams",
        position: "Marketing Manager",
        jobTitle: "Marketing Manager",
        team: "Marketing & Communications",
        nodeReference: 15,
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      {
        id: "16",
        name: "Tom Anderson",
        position: "Content Writer",
        jobTitle: "Content Writer",
        team: "Marketing & Communications",
        nodeReference: 16,
        avatar: "https://i.pravatar.cc/150?img=16",
      },
      {
        id: "17",
        name: "Nina Patel",
        position: "Social Media Specialist",
        jobTitle: "Social Media Specialist",
        team: "Marketing & Communications",
        nodeReference: 17,
        avatar: "https://i.pravatar.cc/150?img=17",
      },
    ],
  },
  {
    team_ID: "6",
    team_name: "Unaffiliated",
    team_code: "UNA",
    managedBy: "None",
    employees: [
      {
        id: "18",
        name: "James Wilson",
        position: "Consultant",
        jobTitle: "Consultant",
        team: "Unaffiliated",
        nodeReference: 18,
        avatar: "https://i.pravatar.cc/150?img=18",
      },
      {
        id: "19",
        name: "Anna Kowalski",
        position: "Freelancer",
        jobTitle: "Freelancer",
        team: "Unaffiliated",
        nodeReference: 19,
        avatar: "https://i.pravatar.cc/150?img=19",
      },
      {
        id: "20",
        name: "Daniel Kim",
        position: "Contractor",
        jobTitle: "Contractor",
        team: "Unaffiliated",
        nodeReference: 20,
        avatar: "https://i.pravatar.cc/150?img=20",
      },
    ],
  },
];

const BatchAddTeamMembersModal: React.FC<BatchAddTeamMembersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedTeamIds, setSelectedTeamIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  // Reset state when modal is closed
  const handleClose = () => {
    setCurrentStepIndex(0);
    setSelectedEmployees([]);
    setSelectedEmployeeIds(new Set());
    setSelectedTeamIds(new Set());
    setSelectedPosition("");
    setConfirmationModalOpen(false);
    setShowSuccessSnackbar(false);
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        showCloseIcon={false}
        showButton={false}
        footerOptions="stacked-left"
        footerButtons={[
          {
            label: currentStepIndex === 1 ? "Back" : "Cancel",
            variant: "ghost",
            size: "medium",
            onClick:
              currentStepIndex === 1
                ? () => setCurrentStepIndex(0)
                : handleClose,
          },
          {
            label: currentStepIndex === 1 ? "Team member" : "Continue",
            variant: "primary",
            size: "medium",
            leftIcon: currentStepIndex === 1 ? <Add /> : undefined,
            onClick: () => {
              if (currentStepIndex < 1) {
                setCurrentStepIndex(currentStepIndex + 1);
              } else {
                // Open confirmation modal
                setConfirmationModalOpen(true);
              }
            },
            disabled:
              (currentStepIndex === 0 && selectedEmployees.length === 0) ||
              (currentStepIndex === 1 &&
                (!selectedPosition || selectedEmployees.length === 0)),
          },
        ]}
        title="Add Team Member(s)"
        modalWidth="w-full max-w-[910px]"
        contentHeight="h-[320px]"
        content={
          <div className="flex flex-col gap-[8px] items-center h-full">
            <Stepper
              steps={[
                {
                  id: "1",
                  stepType: currentStepIndex === 0 ? "number" : "checked",
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
            <div className="flex flex-col w-full gap-[8px] h-full">
              {currentStepIndex === 0 ? (
                <BatchAddEmployeesStep
                  data={teamsData}
                  onSelectionChange={(employees, employeeIds, teamIds) => {
                    setSelectedEmployees(employees);
                    setSelectedEmployeeIds(employeeIds);
                    setSelectedTeamIds(teamIds);
                  }}
                  selectedEmployeeIds={selectedEmployeeIds}
                  selectedTeamIds={selectedTeamIds}
                />
              ) : (
                <BatchAddEmployeesStep2
                  selectedEmployees={selectedEmployees}
                  onPositionChange={setSelectedPosition}
                />
              )}
            </div>
          </div>
        }
      />

      <BatchAddConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onClick={() => {
          setConfirmationModalOpen(false);
          setShowSuccessSnackbar(true);
          // Reset form state
          setCurrentStepIndex(0);
          setSelectedEmployees([]);
          setSelectedEmployeeIds(new Set());
          setSelectedTeamIds(new Set());
          setSelectedPosition("");
          // Close modal after a short delay to allow snackbar to show
          setTimeout(() => {
            onClose();
          }, 100);
        }}
        selectedEmployees={selectedEmployees}
        selectedPosition={selectedPosition}
        teamName="Business Solutions & Innovation"
      />

      <SnackbarAlert
        isOpen={showSuccessSnackbar}
        onClose={() => setShowSuccessSnackbar(false)}
        showCloseButton={true}
        type="success"
        title="Successfully added team members"
        animation="slide-up"
      />
    </>
  );
};

export default BatchAddTeamMembersModal;

import {
    Avatar,
    Divider,
    Inputs,
    Modal,
    SnackbarAlert,
    TextContent,
    Stepper,
    Checkbox,
    Chip,
    Dropdown,
} from "enterprisze-global-components";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";
import { Add, ArrowRight, SearchNormal } from "iconsax-reactjs";
import profilePic from "../../../../../assets/noAvatar.png";

const TransferEmployeeModalBatchEmployee = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    // Employee data array with unique identifiers
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Stephanie Germanotta",
            position: "Senior Web Developer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 2,
            name: "John Smith",
            position: "Frontend Developer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 3,
            name: "Maria Garcia",
            position: "Backend Developer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 4,
            name: "David Johnson",
            position: "Full Stack Developer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 5,
            name: "Sarah Wilson",
            position: "UI/UX Designer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 6,
            name: "Michael Brown",
            position: "DevOps Engineer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 7,
            name: "Emily Davis",
            position: "QA Engineer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 8,
            name: "Robert Miller",
            position: "Project Manager",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 9,
            name: "Lisa Anderson",
            position: "Business Analyst",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 10,
            name: "James Taylor",
            position: "Data Analyst",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 11,
            name: "Jennifer White",
            position: "Marketing Specialist",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 12,
            name: "Christopher Lee",
            position: "Sales Representative",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 13,
            name: "Amanda Clark",
            position: "HR Coordinator",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 14,
            name: "Daniel Rodriguez",
            position: "Financial Analyst",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 15,
            name: "Jessica Martinez",
            position: "Content Writer",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 16,
            name: "Kevin Thompson",
            position: "System Administrator",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 17,
            name: "Rachel Green",
            position: "Customer Support",
            avatar: profilePic,
            selected: false,
        },
        {
            id: 18,
            name: "Matthew Hall",
            position: "Operations Manager",
            avatar: profilePic,
            selected: false,
        },
    ]);

    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    // Team checkbox state
    const [isTeamSelected, setIsTeamSelected] = useState(false);

    // Access mode states
    const [allTeamMembers, setAllTeamMembers] = useState(false);
    const [specificMembersOnly, setSpecificMembersOnly] = useState(false);

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Current step state
    const [currentStep, setCurrentStep] = useState(1);

    // Filtered employees based on search
    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate selected count
    const selectedCount = employees.filter((emp) => emp.selected).length;

    // Handle individual employee checkbox change
    const handleEmployeeCheckboxChange = (employeeId: number) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === employeeId
                    ? { ...emp, selected: !emp.selected }
                    : emp
            )
        );
    };

    // Handle team checkbox change (select all/none)
    const handleTeamCheckboxChange = () => {
        const newSelectionState = !isTeamSelected;
        setIsTeamSelected(newSelectionState);
        setEmployees((prev) =>
            prev.map((emp) => ({ ...emp, selected: newSelectionState }))
        );
    };

    // Handle access mode changes
    const handleAllTeamMembersChange = () => {
        setAllTeamMembers(!allTeamMembers);
        setSpecificMembersOnly(false);
        if (!allTeamMembers) {
            setIsTeamSelected(true);
            setEmployees((prev) =>
                prev.map((emp) => ({ ...emp, selected: true }))
            );
        } else {
            setIsTeamSelected(false);
            setEmployees((prev) =>
                prev.map((emp) => ({ ...emp, selected: false }))
            );
        }
    };

    const handleSpecificMembersOnlyChange = () => {
        setSpecificMembersOnly(!specificMembersOnly);
        setAllTeamMembers(false);
        setIsTeamSelected(false);
        setEmployees((prev) =>
            prev.map((emp) => ({ ...emp, selected: false }))
        );
    };

    const OnCloseModal = () => {
        setCurrentStep(1);
        setIsTeamSelected(false);
        setAllTeamMembers(false);
        setSpecificMembersOnly(false);
        setEmployees((prev) =>
            prev.map((emp) => ({ ...emp, selected: false }))
        );
        onClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                showButton={false}
                onClose={OnCloseModal}
                title={"Batch Transfer Employee of this team"}
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                headerOptions="left"
                footerButtons={[
                    {
                        label: currentStep === 2 ? "Previous" : "Cancel",
                        variant: "ghost",
                        onClick: () => {
                            if (currentStep === 2) {
                                setCurrentStep(1);
                            } else {
                                OnCloseModal();
                            }
                        },
                    },
                    {
                        label: "Continue",
                        variant: "primary",
                        onClick: () => {
                            if (currentStep === 1) {
                                setCurrentStep(2);
                            } else if (currentStep === 2) {
                                setConfirmationModalOpen(true);
                            }
                        },
                    },
                ]}
                content={
                    <div className="flex flex-col gap-2 mt-1 h-full">
                        <div className="flex items-center justify-center">
                            <Stepper
                                steps={[
                                    {
                                        id: "1",
                                        stepType:
                                            currentStep > 1
                                                ? "checked"
                                                : "number",
                                        stepNumber: 1,
                                        isActive: currentStep === 1,
                                        labelText: "employees",
                                    },
                                    {
                                        id: "2",
                                        stepType: "number",
                                        stepNumber: 2,
                                        isActive: currentStep === 2,
                                        labelText: "position",
                                    },
                                ]}
                                connectorType="solid"
                                showConnectors={true}
                                connected={false}
                                currentStepIndex={currentStep - 1}
                                orientation="horizontal"
                            />
                        </div>

                        {/* Step Content */}
                        {currentStep === 1 && (
                            <>
                                <div className="w-full">
                                    <span className="text-body-small-strong text-szDarkGrey600">
                                        Select the employees from this Team Name
                                    </span>
                                </div>

                                <div className="border border-szGrey300 rounded-[6px] py-4 px-2 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-[10px] ">
                                            <Checkbox
                                                checked={isTeamSelected}
                                                onChange={
                                                    handleTeamCheckboxChange
                                                }
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-body-small-strong">
                                                    Business Solutions &
                                                    Innovation
                                                </span>
                                                <span className="text-caption-all-caps text-szGrey500">
                                                    Managed by Dino Flores •{" "}
                                                    {employees.length} members
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <Chip
                                                label={`${selectedCount}/${employees.length} selected`}
                                            />
                                        </div>
                                    </div>

                                    <Divider />

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-caption-all-caps text-szDarkGrey600">
                                                Access Mode
                                            </span>

                                            <div className="flex gap-2">
                                                <Checkbox
                                                    label="All team members"
                                                    checked={allTeamMembers}
                                                    onChange={
                                                        handleAllTeamMembersChange
                                                    }
                                                />
                                                <Checkbox
                                                    label="Specific members only"
                                                    checked={
                                                        specificMembersOnly
                                                    }
                                                    onChange={
                                                        handleSpecificMembersOnlyChange
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className="text-caption-all-caps text-szDarkGrey600">
                                                Select specific employees
                                            </span>

                                            <Inputs
                                                type={"text"}
                                                placeholder="Search Employees..."
                                                value={searchTerm}
                                                icon={SearchNormal}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                                iconClick={() => {}}
                                            />

                                            <div className="h-[200px] flex flex-col gap-2 overflow-y-auto">
                                                {filteredEmployees.map(
                                                    (employee) => (
                                                        <div
                                                            key={employee.id}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    employee.selected
                                                                }
                                                                onChange={() =>
                                                                    handleEmployeeCheckboxChange(
                                                                        employee.id
                                                                    )
                                                                }
                                                            />
                                                            <TextContent
                                                                icon={
                                                                    <Avatar
                                                                        size="small"
                                                                        src={
                                                                            employee.avatar
                                                                        }
                                                                    />
                                                                }
                                                                text={
                                                                    employee.name
                                                                }
                                                                header={
                                                                    employee.position
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                                {filteredEmployees.length ===
                                                    0 && (
                                                    <div className="flex items-center justify-center h-full text-szGrey500">
                                                        No employees found
                                                        matching your search.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <div className="flex flex-col gap-2 mt-1 h-full">
                                <div className="w-full ">
                                    <span className="text-body-small-strong text-szDarkGrey600">
                                        You can only add new members to the team
                                        if there are available positions and
                                        that the position is enabled for batch
                                        transfers.
                                    </span>
                                </div>

                                <div className="flex gap-2 h-full">
                                    <div className="flex-1 bg-success50 p-2">
                                        <span className="text-body-small-reg">
                                            Selected Employees
                                        </span>
                                        <div className="flex flex-col gap-2 mt-2 max-h-[90%] overflow-y-auto">
                                            {employees
                                                .filter(
                                                    (employee) =>
                                                        employee.selected
                                                )
                                                .map((employee) => (
                                                    <div
                                                        key={employee.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                employee.selected
                                                            }
                                                            onChange={() =>
                                                                handleEmployeeCheckboxChange(
                                                                    employee.id
                                                                )
                                                            }
                                                        />
                                                        <TextContent
                                                            icon={
                                                                <Avatar
                                                                    size="small"
                                                                    src={
                                                                        employee.avatar
                                                                    }
                                                                />
                                                            }
                                                            text={employee.name}
                                                            header={
                                                                employee.position
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            {employees.filter(
                                                (emp) => emp.selected
                                            ).length === 0 && (
                                                <div className="flex items-center justify-center py-4 text-szGrey500">
                                                    No employees selected
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="py-4 px-2">
                                        <div className="h-full border-l border-szGrey300"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <Dropdown
                                            label="Select team"
                                            placeholder="Select team"
                                            options={[
                                                {
                                                    label: "Junior Web Dev",
                                                    value: "Junior Web Dev",
                                                    showChip: true,
                                                    chipLabel:
                                                        "For batch transfer (1-5)",
                                                    chipColor: "default",
                                                    textType: "allCapsSmall",
                                                },
                                                {
                                                    label: "CCA2",
                                                    value: "CCA2",
                                                    showChip: true,
                                                    chipLabel:
                                                        "For batch transfer (1-45)",
                                                    chipColor: "default",
                                                    textType: "allCapsSmall",
                                                },
                                                {
                                                    label: "Operations Manager",
                                                    value: "Operations Manager",
                                                    showChip: true,
                                                    chipLabel:
                                                        "For batch transfer (1-45)",
                                                    chipColor: "default",
                                                    textType: "allCapsSmall",
                                                },
                                                {
                                                    label: "Director",
                                                    value: "Director",
                                                    showChip: true,
                                                    chipLabel:
                                                        "For batch transfer (1-45)",
                                                    chipColor: "default",
                                                    textType: "allCapsSmall",
                                                },
                                            ]}
                                            onSelectionChange={() => {}}
                                            size="small"
                                            usePortal={true}
                                        />

                                        <Dropdown
                                            label="Select JOB TITLE"
                                            placeholder="Select Job Title"
                                            options={[
                                                {
                                                    label: "Junior Web Dev",
                                                    value: "Junior Web Dev",
                                                    showChip: true,
                                                    chipLabel:
                                                        "For batch transfer (1-15)",
                                                    chipColor: "default",
                                                    textType: "allCapsSmall",
                                                },
                                            ]}
                                            onSelectionChange={() => {}}
                                            size="small"
                                            usePortal={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            />

            <ConfirmationModal
                isOpen={confirmationModalOpen}
                onClose={() => {
                    setConfirmationModalOpen(false);
                }}
                onClick={() => {
                    setConfirmationModalOpen(false);
                    setShowSuccessSnackbar(true);
                    OnCloseModal();
                }}
                description={"You are about to transfer these employees."}
                content={
                    <div className="flex flex-col mt-2 gap-4">
                        <div className="relative bg-success50 border border-gray-300 rounded-[8px] px-[16px] py-[20px] ">
                            <div className="absolute -top-3 left-4 bg-success700 rounded-[4px] px-[8px] py-[2px]">
                                <p className="body-small-strong text-white">
                                    Rigor, Maria Alma Angela
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-5 items-center">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"previous team"}
                                            text={"Accounting & Finance Team"}
                                        />
                                        <TextContent
                                            header={"position"}
                                            text={"Liaison 1"}
                                        />
                                    </div>
                                    <div>
                                        <ArrowRight className="text-szPrimary900" />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"Team"}
                                            text={
                                                "Business Solutions & Innovations"
                                            }
                                        />{" "}
                                        <TextContent
                                            header={"position"}
                                            text={"Junior Web Dev 1"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-success50 border border-gray-300 rounded-[8px] px-[16px] py-[20px] ">
                            <div className="absolute -top-3 left-4 bg-success700 rounded-[4px] px-[8px] py-[2px]">
                                <p className="body-small-strong text-white">
                                    Rigor, Maria Alma Angela
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-5 items-center">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"previous team"}
                                            text={"Accounting & Finance Team"}
                                        />
                                        <TextContent
                                            header={"position"}
                                            text={"Liaison 1"}
                                        />
                                    </div>
                                    <div>
                                        <ArrowRight className="text-szPrimary900" />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"Team"}
                                            text={
                                                "Business Solutions & Innovations"
                                            }
                                        />{" "}
                                        <TextContent
                                            header={"position"}
                                            text={"Junior Web Dev 1"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-success50 border border-gray-300 rounded-[8px] px-[16px] py-[20px] ">
                            <div className="absolute -top-3 left-4 bg-success700 rounded-[4px] px-[8px] py-[2px]">
                                <p className="body-small-strong text-white">
                                    Rigor, Maria Alma Angela
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-5 items-center">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"previous team"}
                                            text={"Accounting & Finance Team"}
                                        />
                                        <TextContent
                                            header={"position"}
                                            text={"Liaison 1"}
                                        />
                                    </div>
                                    <div>
                                        <ArrowRight className="text-szPrimary900" />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <TextContent
                                            header={"Team"}
                                            text={
                                                "Business Solutions & Innovations"
                                            }
                                        />{" "}
                                        <TextContent
                                            header={"position"}
                                            text={"Junior Web Dev 1"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                buttonLabel={"Transfer Employee"}
            />

            <SnackbarAlert
                isOpen={showSuccessSnackbar}
                onClose={() => {
                    setShowSuccessSnackbar(false);
                }}
                showCloseButton={true}
                type="success"
                title={"Successfully transferred team members"}
                animation="slide-up"
            />
        </>
    );
};

export default TransferEmployeeModalBatchEmployee;

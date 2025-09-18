import {
    Avatar,
    Button,
    ButtonsIcon,
    Divider,
    Dropdown,
    Inputs,
    Modal,
    PurpleTaggedCard,
    SnackbarAlert,
    Tab,
    TextContent,
    Stepper,
    Checkbox,
    Chip,
} from "enterprisze-global-components";
import ConfirmationModal from "../ConfirmationModal";
import React, { useState } from "react";
import {
    Add,
    ArrowRight,
    MinusCirlce,
    SearchNormal,
    TickCircle,
    Trash,
    Warning2,
} from "iconsax-reactjs";

const TransferEmployeeModalBatchEmployee = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [employeeTeamMember, setEmployeeTeamMember] = useState<any>([
        {
            employee_ID: "",
            employee_first_name: "",
            employee_last_name: "",
            team_ID: "",
            position_ID: "",
            position_name: "",
            saved: false,
        },
    ]);

    const [onRemoveEmployeeIndex, setOnRemoveEmployeeIndex] =
        useState<Number | null>(null);

    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    return (
        <>
            <Modal
                isOpen={isOpen}
                showButton={false}
                onClose={onClose}
                title={"Batch Transfer Employee of this team"}
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                headerOptions="left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: onClose,
                    },
                    {
                        label: "Team Member",
                        variant: "primary",
                        onClick: () => {
                            setConfirmationModalOpen(true);
                        },
                        leftIcon: <Add />,
                    },
                ]}
                content={
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex items-center justify-center">
                            <Stepper
                                steps={[
                                    {
                                        id: "1",
                                        stepType: "number",
                                        stepNumber: 1,
                                        isActive: true,
                                        labelText: "employees",
                                        // stepType: "checked",
                                    },
                                    {
                                        id: "2",
                                        stepType: "number",
                                        stepNumber: 2,
                                        isActive: false,
                                        labelText: "position",
                                    },
                                ]}
                                connectorType="solid"
                                showConnectors={true}
                                connected={false}
                                currentStepIndex={0}
                                orientation="horizontal"
                            />
                        </div>
                        <div className="w-full">
                            <span className="text-body-small-strong text-szDarkGrey600">
                                Select the employees from this Team Name
                            </span>
                        </div>

                        <div className="border border-szGrey300 rounded-[6px] py-4 px-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-[10px] ">
                                    <Checkbox onChange={() => {}} />
                                    <div className="flex flex-col">
                                        <span className="text-body-small-strong">
                                            Business Solutions & Innovation
                                        </span>
                                        <span className="text-caption-all-caps text-szGrey500">
                                            Managed by Dino Flores • 25 members
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <Chip label="1/25 selected" />
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
                                            onChange={() => {}}
                                        />
                                        <Checkbox
                                            label="Specific members only"
                                            onChange={() => {}}
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
                                        value={""}
                                        icon={SearchNormal}
                                        onChange={(e) => {}}
                                        iconClick={() => {}}
                                    />

                                    <div className="h-[200px]">

                                    </div>
                                </div>
                            </div>
                        </div>
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
                    onClose();
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

import {
    Avatar,
    Button,
    ButtonsIcon,
    Divider,
    Dropdown,
    Inputs,
    Modal,
    SnackbarAlert,
    Tab,
    TextContent,
} from "enterprisze-global-components";
import ConfirmationModal from "./ConfirmationModal";
import React, { useState } from "react";
import {
    Add,
    ArrowRight,
    MinusCirlce,
    TickCircle,
    Trash,
} from "iconsax-reactjs";

const AddTeamMemberModalSingleEmployee = () => {
    const [employeeTeamMember, setEmployeeTeamMember] = useState<any>([
        {
            employee_ID: "",
            team_ID: "",
            position_ID: "",
            saved: false,
        },
    ]);

    return (
        <>
            <Modal
                isOpen={true}
                showButton={false}
                onClose={() => {}}
                title={"Add Team Member(s)"}
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                headerOptions="left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => {},
                    },
                    {
                        label: "Team Member",
                        variant: "primary",
                        onClick: () => {},
                        leftIcon: <Add />,
                    },
                ]}
                content={
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="w-full">
                            <span className="text-body-small-strong text-szDarkGrey600">
                                You can only add new member to the team if there
                                are available positions.
                            </span>
                        </div>

                        {employeeTeamMember.map(
                            (employee: any, index: number) =>
                                employee.saved ? (
                                    <div className="w-full border border-szGrey300 rounded-lg p-2 flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex gap-5 items-center">
                                                <TextContent
                                                    icon={
                                                        <Avatar
                                                            src="/src/assets/noAvatar.png"
                                                            size="small"
                                                        />
                                                    }
                                                    header={"Employee name"}
                                                    text={
                                                        "Stephanie Germanotta"
                                                    }
                                                />
                                                <div>
                                                    <ArrowRight className="text-szPrimary900" />
                                                </div>
                                                <TextContent
                                                    header={"position"}
                                                    text={"Junior Web Dev"}
                                                />
                                            </div>

                                            <div>
                                                <MinusCirlce className="text-szPrimary900 hover:text-szPrimary700 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full border border-szGrey300 rounded-lg p-2 flex flex-col gap-2">
                                        <span className="text-caption-strong text-[#1D973C]">
                                            Assigning Employee to available
                                            Position from Business Solution &
                                            Innovation
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Dropdown
                                                label="Select employee"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Active",
                                                        value: "0",
                                                    },
                                                    {
                                                        label: "Archived",
                                                        value: "1",
                                                    },
                                                ]}
                                                placeholder="Select Employee"
                                                // value={}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {}}
                                                disabled={false}
                                            />
                                            {/* {errors.status && (
                                <p className="text-caption-reg text-red-500 mt-1">
                                    {errors.status}
                                </p>
                            )} */}
                                        </div>
                                        <span className="text-caption-reg text-szDarkGrey600">
                                            Select Team and Position
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Dropdown
                                                label="Business Solution & Innovation (Default)"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Active",
                                                        value: "0",
                                                    },
                                                    {
                                                        label: "Archived",
                                                        value: "1",
                                                    },
                                                ]}
                                                placeholder="Business Solution & Innovation (Default)"
                                                // value={}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {}}
                                                disabled={false}
                                            />
                                            <Dropdown
                                                label="Select position available from team"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Active",
                                                        value: "0",
                                                    },
                                                    {
                                                        label: "Archived",
                                                        value: "1",
                                                    },
                                                ]}
                                                placeholder="Select position available from team"
                                                // value={}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {}}
                                                disabled={false}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-5">
                                            <ButtonsIcon
                                                icon={<Trash />}
                                                onClick={() => {
                                                    setEmployeeTeamMember(
                                                        employeeTeamMember.filter(
                                                            (
                                                                member: any,
                                                                i: number
                                                            ) => i !== index
                                                        )
                                                    );
                                                }}
                                                variant="ghost"
                                            />
                                            <ButtonsIcon
                                                icon={<TickCircle />}
                                                onClick={() => {
                                                    setEmployeeTeamMember(
                                                        employeeTeamMember.map(
                                                            (
                                                                member: any,
                                                                i: number
                                                            ) =>
                                                                i === index
                                                                    ? {
                                                                          ...member,
                                                                          saved: true,
                                                                      }
                                                                    : member
                                                        )
                                                    );
                                                }}
                                                variant="primary"
                                            />
                                        </div>
                                    </div>
                                )
                        )}

                        <div className="flex items-center">
                            <div className="px-5 w-full">
                                <hr className="w-full" />
                            </div>
                            {/* <div className="flex items-center gap-2 text-body-small-strong text-szLightGrey400">
                                <span>
                                    <Add />
                                </span>
                                <span>Another Employee</span>
                            </div> */}
                            <div className="min-w-[180px]">
                                <Button
                                    label="Another Employee"
                                    variant="ghost"
                                    onClick={() => {
                                        setEmployeeTeamMember([
                                            ...employeeTeamMember,
                                            {
                                                employee_ID: "",
                                                team_ID: "",
                                                position_ID: "",
                                                saved: false,
                                            },
                                        ]);
                                    }}
                                    size="small"
                                    leftIcon={<Add />}
                                    disabled={employeeTeamMember.some(
                                        (member: any) => member.saved === false
                                    )}
                                />
                            </div>

                            <div className="px-5 w-full">
                                <hr className="w-full" />
                            </div>
                        </div>
                    </div>
                }
            />

            <ConfirmationModal
                isOpen={false}
                onClose={() => {}}
                onClick={() => {}}
                image="/src/assets/team_confirmation.png"
                description={"Are you sure you want to add this team?"}
                buttonLabel={"Add Team"}
            />

            <SnackbarAlert
                isOpen={false}
                onClose={() => {}}
                showCloseButton={true}
                type="success"
                title={"Successfully added team members"}
                animation="slide-up"
            />
        </>
    );
};

export default AddTeamMemberModalSingleEmployee;

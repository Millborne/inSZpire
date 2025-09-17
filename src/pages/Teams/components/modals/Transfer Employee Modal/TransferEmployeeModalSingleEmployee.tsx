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
import ConfirmationModal from "../ConfirmationModal";
import React, { useState } from "react";
import {
    Add,
    ArrowRight,
    MinusCirlce,
    TickCircle,
    Trash,
    Warning2,
} from "iconsax-reactjs";

const TransferEmployeeModalSingleEmployee = ({
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
                title={"Transfer Employee(s)"}
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
                        <div className="w-full">
                            <span className="text-body-small-strong text-szDarkGrey600">
                                You can only transfer employees if there are:
                            </span>
                            <ul className="list-disc list-inside text-body-xsmall text-szDarkGrey600 pl-3 marker:text-[0.6em] marker:leading-[1.2]">
                                <li>
                                    <span className="text-body-small-strong text-szDarkGrey600">
                                        Available positions from other or its
                                        own team
                                    </span>
                                </li>
                                <li>
                                    <span className="text-body-small-strong text-szDarkGrey600">
                                        No Subordinates from that employee.
                                        Transfer the subordinate(s) first before
                                        transferring the employee.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {employeeTeamMember.map(
                            (employee: any, index: number) =>
                                employee.saved ? (
                                    onRemoveEmployeeIndex === index ? (
                                        <>
                                            <div className="md:flex hidden w-full border border-error700 rounded-lg p-2 items-center justify-between gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-error700">
                                                        <Warning2 />
                                                    </span>
                                                    <span className="text-body-small-strong">
                                                        Are you sure you want to
                                                        cancel adding{" "}
                                                        {employee.employee_last_name &&
                                                        employee.employee_first_name
                                                            ? `${employee.employee_last_name}, ${employee.employee_first_name}`
                                                            : "this employee"}
                                                        ?
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        label="Cancel"
                                                        variant="ghost"
                                                        size="medium"
                                                        onClick={() =>
                                                            setOnRemoveEmployeeIndex(
                                                                null
                                                            )
                                                        }
                                                    />
                                                    {/* <Button
                                                  label="Confirm"
                                                  variant="ghost"
                                                  size="medium"
                                                  leftIcon={<MinusCirlce />}
                                                  onClick={() => {
                                                      setEmployeeTeamMember(
                                                          employeeTeamMember.filter(
                                                              (
                                                                  member: any,
                                                                  i: number
                                                              ) => i !== index
                                                          )
                                                      );
                                                      setOnRemoveEmployeeIndex(
                                                          null
                                                      );
                                                  }}
                                                  className="text-error700"
                                              /> */}
                                                    <button
                                                        type="button"
                                                        aria-label="Confirm"
                                                        className="h-fit flex items-center justify-center rounded-custom-md font-semibold transition-all min-h-[44px] px-6 py-3 false bg-transparent active:outline-none  focus:outline focus:outline-1 focus:outline-szSecondary500 focus:bg-szWhite100 cursor-pointer text-error700 hover:text-error900 active:text-szBlack900 focus:text-error700 false"
                                                        onClick={() => {
                                                            setEmployeeTeamMember(
                                                                employeeTeamMember.filter(
                                                                    (
                                                                        member: any,
                                                                        i: number
                                                                    ) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            );
                                                            setOnRemoveEmployeeIndex(
                                                                null
                                                            );
                                                            setConfirmationModalOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <MinusCirlce className="" />
                                                            <span className="font-dmSans text-body-base-strong leading-none m-0">
                                                                Confirm
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:hidden w-full border border-error700 rounded-lg p-2 justify-between gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-error700">
                                                        <Warning2 />
                                                    </span>
                                                    <span className="text-body-small-strong">
                                                        Are you sure you want to
                                                        cancel adding{" "}
                                                        {employee.employee_last_name &&
                                                        employee.employee_first_name
                                                            ? `${employee.employee_last_name}, ${employee.employee_first_name}`
                                                            : "this employee"}
                                                        ?
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-start gap-1">
                                                    <Button
                                                        label="Cancel"
                                                        variant="ghost"
                                                        size="medium"
                                                        onClick={() =>
                                                            setOnRemoveEmployeeIndex(
                                                                null
                                                            )
                                                        }
                                                    />
                                                    {/* <Button
                                                  label="Confirm"
                                                  variant="ghost"
                                                  size="medium"
                                                  leftIcon={<MinusCirlce />}
                                                  onClick={() => {
                                                      setEmployeeTeamMember(
                                                          employeeTeamMember.filter(
                                                              (
                                                                  member: any,
                                                                  i: number
                                                              ) => i !== index
                                                          )
                                                      );
                                                      setOnRemoveEmployeeIndex(
                                                          null
                                                      );
                                                  }}
                                                  className="text-error700"
                                              /> */}
                                                    <button
                                                        type="button"
                                                        aria-label="Confirm"
                                                        className="h-fit flex items-center justify-center rounded-custom-md font-semibold transition-all min-h-[44px] px-6 py-3 false bg-transparent active:outline-none  focus:outline focus:outline-1 focus:outline-szSecondary500 focus:bg-szWhite100 cursor-pointer text-error700 hover:text-error900 active:text-szBlack900 focus:text-error700 false"
                                                        onClick={() => {
                                                            setEmployeeTeamMember(
                                                                employeeTeamMember.filter(
                                                                    (
                                                                        member: any,
                                                                        i: number
                                                                    ) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            );
                                                            setOnRemoveEmployeeIndex(
                                                                null
                                                            );
                                                            setConfirmationModalOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-center gap-2">
                                                            <MinusCirlce className="" />
                                                            <span className="font-dmSans text-body-base-strong leading-none m-0">
                                                                Confirm
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
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
                                                    <MinusCirlce
                                                        className="text-szPrimary900 hover:text-szPrimary700 cursor-pointer"
                                                        onClick={() =>
                                                            setOnRemoveEmployeeIndex(
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
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
                                                employee_first_name: "",
                                                employee_last_name: "",
                                                team_ID: "",
                                                position_ID: "",
                                                position_name: "",
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
                isOpen={confirmationModalOpen}
                onClose={() => {
                    setConfirmationModalOpen(false);
                }}
                onClick={() => {
                    setConfirmationModalOpen(false);
                    setShowSuccessSnackbar(true);
                    onClose();
                }}
                description={""}
                content={
                    <div className="flex flex-col gap-2">
                        <span className="text-body-base-strong text-szBlack800 text-center">
                            You are about to add these employees to{" "}
                            <span className="text-szPrimary700">Team Name</span>
                            .
                        </span>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center gap-5">
                                <div className="flex-1">
                                    <TextContent
                                        header="Employee Name"
                                        text="John Doe"
                                    />
                                </div>

                                <span>
                                    <ArrowRight />
                                </span>
                                <div className="flex-1">
                                    <TextContent
                                        header="Position"
                                        text="Junior Web Developer"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-5">
                                <div className="flex-1">
                                    <TextContent
                                        header="Employee Name"
                                        text="John Doe"
                                    />
                                </div>

                                <span>
                                    <ArrowRight />
                                </span>
                                <div className="flex-1">
                                    <TextContent
                                        header="Position"
                                        text="Junior Web Developer"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-5">
                                <div className="flex-1">
                                    <TextContent
                                        header="Employee Name"
                                        text="John Doe"
                                    />
                                </div>

                                <span>
                                    <ArrowRight />
                                </span>
                                <div className="flex-1">
                                    <TextContent
                                        header="Position"
                                        text="Junior Web Developer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                buttonLabel={"Add Employee(s)"}
            />

            <SnackbarAlert
                isOpen={showSuccessSnackbar}
                onClose={() => {
                    setShowSuccessSnackbar(false);
                }}
                showCloseButton={true}
                type="success"
                title={"Successfully added team members"}
                animation="slide-up"
            />
        </>
    );
};

export default TransferEmployeeModalSingleEmployee;

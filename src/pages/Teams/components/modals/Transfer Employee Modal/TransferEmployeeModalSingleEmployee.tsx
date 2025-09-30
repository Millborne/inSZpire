import {
    Avatar,
    Button,
    ButtonsIcon,
    Dropdown,
    Modal,
    SnackbarAlert,
    TextContent,
} from "enterprisze-global-components";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";
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

    // State for dropdown selections
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [selectedPosition, setSelectedPosition] = useState<any>(null);

    // Check if all employees are saved
    const allEmployeesSaved = employeeTeamMember.every(
        (member: any) => member.saved === true
    );

    return (
        <>
            <Modal
                isOpen={isOpen}
                showButton={false}
                onClose={() => {
                    setSelectedEmployee(null);
                    setSelectedTeam(null);
                    setSelectedPosition(null);
                    setEmployeeTeamMember([
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
                    onClose();
                }}
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
                        label: "Transfer Employee",
                        variant: "primary",
                        disabled: !allEmployeesSaved,
                        onClick: () => {
                            setConfirmationModalOpen(true);
                        },
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
                                                    <div className="flex flex-col gap-1">
                                                        <TextContent
                                                            icon={
                                                                <Avatar
                                                                    src="/src/assets/noAvatar.png"
                                                                    size="small"
                                                                />
                                                            }
                                                            header={
                                                                "Employee name"
                                                            }
                                                            text={
                                                                `${employee.employee_last_name}, ${employee.employee_first_name}` ||
                                                                "No Employee Selected"
                                                            }
                                                        />
                                                        <TextContent
                                                            header={
                                                                "previous team"
                                                            }
                                                            text={
                                                                "No Previous Team"
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <ArrowRight className="text-szPrimary900" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <TextContent
                                                            header={"Team"}
                                                            text={
                                                                employee.team_ID ||
                                                                "No Team Selected"
                                                            }
                                                        />
                                                        <TextContent
                                                            header={"position"}
                                                            text={
                                                                employee.position_name ||
                                                                "No Position Selected"
                                                            }
                                                        />
                                                    </div>
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
                                            Transferring employee to available
                                            position
                                        </span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Dropdown
                                                label="Select employee"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Edwards, Perry",
                                                        value: "Edwards, Perry",
                                                        showChip: true,
                                                        chipLabel:
                                                            "with subordinates",
                                                        chipColor: "red",
                                                        textType:
                                                            "allCapsSmall",
                                                    },
                                                    {
                                                        label: "Kehlani, Kate",
                                                        value: "Kehlani, Kate",
                                                    },
                                                    {
                                                        label: "Kehlani, Folded",
                                                        value: "Kehlani, Folded",
                                                    },
                                                ]}
                                                placeholder="Select Employee"
                                                value={selectedEmployee}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {
                                                    setSelectedEmployee(value);
                                                    // Update employeeTeamMember with selected employee
                                                    setEmployeeTeamMember(
                                                        employeeTeamMember.map(
                                                            (
                                                                member: any,
                                                                i: number
                                                            ) =>
                                                                i === index
                                                                    ? {
                                                                          ...member,
                                                                          employee_first_name:
                                                                              value?.value?.split(
                                                                                  ", "
                                                                              )[1] ||
                                                                              "",
                                                                          employee_last_name:
                                                                              value?.value?.split(
                                                                                  ", "
                                                                              )[0] ||
                                                                              "",
                                                                          employee_ID:
                                                                              value?.value ||
                                                                              "", // Using value as ID for now
                                                                      }
                                                                    : member
                                                        )
                                                    );
                                                }}
                                                disabled={false}
                                                // multiSelect
                                                // usePortal={false}
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
                                                label="Select Team"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Business Solutions & Innovation (Default)",
                                                        value: "Business Solutions & Innovation (Default)",
                                                    },
                                                    {
                                                        label: "AFT",
                                                        value: "AFT",
                                                    },
                                                ]}
                                                // multiSelect
                                                placeholder="Select Team"
                                                value={selectedTeam}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {
                                                    setSelectedTeam(value);
                                                    // Update employeeTeamMember with selected team
                                                    setEmployeeTeamMember(
                                                        employeeTeamMember.map(
                                                            (
                                                                member: any,
                                                                i: number
                                                            ) =>
                                                                i === index
                                                                    ? {
                                                                          ...member,
                                                                          team_ID:
                                                                              value?.value ||
                                                                              "", // Using value as team_ID for now
                                                                      }
                                                                    : member
                                                        )
                                                    );
                                                }}
                                                disabled={false}
                                            />
                                            <Dropdown
                                                label="Select position available from team"
                                                size="small"
                                                options={[
                                                    {
                                                        label: "Junior Web Dev 2",
                                                        value: "Junior Web Dev 2",
                                                    },
                                                    {
                                                        label: "Junior Web Dev 3",
                                                        value: "Junior Web Dev 3",
                                                    },
                                                    {
                                                        label: "Senior Dev 1",
                                                        value: "Senior Dev 1",
                                                    },
                                                ]}
                                                placeholder="Select position available from team"
                                                value={selectedPosition}
                                                onSelectionChange={(
                                                    value: any
                                                ) => {
                                                    setSelectedPosition(value);
                                                    // Update employeeTeamMember with selected position
                                                    setEmployeeTeamMember(
                                                        employeeTeamMember.map(
                                                            (
                                                                member: any,
                                                                i: number
                                                            ) =>
                                                                i === index
                                                                    ? {
                                                                          ...member,
                                                                          position_ID:
                                                                              value?.value ||
                                                                              "", // Using value as position_ID for now
                                                                          position_name:
                                                                              value?.value ||
                                                                              "",
                                                                      }
                                                                    : member
                                                        )
                                                    );
                                                }}
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

                                                    setSelectedEmployee(null);
                                                    setSelectedTeam(null);
                                                    setSelectedPosition(null);
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

                                                    setSelectedEmployee(null);
                                                    setSelectedTeam(null);
                                                    setSelectedPosition(null);
                                                }}
                                                disabled={
                                                    !selectedEmployee ||
                                                    !selectedTeam ||
                                                    !selectedPosition
                                                }
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
                    setSelectedEmployee(null);
                    setSelectedTeam(null);
                    setSelectedPosition(null);
                    setEmployeeTeamMember([
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

export default TransferEmployeeModalSingleEmployee;

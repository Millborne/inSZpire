import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Inputs, Pagination, SnackbarAlert, Table } from "enterprisze-global-components";
import { Add, Briefcase, Edit2, ExportCurve, Filter, InfoCircle, More, SearchNormal } from "iconsax-reactjs";
import EmployeeFilterModal from "../components/modals/EmployeeFilterModal";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeePositionModal from "../components/modals/EmployeePositionModal";

const EmployeeList = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const [snackbarAction, setSnackbarAction] = useState<"add" | "edit" | "update" | null>(null);

    const handleSubmitSuccess = (action: "add" | "edit" | "update") => {
        setSnackbarAction(action);
        setIsSnackbarOpen(true);
    };

    // For larger screen
    const headers: Array<
        | {
              type: "string";
              header: string;
              accessor: string;
              icon?: React.ReactNode;
          }
        | { type: "more"; header: React.ReactNode; accessor: "more" }
        | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    > = [
        { type: "checkbox", header: <></>, accessor: "checkbox" },
        {
            type: "string",
            header: "Name",
            accessor: "name",
            icon: (
                <div className="relative group">
                    <InfoCircle className="w-4 h-4 text-szBlack700 hover:text-szPrimary700 transition-colors duration-200 cursor-help" />
                    <div className="absolute z-10 invisible group-hover:visible bg-white shadow-lg rounded-lg p-2 w-[97px] -left-20 top-6">
                        <div className="flex flex-col gap-2 w-full items-start">
                            <span className="text-body-small-reg text-szBlack800">Legends:</span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Active</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Inactive</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Floating</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Clearance</span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        { type: "string", header: "ID", accessor: "id" },
        { type: "string", header: "Team", accessor: "team" },
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "string", header: "Job Code", accessor: "jobCode" },
        { type: "string", header: "Direct Head", accessor: "directHead" },
        { type: "more", header: <></>, accessor: "more" },
    ];

    const data = [
        {
            id: "1234567890",
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Germanotta, Stephanie Luke A.</span>
                </div>
            ),
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">BSI</span>,
            jobTitle: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Junior Web Developer</span>,
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "2345678901",
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Smith, John William B.</span>
                </div>
            ),
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: (
                <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Customer Service Representative</span>
            ),
            jobCode: "2345678901",
            directHead: "Jane Smith",
        },
        {
            id: "3456789012",
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-info500"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Johnson, Emily Rose C.</span>
                </div>
            ),
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: (
                <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Customer Service Representative</span>
            ),
            jobCode: "3456789012",
            directHead: "Michael Brown",
        },
        {
            id: "4567890123",
            name: (
                <div className="md:flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-warning500"></div>
                    <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Davis, Robert James D.</span>
                </div>
            ),
            team: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Shoopee</span>,
            jobTitle: <span className="text-body-base-reg lg:truncate max-w-[120px] lg:max-w-none block">Manager</span>,
            jobCode: "4567890123",
            directHead: "Sarah Wilson",
        },
    ];

    // For smaller screen
    const headersSmall: Array<
        | {
              type: "string";
              header: string;
              accessor: string;
              icon?: React.ReactNode;
          }
        | { type: "more"; header: React.ReactNode; accessor: "more" }
        | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    > = [
        {
            type: "string",
            header: "Name",
            accessor: "name",
            icon: (
                <div className="relative group">
                    <InfoCircle className="w-4 h-4 text-szBlack700 hover:text-szPrimary700 transition-colors duration-200 cursor-help" />
                    <div className="absolute z-10 invisible group-hover:visible bg-white shadow-lg rounded-lg p-2 w-[97px] -left-20 top-6">
                        <div className="flex flex-col gap-2 w-full items-start">
                            <span className="text-body-small-reg text-szBlack800">Legends:</span>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-success700 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Active</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-szGrey300 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Inactive</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-info500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Floating</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[14px] h-[14px] bg-warning500 rounded-full"></div>
                                <span className="text-caption-reg text-szBlack800">Clearance</span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        { type: "string", header: "Team", accessor: "team" },
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "more", header: <></>, accessor: "more" },
    ];

    const moreOptions = [
        {
            label: "View",
            onClick: (index: number) => {
                navigate(`${data[index]?.id}/summary`);
            },
        },
        {
            label: "Edit Employee",
            icon: <Edit2 />,
            onClick: (index: number) => {
                setIsEditModalOpen(true);
                setSelectedEmployee(data[index]);
            },
        },
        {
            label: "Update Position",
            icon: <Briefcase />,
            onClick: (index: number) => {
                setIsUpdatePositionModalOpen(true);
                setSelectedEmployee(data[index]);
            },
        },
    ];

    const employeeMoreOptions = [
        {
            label: "Add Employee",
            icon: <Add />,
            onClick: () => setIsModalOpen(true),
        },
        {
            label: "Export",
            icon: <ExportCurve />,
            onClick: () => console.log("Delete clicked"),
        },
    ];

    return (
        <div className="h-full p-4 bg-szWhite100 rounded-md shadow-boxShadow flex flex-col gap-5 overflow-auto">
            <div className="relative flex flex-row items-center gap-3">
                <span className="text-h3 font-montserrat">Employees</span>
                <More className="text-szPrimary700 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)} />

                {openDropdown && (
                    <div className="absolute left-40 mt-28 bg-white border rounded-md shadow-lg z-10 w-fit">
                        {employeeMoreOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={option.onClick}
                                className="flex flex-row items-center px-3 py-2 gap-1 text-body-small-reg text-szBlack800 font-dmSans hover:bg-szGrey150 whitespace-nowrap"
                            >
                                {option.icon && React.cloneElement(option.icon, { size: 16 })}
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-full w-full flex flex-col gap-4 ">
                {/* Filter */}
                <div className="flex justify-start">
                    <div className="lg:w-[355px]">
                        <Inputs placeholder="Search by Name, ID, Job Title, or Team" icon={SearchNormal} className="lg:w-[355px]" />
                    </div>
                    <Button leftIcon={<Filter />} variant="ghost" size="large" onClick={() => setOpenFilter(!openFilter)} label={""} />
                </div>

                <EmployeeFilterModal isOpen={openFilter} onClose={() => setOpenFilter(false)} />

                {/* Table */}
                <div className="h-full justify-between">
                    <div className="h-[400px] overflow-auto overflow-x-auto">
                        <div className="hidden lg:!block">
                            <Table
                                headers={headers}
                                data={data?.map((item) => item ?? {}) ?? []}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                            />
                        </div>
                        <div className="block lg:!hidden">
                            <Table
                                headers={headersSmall}
                                data={data?.map((item) => item ?? {}) ?? []}
                                moreOptions={moreOptions}
                                tableHeight="h-[400px]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Pagination currentPage={1} totalPages={10} visiblePages={5} onChange={() => {}} />
                    </div>
                </div>
            </div>

            <EmployeeModal
                isOpen={isModalOpen || isEditModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setIsEditModalOpen(false);
                }}
                mode={isEditModalOpen ? "edit" : "add"}
                addEmployeeData={isEditModalOpen ? selectedEmployee : undefined}
                onSubmitSuccess={() => handleSubmitSuccess(isEditModalOpen ? "add" : "edit")}
            />

            <EmployeePositionModal
                isOpen={isUpdatePositionModalOpen}
                onClose={() => setIsUpdatePositionModalOpen(false)}
                employeePositionData={selectedEmployee}
                onSubmitSuccess={() => handleSubmitSuccess("update")}
            />

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type="success"
                title={
                    snackbarAction === "edit"
                        ? "Successfully edited employee"
                        : snackbarAction === "update"
                        ? "Successfully updated position"
                        : snackbarAction === "add"
                        ? "Successfully added employee"
                        : "Success"
                }
                animation="slide-up"
            />
        </div>
    );
};

export default EmployeeList;

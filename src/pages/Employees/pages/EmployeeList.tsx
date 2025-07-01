import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Inputs, Pagination, Table } from "enterprisze-global-components";
import { Filter, InfoCircle, SearchNormal } from "iconsax-reactjs";
import EmployeeFilterModal from "../components/modals/EmployeeFilterModal";

const EmployeeList = () => {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);

    // const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

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
            label: "Delete",
            onClick: (index: number) => console.log("Delete row:", index),
        },
    ];

    return (
        <div className="h-full p-4 bg-szWhite100 rounded-md shadow-boxShadow flex flex-col gap-5 overflow-auto">
            <span className="text-h3 font-montserrat">Employees</span>

            <div className="h-full w-full flex flex-col gap-4 ">
                {/* <div className="w-full flex flex-col gap-1"> */}
                {/* Search bar & Filter btn */}
                {/* <div className="grid md:grid-cols-2 gap-5">
                        <div className="md:w-[355px] flex items-center">
                            <div className="w-full">
                                <Inputs
                                    type={"text"}
                                    placeholder="Search by Name, ID, Job Title, or Team"
                                    // value={textIcon}
                                    icon={SearchNormal}
                                    onChange={() => {}}
                                    iconClick={() => {}}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                leftIcon={
                                    openFilter ? (
                                        <ArrowUp2 />
                                    ) : (
                                        <ArrowDown2 variant="Linear" />
                                    )
                                }
                                label="Filters"
                                variant="ghost"
                                size="large"
                                onClick={() => setOpenFilter(!openFilter)}
                            />
                        </div>
                    </div> */}
                {/* Filters */}
                {/* {openFilter && (
                        <div className="p-[10px] w-full overflow-x-auto flex flex-col gap-5">
                            <span className="text-caption-all-caps uppercase">
                                Filter by
                            </span>
                            <div className="flex flex-col gap-[10px]">
                                {/* full screen */}
                {/*    <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                        Class
                                    </span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4 flex justify-center">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes(
                                                    "AllClass"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "AllClass"
                                                        )
                                                    ) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "AllClass"
                                                            )
                                                        );
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "AllClass",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Service Delivery"
                                                checked={selectedFilter.includes(
                                                    "Service Delivery"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Service Delivery"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Service Delivery"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Service Delivery",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="SZ Team"
                                                checked={selectedFilter.includes(
                                                    "SZ Team"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "SZ Team"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "SZ Team"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "SZ Team",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                        type
                                    </span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes(
                                                    "AllType"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "AllType"
                                                        )
                                                    ) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "AllType"
                                                            )
                                                        );
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "AllType",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Trainee"
                                                checked={selectedFilter.includes(
                                                    "Trainee"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Trainee"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Trainee"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Trainee",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Probationary"
                                                checked={selectedFilter.includes(
                                                    "Probationary"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Probationary"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Probationary"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Probationary",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Regular"
                                                checked={selectedFilter.includes(
                                                    "Regular"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Regular"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Regular"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Regular",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Part-time"
                                                checked={selectedFilter.includes(
                                                    "Part-time"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Part-time"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Part-time"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Part-time",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="On-the-Job Trainee"
                                                checked={selectedFilter.includes(
                                                    "On-the-Job Trainee"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "On-the-Job Trainee"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "On-the-Job Trainee"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "On-the-Job Trainee",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                        status
                                    </span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes(
                                                    "AllStatus"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "AllStatus"
                                                        )
                                                    ) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "AllStatus"
                                                            )
                                                        );
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "AllStatus",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Active"
                                                checked={selectedFilter.includes(
                                                    "Active"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Active"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Active"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Active",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Inactive"
                                                checked={selectedFilter.includes(
                                                    "Inactive"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Inactive"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Inactive"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Inactive",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Floating"
                                                checked={selectedFilter.includes(
                                                    "Floating"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Floating"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Floating"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Floating",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Clearance"
                                                checked={selectedFilter.includes(
                                                    "Clearance"
                                                )}
                                                onChange={() => {
                                                    if (
                                                        selectedFilter.includes(
                                                            "Clearance"
                                                        )
                                                    ) {
                                                        setSelectedFilter(
                                                            selectedFilter.filter(
                                                                (item) =>
                                                                    item !==
                                                                    "Clearance"
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedFilter([
                                                            ...selectedFilter,
                                                            "Clearance",
                                                        ]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                {/* </div> */}

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
        </div>
    );
};

export default EmployeeList;

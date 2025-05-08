import { useState } from "react";

import { Button, Checkbox, Inputs } from "enterprisze-global-components";
import { ArrowDown2, ArrowUp2, SearchNormal } from "iconsax-reactjs";

const EmployeeList = () => {
    const [openFilter, setOpenFilter] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
    console.log(selectedFilter);

    return (
        <div className="h-full p-4 bg-szWhite100 rounded-md shadow-boxShadow flex flex-col gap-5">
            <span className="text-h3">Employees</span>
            <div className="w-full flex flex-col">
                {/* Search bar & Filter btn */}
                <div className="w-full flex items-center justify-between">
                    <div className="md:w-[355px]">
                        <Inputs
                            type={"text"}
                            placeholder="Search by Name, ID, Job Title, or Team"
                            // value={textIcon}
                            icon={SearchNormal}
                            onChange={() => {}}
                            iconClick={() => {}}
                        />
                    </div>

                    <Button
                        leftIcon={
                            openFilter ? (
                                <ArrowUp2 />
                            ) : (
                                <ArrowDown2 variant="Linear" />
                            )
                        }
                        label="Ghost"
                        variant="ghost"
                        size="large"
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                </div>
                {/* Filters */}
                <div className="p-[10px]">
                    <span className="text-caption-all-caps uppercase">
                        Filter by
                    </span>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                Class
                            </span>
                            <div className="flex flex-wrap">
                                <div className="py-1 px-4 flex justify-center">
                                    <Checkbox
                                        label="All"
                                        checked={selectedFilter.includes("All")}
                                        onChange={() => {
                                            if (
                                                selectedFilter.includes("All")
                                            ) {
                                                // Remove "All" if already selected
                                                setSelectedFilter(
                                                    selectedFilter.filter(
                                                        (item) => item !== "All"
                                                    )
                                                );
                                            } else {
                                                // Add "All" if not selected
                                                setSelectedFilter([
                                                    ...selectedFilter,
                                                    "All",
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
                                                            item !== "SZ Team"
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
                        <div className="flex items-center gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                type
                            </span>
                            <div className="flex flex-wrap">
                                <div className="py-1 px-4">
                                    <Checkbox
                                        label="All"
                                        checked={selectedFilter.includes("All")}
                                        onChange={() => {
                                            if (
                                                selectedFilter.includes("All")
                                            ) {
                                                // Remove "All" if already selected
                                                setSelectedFilter(
                                                    selectedFilter.filter(
                                                        (item) => item !== "All"
                                                    )
                                                );
                                            } else {
                                                // Add "All" if not selected
                                                setSelectedFilter([
                                                    ...selectedFilter,
                                                    "All",
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
                                                            item !== "Trainee"
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
                                                            item !== "Regular"
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
                                                            item !== "Part-time"
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

                        <div className="flex items-center gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">
                                status
                            </span>
                            <div className="flex flex-wrap">
                                <div className="py-1 px-4">
                                    <Checkbox
                                        label="All"
                                        checked={selectedFilter.includes("All")}
                                        onChange={() => {
                                            if (
                                                selectedFilter.includes("All")
                                            ) {
                                                // Remove "All" if already selected
                                                setSelectedFilter(
                                                    selectedFilter.filter(
                                                        (item) => item !== "All"
                                                    )
                                                );
                                            } else {
                                                // Add "All" if not selected
                                                setSelectedFilter([
                                                    ...selectedFilter,
                                                    "All",
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
                                                            item !== "Active"
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
                                                            item !== "Inactive"
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
                                                            item !== "Floating"
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
                                                            item !== "Clearance"
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
                {/* Table */}
                <div></div>
            </div>
        </div>
    );
};

export default EmployeeList;

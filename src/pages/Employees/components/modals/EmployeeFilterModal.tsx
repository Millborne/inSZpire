// import { useState } from "react";

// icons

// components
import { Checkbox, Modal } from "enterprisze-global-components";
import { useState } from "react";

interface BasicInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
}

const BasicInfoModal: React.FC<BasicInfoModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const handleAdd = () => {
        onClose();
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Add ID"
                modalWidth="w-[920px]"
                showButton={false}
                footerOptions="stacked-left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                    },
                    {
                        label: "Apply",
                        variant: "primary",
                        onClick: handleAdd,
                        size: "medium",
                    },
                ]}
                content={
                    <>
                        {/* Filters */}
                        {/* {openFilter && ( */}
                        <div className="p-[10px] w-full overflow-x-auto flex flex-col gap-5">
                            <span className="text-caption-all-caps uppercase">Filter by</span>
                            <div className="flex flex-col gap-[10px]">
                                {/* full screen */}
                                <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">Class</span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4 flex justify-center">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes("AllClass")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("AllClass")) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "AllClass"));
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([...selectedFilter, "AllClass"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Service Delivery"
                                                checked={selectedFilter.includes("Service Delivery")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Service Delivery")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Service Delivery"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Service Delivery"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="SZ Team"
                                                checked={selectedFilter.includes("SZ Team")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("SZ Team")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "SZ Team"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "SZ Team"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">type</span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes("AllType")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("AllType")) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "AllType"));
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([...selectedFilter, "AllType"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Trainee"
                                                checked={selectedFilter.includes("Trainee")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Trainee")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Trainee"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Trainee"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Probationary"
                                                checked={selectedFilter.includes("Probationary")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Probationary")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Probationary"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Probationary"]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Regular"
                                                checked={selectedFilter.includes("Regular")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Regular")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Regular"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Regular"]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Part-time"
                                                checked={selectedFilter.includes("Part-time")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Part-time")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Part-time"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Part-time"]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="On-the-Job Trainee"
                                                checked={selectedFilter.includes("On-the-Job Trainee")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("On-the-Job Trainee")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "On-the-Job Trainee"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "On-the-Job Trainee"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex flex-row items-center gap-5">
                                    <span className="text-caption-all-caps uppercase text-szPrimary500 w-20">status</span>
                                    <div className="flex flex-wrap">
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="All"
                                                checked={selectedFilter.includes("AllStatus")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("AllStatus")) {
                                                        // Remove "All" if already selected
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "AllStatus"));
                                                    } else {
                                                        // Add "All" if not selected
                                                        setSelectedFilter([...selectedFilter, "AllStatus"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Active"
                                                checked={selectedFilter.includes("Active")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Active")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Active"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Active"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Inactive"
                                                checked={selectedFilter.includes("Inactive")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Inactive")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Inactive"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Inactive"]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Floating"
                                                checked={selectedFilter.includes("Floating")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Floating")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Floating"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Floating"]);
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="py-1 px-4">
                                            <Checkbox
                                                label="Clearance"
                                                checked={selectedFilter.includes("Clearance")}
                                                onChange={() => {
                                                    if (selectedFilter.includes("Clearance")) {
                                                        setSelectedFilter(selectedFilter.filter((item) => item !== "Clearance"));
                                                    } else {
                                                        setSelectedFilter([...selectedFilter, "Clearance"]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default BasicInfoModal;

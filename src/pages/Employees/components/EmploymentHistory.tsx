import { useState } from "react";
import { Button, CardContainer, JobPositionHistory, PurpleTaggedCard, TextContent } from "enterprisze-global-components";
import EmployeePositionModal from "./modals/EmployeePositionModal";

const EmploymentHistory = () => {
    const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);

    const handleUpdatePosition = () => {
        setIsUpdatePositionModalOpen(true);
    };

    const companyHistory = [
        {
            position: "Senior Web Developer",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department: "BSI",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },

        {
            position: "Junior Web Developer",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department: "BSI",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
        {
            position: "Intern",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department: "BSI",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
    ];

    const otherEmployeeHistory = [
        {
            position: "Senior Web Developer",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department:
                "I work on developing and maintaining websites and web applications, primarily using HTML, CSS, JavaScript, and basic frameworks. I assist in building responsive front-end interfaces, fixing bugs, and collaborating with designers and senior developers to improve user experience. I’m also continuously learning and growing my skills in full-stack development.",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
        {
            position: "Mortician",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department:
                "I prepare deceased individuals for burial or cremation, coordinate funeral services, and support grieving families with compassion and professionalism throughout the process.",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
        {
            position: "Intern",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department: "BSI",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
    ];

    return (
        <CardContainer
            backgroundColor="bg-white"
            content={
                <div className="flex flex-col gap-6">
                    {/* Current Position */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <h6 className="text-h6 text-szPrimary700">Current Position</h6>
                            <Button variant="secondary" size="medium" label="Update Position" onClick={handleUpdatePosition} />
                        </div>

                        <div>
                            <PurpleTaggedCard
                                label="Accounts Manager"
                                children={
                                    <div className="flex flex-col gap-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <TextContent header="job code" text="AM_T" />
                                            </div>

                                            <div>
                                                <TextContent header="Status" text="October 21, 1996" />
                                            </div>

                                            <div>
                                                <TextContent header="Status" text="Regular" />
                                            </div>
                                        </div>
                                        <div>
                                            <TextContent header="start date" text="Feb 21, 2023" />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* Company History*/}
                    <div className="flex flex-col gap-2">
                        <div>
                            <h6 className="text-h6 text-szPrimary700">Company History</h6>
                        </div>
                        {companyHistory.map((item) => (
                            <div className="flex h-full">
                                <div className="flex flex-col h-full items-center w-[32px] gap-2">
                                    <div>
                                        <div className="h-[8px] w-[8px] rounded-full bg-szPrimary500"></div>
                                    </div>

                                    <div className="h-full">
                                        <div className="h-full w-[1px] bg-szPrimary200"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <JobPositionHistory data={item} state="closed" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Employee History*/}
                    <div className="flex flex-col gap-2">
                        <div>
                            <h6 className="text-h6 text-szPrimary700">Other Employee History</h6>
                        </div>
                        <div className="flex flex-col gap-2 h-full w-full">
                            {otherEmployeeHistory.map((item) => (
                                <JobPositionHistory data={item} state="other" />
                            ))}
                        </div>
                    </div>

                    <EmployeePositionModal
                        isOpen={isUpdatePositionModalOpen}
                        onClose={() => setIsUpdatePositionModalOpen(false)}
                        employeePositionData={{
                            startDate: "",
                            position: "",
                            positionStatus: "",
                        }}
                    />
                </div>
            }
        />
    );
};

export default EmploymentHistory;

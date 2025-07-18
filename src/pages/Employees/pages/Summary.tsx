import {
    Avatar,
    CardContainer,
    TextContent,
} from "enterprisze-global-components";
import {
    Buildings,
    Hashtag,
    Health,
    Information,
    Location,
    NotificationStatus,
    Rank,
} from "iconsax-react";
import { useEffect, useState } from "react";
import {
    useSummary,
    useSummaryService,
} from "../../../services/employee-profile/summary/use-summary";
import { ProfileSummaryData } from "../../../services/employee-profile/summary/use-summary";

const Summary = () => {
    const { getByIdView, actionIsLoading, actionIsError, actionError } =
        useSummaryService();

    const useSummaryData = useSummary({});
    const [employeeData, setEmployeeData] = useState<ProfileSummaryData | null>(
        null
    );

    // Get employee ID from URL params or props - you may need to adjust this based on your routing setup
    const employeeId = "6dd74bcf8f9946739abaaed997aaef71"; // This should come from your route params or props

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const result = await getByIdView({ employeeId: employeeId });
                const result2 = await useSummaryData.generalAction({
                    queryParameters: "/get-by-id",
                    method: "POST",
                    body: {
                        employeeId: employeeId,
                    },
                });

                console.log(result2);

                if (result.data) {
                    setEmployeeData(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        if (employeeId) {
            fetchEmployeeData();
        }
    }, [employeeId]); // Removed getByIdView from dependencies to prevent infinite loop

    if (actionIsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading employee data...</div>
            </div>
        );
    }

    if (actionIsError) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">
                    Error loading employee data:{" "}
                    {actionError && "message" in actionError
                        ? actionError.message
                        : "Unknown error"}
                </div>
            </div>
        );
    }

    if (!employeeData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">No employee data found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <CardContainer
                content={
                    <div className="flex flex-wrap flex-row md:flex-row gap-[24px]">
                        <img
                            src={employeeData.qr_code_url || ""}
                            className="w-full max-w-[250px] md:max-w-[150px]"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
                            <TextContent
                                icon={<Hashtag />}
                                header="Employee ID"
                                text={
                                    employeeData.employee_number ||
                                    employeeData.employee_ID ||
                                    "N/A"
                                }
                            />
                            <TextContent
                                icon={<Rank />}
                                header="Category (Rank)"
                                text={employeeData.employment_status || "N/A"}
                            />

                            <TextContent
                                icon={
                                    <Avatar
                                        size="small"
                                        src={
                                            employeeData.profile_image ||
                                            "https://i.pravatar.cc/100?img=32"
                                        }
                                    />
                                }
                                header="Direct Head"
                                text="to be followed"
                            />
                            <TextContent
                                icon={<NotificationStatus />}
                                header="Employment Status"
                                text={employeeData.employee_status || "N/A"}
                            />
                            <TextContent
                                icon={<Location />}
                                header="Location"
                                text={"to be followed"}
                            />

                            <TextContent
                                icon={<Buildings />}
                                header="Company"
                                text="SupportZebra"
                            />
                        </div>
                    </div>
                }
            />
            <CardContainer
                title="Addresses and Contacts"
                icon={<Information />}
                content={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
                        <TextContent
                            header="Company Email"
                            text={employeeData.work_email || "N/A"}
                        />
                        <TextContent
                            header="Personal Email "
                            text={employeeData.personal_email || "N/A"}
                        />

                        <TextContent
                            header="Work Address"
                            text="to be followed"
                        />
                        <TextContent
                            header="Current Address "
                            text={employeeData.present_address || "N/A"}
                        />
                    </div>
                }
            />
            <CardContainer
                title="Emergency Information"
                icon={<Health />}
                content={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
                        <TextContent
                            header="Emergency Contact Name"
                            text={"to be followed"}
                        />
                        <TextContent
                            header="Emergency Contact Number"
                            text={"to be followed"}
                        />

                        <TextContent
                            header="Blood Type"
                            text={employeeData.blood_type?.toUpperCase() || "N/A"}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default Summary;

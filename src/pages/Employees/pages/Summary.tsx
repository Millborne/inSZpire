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
import { useLocation } from "react-router-dom";
import {
    useSummary,
    useSummaryService,
} from "../../../services/employee-profile/summary/use-summary";
import { ProfileSummaryData } from "../../../services/employee-profile/summary/use-summary";

const Summary = () => {
    const location = useLocation();
    const { getByIdView, actionIsLoading, actionIsError, actionError } =
        useSummaryService();

    const useSummaryData = useSummary({});
    const [employeeData, setEmployeeData] = useState<ProfileSummaryData | null>(
        null
    );

    const [employeeAllData, setEmployeeAllData] = useState<any | null>(
        null
    );

    // Get employee ID from URL params
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const employeeIdIndex = pathSegments.findIndex((segment) => segment === "employees") + 1;
    const employeeId = pathSegments[employeeIdIndex];

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

                if (result.data) {
                    setEmployeeData(result.data.data);
                }

                if(result2.data) {
                    setEmployeeAllData(result2.data.data);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        if (employeeId) {
            fetchEmployeeData();
        }
    }, [employeeId, getByIdView, useSummaryData.generalAction]);

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
                            src={employeeAllData.employee.qr_code_url || ""}
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
                                text={employeeData.supervisor_first_name ? `${employeeData.supervisor_first_name} ${employeeData.supervisor_last_name}` : "N/A"}
                            />
                            <TextContent
                                icon={<NotificationStatus />}
                                header="Employment Status"
                                text={employeeData.employee_status || "N/A"}
                            />
                            <TextContent
                                icon={<Location />}
                                header="Location"
                                text={employeeData.work_location || "N/A"}
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
                            text={employeeAllData.employee.work_email || "N/A"}
                        />
                        <TextContent
                            header="Personal Email "
                            text={employeeData.personal_email || "N/A"}
                        />

                        <TextContent
                            header="Work Address"
                            text={employeeData.work_location || "N/A"}
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
                            text={employeeData.emergency_contact_first_name ? `${employeeData.emergency_contact_first_name} ${employeeData.emergency_contact_last_name}` : "N/A"}
                        />
                        <TextContent
                            header="Emergency Contact Number"
                            text={employeeData.emergency_contact_number || "N/A"}
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

import { useState, useEffect } from "react";
import {
    TextContent,
    Divider,
    ButtonsIcon,
    SnackbarAlert,
} from "enterprisze-global-components";

//icons
import { Edit2 } from "iconsax-reactjs";

//components
import BasicInfoModal from "./modals/BasicInfoModal";
import { useBasicInfoService } from "../../../services/employee-profile/personal/basic-info/use-basic-info";
import { BasicInfoData } from "../../../services/employee-profile/personal/basic-info/use-basic-info";

const BasicInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const { getByIdView, actionIsLoading, actionIsError, actionError } =
        useBasicInfoService();
    const [basicInfoData, setBasicInfoData] = useState<BasicInfoData | null>(
        null
    );

    // Get employee ID from URL params or props - you may need to adjust this based on your routing setup
    const employeeId = "6dd74bcf8f9946739abaaed997aaef71"; // This should come from your route params or props

    useEffect(() => {
        const fetchBasicInfoData = async () => {
            try {
                const result = await getByIdView({ employeeId: employeeId });
                if (result.data) {
                    setBasicInfoData(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching basic info data:", error);
            }
        };

        if (employeeId) {
            fetchBasicInfoData();
        }
    }, [employeeId]);

    const handleSubmitSuccess = () => {
        setIsSnackbarOpen(true);
    };

    if (actionIsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading basic info data...</div>
            </div>
        );
    }

    if (actionIsError) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">
                    Error loading basic info data:{" "}
                    {actionError && "message" in actionError
                        ? actionError.message
                        : "Unknown error"}
                </div>
            </div>
        );
    }

    if (!basicInfoData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">No basic info data found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Full Name</h6>
                    <ButtonsIcon
                        icon={<Edit2 variant="Linear" />}
                        variant="secondary"
                        size="small"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="last name"
                        text={basicInfoData.last_name || "N/A"}
                    />
                    <TextContent
                        header="first name"
                        text={basicInfoData.first_name || "N/A"}
                    />
                    <TextContent
                        header="middle name"
                        text={basicInfoData.middle_name || "N/A"}
                    />
                    <TextContent
                        header="nickname"
                        text={basicInfoData.preferred_name || "N/A"}
                    />
                    <TextContent
                        header="extensions"
                        text={basicInfoData.name_ext || "N/A"}
                    />
                </div>
            </div>
            <Divider />
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Birthday</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="date of birth"
                        text={
                            basicInfoData.date_of_birth
                                ? new Date(
                                      basicInfoData.date_of_birth
                                  ).toLocaleDateString()
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="age"
                        text={
                            basicInfoData.date_of_birth
                                ? Math.floor(
                                      (new Date().getTime() -
                                          new Date(
                                              basicInfoData.date_of_birth
                                          ).getTime()) /
                                          (1000 * 60 * 60 * 24 * 365.25)
                                  ).toString()
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="place of birth"
                        text={basicInfoData.birth_address || "N/A"}
                    />
                </div>
            </div>
            <Divider />
            {/* <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Educational Details</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent header="highschool attended" text="Amundsen High School" />
                    <TextContent header="educational attainment" text="College" />
                    <TextContent header="last attended school" text="Illinois Institute of Technology" />
                    <TextContent header="years attended (date range)" text="2015 - 2019" />
                    <TextContent header="college course taken (if applicable)" text="Bachelor of Science in Information Technology" />
                </div>
            </div>
            <Divider /> */}
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Others</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="religion"
                        text={basicInfoData.religion || "N/A"}
                    />
                    <TextContent
                        header="sex"
                        text={
                            basicInfoData.gender
                                ? basicInfoData.gender.charAt(0).toUpperCase() +
                                  basicInfoData.gender.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="civil status"
                        text={
                            basicInfoData.marital_status
                                ? basicInfoData.marital_status
                                      .charAt(0)
                                      .toUpperCase() +
                                  basicInfoData.marital_status.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="gender / gender identity"
                        text={
                            basicInfoData.gender
                                ? basicInfoData.gender.charAt(0).toUpperCase() +
                                  basicInfoData.gender.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent header="pronouns" text="His" />
                    <TextContent
                        header="blood type"
                        text={basicInfoData.blood_type?.toUpperCase() || "N/A"}
                    />
                </div>
            </div>
            <Divider />
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Addresses</h6>
                </div>
                <div className="grid gap-4 items-start">
                    <TextContent
                        header="present addresses"
                        text={basicInfoData.present_address || "N/A"}
                    />
                    <TextContent
                        header="permanent addresses"
                        text={basicInfoData.permanent_address || "N/A"}
                    />
                </div>
            </div>

            {/* Modal component */}
            <BasicInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmitSuccess={handleSubmitSuccess}
            />

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type="success"
                title="Successfully updated Basic Info"
                animation="slide-up"
            />
        </div>
    );
};

export default BasicInfo;

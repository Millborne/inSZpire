import { useState } from "react";
import {
    TextContent,
    ButtonsIcon,
    PurpleTaggedCard,
    SnackbarAlert,
} from "enterprisze-global-components";

//icons
import { Edit2 } from "iconsax-react";

//components
import EducationalModal from "./modals/EducationalModal";

// services
import { useEducationList } from "../../../services/employee-profile/personal/education";
import { RootState } from "../../../reducers/store";
import { useSelector } from "react-redux";

const Education = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const selectedEmployee = useSelector(
        (state: RootState) => state.employeeState.selectedEmployee
    );

    // Fetch education data - profileId is now handled automatically by the hook
    const {
        data: educationData,
        isLoading,
        isError,
        refetch,
    } = useEducationList();

    const handleSubmitSuccess = () => {
        setIsSnackbarOpen(true);
        // Refetch education data after successful update
        refetch();
    };

    // Transform API data to match component interface
    const transformedEducationData =
        educationData?.data?.map((education: any, index: number) => ({
            id: education.educ_ID,
            level: education.education_level || "Unknown Level",
            "school name": education.school_name || "Unknown School",
            "denormalized_school_name": education.denormalized_school_name || "Unknown School",
            degree: education.degree || "-",
            course: education.course || "-",
            "year started": education.year_started?.toString() || "-",
            "year left": education.year_left?.toString() || "-",
            "honors received": education.honors_received || "-",
        })) || [];

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">
                        Educational Background
                    </h6>
                    <ButtonsIcon
                        icon={<Edit2 />}
                        variant="secondary"
                        size="small"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <EducationalModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        educationalData={transformedEducationData}
                        onSubmitSuccess={handleSubmitSuccess}
                    />
                </div>
                <div className="flex flex-col gap-[24px]">
                    {isLoading ? (
                        <div className="text-center py-4">
                            Loading education data...
                        </div>
                    ) : isError ? (
                        <div className="text-center py-4 text-red-500">
                            Error loading education data
                        </div>
                    ) : transformedEducationData.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            No education records found
                        </div>
                    ) : (
                        transformedEducationData.map(
                            (education: any, index: number) => (
                                <PurpleTaggedCard
                                    key={index}
                                    label={education.level.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    children={
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                            <TextContent
                                                header="school name"
                                                text={education["denormalized_school_name"]}
                                            />
                                            <TextContent
                                                header="degree"
                                                text={education.degree}
                                            />
                                            <TextContent
                                                header="course"
                                                text={education.course}
                                            />
                                            <TextContent
                                                header="year started"
                                                text={education["year started"]}
                                            />
                                            <TextContent
                                                header="year left"
                                                text={education["year left"]}
                                            />
                                            <TextContent
                                                header="honors received"
                                                text={
                                                    education["honors received"]
                                                }
                                            />
                                        </div>
                                    }
                                />
                            )
                        )
                    )}
                </div>
            </div>

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type="success"
                title="Successfully updated Educational Background"
                animation="slide-up"
            />
        </div>
    );
};

export default Education;

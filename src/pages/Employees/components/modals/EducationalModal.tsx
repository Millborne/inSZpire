import { useState } from "react";
import {
    Button,
    Inputs,
    Modal,
    PurpleTaggedCard,
    TextContent,
} from "enterprisze-global-components";

// icons
import { ArrowDown2, TickCircle, Trash, Edit2 } from "iconsax-reactjs";

// Components
// import EducationConfirmationModal from "./EducationConfirmationModal";
import DeleteConfirmation from "../../../../components/DeleteConfirmation";
import { RootState } from "../../../../reducers/store";
import { useSelector } from "react-redux";
// services
import {
    useEducation,
    useEducationLevels,
} from "../../../../services/employee-profile/personal/education";

export interface EducationalDataType {
    id: string;
    level: string;
    "school name": string;
    degree: string;
    course: string;
    "year started": string;
    "year left": string;
    "honors received": string;
}

interface EducationalModalProps {
    isOpen: boolean;
    onClose: () => void;
    educationalData: EducationalDataType[];
    onSubmitSuccess?: () => void;
}

const educationalLevelOptions = [
    "High School",
    "Senior High School",
    "Vocational",
    "College Level",
    "College Graduate",
    "Masters",
    "Doctorate",
];

// Reusable Input Container Component - moved outside to prevent recreation
interface InputContainerProps {
    isEditMode: boolean;
    index: number | null;
    formData: {
        schoolName: string;
        degree: string;
        course: string;
        yearStarted: string;
        yearLeft: string;
        honorsReceived: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            schoolName: string;
            degree: string;
            course: string;
            yearStarted: string;
            yearLeft: string;
            honorsReceived: string;
        }>
    >;
    educationalLevel: string;
    setEducationalLevel: React.Dispatch<React.SetStateAction<string>>;
    showEducationalLevelDropdown: boolean;
    setShowEducationalLevelDropdown: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    handleDoneClick: () => void;
    handleAddClick: () => void;
    educationLevelsOptions: any;
}

const InputContainer: React.FC<InputContainerProps> = ({
    isEditMode,
    index,
    formData,
    setFormData,
    educationalLevel,
    setEducationalLevel,
    showEducationalLevelDropdown,
    setShowEducationalLevelDropdown,
    handleDoneClick,
    handleAddClick,
    educationLevelsOptions,
}) => (
    <div
        key={index}
        className="flex flex-col gap-[8px] border rounded-[12px] border-szPrimary200 pt-[4px] pr-[12px] pb-[8px] pl-[12px]"
    >
        <div className="flex gap-[16px] items-center min-h-[32px] justify-between">
            <div className="relative">
                <div
                    className="flex gap-[16px] items-center cursor-pointer"
                    onClick={() =>
                        setShowEducationalLevelDropdown((prev) => !prev)
                    }
                >
                    <h6 className="text-h6 text-szPrimary700 min-w-[130px] sm:max-w-fit">
                        {educationalLevel}
                    </h6>
                    <ArrowDown2 className="icon-sm" />
                </div>
                {showEducationalLevelDropdown && (
                    <div
                        className="absolute z-20 mt-2 bg-white border rounded-lg shadow-lg w-full"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                    >
                        {educationLevelsOptions.map((option: any) => (
                            <p
                                key={option}
                                className="px-[12px] py-[8px] hover:bg-szPrimary100 cursor-pointer text-body-small-reg"
                                onClick={() => {
                                    setEducationalLevel(
                                        option.name
                                            .split(" ")
                                            .map(
                                                (word: string) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")
                                    );
                                    setShowEducationalLevelDropdown(false);
                                }}
                            >
                                {option.name
                                    .split(" ")
                                    .map(
                                        (word: string) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <p className="text-caption-all-caps text-szGrey500 uppercase">
                [x] - You can leave blank
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <Inputs
                label="SCHOOL NAME"
                placeholder="Name of College to Edit"
                value={formData.schoolName}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        schoolName: e.target.value,
                    }))
                }
            />
            <Inputs
                label="DEGREE (EX. BACHELOR OF SCIENCE IN ARCHITECTURE)"
                placeholder="Bachelor of Science in Information Technology"
                value={formData.degree}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        degree: e.target.value,
                    }))
                }
            />
            <Inputs
                label="COURSE / SPECIALIZATION (EX. NETWORKING. [X])"
                placeholder=""
                value={formData.course}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        course: e.target.value,
                    }))
                }
            />
            <Inputs
                label="YEAR STARTED"
                placeholder="2022"
                value={formData.yearStarted}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        yearStarted: e.target.value,
                    }))
                }
            />
            <Inputs
                label="YEAR ENDED"
                placeholder="2024"
                value={formData.yearLeft}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        yearLeft: e.target.value,
                    }))
                }
            />
            <Inputs
                label="HONORS RECEIVED [X]"
                placeholder=""
                value={formData.honorsReceived}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        honorsReceived: e.target.value,
                    }))
                }
            />
        </div>
        <div className="flex justify-end">
            <Button
                label={isEditMode ? "Done" : "Add"}
                variant="primary"
                size="small"
                leftIcon={<TickCircle />}
                onClick={isEditMode ? handleDoneClick : handleAddClick}
            />
        </div>
    </div>
);

const EducationalModal: React.FC<EducationalModalProps> = ({
    isOpen,
    onClose,
    educationalData,
    onSubmitSuccess,
}) => {
    const selectedEmployee = useSelector(
        (state: RootState) => state.employeeState.selectedEmployee
    );
    const { data: educationLevels } = useEducationLevels({});

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showInputContainer, setShowInputContainer] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showEducationalLevelDropdown, setShowEducationalLevelDropdown] =
        useState(false);
    const [educationalLevel, setEducationalLevel] =
        useState("Educational Level");
    // const [educationLevelId, setEducationLevelId] = useState<string | null>(null);

    // Form state for adding/editing education
    const [formData, setFormData] = useState({
        schoolName: "",
        degree: "",
        course: "",
        yearStarted: "",
        yearLeft: "",
        honorsReceived: "",
    });

    // Education service hooks
    const { createEducation, updateEducation, deleteEducation } =
        useEducation();

    // For Adding Education
    const handleAddEducationClick = () => {
        setShowInputContainer(true);
        setIsEditMode(false);
        setEditingIndex(null);
        // Reset form data
        setFormData({
            schoolName: "",
            degree: "",
            course: "",
            yearStarted: "",
            yearLeft: "",
            honorsReceived: "",
        });
    };

    //For adding education once finished
    const handleAddClick = async () => {
        if (!selectedEmployee?.profile_ID) {
            console.error("No profile ID available");
            return;
        }

        try {
            // Helper function to convert Buffer to hex string
            const bufferToHex = (bufferObj: any): string => {
                if (
                    !bufferObj ||
                    !bufferObj.data ||
                    !Array.isArray(bufferObj.data)
                ) {
                    return "";
                }
                return bufferObj.data
                    .map((byte: number) => byte.toString(16).padStart(2, "0"))
                    .join("");
            };

            // Map educational level to education level ID
            const foundEducationLevel = educationLevels.data.find(
                (item: any) =>
                    item.name.toLowerCase() === educationalLevel.toLowerCase()
            );

            const educationLevelId = foundEducationLevel?.education_level_ID
                ? bufferToHex(foundEducationLevel.education_level_ID)
                : "";
            const schoolId = "school-id"; // Replace with actual school ID

            await createEducation({
                profile_ID: selectedEmployee.profile_ID,
                education_level_ID: educationLevelId,
                school_ID: "77777777000000000000000000000001",
                degree: formData.degree || undefined,
                course: formData.course || undefined,
                year_started: formData.yearStarted
                    ? parseInt(formData.yearStarted)
                    : undefined,
                year_left: formData.yearLeft
                    ? parseInt(formData.yearLeft)
                    : undefined,
                honors_received: formData.honorsReceived || undefined,
                user_type: "employee", // Replace with actual user type
            });

            setShowInputContainer(false);
            setEducationalLevel("Educational Level");
            setShowEducationalLevelDropdown(false);

            // Call success callback
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (error) {
            console.error("Error creating education:", error);
        }
    };

    // For Editing Education
    const handleEditClick = (index: number) => {
        const education = educationalData[index];
        setShowInputContainer(true);
        setIsEditMode(true);
        setEditingIndex(index);

        // Populate form with existing data
        setFormData({
            schoolName: education["school name"],
            degree: education.degree,
            course: education.course,
            yearStarted: education["year started"],
            yearLeft: education["year left"],
            honorsReceived: education["honors received"],
        });
    };

    // For Editing Education once finished
    const handleDoneClick = async () => {
        if (editingIndex !== null) {
            try {
                const education = educationalData[editingIndex];

                await updateEducation({
                    educ_ID: education.id,
                    degree: formData.degree || undefined,
                    course: formData.course || undefined,
                    year_started: formData.yearStarted
                        ? parseInt(formData.yearStarted)
                        : undefined,
                    year_left: formData.yearLeft
                        ? parseInt(formData.yearLeft)
                        : undefined,
                    honors_received: formData.honorsReceived || undefined,
                });

                setShowInputContainer(false);
                setEducationalLevel("Educational Level");
                setShowEducationalLevelDropdown(false);

                // Call success callback
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            } catch (error) {
                console.error("Error updating education:", error);
            }
        }
    };

    const handleSubmit = () => {
        onClose();

        // Call success callback if provided
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    const handleDeleteClick = (index: number) => {
        setEditingIndex(index);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (editingIndex !== null && selectedEmployee?.profile_ID) {
            try {
                const education = educationalData[editingIndex];
                const profileId = selectedEmployee.profile_ID;

                await deleteEducation({
                    educ_ID: education.id,
                    profile_ID: profileId,
                    user_type: "employee", // Replace with actual user type
                });

                setIsDeleteModalOpen(false);

                // Call success callback
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            } catch (error) {
                console.error("Error deleting education:", error);
            }
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Edit Educational Background"
                buttonLabel="Education"
                modalWidth="w-[900px]"
                contentHeight="h-[65vh]"
                headerOptions="left"
                footerOptions="stacked-left"
                buttonOnClick={handleAddEducationClick}
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                    },
                    {
                        label: "Submit",
                        variant: "primary",
                        onClick: handleSubmit,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col h-full gap-[16px]">
                        {/* Add mode input container */}
                        {showInputContainer && !isEditMode && (
                            <InputContainer
                                isEditMode={false}
                                index={null}
                                formData={formData}
                                setFormData={setFormData}
                                educationalLevel={educationalLevel}
                                setEducationalLevel={setEducationalLevel}
                                showEducationalLevelDropdown={
                                    showEducationalLevelDropdown
                                }
                                setShowEducationalLevelDropdown={
                                    setShowEducationalLevelDropdown
                                }
                                handleDoneClick={handleDoneClick}
                                handleAddClick={handleAddClick}
                                educationLevelsOptions={educationLevels.data}
                            />
                        )}
                        <section className="mt-[12px]">
                            <div className="flex flex-col gap-[24px] ">
                                {educationalData.map(
                                    (educationalData, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-[24px]"
                                        >
                                            <PurpleTaggedCard
                                                label={educationalData.level}
                                                children={
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                                        <TextContent
                                                            header="school name"
                                                            text={
                                                                educationalData[
                                                                    "school name"
                                                                ]
                                                            }
                                                        />
                                                        <TextContent
                                                            header="degree"
                                                            text={
                                                                educationalData.degree
                                                            }
                                                        />
                                                        <TextContent
                                                            header="course"
                                                            text={
                                                                educationalData.course
                                                            }
                                                        />
                                                        <TextContent
                                                            header="year started"
                                                            text={
                                                                educationalData[
                                                                    "year started"
                                                                ]
                                                            }
                                                        />
                                                        <TextContent
                                                            header="year left"
                                                            text={
                                                                educationalData[
                                                                    "year left"
                                                                ]
                                                            }
                                                        />
                                                        <div className="flex justify-between items-end">
                                                            <TextContent
                                                                header="honors received"
                                                                text={
                                                                    educationalData[
                                                                        "honors received"
                                                                    ]
                                                                }
                                                            />
                                                            <div className="flex gap-[16px]">
                                                                <Edit2
                                                                    className="icon-sm text-szPrimary900 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleEditClick(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                                <Trash
                                                                    className="icon-sm text-szPrimary900 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDeleteClick(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                            {showInputContainer &&
                                                isEditMode &&
                                                editingIndex === index && (
                                                    <InputContainer
                                                        isEditMode={true}
                                                        index={editingIndex}
                                                        formData={formData}
                                                        setFormData={
                                                            setFormData
                                                        }
                                                        educationalLevel={
                                                            educationalLevel
                                                        }
                                                        setEducationalLevel={
                                                            setEducationalLevel
                                                        }
                                                        showEducationalLevelDropdown={
                                                            showEducationalLevelDropdown
                                                        }
                                                        setShowEducationalLevelDropdown={
                                                            setShowEducationalLevelDropdown
                                                        }
                                                        handleDoneClick={
                                                            handleDoneClick
                                                        }
                                                        handleAddClick={
                                                            handleAddClick
                                                        }
                                                        educationLevelsOptions={
                                                            educationLevels.data
                                                        }
                                                    />
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>
                }
            />

            {/* Delete Confirmation Modal --------------------------- */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onClick={handleDeleteConfirm}
                description="Are you sure you want to delete this educational background?"
            />
        </>
    );
};

export default EducationalModal;

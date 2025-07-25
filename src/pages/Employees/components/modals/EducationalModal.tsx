import { useState, useEffect } from "react";
import {
    Button,
    Inputs,
    Modal,
    PurpleTaggedCard,
    SnackbarAlert,
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
import { bufferToHex } from "../../../../utils/bufferToHex";

export interface EducationalDataType {
    id: string;
    level: string;
    "school name": string;
    denormalized_school_name?: string;
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

// Types for pending operations
interface PendingCreateOperation {
    type: "create";
    data: {
        profile_ID: string;
        education_level_ID: string;
        school_ID: string;
        school_name?: string;
        degree?: string;
        course?: string;
        year_started?: number;
        year_left?: number;
        honors_received?: string;
        user_type: string;
    };
}

interface PendingUpdateOperation {
    type: "update";
    data: {
        educ_ID: string;
        profile_ID: string;
        education_level_ID: string;
        school_ID: string;
        school_name?: string;
        degree?: string;
        course?: string;
        year_started?: number;
        year_left?: number;
        honors_received?: string;
    };
}

interface PendingDeleteOperation {
    type: "delete";
    data: {
        educ_ID: string;
        profile_ID: string;
        user_type: string;
    };
}

type PendingOperation =
    | PendingCreateOperation
    | PendingUpdateOperation
    | PendingDeleteOperation;

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

    // Store pending operations
    const [pendingOperations, setPendingOperations] = useState<
        PendingOperation[]
    >([]);

    // Local state to track current educational data including pending changes
    const [currentEducationalData, setCurrentEducationalData] =
        useState<EducationalDataType[]>(educationalData);

    // Update local state when prop changes
    useEffect(() => {
        setCurrentEducationalData(educationalData);
    }, [educationalData]);

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

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<
        "success" | "warning" | "error"
    >("success");

    // Helper function to generate temporary ID for new records
    const generateTempId = () =>
        `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
            // Validate required fields
            if (educationalLevel === "Educational Level") {
                setSnackbarOpen(true);
                setSnackbarMessage("Please select an educational level");
                setSnackbarType("warning");
                return;
            }

            if (!formData.schoolName) {
                setSnackbarOpen(true);
                setSnackbarMessage("Please enter a school name");
                setSnackbarType("warning");
                return;
            }

            // Map educational level to education level ID
            const foundEducationLevel = educationLevels.data.find(
                (item: any) =>
                    item.name.toLowerCase() === educationalLevel.toLowerCase()
            );

            const educationLevelId = foundEducationLevel?.education_level_ID
                ? bufferToHex(foundEducationLevel.education_level_ID)
                : "00000000000000000000000000000000";

            // Create temporary education record for immediate UI update
            const tempEducationRecord: EducationalDataType = {
                id: generateTempId(),
                level: educationalLevel,
                "school name": formData.schoolName,
                degree: formData.degree,
                course: formData.course,
                "year started": formData.yearStarted,
                "year left": formData.yearLeft,
                "honors received": formData.honorsReceived,
            };

            // Update local state immediately
            setCurrentEducationalData((prev) => [...prev, tempEducationRecord]);

            // Store create operation instead of executing immediately
            const createOperation: PendingCreateOperation = {
                type: "create",
                data: {
                    profile_ID: selectedEmployee.profile_ID,
                    education_level_ID: educationLevelId,
                    school_ID: "77777777000000000000000000000001",
                    school_name: formData.schoolName,
                    degree: formData.degree || undefined,
                    course: formData.course || undefined,
                    year_started: formData.yearStarted
                        ? parseInt(formData.yearStarted)
                        : undefined,
                    year_left: formData.yearLeft
                        ? parseInt(formData.yearLeft)
                        : undefined,
                    honors_received: formData.honorsReceived || undefined,
                    user_type: "employee",
                },
            };

            setPendingOperations((prev) => [...prev, createOperation]);

            setShowInputContainer(false);
            setEducationalLevel("Educational Level");
            setShowEducationalLevelDropdown(false);

            // Show success message
            setSnackbarOpen(true);
            setSnackbarMessage("Education record added to pending operations");
            setSnackbarType("success");
        } catch (error) {
            console.error("Error preparing education creation:", error);
        }
    };

    // For Editing Education
    const handleEditClick = (index: number) => {
        const education = currentEducationalData[index];
        setEducationalLevel(
            education.level
                .split(" ")
                .map(
                    (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")
        );
        setShowInputContainer(true);
        setIsEditMode(true);
        setEditingIndex(index);

        // Populate form with existing data
        setFormData({
            schoolName: education["school name"] || "Unknown School",
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
                // Validate required fields
                if (educationalLevel === "Educational Level") {
                    setSnackbarOpen(true);
                    setSnackbarMessage("Please select an educational level");
                    setSnackbarType("warning");
                    return;
                }

                if (!formData.schoolName) {
                    setSnackbarOpen(true);
                    setSnackbarMessage("Please enter a school name");
                    setSnackbarType("warning");
                    return;
                }

                const education = currentEducationalData[editingIndex];

                // Update local state immediately
                const updatedEducation: EducationalDataType = {
                    ...education,
                    level: educationalLevel,
                    "school name": formData.schoolName,
                    degree: formData.degree,
                    course: formData.course,
                    "year started": formData.yearStarted,
                    "year left": formData.yearLeft,
                    "honors received": formData.honorsReceived,
                };

                setCurrentEducationalData((prev) =>
                    prev.map((item, idx) =>
                        idx === editingIndex ? updatedEducation : item
                    )
                );

                // Map educational level to education level ID
                const foundEducationLevel = educationLevels.data.find(
                    (item: any) =>
                        item.name.toLowerCase() ===
                        educationalLevel.toLowerCase()
                );

                const educationLevelId = foundEducationLevel?.education_level_ID
                    ? bufferToHex(foundEducationLevel.education_level_ID)
                    : "00000000000000000000000000000000";

                // Store update operation instead of executing immediately
                const updateOperation: PendingUpdateOperation = {
                    type: "update",
                    data: {
                        educ_ID: bufferToHex(education.id),
                        profile_ID: selectedEmployee?.profile_ID || "",
                        education_level_ID: educationLevelId,
                        school_ID: "77777777000000000000000000000001",
                        school_name: formData.schoolName,
                        degree: formData.degree || undefined,
                        course: formData.course || undefined,
                        year_started: formData.yearStarted
                            ? parseInt(formData.yearStarted)
                            : undefined,
                        year_left: formData.yearLeft
                            ? parseInt(formData.yearLeft)
                            : undefined,
                        honors_received: formData.honorsReceived || undefined,
                    },
                };

                setPendingOperations((prev) => [...prev, updateOperation]);

                setShowInputContainer(false);
                setEducationalLevel("Educational Level");
                setShowEducationalLevelDropdown(false);

                // Show success message
                setSnackbarOpen(true);
                setSnackbarMessage(
                    "Education record updated in pending operations"
                );
                setSnackbarType("success");
            } catch (error) {
                console.error("Error preparing education update:", error);
                setSnackbarOpen(true);
                setSnackbarMessage("Error preparing education update");
                setSnackbarType("error");
            }
        }
    };

    const handleSubmit = async () => {
        try {
            if (pendingOperations.length === 0) {
                setSnackbarOpen(true);
                setSnackbarMessage("Please make changes to educational background before proceeding");
                setSnackbarType("warning");
                return;
            }
            // Execute all pending operations
            for (const operation of pendingOperations) {
                switch (operation.type) {
                    case "create":
                        await createEducation(operation.data);
                        break;
                    case "update":
                        await updateEducation(operation.data);
                        break;
                    case "delete":
                        await deleteEducation(operation.data);
                        break;
                }
            }

            // Clear pending operations
            setPendingOperations([]);

            // Show success message
            setSnackbarOpen(true);
            setSnackbarMessage("All education changes saved successfully");
            setSnackbarType("success");
            setShowInputContainer(false);
            setIsEditMode(false);
            setEditingIndex(null);
            setEducationalLevel("Educational Level");

            // Call success callback
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }

            onClose();
        } catch (error) {
            console.error("Error executing pending operations:", error);
            setSnackbarOpen(true);
            setSnackbarMessage("Error saving education changes");
            setSnackbarType("error");
        }
    };

    const handleDeleteClick = (index: number) => {
        setEditingIndex(index);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (editingIndex !== null && selectedEmployee?.profile_ID) {
            try {
                const education = currentEducationalData[editingIndex];
                const profileId = selectedEmployee.profile_ID;

                // Remove from local state immediately
                setCurrentEducationalData((prev) =>
                    prev.filter((_, idx) => idx !== editingIndex)
                );

                // Store delete operation instead of executing immediately
                const deleteOperation: PendingDeleteOperation = {
                    type: "delete",
                    data: {
                        educ_ID: bufferToHex(education.id),
                        profile_ID: profileId,
                        user_type: "employee",
                    },
                };

                setPendingOperations((prev) => [...prev, deleteOperation]);

                setIsDeleteModalOpen(false);

                // Show success message
                setSnackbarOpen(true);
                setSnackbarMessage(
                    "Education record added to pending deletions"
                );
                setSnackbarType("success");
            } catch (error) {
                console.error("Error preparing education deletion:", error);
            }
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setShowInputContainer(false);
                    setIsEditMode(false);
                    setEditingIndex(null);
                    setEducationalLevel("Educational Level");
                    setPendingOperations([]); // Clear pending operations on close
                    setCurrentEducationalData(educationalData); // Reset to original data
                    setShowInputContainer(false);
                    setIsEditMode(false);
                    setEditingIndex(null);
                    setEducationalLevel("Educational Level");
                }}
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
                        onClick: () => {
                            setShowInputContainer(false);
                            setIsEditMode(false);
                            setEditingIndex(null);
                            setEducationalLevel("Educational Level");
                            setPendingOperations([]); // Clear pending operations
                            setCurrentEducationalData(educationalData); // Reset to original data
                            onClose();
                        },
                        size: "medium",
                    },
                    {
                        label: "Submit",
                        variant: "primary",
                        onClick: () => {
                            handleSubmit();
                        },
                        size: "medium",
                        disabled: pendingOperations.length === 0,
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
                                {currentEducationalData.map(
                                    (educationalData, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-[24px]"
                                        >
                                            <PurpleTaggedCard
                                                label={educationalData.level
                                                    .split(" ")
                                                    .map(
                                                        (word: string) =>
                                                            word
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            word.slice(1)
                                                    )
                                                    .join(" ")}
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

            <SnackbarAlert
                isOpen={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </>
    );
};

export default EducationalModal;

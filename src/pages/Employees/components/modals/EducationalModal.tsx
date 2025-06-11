import {
  Button,
  Inputs,
  Modal,
  PurpleTaggedCard,
  TextContent,
} from "enterprisze-global-components";

// icons
import { ArrowDown2, TickCircle, Trash, Edit2 } from "iconsax-reactjs";
import { useState } from "react";

// Components
import EducationConfirmationModal from "./EducationConfirmationModal";

interface EducationalData {
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
  educationalData: EducationalData[];
}

const EducationalModal: React.FC<EducationalModalProps> = ({
  isOpen,
  onClose,
  educationalData,
}) => {
  const [showInputContainer, setShowInputContainer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentEducationData, setCurrentEducationData] =
    useState<EducationalData | null>(null);

  // For Adding Education
  const handleAddEducationClick = () => {
    setShowInputContainer(true);
    setIsEditMode(false);
    setEditingIndex(null);
  };

  //For adding education once finished
  const handleAddClick = () => {
    // Here you would typically collect the form data
    // For now, we'll use dummy data
    const newEducationData: EducationalData = {
      level: "College",
      "school name": "Sample School",
      degree: "Bachelor's Degree",
      course: "Computer Science",
      "year started": "2020",
      "year left": "2024",
      "honors received": "Dean's List",
    };
    setCurrentEducationData(newEducationData);
    setShowInputContainer(false);
  };

  // For Editing Education
  const handleEditClick = (index: number) => {
    setShowInputContainer(true);
    setIsEditMode(true);
    setEditingIndex(index);
  };

  // For Editing Educaton once finished
  const handleDoneClick = () => {
    if (editingIndex !== null) {
      setCurrentEducationData(educationalData[editingIndex]);
      setShowInputContainer(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
    setShowInputContainer(false);
    setIsEditMode(false);
    setEditingIndex(null);
    setCurrentEducationData(null);
  };

  const handleProceed = () => {
    if (currentEducationData) {
      setShowConfirmationModal(true);
      onClose();
    }
  };

  // Reusable Input Container Component
  const InputContainer = ({
    isEditMode,
    index,
  }: {
    isEditMode: boolean;
    index: number | null;
  }) => (
    <div className="flex flex-col gap-[8px] border rounded-[12px] border-szPrimary200 pt-[4px] pr-[12px] pb-[8px] pl-[12px]">
      <div className="flex gap-[16px] items-center min-h-[32px] justify-between">
        <div className="flex gap-[16px] items-center">
          <h6 className="text-h6 text-szPrimary700 max-w-[160px] sm:max-w-fit">
            Choose Educational Level
          </h6>
          <ArrowDown2 className="icon-sm" />
        </div>
        <p className="text-caption-all-caps text-szGrey500 uppercase">
          [x] - You can leave blank
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        <Inputs
          label="SCHOOL NAME"
          placeholder="Name of College to Edit"
          value={index !== null ? educationalData[index]?.["school name"] : ""}
        />
        <Inputs
          label="DEGREE (EX. BACHELOR OF SCIENCE IN ARCHITECTURE)"
          placeholder="Bachelor of Science in Information Technology"
          value={index !== null ? educationalData[index]?.degree : ""}
        />
        <Inputs
          label="COURSE / SPECIALIZATION (EX. NETWORKING. [X])"
          placeholder=""
          value={index !== null ? educationalData[index]?.course : ""}
        />
        <Inputs
          label="YEAR STARTED"
          placeholder="2022"
          value={index !== null ? educationalData[index]?.["year started"] : ""}
        />
        <Inputs
          label="YEAR ENDED"
          placeholder="2024"
          value={index !== null ? educationalData[index]?.["year left"] : ""}
        />
        <Inputs
          label="HONORS RECEIVED [X]"
          placeholder=""
          value={
            index !== null ? educationalData[index]?.["honors received"] : ""
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

  return (
    <>
      <Modal
        isOpen={isOpen && !showConfirmationModal}
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
            label: "Proceed",
            variant: "primary",
            onClick: handleProceed,
            size: "medium",
          },
        ]}
        content={
          <div className="flex flex-col h-full gap-[16px]">
            {/* Add mode input container */}
            {showInputContainer && !isEditMode && (
              <InputContainer isEditMode={false} index={null} />
            )}

            <section className="mt-[12px]">
              <div className="flex flex-col gap-[24px] ">
                {educationalData.map((educationalData, index) => (
                  <PurpleTaggedCard
                    key={index}
                    label={educationalData.level}
                    children={
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                        <TextContent
                          header="school name"
                          text={educationalData["school name"]}
                        />
                        <TextContent
                          header="degree"
                          text={educationalData.degree}
                        />
                        <TextContent
                          header="course"
                          text={educationalData.course}
                        />
                        <TextContent
                          header="year started"
                          text={educationalData["year started"]}
                        />
                        <TextContent
                          header="year left"
                          text={educationalData["year left"]}
                        />
                        <div className="flex justify-between items-end">
                          <TextContent
                            header="honors received"
                            text={educationalData["honors received"]}
                          />
                          <div className="flex gap-[16px]">
                            <Edit2
                              className="icon-sm text-szPrimary900 cursor-pointer"
                              onClick={() => handleEditClick(index)}
                            />
                            <Trash className="icon-sm text-szPrimary900 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </section>

            {/* Edit mode input container */}
            {showInputContainer && isEditMode && editingIndex !== null && (
              <InputContainer isEditMode={true} index={editingIndex} />
            )}
          </div>
        }
      />

      {currentEducationData && (
        <EducationConfirmationModal
          isOpen={showConfirmationModal}
          onClose={handleConfirmationClose}
          isEditMode={isEditMode}
          educationalData={currentEducationData}
        />
      )}
    </>
  );
};

export default EducationalModal;

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

const EducationalModal: React.FC<EducationalModalProps> = ({
  isOpen,
  onClose,
  educationalData,
  onSubmitSuccess,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showInputContainer, setShowInputContainer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showEducationalLevelDropdown, setShowEducationalLevelDropdown] =
    useState(false);
  const [educationalLevel, setEducationalLevel] = useState("Educational Level");

  // For Adding Education
  const handleAddEducationClick = () => {
    setShowInputContainer(true);
    setIsEditMode(false);
    setEditingIndex(null);
  };

  //For adding education once finished
  const handleAddClick = () => {
    setShowInputContainer(false);
    setEducationalLevel("Educational Level");
    setShowEducationalLevelDropdown(false);
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
      setShowInputContainer(false);
      setEducationalLevel("Educational Level");
      setShowEducationalLevelDropdown(false);
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
    setIsDeleteModalOpen(true);
  };

  // Reusable Input Container Component
  const InputContainer = ({
    isEditMode,
    index,
  }: {
    isEditMode: boolean;
    index: number | null;
  }) => (
    <div
      key={index}
      className="flex flex-col gap-[8px] border rounded-[12px] border-szPrimary200 pt-[4px] pr-[12px] pb-[8px] pl-[12px]"
    >
      <div className="flex gap-[16px] items-center min-h-[32px] justify-between">
        <div className="relative">
          <div
            className="flex gap-[16px] items-center cursor-pointer"
            onClick={() => setShowEducationalLevelDropdown((prev) => !prev)}
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
              {educationalLevelOptions.map((option) => (
                <p
                  key={option}
                  className="px-[12px] py-[8px] hover:bg-szPrimary100 cursor-pointer text-body-small-reg"
                  onClick={() => {
                    setEducationalLevel(option);
                    setShowEducationalLevelDropdown(false);
                  }}
                >
                  {option}
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
        <Inputs label="SCHOOL NAME" placeholder="Name of College to Edit" />
        <Inputs
          label="DEGREE (EX. BACHELOR OF SCIENCE IN ARCHITECTURE)"
          placeholder="Bachelor of Science in Information Technology"
        />
        <Inputs
          label="COURSE / SPECIALIZATION (EX. NETWORKING. [X])"
          placeholder=""
        />
        <Inputs label="YEAR STARTED" placeholder="2022" />
        <Inputs label="YEAR ENDED" placeholder="2024" />
        <Inputs label="HONORS RECEIVED [X]" placeholder="" />
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
              <InputContainer isEditMode={false} index={null} />
            )}
            <section className="mt-[12px]">
              <div className="flex flex-col gap-[24px] ">
                {educationalData.map((educationalData, index) => (
                  <div key={index} className="flex flex-col gap-[24px]">
                    <PurpleTaggedCard
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
                              <Trash
                                className="icon-sm text-szPrimary900 cursor-pointer"
                                onClick={() => handleDeleteClick(index)}
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
                        />
                      )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        }
      />

      {/* Delete Confirmation Modal --------------------------- */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onClick={() => {}} //add function here
        description="Are you sure you want to delete this educational background?"
      />
    </>
  );
};

export default EducationalModal;

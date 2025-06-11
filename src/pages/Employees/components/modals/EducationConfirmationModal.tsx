import { Modal, ConfirmationContent } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";

interface EducationConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  educationalData: {
    level: string;
    "school name": string;
    degree: string;
    course: string;
    "year started": string;
    "year left": string;
    "honors received": string;
  };
}

const EducationConfirmationModal: React.FC<EducationConfirmationModalProps> = ({
  isOpen,
  onClose,
  isEditMode,
  educationalData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeaderDivider={false}
      showFooterDivider={false}
      icon={<InfoCircle />}
      title="Confirmation"
      showButton={false}
      modalWidth="w-[600px]"
      contentHeight="h-[65vh]"
      headerOptions="left"
      footerOptions="center"
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
          onClick: () => onClose(),
          size: "medium",
        },
      ]}
      content={
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-body-base-strong text-szBlack800 text-center">
              You are about to update your educational background.
            </p>
            <div className="flex flex-col gap-[8px]">
              <ConfirmationContent
                title="ADD EDUCATION"
                variant="add"
                data={[
                  { label: "EDUCATIONAL LEVEL", value: "College" },
                  {
                    label: "SCHOOL NAME",
                    value:
                      "University of Science and Technology of Southern Philippines",
                  },
                  {
                    label: "DEGREE",
                    value: "Bachelor of Science in Information Technology",
                  },
                  { label: "COURSE", value: "—" },
                  { label: "YEAR STARTED", value: "2021" },
                  { label: "YEAR ENDED", value: "2025" },
                  { label: "HONORS RECEIVED", value: "Magna Cum Laude" },
                ]}
              />
              <ConfirmationContent
                title="EDITED EDUCATION"
                variant="edit"
                sectionLabel="COLLEGE"
                data={[
                  {
                    label: "Degree",
                    value: "",
                    oldValue: "BSIT",
                    newValue: "Bachelor of Science in Information Technology",
                  },
                  {
                    label: "Year Started",
                    value: "",
                    oldValue: "—",
                    newValue: "2021",
                  },
                  {
                    label: "Year Ended",
                    value: "",
                    oldValue: "—",
                    newValue: "2024",
                  },
                ]}
              />
              <ConfirmationContent
                title="DELETED EDUCATION"
                sectionLabel="COLLEGE"
                variant="delete"
                data={[
                  { label: "EDUCATIONAL LEVEL", value: "College" },
                  {
                    label: "SCHOOL NAME",
                    value:
                      "University of Science and Technology of Southern Philippines",
                  },
                  {
                    label: "DEGREE",
                    value: "Bachelor of Science in Information Technology",
                  },
                  { label: "COURSE", value: "—" },
                  { label: "YEAR STARTED", value: "2021" },
                  { label: "YEAR ENDED", value: "2025" },
                  { label: "HONORS RECEIVED", value: "Magna Cum Laude" },
                ]}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EducationConfirmationModal;

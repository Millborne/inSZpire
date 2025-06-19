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

const educationalData = [
  {
    id: "1",
    level: "College",
    "school name": "USTP",
    degree: "-",
    course: "Regular",
    "year started": "Feb 21, 2023",
    "year left": "Feb 21, 2023",
    "honors received": "First Honor",
  },
  {
    id: "2",
    level: "Senior High School",
    "school name": "USTP",
    degree: "-",
    course: "Regular",
    "year started": "Feb 21, 2023",
    "year left": "Feb 21, 2023",
    "honors received": "First Honor",
  },
];

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSnackbarOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Educational Background</h6>
          <ButtonsIcon
            icon={<Edit2 />}
            variant="secondary"
            size="small"
            onClick={() => setIsModalOpen(true)}
          />
          <EducationalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            educationalData={educationalData}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </div>
        <div className="flex flex-col gap-[24px]">
          {educationalData.map((education, index) => (
            <PurpleTaggedCard
              key={index}
              label={education.level}
              children={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  <TextContent
                    header="school name"
                    text={education["school name"]}
                  />
                  <TextContent header="degree" text={education.degree} />
                  <TextContent header="course" text={education.course} />
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
                    text={education["honors received"]}
                  />
                </div>
              }
            />
          ))}
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

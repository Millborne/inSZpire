import {
  TextContent,
  Divider,
  ButtonsIcon,
  PurpleTaggedCard,
  Button,
} from "enterprisze-global-components";

//icons
import { Add, Edit2 } from "iconsax-react";

const childrenData = [
  {
    "school name": "USTP",
    degree: "-",
    course: "Regular",
    "year started": "Feb 21, 2023",
    "year left": "Feb 21, 2023",
    "honors received": "First Honor",
  },
  {
    "school name": "USTP",
    degree: "-",
    course: "Regular",
    "year started": "Feb 21, 2023",
    "year left": "Feb 21, 2023",
    "honors received": "First Honor",
  },
];

const Education = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Educational Background</h6>
          <ButtonsIcon icon={<Edit2 />} variant="secondary" size="small" />
        </div>
        <div className="flex flex-col gap-[24px]">
          <PurpleTaggedCard
            label="College"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextContent header="school name" text="USTP" />
                <TextContent header="degree" text="-" />
                <TextContent header="course" text="Regular" />
                <TextContent header="year started" text="Feb 21, 2023" />
                <TextContent header="year left" text="Feb 21, 2023" />
                <TextContent header="honors received" text="First Honor" />
              </div>
            }
          />
          <PurpleTaggedCard
            label="Senior High School"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextContent header="school name" text="USTP" />
                <TextContent header="degree" text="-" />
                <TextContent header="course" text="Regular" />
                <TextContent header="year started" text="Feb 21, 2023" />
                <TextContent header="year left" text="Feb 21, 2023" />
                <TextContent header="honors received" text="First Honor" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Education;

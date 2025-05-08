import { TextContent, Divider } from "enterprisze-global-components";

//icons
import { Edit2 } from "iconsax-react";

//components

const BasicInfo = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Full Name</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <TextContent header="last name" text="Lee" />
          <TextContent header="first name" text="Frederick" />
          <TextContent header="middle name" text="Hill" />
          <TextContent header="nickname" text="Fred" />
          <TextContent header="extensions" text="N/A" />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Birthday</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <TextContent header="date of birth" text="September 8, 2002" />
          <TextContent header="age" text="22" />
          <TextContent
            header="place of birth"
            text="1905 Apple Lane, Chicago, Illinois(IL)"
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Educational Details</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <TextContent
            header="highschool attended"
            text="Amundsen High School"
          />
          <TextContent header="educational attainment" text="College" />
          <TextContent
            header="last attended school"
            text="Illinois Institute of Technology"
          />
          <TextContent
            header="years attended (date range)"
            text="2015 - 2019"
          />
          <TextContent
            header="college course taken (if applicable)"
            text="Bachelor of Science in Information Technology"
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Others</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <TextContent header="religion" text="Roman Catholic" />
          <TextContent header="sex" text="Male" />
          <TextContent header="civil status" text="Married" />
          <TextContent header="gender / gender identity" text="Cisgender" />
          <TextContent header="pronouns" text="His" />
          <TextContent header="blood type" text="AB" />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Addresses</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>{" "}
        <div className="grid gap-4 items-start">
          <TextContent
            header="present addresses"
            text="38 E 103rd St. Chicago, Illinois(IL)"
          />
          <TextContent
            header="permanent addresses"
            text="38 E 103rd St. Chicago, Illinois(IL)"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;

import {
  PurpleTaggedCard,
  TextContent,
  Divider,
} from "enterprisze-global-components";

//icons
import { Edit2 } from "iconsax-react";

//components

const Contacts = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Contact Information</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>

        <div className="grid grid-cols-2 pb-4 gap-4 items-start max-w-2xl flex-grow">
          <TextContent header="contact number" text="0919 -207-5631" />
          <TextContent header="personal emails" text="freddyhill@mail.net" />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Emergency Contact</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>
        <div className="flex flex-col gap-[24px]">
          <PurpleTaggedCard
            label="Primary Emergency Contact"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextContent header="last name" text="Lee" />
                <TextContent header="first name" text="Keith Lloyd" />
                <TextContent header="middle name" text="Ridgely" />
                <TextContent header="extensions" text="N/A" />
                <TextContent header="contact number" text="0955-021-1889" />
                <TextContent header="relation" text="Father" />
              </div>
            }
          />
          <PurpleTaggedCard
            label="Secondary Emergency Contact"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <TextContent header="last name" text="Hill" />
                <TextContent header="first name" text="Martha Lloyd" />
                <TextContent header="middle name" text="Morrison" />
                <TextContent header="extensions" text="N/A" />
                <TextContent header="contact number" text="0956-294-7801" />
                <TextContent header="relation" text="Mother" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;

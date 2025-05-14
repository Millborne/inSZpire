import {
  Avatar,
  CardContainer,
  TextContent,
} from "enterprisze-global-components";
import {
  Buildings,
  Hashtag,
  Health,
  Information,
  Location,
  NotificationStatus,
  Rank,
} from "iconsax-react";

const Summary = () => {
  return (
    <div className="flex flex-col gap-4">
      <CardContainer
        content={
          <div className="flex flex-wrap flex-row md:flex-row gap-[24px]">
            <img
              src="/src/assets/qrcode.png"
              className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
              <TextContent
                icon={<Hashtag />}
                header="Employee ID"
                text="22010123"
              />
              <TextContent
                icon={<Rank />}
                header="Category (Rank)"
                text="Rank and File"
              />

              <TextContent
                icon={
                  <Avatar
                    size="small"
                    src={"https://i.pravatar.cc/100?img=32"}
                  />
                }
                header="Direct Head"
                text="Stephanie Germanotta"
              />
              <TextContent
                icon={<NotificationStatus />}
                header="Employment Status"
                text="Regular"
              />
              {/* <div className="max-w-[250px]"> */}
              <TextContent
                icon={<Location />}
                header="Location"
                text="Cagayan de Oro City, Philippines, 9000"
              />
              {/* </div> */}

              <TextContent
                icon={<Buildings />}
                header="Company"
                text="SupportZebra"
              />
            </div>
          </div>
        }
      />
      <CardContainer
        title="Addresses and Contacts"
        icon={<Information />}
        content={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
            <TextContent
              header="Company Email"
              text="john.smith@supportzebra.com"
            />
            <TextContent
              header="Personal Email "
              text="john.smith@example.com"
            />

            <TextContent
              header="Work Address"
              text="Barangay 26, CM Recto, Cagayan de Oro City"
            />
            <TextContent
              header="Current Address "
              text="Pamalihi St. Pagatpat, Cagayan de Oro City, Northern Mindanao, Philippines, 9000"
            />
          </div>
        }
      />
      <CardContainer
        title="Emergency Information"
        icon={<Health />}
        content={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-auto">
            <TextContent
              header="Emergency Contact Name"
              text="Fenty, Robyn Rihanna"
            />
            <TextContent header="Emergency Contact Number" text="0912313223" />

            <TextContent header="Blood Type" text="O+" />
          </div>
        }
      />
    </div>
  );
};

export default Summary;

import {
  Button,
  ButtonsIcon,
  Divider,
  PurpleTaggedCard,
  TextContent,
} from "enterprisze-global-components";

//icons, Edit2
import { Edit2 } from "iconsax-react";

const childrenData = [
  {
    "last name": "Lee",
    "first name": "Lauren",
    "middle name": "McMullen",
    extensions: "N/A",
    "contact number": "0925-939-6926",
    email: "lauren@gmail.com",
    address:
      "Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
  },

  {
    "last name": "Lee",
    "first name": "Lauren",
    "middle name": "McMullen",
    extensions: "N/A",
    "contact number": "0925-939-6926",
    email: "lauren@gmail.com",
    address:
      "Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
  },
];

const Family = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szPrimary700">Family</h6>
          <ButtonsIcon icon={<Edit2 />} variant="secondary" size="small" />
        </div>
        <div className="flex flex-col gap-[24px]">
          <PurpleTaggedCard
            label="Spouse"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="break-all">
                  <TextContent header="last name" text="Lee" />
                </div>
                <div className="break-all">
                  <TextContent header="first name" text="Keith Lloyd" />
                </div>
                <div className="break-all">
                  <TextContent header="middle name" text="Ridgely" />
                </div>
                <div className="break-all">
                  <TextContent header="extensions" text="N/A" />
                </div>
                <div className="break-all">
                  <TextContent header="contact number" text="0955-021-1889" />
                </div>
                <div>
                  <div className="break-all">
                    <TextContent
                      header="email"
                      text="graciathefirst@gmail.com"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 col-span-1">
                  <TextContent
                    header="address"
                    text="Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines."
                  />
                </div>
              </div>
            }
          />
          <PurpleTaggedCard
            label="Father"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="break-all">
                  <TextContent header="last name" text="Lee" />
                </div>
                <div className="break-all">
                  <TextContent header="first name" text="Keith Lloyd" />
                </div>
                <div className="break-all">
                  <TextContent header="middle name" text="Ridgely" />
                </div>
                <div className="break-all">
                  <TextContent header="extensions" text="N/A" />
                </div>
                <TextContent header="contact number" text="0955-021-1889" />
                <div>
                  <div className="break-all">
                    <TextContent
                      header="email"
                      text="graciathefirst@gmail.com"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 col-span-1">
                  <TextContent
                    header="address"
                    text="Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines."
                  />
                </div>
              </div>
            }
          />
          <PurpleTaggedCard
            label="Mother"
            children={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="break-all">
                  <TextContent header="last name" text="Lee" />
                </div>
                <div className="break-all">
                  <TextContent header="first name" text="Keith Lloyd" />
                </div>
                <div className="break-all">
                  <TextContent header="middle name" text="Ridgely" />
                </div>
                <TextContent header="extensions" text="N/A" />
                <TextContent header="contact number" text="0955-021-1889" />
                <div>
                  <div className="break-all">
                    <TextContent
                      header="email"
                      text="graciathefirst@gmail.com"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 col-span-1">
                  <TextContent
                    header="address"
                    text="Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines."
                  />
                </div>
              </div>
            }
          />

          <PurpleTaggedCard label="Child / Children">
            {childrenData.map((child, childIndex) => (
              <div
                key={childIndex}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start mb-4"
              >
                <TextContent header="last name" text={child["last name"]} />
                <TextContent header="first name" text={child["first name"]} />
                <TextContent header="middle name" text={child["middle name"]} />
                <TextContent header="extensions" text={child.extensions} />
                <TextContent
                  header="contact number"
                  text={child["contact number"]}
                />
                <div>
                  <div className="break-all">
                    <TextContent header="email" text={child.email} />
                  </div>
                </div>
                <div className="sm:col-span-3 col-span-1">
                  <TextContent header="address" text={child.address} />
                </div>
                {childIndex < childrenData.length - 1 && (
                  <div className="col-span-full">
                    <Divider />
                  </div>
                )}
              </div>
            ))}
          </PurpleTaggedCard>
        </div>
      </div>
    </div>
  );
};

export default Family;

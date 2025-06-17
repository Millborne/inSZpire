import { Button, ButtonsIcon, PurpleTaggedCard, TextContent } from "enterprisze-global-components";

//icons
import { Add, Edit2 } from "iconsax-react";

const childrenData = [
    {
        "last name": "Lee",
        "first name": "Lauren",
        "middle name": "McMullen",
        extensions: "N/A",
        "contact number": "0925-939-6926",
    },

    {
        "last name": "N/A",
        "first name": "N/A",
        "middle name": "N/A",
        extensions: "N/A",
        "contact number": "N/A",
    },
];

const Family = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-end ">
                    <ButtonsIcon icon={<Edit2 variant="Linear" />} variant="secondary" size="small" />
                    {/* <Button
            leftIcon={<Add variant="Linear" />}
            label="Add Family"
            variant="secondary"
            size="small"
          /> */}
                </div>
                <div className="flex flex-col gap-[24px]">
                    <PurpleTaggedCard
                        label="Father"
                        children={
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                <TextContent header="last name" text="Lee" />
                                <TextContent header="first name" text="Keith Lloyd" />
                                <TextContent header="middle name" text="Ridgely" />
                                <TextContent header="extensions" text="N/A" />
                                <TextContent header="contact number" text="0955-021-1889" />
                            </div>
                        }
                    />
                    <PurpleTaggedCard
                        label="Mother"
                        children={
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                <TextContent header="last name" text="Hill" />
                                <TextContent header="first name" text="Martha Lloyd" />
                                <TextContent header="middle name" text="Morrison" />
                                <TextContent header="extensions" text="N/A" />
                                <TextContent header="contact number" text="0956-294-7801" />
                            </div>
                        }
                    />
                    <PurpleTaggedCard
                        label="Spouse"
                        children={
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                                <TextContent header="last name" text="McMullen" />
                                <TextContent header="first name" text="Donna" />
                                <TextContent header="middle name" text="Copley" />
                                <TextContent header="extensions" text="N/A" />
                                <TextContent header="contact number" text="0956-536-2471" />
                            </div>
                        }
                    />
                    <PurpleTaggedCard label="Child / Children">
                        {childrenData.map((child, childIndex) => (
                            <div key={childIndex} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start mb-4">
                                {Object.entries(child).map(([header, text], index) => (
                                    <TextContent key={index} header={header} text={text} />
                                ))}
                            </div>
                        ))}
                    </PurpleTaggedCard>
                </div>
            </div>
        </div>
    );
};

export default Family;

import { useState } from "react";
import { ButtonsIcon, PurpleTaggedCard, SnackbarAlert, TextContent } from "enterprisze-global-components";
import { Edit2 } from "iconsax-react";
import FamilyModal from "./modals/FamilyModal";

const familyMembersData = [
    {
        id: 1,
        relationship: "Mother",
        lastName: "Abrams",
        firstName: "Gracia",
        middleName: "Ridgley",
        extension: "I",
        contactNumber: "0955-021-1889",
        email: "graciathefirst@gmail.com",
        address: {
            country: "Philippines",
            region: "Region X",
            province: "Misamis Oriental",
            cityMunicipality: "City of Cagayan de Oro",
            barangay: "Brgy. 26",
            streetHouseNoLot: "Blk 5 Lot 3, Villa Luz Subdivision",
            postalCode: "9000",
        },
    },
    {
        id: 2,
        relationship: "Father",
        lastName: "dfdfdfdfdf",
        firstName: "dfdfdfdfdfdf",
        middleName: "Ridgley",
        extension: "I",
        contactNumber: "0955-021-1889",
        email: "graciathefirst@gmail.com",
        address: {
            country: "Philippines",
            region: "Region X",
            province: "Misamis Oriental",
            cityMunicipality: "City of Cagayan de Oro",
            barangay: "Brgy. 26",
            streetHouseNoLot: "Blk 5 Lot 3, Villa Luz Subdivision",
            postalCode: "9000",
        },
    },
];

const Family = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleSubmitSuccess = () => {
        setIsSnackbarOpen(true);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-between ">
                    <h6 className="text-h6 text-szPrimary700">Family</h6>
                    <ButtonsIcon icon={<Edit2 variant="Linear" />} variant="secondary" size="small" onClick={() => setIsModalOpen(true)} />
                </div>
                <div className="flex flex-col gap-[24px]">
                    {familyMembersData.map((member, index) => {
                        const address = `${member.address.streetHouseNoLot}, ${member.address.barangay}, ${member.address.cityMunicipality}, ${member.address.province}, ${member.address.region}, ${member.address.postalCode}, ${member.address.country}`;
                        return (
                            <PurpleTaggedCard key={index} label={member.relationship}>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <TextContent header="last name" text={member.lastName} />
                                        <TextContent header="first name" text={member.firstName} />
                                        <TextContent header="middle name" text={member.middleName} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <TextContent header="extension" text={member.extension} />
                                        <TextContent header="contact number" text={member.contactNumber} />
                                        <TextContent header="email" text={member.email} />
                                    </div>
                                    <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
                                        <TextContent header="address" text={address} />
                                    </div>
                                </div>
                            </PurpleTaggedCard>
                        );
                    })}
                </div>
            </div>

            {/* Modal component */}
            <FamilyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                familyMembersData={familyMembersData}
                onSubmitSuccess={handleSubmitSuccess}
            />

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type="success"
                title="Successfully updated Family Members"
                animation="slide-up"
            />
        </div>
    );
};

export default Family;

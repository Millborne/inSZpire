import { useState, useEffect } from "react";
import { ButtonsIcon, PurpleTaggedCard, SnackbarAlert, TextContent } from "enterprisze-global-components";
import { Edit2 } from "iconsax-react";
import FamilyModal from "./modals/FamilyModal";
import { useFamilyService } from "../../../services/employee-profile/personal/family/use-family";

const PROFILE_ID = "11111111-0000-0000-0000-000000000002";

const Family = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState< "error" | "success" | "warning" | "info" | undefined>("success");
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<String | null>(null);

    const familyService = useFamilyService();

    // Fetch family data
    const fetchFamily = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await familyService.viewFamily({ profile_ID: PROFILE_ID });
            console.log("family data", result.data.contacts)
            if (result.data?.contacts) {
                setFamilyMembers(result.data.contacts);
                console.log(familyMembers)
            } else {
                setFamilyMembers([]);
            }
        } catch (err) {
            setError("Failed to fetch family members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFamily();
        // eslint-disable-next-line
    }, []);

    const handleSubmitSuccess = (message = "Successfully updated Family") => {
        setSnackbarMessage(message);
        setSnackbarType("success");
        setIsSnackbarOpen(true);
        fetchFamily();
    };

    const handleError = (message = "An error occurred") => {
        setSnackbarMessage(message);
        setSnackbarType("error");
        setIsSnackbarOpen(true);
    };

    // Map API data to UI data structure
    const mapFamilyData = (member:any) => ({
        id: member.profile_family_ID,
        relationship: member.relation,
        lastName: member.last_name,
        firstName: member.first_name,
        middleName: member.middle_name,
        extension: member.name_ext,
        contactNumber: member.contact_number,
        email: member.email || "",
        isFamily: member.is_family_contact,
        textAddress: member.address || "",
        address: {
            country: "Philippines", // fallback, or parse from address if structured
            region: "",
            province: "",
            cityMunicipality: "",
            barangay: "",
            streetHouseNoLot: "",
            postalCode: "",
        },
    });

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[16px]">
                <div className="flex justify-between ">
                    <h6 className="text-h6 text-szPrimary700">Family</h6>
                    <ButtonsIcon icon={<Edit2 variant="Linear" />} variant="secondary" size="small" onClick={() => setIsModalOpen(true)} />
                </div>
                <div className="flex flex-col gap-[24px]">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : familyMembers.length === 0 ? (
                        <div>No family records found.</div>
                    ) : (
                        familyMembers
                        .filter(member => (member.is_family_contact === 1))
                        .map((member, index) => {
                            const mapped = mapFamilyData(member);
                            const address = mapped.textAddress;
                            return (
                                <PurpleTaggedCard key={mapped.id || index} label={mapped.relationship}>
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3">
                                            <TextContent header="last name" text={mapped.lastName} />
                                            <TextContent header="first name" text={mapped.firstName} />
                                            <TextContent header="middle name" text={mapped.middleName} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3">
                                            <TextContent header="extension" text={mapped.extension} />
                                            <TextContent header="contact number" text={mapped.contactNumber} />
                                            <TextContent header="email" text={mapped.email} />
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
                                            <TextContent header="address" text={address} />
                                        </div>
                                    </div>
                                </PurpleTaggedCard>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Modal component */}
            <FamilyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                familyMembersData={familyMembers}
                onSubmitSuccess={handleSubmitSuccess}
                onError={handleError}
                familyService={familyService}
                profileId={PROFILE_ID}
            />

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type={snackbarType}
                title={snackbarMessage}
                animation="slide-up"
            />
        </div>
    );
};

export default Family;

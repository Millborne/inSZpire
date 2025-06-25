import { ConfirmationContent, Modal } from "enterprisze-global-components";
import { InfoCircle } from "iconsax-reactjs";
import { FamilyMemberDataType } from "./FamilyModal";
import { useState } from "react";
import FamilyPendingModal from "./FamilyPendingModal";

interface FamilyConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    familyData: FamilyMemberDataType[];
    onSubmitSuccess?: () => void;
}

const FamilyConfirmationModal: React.FC<FamilyConfirmationModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [isFamilyPendingModalOpen, setIsFamilyPendingModalOpen] = useState(false);

    const handlePendingCheck = () => {
        setIsFamilyPendingModalOpen(true);
    };

    return (
        <>
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
                showCloseIcon={false}
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
                        onClick: handlePendingCheck,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-body-base-strong text-szBlack800 text-center">You are about to update your family.</p>
                            <div className="flex flex-col gap-[8px]">
                                <ConfirmationContent
                                    title="ADD FAMILY"
                                    variant="add"
                                    data={[
                                        { label: "RELATION", value: "Son" },
                                        {
                                            label: "LAST NAME",
                                            value: "Lee",
                                        },
                                        {
                                            label: "FIRST NAME",
                                            value: "Keith Loyd",
                                        },
                                        { label: "MIDDLE NAME", value: "Ridgley" },
                                        { label: "EXTENSIONS", value: "-" },
                                        { label: "CONTACT NUMBER", value: "0955-021-1889" },
                                        { label: "EMAIL", value: "freddyhill@gmail.com" },
                                        {
                                            label: "ADDRESS",
                                            value: "Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
                                        },
                                    ]}
                                />

                                <ConfirmationContent
                                    title="EDITED FAMILY"
                                    variant="edit"
                                    sectionLabel="FATHER"
                                    data={[
                                        {
                                            label: "Email",
                                            value: "",
                                            oldValue: "freddyhill@gmail.com",
                                            newValue: "freddyhilnew@gmail.com",
                                        },
                                        {
                                            label: "Contact Number",
                                            value: "",
                                            oldValue: "0955-021-1889",
                                            newValue: "0955-021-9876",
                                        },
                                        {
                                            label: "Address",
                                            value: "",
                                            oldValue:
                                                "Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
                                            newValue:
                                                "Blk 1 Lot 1, Villa Luz Subdivision, Brgy. 30, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
                                        },
                                    ]}
                                />
                                <ConfirmationContent
                                    title="DELETED FAMILY"
                                    sectionLabel="MOTHER"
                                    variant="delete"
                                    data={[
                                        { label: "RELATION", value: "Son" },
                                        {
                                            label: "LAST NAME",
                                            value: "Lee",
                                        },
                                        {
                                            label: "FIRST NAME",
                                            value: "Keith Loyd",
                                        },
                                        { label: "MIDDLE NAME", value: "Ridgley" },
                                        { label: "EXTENSIONS", value: "-" },
                                        { label: "CONTACT NUMBER", value: "0955-021-1889" },
                                        { label: "EMAIL", value: "freddyhill@gmail.com" },
                                        {
                                            label: "ADDRESS",
                                            value: "Blk 5 Lot 3, Villa Luz Subdivision, Brgy. 26, City of Cagayan de Oro, Misamis Oriental, Region X, 9000, Philippines.",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
            <FamilyPendingModal
                isOpen={isFamilyPendingModalOpen}
                onClose={() => setIsFamilyPendingModalOpen(false)}
                onCloseConfirmation={onClose}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default FamilyConfirmationModal;

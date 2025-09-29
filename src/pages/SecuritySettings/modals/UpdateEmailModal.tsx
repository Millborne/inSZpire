import { Inputs, Modal, SnackbarAlert } from "enterprisze-global-components";
import { useState } from "react";

export interface UpdateEmailDataType {
    id: number;
    personalEmail: string;
    supportZebraEmail: string;
    fullName: string;
}

interface UpdateEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: UpdateEmailDataType;
    setEmail: (updated: UpdateEmailDataType) => void;
    contentHeight?: string;
}

const UpdateEmailModal: React.FC<UpdateEmailModalProps> = ({ isOpen, onClose, email, setEmail }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"error" | "success">("error");

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Update Email"
                showButton={false}
                showHeaderDivider={false}
                showCloseIcon={false}
                showFooterDivider={true}
                contentHeight="h-auto min-h-[553px]"
                content={
                    <div className="flex flex-col gap-5 min-w-[444px] pt-[6px]">
                        <Inputs
                            label="PERSONAL EMAIL"
                            value={email.personalEmail}
                            onChange={(e) => setEmail({ ...email, personalEmail: e.target.value })}
                        />
                        <div>
                            <Inputs
                                label="WORK EMAIL"
                                value={email.supportZebraEmail}
                                onChange={(e) => setEmail({ ...email, supportZebraEmail: e.target.value })}
                                disabled
                            />
                            <p className="text-caption-reg text-szDarkGrey600">Work Email is can not be updated</p>
                        </div>
                    </div>
                }
                footerOptions="stacked-left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: onClose,
                        size: "medium",
                    },
                    {
                        label: "Update Email",
                        variant: "primary",
                        onClick: () => {
                            setSnackbarMessage(`Updated Email for ${email.fullName}.`);
                            setSnackbarType("success");
                            setSnackbarOpen(true);
                            onClose();
                        },
                        size: "medium",
                    },
                ]}
            />

            <SnackbarAlert
                isOpen={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                showCloseButton={true}
                title={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default UpdateEmailModal;

// import { useState } from "react";

// icons

// components
import { Dropdown, Inputs, Modal } from "enterprisze-global-components";

export interface IDdata {
    type: string;
    num: string;
    issuedDate: string;
    validity: string;
    dateAdded: string;
    addedBy: React.ReactNode;
}

interface BasicInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    IDdata: IDdata[];
    onSubmitSuccess?: () => void;
}

const BasicInfoModal: React.FC<BasicInfoModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
    const handleAdd = () => {
        onClose();
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Add ID"
                modalWidth="w-[920px]"
                showButton={false}
                footerOptions="stacked-left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                    },
                    {
                        label: "Add",
                        variant: "primary",
                        onClick: handleAdd,
                        size: "medium",
                    },
                ]}
                content={
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-start">
                            <Dropdown label="CARD TYPE" placeholder="Select Type" options={[]} onSelectionChange={() => {}} />
                            <Inputs label="ISSUED DATE" placeholder="12/01/2022" />
                            <Inputs label="ID NUMBER / ACCOUNT NUMBER" placeholder="123-456-789-000" />
                            <Inputs label="VALIDITY" placeholder="12/01/2022" />
                            <Inputs label="ID NUMBER" placeholder="123-456-789-000" />
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default BasicInfoModal;

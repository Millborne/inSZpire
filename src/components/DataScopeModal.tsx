import React from "react";
import { Modal } from "enterprisze-global-components";
import { Eye } from "iconsax-react";

interface DataScopeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    roleName?: string;
    children?: React.ReactNode;
    contentHeight?: string;
    modalWidth?: string;
}

const DataScopeModal: React.FC<DataScopeModalProps> = ({
    isOpen,
    onClose,
    onSave,
    roleName = "Super Admin",
    children,
    contentHeight = "h-auto max-h-[576px]",
    modalWidth = "w-[900px]",
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showHeaderDivider={true}
            showFooterDivider={false}
            // icon={<Eye variant="Bulk" />}
            title="Data Scope"
            showButton={false}
            modalWidth={modalWidth}
            contentHeight={contentHeight}
            headerOptions="left"
            footerOptions="stacked-left"
            showCloseIcon={true}
            footerButtons={[
                {
                    label: "Cancel",
                    variant: "ghost",
                    onClick: onClose,
                    size: "medium",
                },
                {
                    label: "Update Record Visibility",
                    variant: "primary",
                    onClick: onSave,
                    size: "medium",
                },
            ]}
            content={
                <div className="flex flex-col gap-6">
                    {/* Subtitle */}
                    <p className="text-body-base-reg text-szGrey700">
                        Configure which records the role:{" "}
                        <span className="text-szPrimary500 font-medium">
                            {roleName}
                        </span>{" "}
                        can view
                    </p>

                    {/* Children Content */}
                    {children}
                </div>
            }
        />
    );
};

export default DataScopeModal;

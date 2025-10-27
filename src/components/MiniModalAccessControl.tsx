import React from "react";
import { Button, Dropdown } from "enterprisze-global-components";
import { Add } from "iconsax-react";

export interface DropdownOption {
    label: string;
    value: string;
    showChip?: boolean;
    chipLabel?: string;
    chipColor?: "default" | "red" | "green";
    textType?: "default" | "allCapsSmall";
}

interface MiniModalAccessControlProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    subtitle?: string;
    dropdownPlaceholder?: string;
    dropdownOptions: DropdownOption[];
    selectedValue?: DropdownOption | undefined;
    onDropdownChange: (value: any) => void;
    warningMessage?: string;
    showWarning?: boolean;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    dropdownLabel?: string;
    dropdownDisabled?: boolean;
}

const MiniModalAccessControl: React.FC<MiniModalAccessControlProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Team Permission",
    subtitle = "Assign new Profile Field Permission for a team.",
    dropdownPlaceholder = "Select option",
    dropdownOptions = [],
    selectedValue = undefined,
    onDropdownChange,
    warningMessage = "Warning! This team already has permission. Please search and review their existing permission.",
    showWarning = false,
    submitButtonLabel = "Add User Role",
    cancelButtonLabel = "Cancel",
    dropdownLabel = "",
    dropdownDisabled = false,
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-[444px] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="px-6 py-4">
                        <h2 className="text-h3 text-szBlack800">
                            {title}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="py-1 px-4 flex flex-col gap-4 h-[400px] overflow-y-auto">
                        {/* Subtitle */}
                        <p className="text-h6 text-szGrey500">
                            {subtitle}
                        </p>

                        {/* Dropdown */}
                        <div className="relative ">
                            <Dropdown
                                label={dropdownLabel}
                                placeholder={dropdownPlaceholder}
                                options={dropdownOptions}
                                value={selectedValue}
                                onSelectionChange={onDropdownChange}
                                size="small"
                                usePortal={true}
                                disabled={dropdownDisabled}
                            />
                        </div>

                        {/* Warning Message */}
                        {showWarning && (
                            <div className="flex gap-3 p-4 bg-szRed50 rounded-lg border border-szRed200">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 6.66667V10.8333M10 13.3333H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z"
                                            stroke="#DC2626"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <p className="text-body-small-reg text-szRed700">
                                    {warningMessage}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 flex items-center justify-end gap-3">
                        <Button
                            label={cancelButtonLabel}
                            variant="ghost"
                            size="medium"
                            onClick={onClose}
                        />
                        <Button
                            label={submitButtonLabel}
                            variant="primary"
                            size="medium"
                            leftIcon={<Add size={20} />}
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MiniModalAccessControl;

import React, { useState } from "react";
import { Modal } from "enterprisze-global-components";
// import PapaZ from "../../../../assets/images/papa-z.png";
import PapaZ from "../../../../../assets/excited-zebra.png";
import { Button } from "enterprisze-global-components";

import TransferEmployeeModalSingleEmployee from "./TransferEmployeeModalSingleEmployee";

interface TransferEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TransferEmployeeModal: React.FC<TransferEmployeeModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [
        isTransferEmployeeModalSingleEmployeeOpen,
        setIsTransferEmployeeModalSingleEmployeeOpen,
    ] = useState(false);
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Transfer Employee"
                showButton={false}
                modalWidth="w-[900px]"
                contentHeight="h-[400px] min-h-[120px] max-h-[55vh]"
                showFooter={false}
                content={
                    <div className="flex flex-col gap-[8px] items-center justify-center h-full pb-[32px]">
                        <div className="flex flex-col items-center gap-[16px]">
                            <img
                                src={PapaZ}
                                className="w-[142x] h-[120px]"
                                alt="PapaZ"
                            />
                            <p className="text-body-base-strong text-szDarkGrey600 max-w-[320px] text-center">
                                You can only add new members to the team if
                                there are available positions.
                            </p>
                        </div>
                        <Button
                            label="Transfer Employee"
                            variant="primary"
                            size="medium"
                            onClick={() => {
                                setIsTransferEmployeeModalSingleEmployeeOpen(
                                    true
                                );
                            }}
                        />
                        <Button
                            label="Batch Transfer in Position"
                            variant="ghost"
                            size="medium"
                            onClick={() => {}}
                        />
                    </div>
                }
            />

            <TransferEmployeeModalSingleEmployee
                isOpen={isTransferEmployeeModalSingleEmployeeOpen}
                onClose={() => {
                    setIsTransferEmployeeModalSingleEmployeeOpen(false);
                    onClose();
                }}
            />
        </>
    );
};

export default TransferEmployeeModal;

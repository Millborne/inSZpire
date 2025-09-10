import React, { useState } from "react";
import { Button, Modal } from "enterprisze-global-components";
import BatchAddTeamMembersModal from "./BatchAddTeamMembersModal";

import PapaZ from "../../../../../assets/excited-zebra.png";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [isBatchAddTeamMembersModalOpen, setIsBatchAddTeamMembersModalOpen] =
    useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        showCloseIcon={false}
        title="Add Team Member(s)"
        showButton={false}
        modalWidth="w-[900px]"
        contentHeight="h-[400px] min-h-[120px] max-h-[60vh]"
        showFooter={false}
        content={
          <div className="flex flex-col gap-[8px] items-center justify-center h-full pb-[32px]">
            <div className="flex flex-col items-center gap-[16px]">
              <img src={PapaZ} className="w-[142x] h-[120px]" alt="PapaZ" />
              <p className="text-body-base-strong text-szDarkGrey600 max-w-[320px] text-center">
                You can only add new members to the team if there are available
                positions.
              </p>
            </div>
            <Button
              label="Add Employee"
              variant="primary"
              size="medium"
              onClick={() => {
                setIsBatchAddTeamMembersModalOpen(true);
              }}
            />
            <Button
              label="Batch Add in Position"
              variant="ghost"
              size="medium"
              onClick={() => {
                setIsBatchAddTeamMembersModalOpen(true);
              }}
            />
          </div>
        }
      />
      <BatchAddTeamMembersModal
        isOpen={isBatchAddTeamMembersModalOpen}
        onClose={() => {
          setIsBatchAddTeamMembersModalOpen(false);
        }}
      />
    </>
  );
};

export default AddTeamMemberModal;

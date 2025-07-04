import React from "react";
import { Avatar } from "enterprisze-global-components";

interface EmployeeCardProps {
  name: string;
  position: string;
  avatar: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  position,
  avatar,
}) => {
  return (
    <div className="flex flex-row items-center gap-[10px] px-[12px] py-[8px] bg-szSecondary100 rounded-lg">
      <Avatar src={avatar} size="medium" />
      <div>
        <p className="text-body-small-strong">{name}</p>
        <p className="text-caption-reg">{position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;

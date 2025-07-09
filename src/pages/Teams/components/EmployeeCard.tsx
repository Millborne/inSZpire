import React from "react";
import { Avatar } from "enterprisze-global-components";

interface EmployeeCardProps {
  name: string;
  position: string;
  avatar: string;
  isSelected?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  position,
  avatar,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-[10px] px-[12px] py-[8px] bg-szSecondary100 rounded-lg border-[2px] border-transparent cursor-pointer 
        ${isSelected ? "border-szPrimary700 bg-szPrimary50" : ""}
        hover:border-szPrimary700
      `}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Avatar src={avatar} size="medium" />
      <div>
        <p className="text-body-small-strong">{name}</p>
        <p className="text-caption-reg">{position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "enterprisze-global-components";

interface EmployeeCardProps {
    id: string;
    name: string;
    position: string;
    avatar: string;
    isSelected?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ id, name, position, avatar, isSelected }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex flex-row items-center gap-[10px] px-[12px] py-[8px] bg-szSecondary100 rounded-lg border-[2px] border-transparent cursor-pointer 
        ${isSelected ? "border-szPrimary700 bg-szPrimary50" : ""}
        hover:border-szPrimary700
      `}
            onClick={() => navigate(`/home/teams/${id}/specificteam`)}
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

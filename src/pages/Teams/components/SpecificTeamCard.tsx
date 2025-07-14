import { Avatar } from "enterprisze-global-components";
import noAvatar from "../../../assets/noAvatar.png";

interface SpecificTeamCardProps {
    name: string;
    jobTitle: string;
}

const SpecificTeamCard = ({ name, jobTitle }: SpecificTeamCardProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center p-[10px]">
                <Avatar size="small" src={noAvatar} />
                <div className="flex flex-col">
                    <p className="text-body-small-strong text-szBlack800">{name}</p>
                    <p className="text-caption-reg text-szDarkGrey600">{jobTitle}</p>
                </div>
            </div>
            <hr className="border-[#E0E0E0]" />
        </div>
    );
};

export default SpecificTeamCard;

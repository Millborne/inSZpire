import { People, User } from "iconsax-reactjs";

interface SelectedFilterProps {
  teamCount: number;
  employeeCount: number;
  selected: boolean;

  onClick: () => void;
}

const SelectedFilter: React.FC<SelectedFilterProps> = ({
  teamCount,
  employeeCount,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-row gap-[8px] px-[8px] py-[4px] cursor-pointer rounded-[8px] border h-[44px] items-center ${
        selected ? "border-szLightGrey400 bg-background" : "border-transparent"
      }`}
      style={selected ? { boxShadow: "0 4px 15px rgba(9, 18, 39, 0.1)" } : {}}
      onClick={onClick}
    >
      <div className="flex flex-row gap-[8px] px-[6px] items-center ">
        <People size={16} />
        <p className="text-body-caption-strong ">{teamCount}</p>
      </div>
      <span className="text-[10px] text-szBlack800"> | </span>
      <div className="flex flex-row gap-[8px] px-[6px] items-center">
        <User size={16} />
        <p className="text-body-caption-strong text-szDarkGrey600">
          {employeeCount}
        </p>
      </div>
    </div>
  );
};

export default SelectedFilter;

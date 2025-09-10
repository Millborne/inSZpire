import React, { useCallback, useState } from "react";
import { Avatar, Checkbox } from "enterprisze-global-components";

interface EmployeeeChecboxProps {
  name: string;
  team: string;
  role: string;
  disabled?: boolean;
  className?: string;
  avatar?: string;
  onChange: (checked: boolean, teamName: string) => void;
  onToggle?: (teamName: string) => void;
}

const EmployeeeChecbox: React.FC<EmployeeeChecboxProps> = ({
  name,
  team,
  role,
  disabled = false,
  className = "",
  avatar,
  onChange,
  onToggle,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change with dynamic selection
  const handleCheckboxChange = useCallback(
    (isChecked: boolean) => {
      if (disabled) return;

      setIsChecked(isChecked);
      onChange(isChecked, name);

      // Call onToggle if provided for additional functionality
      if (onToggle) {
        onToggle(name);
      }
    },
    [disabled, onChange, onToggle, name]
  );

  // Toggle function for external control
  const toggleSelection = useCallback(() => {
    if (disabled) return;
    const newChecked = !isChecked;
    handleCheckboxChange(newChecked);
  }, [disabled, isChecked, handleCheckboxChange]);

  return (
    <div
      className={`flex items-center gap-[4px] p-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <Checkbox
        checked={isChecked}
        onChange={() => handleCheckboxChange(!isChecked)}
        disabled={disabled}
      />
      <div
        className={`flex flex-1 items-center gap-[8px]`}
        onClick={toggleSelection}
      >
        <Avatar src={avatar} size="small" />
        <div>
          <p className="text-body-small-strong text-gray-900">{name}</p>
          <p className="text-caption-all-caps uppercase text-szPrimary900">
            {team} - <span className="text-szGrey500"> {role} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeeChecbox;

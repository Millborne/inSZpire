import React, { useCallback, useState } from "react";
import { Avatar, Checkbox } from "enterprisze-global-components";

export interface EmployeeeChecboxProps {
  id?: string;
  name: string;
  team: string;
  position: string;
  disabled?: boolean;
  className?: string;
  avatar?: string;
  showPosition?: boolean;
  showTeam?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, teamName: string) => void;
  onToggle?: (teamName: string) => void;
}

const EmployeeeChecbox: React.FC<EmployeeeChecboxProps> = ({
  id,
  name,
  team,
  position,
  disabled = false,
  className = "",
  avatar,
  showPosition = true,
  showTeam = true,
  checked,
  onChange,
  onToggle,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);

  // Use external checked prop if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Handle checkbox change with dynamic selection
  const handleCheckboxChange = useCallback(
    (newChecked: boolean) => {
      if (disabled) return;

      // Only update internal state if not controlled externally
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, name);

      // Call onToggle if provided for additional functionality
      if (onToggle) {
        onToggle(name);
      }
    },
    [disabled, onChange, onToggle, name, checked]
  );

  // Toggle function for external control
  const toggleSelection = useCallback(() => {
    if (disabled) return;
    const newChecked = !isChecked;
    handleCheckboxChange(newChecked);
  }, [disabled, isChecked, handleCheckboxChange]);

  return (
    <div
      className={`flex items-center gap-[4px] ${
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
          {showPosition && (
            <p className="text-caption-all-caps uppercase text-szPrimary900">
              {showTeam && team && `${team} - `}
              <span className="text-szGrey500"> {position} </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeeChecbox;

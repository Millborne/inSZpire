import React, { useCallback, useState } from "react";

import { Checkbox, Chip } from "enterprisze-global-components";

export interface TeamCheckboxProps {
  team_name: string;
  managedBy: string;
  selectedCount: number;
  totalCount: number;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  contentClassName?: string;
  onChange: (checked: boolean, teamName: string) => void;
  onToggle?: (teamName: string) => void;
}

const TeamCheckbox: React.FC<TeamCheckboxProps> = ({
  team_name,
  managedBy,
  selectedCount,
  totalCount,
  checked = false,
  disabled = false,
  className = "",
  contentClassName = "",
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

      onChange(newChecked, team_name);

      // Call onToggle if provided for additional functionality
      if (onToggle) {
        onToggle(team_name);
      }
    },
    [disabled, onChange, onToggle, team_name, checked]
  );

  // Toggle function for external control
  // const toggleSelection = useCallback(() => {
  //   if (disabled) return;
  //   const newChecked = !isChecked;
  //   handleCheckboxChange(newChecked);
  // }, [disabled, isChecked, handleCheckboxChange]);

  return (
    <div
      className={`flex items-center gap-[4px] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <Checkbox
        checked={isChecked}
        onChange={() => handleCheckboxChange(!isChecked)}
        disabled={disabled}
      />
      <div className={`flex flex-1 ${contentClassName} items-center`}>
        <div className="flex flex-1 justify-between items-center">
          <div>
            <p className="text-body-small-strong text-gray-900">{team_name}</p>
            <p className="text-caption-all-caps uppercase text-gray-500 ">
              Managed by {managedBy} • {totalCount} members
            </p>
          </div>
          <Chip label={`${selectedCount} / ${totalCount} selected`} />
        </div>
      </div>
    </div>
  );
};

export default TeamCheckbox;

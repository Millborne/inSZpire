import React, { useCallback, useState } from "react";

import { Checkbox, Chip } from "enterprisze-global-components";

export interface TeamCheckboxProps {
  teamName: string;
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
  teamName,
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
  const [isChecked, setIsChecked] = useState(checked);

  // Handle checkbox change with dynamic selection
  const handleCheckboxChange = useCallback(
    (isChecked: boolean) => {
      if (disabled) return;

      setIsChecked(isChecked);
      onChange(isChecked, teamName);

      // Call onToggle if provided for additional functionality
      if (onToggle) {
        onToggle(teamName);
      }
    },
    [disabled, onChange, onToggle, teamName]
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
        className={`flex flex-1 ${contentClassName} items-center`}
        onClick={toggleSelection}
      >
        <div className="flex flex-1 justify-between items-center">
          <div>
            <p className="text-body-small-strong text-gray-900">{teamName}</p>
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

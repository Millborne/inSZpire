import React, { useState } from "react";

//components
import TeamCheckbox, { TeamCheckboxProps } from "./TeamCheckbox";
import { Checkbox, Divider } from "enterprisze-global-components";
import EmployeeSearchDropdown from "./EmployeeSearchDropdown";
import { EmployeeeChecboxProps } from "./EmployeeeChecbox";

interface SearchTeamGroupProps {
  teamCheckboxes: TeamCheckboxProps;
  accessModeFilter: "all" | "specific";
  unaffiliated?: boolean;
  employees: EmployeeeChecboxProps[];
}

const SearchTeamGroup: React.FC<SearchTeamGroupProps> = ({
  teamCheckboxes,
  accessModeFilter,
  unaffiliated = false,
  employees,
}) => {
  const [accessMode, setAccessMode] = useState<"all" | "specific">(
    accessModeFilter
  );
  const [isTeamChecked, setIsTeamChecked] = useState(false);

  const handleAccessModeChange = (value: "all" | "specific") => {
    setAccessMode(value);
  };

  const handleTeamCheckboxChange = (checked: boolean, teamName: string) => {
    setIsTeamChecked(checked);
    // Call the original onChange if provided
    if (teamCheckboxes.onChange) {
      teamCheckboxes.onChange(checked, teamName);
    }
  };

  return (
    <div className="flex flex-col w-full gap-[12px] border border-szGrey300 rounded-[8px] px-[16px] py-[8px]">
      {!unaffiliated ? (
        <TeamCheckbox
          {...teamCheckboxes}
          checked={isTeamChecked}
          onChange={handleTeamCheckboxChange}
        />
      ) : (
        <TeamCheckbox
          teamName="Unaffiliated"
          managedBy="none"
          selectedCount={0}
          totalCount={0}
          checked={isTeamChecked}
          onChange={handleTeamCheckboxChange}
        />
      )}
      {isTeamChecked && (
        <>
          <Divider className="py-[0px] px-[80px]" />
          <div className="flex flex-col gap-[4px]">
            <p className="text-caption-all-caps uppercase text-szDarkGrey600">
              Access Mode
            </p>
            <div className="flex flex-row gap-[8px]">
              <Checkbox
                label={
                  unaffiliated
                    ? "All unaffiliated employees"
                    : "All team members"
                }
                checked={accessMode === "all"}
                onChange={() => handleAccessModeChange("all")}
              />
              <Checkbox
                label="Specific members only"
                checked={accessMode === "specific"}
                onChange={() => handleAccessModeChange("specific")}
              />
            </div>
          </div>

          <EmployeeSearchDropdown
            onSearch={() => {}}
            employees={employees.map((employee) => ({
              ...employee,
              onChange: () => {},
            }))}
            unaffiliated={unaffiliated}
          />
        </>
      )}
    </div>
  );
};

export default SearchTeamGroup;

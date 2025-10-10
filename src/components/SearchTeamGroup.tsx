import React, { useState, useEffect, useMemo } from "react";

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
  disabled?: boolean;
  checked?: boolean;
  teamId?: string;
  onTeamSelection?: (teamId: string, checked: boolean) => void;
  onEmployeeSelection?: (employeeId: string, checked: boolean) => void;
  selectedEmployees?: Set<string>;
}

const SearchTeamGroup: React.FC<SearchTeamGroupProps> = ({
  teamCheckboxes,
  accessModeFilter,
  unaffiliated = false,
  employees,
  disabled = false,
  checked,
  teamId,
  onTeamSelection,
  onEmployeeSelection,
  selectedEmployees = new Set(),
}) => {
  const [accessMode, setAccessMode] = useState<"all" | "specific">(
    accessModeFilter
  );

  // Use external checked state if provided, otherwise use internal state
  const [internalTeamChecked, setInternalTeamChecked] = useState(false);
  const isTeamChecked = checked !== undefined ? checked : internalTeamChecked;

  // Memoize employees to prevent unnecessary re-renders
  const memoizedEmployees = useMemo(() => employees, [employees]);

  // Auto-update access mode based on employee selection
  useEffect(() => {
    if (isTeamChecked && memoizedEmployees.length > 0) {
      const selectedCount = memoizedEmployees.filter((emp) =>
        selectedEmployees.has(emp.id || "")
      ).length;
      const totalCount = memoizedEmployees.length;

      // If all employees are selected, set to "all"
      if (selectedCount === totalCount) {
        setAccessMode("all");
      }
      // If some but not all employees are selected, set to "specific"
      else if (selectedCount > 0 && selectedCount < totalCount) {
        setAccessMode("specific");
      }
      // If no employees are selected, keep current mode
    }
  }, [selectedEmployees, memoizedEmployees, isTeamChecked]);

  const handleAccessModeChange = (value: "all" | "specific") => {
    setAccessMode(value);

    // If switching to "all" mode and team is checked, select all employees
    if (value === "all" && isTeamChecked && onEmployeeSelection) {
      memoizedEmployees.forEach((employee) => {
        if (employee.id) {
          onEmployeeSelection(employee.id, true);
        }
      });
    }

    // If switching to "specific" mode and team is checked, deselect all employees
    if (value === "specific" && isTeamChecked && onEmployeeSelection) {
      memoizedEmployees.forEach((employee) => {
        if (employee.id) {
          onEmployeeSelection(employee.id, false);
        }
      });
    }
  };

  const handleTeamCheckboxChange = (checked: boolean, teamName: string) => {
    // Update internal state if not controlled externally
    if (checked === undefined) {
      setInternalTeamChecked(checked);
    }

    // Handle team selection with access mode logic
    if (onTeamSelection && teamId) {
      onTeamSelection(teamId, checked);

      // If access mode is "all", select/deselect all employees in the team
      if (accessMode === "all" && onEmployeeSelection) {
        memoizedEmployees.forEach((employee) => {
          if (employee.id) {
            onEmployeeSelection(employee.id, checked);
          }
        });
      }
    }

    // Call the original onChange if provided
    if (teamCheckboxes.onChange) {
      teamCheckboxes.onChange(checked, teamName);
    }
  };

  // Calculate actual selected count based on selectedEmployees
  const actualSelectedCount = memoizedEmployees.filter((emp) =>
    selectedEmployees.has(emp.id || "")
  ).length;

  return (
    <div className="flex flex-col w-full gap-[12px] border border-szGrey300 rounded-[8px] px-[16px] py-[8px]">
      {!unaffiliated ? (
        <TeamCheckbox
          {...teamCheckboxes}
          selectedCount={actualSelectedCount}
          checked={isTeamChecked}
          onChange={handleTeamCheckboxChange}
          disabled={disabled}
        />
      ) : (
        <TeamCheckbox
          team_name="Unaffiliated"
          managedBy="none"
          selectedCount={0}
          totalCount={0}
          checked={isTeamChecked}
          onChange={handleTeamCheckboxChange}
          disabled={disabled}
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
            onSearch={(searchTerm) => {
              // Optional: Add any additional search handling logic here
              console.log("Searching employees:", searchTerm);
            }}
            employees={memoizedEmployees.map((employee) => ({
              ...employee,
              checked: selectedEmployees.has(employee.id || ""),
              onChange: (checked: boolean) => {
                if (employee.id && onEmployeeSelection) {
                  onEmployeeSelection(employee.id, checked);

                  // If access mode is "all" and an employee is unchecked, change to "specific"
                  if (accessMode === "all" && !checked) {
                    setAccessMode("specific");
                  }

                  // If access mode is "specific" and all employees are now checked, change to "all"
                  if (accessMode === "specific" && checked) {
                    const allEmployeesSelected = memoizedEmployees.every(
                      (emp) =>
                        emp.id === employee.id
                          ? checked
                          : selectedEmployees.has(emp.id || "")
                    );
                    if (allEmployeesSelected) {
                      setAccessMode("all");
                    }
                  }
                }
              },
            }))}
            unaffiliated={unaffiliated}
          />
        </>
      )}
    </div>
  );
};

export default SearchTeamGroup;

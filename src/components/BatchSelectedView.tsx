import React, { useState } from "react";

//component
import { Tabs } from "enterprisze-global-components";
import SearchTeamGroup from "./SearchTeamGroup";

//types
import { Employee, Team } from "../types/team";
import EmployeeeChecbox from "./EmployeeeChecbox";

interface BatchSelectedViewProps {
  selectedItems: {
    teams: Team[];
    employees: Employee[];
  };
  onTeamSelection?: (teamId: string, checked: boolean) => void;
  onEmployeeSelection?: (employeeId: string, checked: boolean) => void;
  selectedEmployees?: Set<string>;
}

const BatchSelectedView: React.FC<BatchSelectedViewProps> = ({
  selectedItems,
  onTeamSelection,
  onEmployeeSelection,
  selectedEmployees = new Set(),
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex flex-row gap-[8px] w-fit">
        <Tabs
          options={[
            {
              label: "Selected Team",
              value: "Selected Team",
              number: 1,
            },
            {
              label: "Selected Employees",
              value: "Selected Employees",
              number: 2,
            },
          ]}
          activeIndex={activeTabIndex}
          onTabChange={setActiveTabIndex}
        />
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        {activeTabIndex === 0 && (
          <div className="flex flex-col gap-[8px] w-full">
            {selectedItems.teams.length > 0 ? (
              selectedItems.teams.map((team) => (
                <SearchTeamGroup
                  key={team.team_ID}
                  teamCheckboxes={{
                    team_name: team.team_name,
                    managedBy: team.managedBy,
                    selectedCount: 0, // This will be overridden by SearchTeamGroup
                    totalCount: team.employees.length,
                    onChange: (checked) => {
                      onTeamSelection?.(team.team_ID, checked);
                    },
                  }}
                  checked={true}
                  teamId={team.team_ID}
                  onTeamSelection={onTeamSelection}
                  onEmployeeSelection={onEmployeeSelection}
                  selectedEmployees={selectedEmployees}
                  accessModeFilter="all"
                  employees={team.employees}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-[16px] py-[40px]">
                <p className="text-body-base text-szDarkGrey600">
                  No teams selected
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        {activeTabIndex === 1 && (
          <div className="flex flex-col gap-[8px] w-full">
            {selectedItems.employees.length > 0 ? (
              <div className="flex flex-col gap-[8px]">
                {selectedItems.employees.map((employee) => (
                  <EmployeeeChecbox
                    key={employee.id}
                    id={employee.id}
                    name={employee.name}
                    team={employee.team}
                    position={employee.position}
                    avatar={employee.avatar}
                    checked={true}
                    onChange={(checked) => {
                      onEmployeeSelection?.(employee.id, checked);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-[16px] py-[40px]">
                <p className="text-body-base text-szDarkGrey600">
                  No employees selected
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchSelectedView;

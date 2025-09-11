import React from "react";

//icons
import { SearchNormal } from "iconsax-reactjs";

//components
import { Inputs } from "enterprisze-global-components";
import EmployeeeChecbox, { EmployeeeChecboxProps } from "./EmployeeeChecbox";

interface EmployeeSearchDropdownProps {
  onSearch: (value: string) => void;
  employees: EmployeeeChecboxProps[];
  unaffiliated: boolean;
}

const EmployeeSearchDropdown: React.FC<EmployeeSearchDropdownProps> = ({
  onSearch,
  employees,
  unaffiliated,
}) => {
  return (
    <div className="flex flex-col gap-[8px] ">
      <div className="flex flex-col gap-[4px]">
        <p className="text-caption-all-caps uppercase text-szDarkGrey600">
          Select specific employees
        </p>

        <Inputs placeholder="Search Employees..." icon={SearchNormal} />
      </div>

      <div className="flex flex-col gap-[8px] max-h-[200px] overflow-y-auto">
        {employees.map((employee) => (
          <EmployeeeChecbox
            name={employee.name}
            team={employee.team}
            role={employee.role}
            showTeam={false}
            showRole={unaffiliated ? false : true}
            avatar={employee.avatar}
            onChange={employee.onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeSearchDropdown;

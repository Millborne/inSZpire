import React, { useState, useMemo } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.team?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col gap-[8px] ">
      <div className="flex flex-col gap-[4px]">
        <div className="flex justify-between items-center">
          <p className="text-caption-all-caps uppercase text-szDarkGrey600">
            Select specific employees
          </p>
          {searchTerm.trim() && (
            <p className="text-caption text-szDarkGrey600">
              {filteredEmployees.length} of {employees.length} employees
            </p>
          )}
        </div>

        <Inputs
          placeholder="Search Employees..."
          icon={SearchNormal}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col gap-[8px] max-h-[200px] overflow-y-auto">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeeChecbox
              key={employee.id}
              id={employee.id}
              name={employee.name}
              team={employee.team}
              position={employee.position}
              showTeam={false}
              showPosition={unaffiliated ? false : true}
              avatar={employee.avatar}
              checked={employee.checked}
              onChange={employee.onChange}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-[8px] py-[20px]">
            <p className="text-body-small text-szDarkGrey600">
              No employees found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSearchDropdown;

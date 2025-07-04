import React, { useState } from "react";
import { ArrowUp2, ArrowDown2 } from "iconsax-reactjs";
import { Employee } from "..";

interface TeamsTableProps {
  teamName: string;
  employees: Employee[];
}

const TeamsTable: React.FC<TeamsTableProps> = ({ teamName, employees }) => {
  const [showAll, setShowAll] = useState(false);

  //! Show only 6 employees initially, or all if showAll is true
  const displayedEmployees = showAll ? employees : employees.slice(0, 6);

  return (
    <div className="flex flex-col gap-[12px] p-[16px] border border-szPrimary200 rounded-lg">
      <p className="text-body-base-strong">{teamName}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {displayedEmployees.map((employee, index) => (
          <p key={index}>{employee.name}</p>
        ))}
      </div>
      {employees.length > 6 && (
        <div
          className="flex gap-[8px] py-[8px] items-center justify-center cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ArrowUp2 className="icon-md" />
              <p className="text-body-small-strong">See Less</p>
            </>
          ) : (
            <>
              <ArrowDown2 className="icon-md" />
              <p className="text-body-small-strong">See More</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamsTable;

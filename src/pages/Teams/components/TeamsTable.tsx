import React, { useState } from "react";
import { ArrowUp2, ArrowDown2 } from "iconsax-reactjs";
import { Employee } from "..";
import { Avatar } from "enterprisze-global-components";

interface TeamsTableProps {
  teamName: string;
  employees: Employee[];
  isSelected?: boolean;
}

const TeamsTable: React.FC<TeamsTableProps> = ({
  teamName,
  employees,
  isSelected,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Show only 4 employees initially, or all if showAll is true
  const displayedEmployees = showAll ? employees : employees.slice(0, 4);

  const columns = [
    {
      label: "Name",
      key: "name",
      render: (employee: Employee) => (
        <div className="flex flex-row items-center gap-[10px]">
          <Avatar src={employee.avatar} size="medium" />
          <span className="text-body-small-reg font-dmSans">
            {employee.name}
          </span>
        </div>
      ),
    },
    { label: "Position", key: "position" },
    { label: "Subordinates", key: "subordinates" },
    { label: "Years in Position", key: "yearsOfPosition" },
  ];

  return (
    <div className="w-full max-w-full flex flex-col gap-[12px] p-[16px] border border-szPrimary200 rounded-lg">
      <p className="text-body-base-strong">{teamName}</p>

      {/* Scrollable table wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full table-fixed">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-body-small-strong text-left py-[8px] font-dmSans border-b border-szGrey200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((employee, index) => (
              <tr key={index} className="group">
                <td colSpan={columns.length} className="p-0">
                  <div
                    className={`
                  flex overflow-hidden items-center
                  ${
                    isSelected
                      ? "border border-szPrimary700 rounded-lg"
                      : "border-b border-szGrey200"
                  }
                  ${
                    !isSelected
                      ? "hover:rounded-lg hover:border-2 hover:border-szPrimary700"
                      : ""
                  }
                  cursor-pointer transition-all
                `}
                  >
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        className="flex-1 py-[8px] text-body-small-reg font-dmSans"
                      >
                        {col.render
                          ? col.render(employee)
                          : employee[col.key as keyof Employee]}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* See More / See Less */}
      {employees.length > 4 && (
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

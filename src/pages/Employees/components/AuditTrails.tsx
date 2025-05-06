import React, { useState } from "react";
import {
  Button,
  CustomDatePicker,
  HeaderType,
  Pagination,
  Table,
} from "enterprisze-global-components";

import NoRecordFound from "../../../components/NoRecordFound";
import { ImportCurve } from "iconsax-reactjs";

const headers: HeaderType[] = [
  { type: "string", header: "Remarks", accessor: "remarks" },
  { type: "string", header: "Logs", accessor: "logs" },
  { type: "string", header: "IP Address", accessor: "ipAddress" },
];

const data = [
  {
    remarks: "Login",
    logs: "Mar 24, 2025 01:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "O - Out for break",
    logs: "Mar 24, 2025 01:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "I - Back from break",
    logs: "Mar 24, 2025 01:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "O - DTR",
    logs: "Mar 24, 2025 05:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "Login",
    logs: "Mar 24, 2025 05:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "I - DTR",
    logs: "Mar 24, 2025 05:34:08 AM",
    ipAddress: "120.28.14.173",
  },
];

const AuditTrails = () => {
  const [value, setValue] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-[24px] bg-white">
      <div className="flex gap-[20px]">
        <div className="flex gap-2 items-center">
          <CustomDatePicker
            value={value}
            label="START"
            onChange={(value) => setValue(value)}
          />
          {"-"}
          <CustomDatePicker
            value={value}
            label="END"
            onChange={(value) => setValue(value)}
          />
        </div>
        <div className="flex gap-[12px] justify-between w-full">
          <Button label="Show" variant="secondary" size="large" />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Table headers={headers} data={data} />
        <div className="flex justify-between items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            visiblePages={3}
            onChange={handlePageChange}
          />
          <p>Display Row Count here </p>
        </div>
      </div>

      {/* Add this part when there's no record found */}
      {/* <div className="flex items-center justify-center min-h-[396px]">
        <NoRecordFound />
      </div> */}
    </div>
  );
};

export default AuditTrails;

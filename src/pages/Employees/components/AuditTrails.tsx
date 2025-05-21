import React, { useState } from "react";
import {
  Button,
  CustomDatePicker,
  HeaderType,
  ItemLimitDropdown,
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
    remarks: "I - Login",
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
    remarks: "I -Login",
    logs: "Mar 24, 2025 05:34:08 AM",
    ipAddress: "120.28.14.173",
  },
  {
    remarks: "I - DTR",
    logs: "Mar 24, 2025 05:34:08 AM",
    ipAddress: "120.28.14.173",
  },
];

const getColoredRemark = (remark: string) => {
  let color = "";
  if (remark.toLowerCase().includes("login")) {
    color = "text-greenText";
  } else if (
    remark.toLowerCase().includes("out for break") ||
    remark.toLowerCase().includes("back from break")
  ) {
    color = "text-szSecondary500";
  } else if (
    remark.toLowerCase().includes("logout") ||
    remark.toLowerCase().includes("dtr")
  ) {
    color = "text-error900";
  }
  return <span className={color}>{remark}</span>;
};

// set color for remarks column
const coloredData = data.map((row) => ({
  ...row,
  remarks: getColoredRemark(row.remarks),
}));

const AuditTrails = () => {
  const [value, setValue] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState({ label: "10", value: "10" });

  const handlePageChange = (page: number, _meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid grid-cols-1 gap-[24px] bg-white">
      <div className="flex flex-wrap gap-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-2 items-center justify-center">
          <CustomDatePicker
            value={value}
            label="START"
            onChange={(value) => setValue(value)}
          />
          <span className="justify-self-center">-</span>
          <CustomDatePicker
            value={value}
            label="END"
            onChange={(value) => setValue(value)}
          />
        </div>
        <div className="flex gap-[12px] justify-between flex-grow h-fit">
          <Button label="Show" variant="secondary" size="large" />
        </div>
      </div>

      <div className="flex flex-col w-full gap-[16px]">
        <Table headers={headers} data={coloredData} />
        <div className="flex flex-wrap m justify-between items-center w-full gap-y-2 ">
          <div className="w-[100%] md:w-fit order-2 md:order-1">
            <Pagination
              currentPage={currentPage}
              totalPages={3}
              visiblePages={3}
              onChange={handlePageChange}
            />
          </div>

          <div className="w-[150px] w-[100%] md:w-fit order-1 md:order-2">
            <ItemLimitDropdown
              value={limit}
              options={[
                { label: "5", value: "5" },
                { label: "10", value: "10" },
                { label: "25", value: "25" },
                { label: "50", value: "50" },
                { label: "100", value: "100" },
              ]}
              onChange={(value) => {
                setLimit(value);
              }}
              page={1}
            />
          </div>
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

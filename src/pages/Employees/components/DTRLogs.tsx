import React, { useState } from "react";
import {
  Button,
  CustomDatePicker,
  HeaderType,
  Pagination,
  Table,
  ItemLimitDropdown,
} from "enterprisze-global-components";

// icons
import { ImportCurve } from "iconsax-reactjs";

// components
import NoRecordFound from "../../../components/NoRecordFound";

const headers: HeaderType[] = [
  { type: "string", header: "Date", accessor: "date" },
  { type: "string", header: "Shift", accessor: "shift" },
  { type: "string", header: "Clock In", accessor: "clockIn" },
  { type: "string", header: "Clock Out", accessor: "clockOut" },
  { type: "string", header: "Total Break", accessor: "totalBreak" },
  { type: "string", header: "Work Hrs", accessor: "workHrs" },
];

const data = [
  {
    date: "Mar 10, 2025",
    shift: "8:00:00 AM to 5:00:00 PM",
    clockIn: "Mar 10, 2025 07:47 AM",
    clockOut: "Mar 10, 2025 07:47 AM",
    totalBreak: "56 mins",
    workHrs: "8.00 HR",
  },
  {
    date: "Mar 10, 2025",
    shift: "LEAVE - WP",
    clockIn: "NO LOGS",
    clockOut: "NO LOGS",
    totalBreak: "0 min",
    workHrs: "0 HR",
  },
  {
    date: "Mar 10, 2025",
    shift: "LEAVE - WP",
    clockIn: "NO LOGS",
    clockOut: "NO LOGS",
    totalBreak: "0 min",
    workHrs: "0 HR",
  },
  {
    date: "Mar 10, 2025",
    shift: "LEAVE - WP",
    clockIn: "NO LOGS",
    clockOut: "NO LOGS",
    totalBreak: "0 min",
    workHrs: "0 HR",
  },
];

const DTRLogs = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState({ label: "10", value: "10" });

  const handlePageChange = (page: number, meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <div className="flex flex-wrap gap-[20px]">
        {/* <div className="flex flex-wrap gap-2 items-center flex-col md:flex-row "> */}
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
          <div className="p-[10px]">
            <ImportCurve className="icon-md text-szPrimary900" />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-[16px]">
        <Table headers={headers} data={data} />
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

      {/*------------------- Add this part when there's no record found */}
      {/* <div className="flex items-center justify-center min-h-[396px]">
        <NoRecordFound />
      </div> */}
    </div>
  );
};

export default DTRLogs;

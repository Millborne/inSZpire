import { Table, HeaderType } from "enterprisze-global-components";
import React, { useState } from "react";
import { Button } from "enterprisze-global-components";
import { Pagination } from "enterprisze-global-components";
import { CustomDatePicker } from "enterprisze-global-components";
import { ImportCurve } from "iconsax-reactjs";

const headers: HeaderType[] = [
  { type: "string", header: "In", accessor: "In" },
  { type: "string", header: "Out", accessor: "Out" },
];

const data = [
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
  {
    inDate: "May 19, 2025 01:34:08 AM",
    inLocation: "One Providence 8th Floor",
    outDate: "May 19, 2025 01:34:08 AM",
    outLocation: "One Providence 8th Floor",
  },
];

const QRLogs = () => {
  const [value, setValue] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, _meta?: { source?: string }) => {
    setCurrentPage(page);
  };

  const renderDateLocation = (date: string, location: string) => (
    <div>
      <div>{date}</div>
      <div className="text-szPrimary700">{location}</div>
    </div>
  );

  // set color for location
  const coloredData = data.map((row) => ({
    In: renderDateLocation(row.inDate, row.inLocation),
    Out: renderDateLocation(row.outDate, row.outLocation),
  }));

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
          <div className="p-[10px]">
            <ImportCurve className="icon-md text-szPrimary900" />
          </div>
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
        </div>
      </div>

      {/* Add this part when there's no record found */}
      {/* <div className="flex items-center justify-center min-h-[396px]">
        <NoRecordFound />
      </div> */}
    </div>
  );
};

export default QRLogs;

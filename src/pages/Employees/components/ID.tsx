import React from "react";
import { Table, HeaderType, Avatar } from "enterprisze-global-components";
import { Edit2 } from "iconsax-react";

const employeeIDheaders: HeaderType[] = [
  { type: "string", header: "Employee ID", accessor: "employeeId" },
];
const employeeID = [
  {
    employeeId: "220375",
  },
];

const headers: HeaderType[] = [
  { type: "string", header: "Type", accessor: "type" },
  { type: "string", header: "Num", accessor: "num" },
  { type: "string", header: "Issued Date", accessor: "issuedDate" },
  { type: "string", header: "Validity", accessor: "validity" },
  { type: "string", header: "Date Added", accessor: "dateAdded" },
  { type: "string", header: "Added By", accessor: "addedBy" },
];

const data = [
  {
    type: "TIN",
    num: "123-456-789-000",
    issuedDate: "Feb 2, 2025",
    validity: "Feb 2, 2026",
    dateAdded: "Mar 2, 2025",
    addedBy: (
      <>
        <Avatar
          size="xsmall"
          src="https://i.pravatar.cc/100?img=32"
          showBadge={true}
        />
        <span>Clarice Weston</span>
      </>
    ),
  },
  {
    type: "SSS",
    num: "12-345678912-3",
    issuedDate: "Dec 12, 2024",
    validity: "Feb 2, 2025",
    dateAdded: "Mar 2, 2025",
    addedBy: (
      <>
        <Avatar
          size="xsmall"
          src="https://i.pravatar.cc/100?img=32"
          showBadge={true}
        />
        <span>Clarice Weston</span>
      </>
    ),
  },
];

const ID = () => {
  return (
    <div className="flex flex-col w-full gap-[28px]">
      <Table headers={employeeIDheaders} data={employeeID} />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szBlack900 ">Government IDs & Numbers</h6>
          <Edit2 className="icon-sm text-szPrimary900" />
        </div>{" "}
        <Table headers={headers} data={data} />
      </div>
    </div>
  );
};

export default ID;

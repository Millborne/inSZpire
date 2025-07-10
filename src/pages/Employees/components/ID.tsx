import { useState } from "react";
import {
  Table,
  HeaderType,
  ButtonsIcon,
  SnackbarAlert,
} from "enterprisze-global-components";
import { Add } from "iconsax-react";
import IDModal from "./modals/IDModal";
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
  { type: "string", header: "Acc. / ID Number", accessor: "iDnum" },
  { type: "string", header: "Card Number", accessor: "cardNum" },
  { type: "string", header: "Issued Date", accessor: "issuedDate" },
  { type: "string", header: "Validity", accessor: "validity" },
];

const IDdata = [
  {
    id: "1",
    type: "TIN",
    iDnum: "123-456-789-000",
    cardNum: "123-456-789-000",
    issuedDate: "Feb 2, 2025",
    validity: "Feb 2, 2026",
  },
  {
    id: "2",
    type: "SSS",
    iDnum: "12-345678912-3",
    cardNum: "123-456-789-000",
    issuedDate: "Dec 12, 2024",
    validity: "Feb 2, 2025",
  },
];

const ID = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "view" | "edit">("add");
  const [selectedID, setSelectedID] = useState<any>(null);

  const handleSubmitSuccess = () => {
    setIsSnackbarOpen(true);
  };

  const handleAddClick = () => {
    setSelectedID(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleRowClick = (index: number) => {
    const rowData = IDdata[index];
    setSelectedID(rowData);
    setModalMode("view");
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-[28px]">
      <Table headers={employeeIDheaders} data={employeeID} />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szBlack900 ">Government IDs & Numbers</h6>
          <ButtonsIcon
            icon={<Add variant="Linear" />}
            variant="secondary"
            size="small"
            onClick={handleAddClick}
          />
        </div>
        <Table headers={headers} data={IDdata} onRowClick={handleRowClick} />
      </div>
      {/* Modal component */}
      <IDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
        mode={modalMode}
        selectedID={selectedID}
      />

      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        showCloseButton={true}
        type="success"
        title={
          modalMode === "add"
            ? "Successfully added ID"
            : "Successfully updated ID"
        }
        animation="slide-up"
      />
    </div>
  );
};

export default ID;

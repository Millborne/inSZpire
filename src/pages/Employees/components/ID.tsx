import { useState, useEffect } from "react";
import {
  Table,
  HeaderType,
  ButtonsIcon,
  SnackbarAlert,
} from "enterprisze-global-components";
import { Add } from "iconsax-react";
import IDModal from "./modals/IDModal";

// services
import {
  useIdsService,
  useEmployeeIdentifiers,
  type EmployeeIdentifier,
} from "../../../services/employee-profile/personal/ids";

const employeeIDheaders: HeaderType[] = [
  { type: "string", header: "Employee ID", accessor: "employeeId" },
];

const headers: HeaderType[] = [
  { type: "string", header: "Type", accessor: "type" },
  { type: "string", header: "Acc. / ID Number", accessor: "iDnum" },
  { type: "string", header: "Card Number", accessor: "cardNum" },
  { type: "string", header: "Issued Date", accessor: "issuedDate" },
  { type: "string", header: "Validity", accessor: "validity" },
];

// Temporary employee ID as specified
const TEMP_EMPLOYEE_ID = "c966375f379749e19dff326f97dbc9a2";

const ID = () => {
  const idsService = useIdsService();
  const {
    data: ids,
    isLoading,
    isError,
    error,
    refetch,
  } = useEmployeeIdentifiers(TEMP_EMPLOYEE_ID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "view" | "edit">("add");
  const [selectedID, setSelectedID] = useState<any>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  // Extract old_employee_number from the first identifier (since each employee has only one)
  const getEmployeeIDData = () => {
    if (!ids || ids.length === 0) {
      return [{ employeeId: "No data available" }];
    }

    // Get the old_employee_number from the first identifier
    const firstIdentifier = ids[0];
    const oldEmployeeNumber =
      firstIdentifier.old_employee_number || "Not available";

    return [{ employeeId: oldEmployeeNumber }];
  };

  // Transform API data to table format
  const transformIdsToTableData = (ids: EmployeeIdentifier[]) => {
    return ids.map((id) => ({
      id: id.employee_identifier_ID,
      type: id.identifier_name, // Display name for the table
      identifier_ID: id.identifier_ID, // Store the actual ID for API calls
      iDnum: id.account_number,
      cardNum: id.card_number,
      issuedDate: id.issued_date
        ? new Date(id.issued_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
      validity: id.validity_date
        ? new Date(id.validity_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
      // Store original date values for modal editing
      issuedDateOriginal: id.issued_date || "",
      validityOriginal: id.validity_date || "",
    }));
  };

  // Handle service errors
  useEffect(() => {
    if (idsService.actionIsError) {
      const errorMessage =
        idsService.actionError && "data" in idsService.actionError
          ? (idsService.actionError.data as any)?.message
          : (idsService.actionError as any)?.message || "An error occurred";
      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    }
  }, [idsService.actionError]);

  // Handle employee identifiers service errors
  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        error && "data" in error
          ? (error.data as any)?.message
          : (error as any)?.message || "Failed to fetch employee IDs";
      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
      setIsSnackbarOpen(true);
    }
  }, [isError, error]);

  const tableData = transformIdsToTableData(ids || []);
  const employeeIDData = getEmployeeIDData();

  const handleSubmitSuccess = () => {
    setSnackbarMessage(
      modalMode === "add" ? "Successfully added ID" : "Successfully updated ID"
    );
    setSnackbarType("success");
    setIsSnackbarOpen(true);
  };

  const handleAddClick = () => {
    setSelectedID(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleRowClick = (index: number) => {
    const rowData = tableData[index];
    setSelectedID(rowData);
    setModalMode("view");
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-[28px]">
      <Table headers={employeeIDheaders} data={employeeIDData} />
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex justify-between">
          <h6 className="text-h6 text-szBlack900">Government IDs & Numbers</h6>
          <ButtonsIcon
            icon={<Add variant="Linear" />}
            variant="secondary"
            size="small"
            onClick={handleAddClick}
          />
        </div>
        <Table headers={headers} data={tableData} onRowClick={handleRowClick} />
      </div>
      {/* Modal component -----------------------------------------*/}
      <IDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
        mode={modalMode}
        selectedID={selectedID}
        employeeId={TEMP_EMPLOYEE_ID}
      />

      <SnackbarAlert
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        showCloseButton={true}
        type={snackbarType}
        title={snackbarMessage}
        animation="slide-up"
      />
    </div>
  );
};

export default ID;

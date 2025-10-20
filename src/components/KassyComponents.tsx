import { useState } from "react";
import CollapsableDropdownChecklist, {
  ChecklistItem,
  ChecklistOption,
} from "./CollapsableDropdownChecklist";

const KassyComponents = () => {
  // Define the checklist options dynamically
  const checklistOptions: ChecklistOption[] = [
    { key: "all", label: "All" },
    { key: "create", label: "Create" },
    { key: "read", label: "Read" },
    { key: "update", label: "Update" },
    { key: "delete", label: "Delete" },
  ];

  // Helper function to create initial checklist state
  const createInitialChecklist = (
    items: { id: string; label: string }[]
  ): ChecklistItem[] => {
    return items.map((item) => ({
      id: item.id,
      label: item.label,
      checklist: checklistOptions.reduce((acc, option) => {
        acc[option.key] = false;
        return acc;
      }, {} as Record<string, boolean>),
    }));
  };

  // Define your items without manual checklist declaration
  const employeeItems = [
    { id: "employee-list", label: "Employee List" },
    { id: "employee-details", label: "Employee Details" },
    { id: "employee-documents", label: "Employee Documents" },
    { id: "employee-performance", label: "Employee Performance" },
    { id: "employee-reports", label: "Employee Reports" },
    { id: "employee-settings", label: "Employee Settings" },
  ];

  const [employeeChecklist, setEmployeeChecklist] = useState<ChecklistItem[]>(
    createInitialChecklist(employeeItems)
  );

  const handleChecklistChange = (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    setEmployeeChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: {
                ...item.checklist,
                [checklistKey]: checked,
              },
            }
          : item
      )
    );
  };

  const handleAllChecklistChange = (itemId: string, checked: boolean) => {
    setEmployeeChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: checklistOptions.reduce((acc, option) => {
                // Skip the "all" option itself, only update the actual permission options
                if (option.key.toLowerCase() !== "all") {
                  acc[option.key] = checked;
                }
                return acc;
              }, {} as Record<string, boolean>),
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F0F1F4] overflow-auto overflow-x-hidden">
      <h2 className="text-h2 text-szBlack700">Kassy Components</h2>
      <div className="flex-1 px-7 py-8">
        <div className="flex flex-col gap-6 h-full">
          <h4 className="text-h3 text-szBlack700">
            Collapsable Dropdown Checklist
          </h4>
          <div className="w-full max-w-4xl">
            <CollapsableDropdownChecklist
              title="Employee"
              items={employeeChecklist}
              checklistOptions={checklistOptions}
              onChecklistChange={handleChecklistChange}
              onAllChecklistChange={handleAllChecklistChange}
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default KassyComponents;

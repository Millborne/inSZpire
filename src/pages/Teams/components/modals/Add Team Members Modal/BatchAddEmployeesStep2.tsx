import React, { useState, useMemo, useEffect } from "react";

//components
import { Dropdown, Option } from "enterprisze-global-components";
import EmployeeeChecbox from "../../../../../components/EmployeeeChecbox";
import BatchMessage from "../../../../../components/BatchMessage";
import { Warning2 } from "iconsax-reactjs";

//types
import { Employee } from "../../../../../types/team";

interface BatchAddEmployeesStep2Props {
  selectedEmployees: Employee[];
  onPositionChange?: (position: string) => void;
}

const availablePositions: Option[] = [
  {
    value: "junior-web-developer",
    label: "Junior Web Developer",
    chipLabel: "FOR BATCH TRANSFER (1-15)",
  },
  {
    value: "quality-assurance",
    label: "Quality Assurance",
    chipLabel: "FOR BATCH TRANSFER (1-10)",
  },
  {
    value: "backend-engineer",
    label: "Backend Engineer",
    chipLabel: "FOR BATCH TRANSFER (1-8)",
  },
  {
    value: "ux-designer",
    label: "UX Designer",
    chipLabel: "FOR BATCH TRANSFER (1-8)",
  },
  {
    value: "devops-engineer",
    label: "DevOps Engineer",
    chipLabel: "FOR BATCH TRANSFER (1-6)",
  },
  {
    value: "product-manager",
    label: "Product Manager",
    chipLabel: "FOR BATCH TRANSFER (1-5)",
  },
];

const BatchAddEmployeesStep2: React.FC<BatchAddEmployeesStep2Props> = ({
  selectedEmployees,
  onPositionChange,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Get the selected position data
  const selectedPositionData = useMemo(() => {
    return availablePositions.find((pos) => pos.value === selectedPosition);
  }, [selectedPosition]);

  // Generate dynamic message based on selected position
  const dynamicMessage = useMemo(() => {
    if (!selectedPositionData || selectedEmployees.length === 0) {
      return "";
    }

    const employeeCount = selectedEmployees.length;
    const positionName = selectedPositionData.label;

    // Extract slot count from chipLabel (e.g., "FOR BATCH TRANSFER (1-15)" -> 15)
    const slotMatch = selectedPositionData.chipLabel?.match(/\(1-(\d+)\)/);
    const totalSlots = slotMatch ? parseInt(slotMatch[1]) : 0;

    return `You are about to add ${employeeCount} employees for ${positionName} which has ${totalSlots} slots. We will now generate ${positionName} with suffix from 1 - ${employeeCount}.`;
  }, [selectedPositionData, selectedEmployees]);

  // Show BatchMessage only when position is selected and employees are available
  const shouldShowMessage = selectedPosition && selectedEmployees.length > 0;
  return (
    <div
      className={`flex gap-[8px] h-full ${
        isLargeScreen ? "flex-row" : "flex-col"
      }`}
    >
      <div className="flex flex-1 flex-col gap-[8px] p-[8px] bg-success50 rounded-[6px] ">
        <p className="text-body-base">
          Selected Employees ({selectedEmployees.length})
        </p>
        <div className="flex flex-col gap-[8px] overflow-y-auto max-h-[195px] pr-2">
          {selectedEmployees.map((employee) => (
            <EmployeeeChecbox
              key={employee.id}
              name={employee.name}
              position={employee.position}
              checked={true}
              avatar={employee.avatar}
            />
          ))}
        </div>
      </div>
      <div
        className={`${
          isLargeScreen
            ? "border-l border-szGrey200 ml-[8px] pl-[8px]"
            : "border-t border-szGrey200 mt-[8px] pt-[8px]"
        } py-[16px]`}
      ></div>
      <div className="flex flex-1 flex-col gap-[8px]">
        <Dropdown
          options={availablePositions.map((pos) => ({
            value: pos.value,
            label: pos.label,
            showChip: true,
            chipLabel: pos.chipLabel,
            textType: "allCapsSmall",
          }))}
          value={
            selectedPosition
              ? availablePositions.find((pos) => pos.value === selectedPosition)
              : undefined
          }
          onSelectionChange={(values) => {
            let newPosition = "";
            if (Array.isArray(values) && values.length > 0) {
              newPosition = values[0].value;
            } else if (values && !Array.isArray(values)) {
              newPosition = values.value;
            }
            setSelectedPosition(newPosition);
            onPositionChange?.(newPosition);
          }}
          placeholder="Select Position"
          label="Select Position"
          size="small"
          usePortal
        />
        {shouldShowMessage && (
          <BatchMessage
            icon={<Warning2 />}
            message={dynamicMessage}
            count={selectedEmployees.length}
          />
        )}
      </div>
    </div>
  );
};

export default BatchAddEmployeesStep2;

import React, { useState, useEffect } from "react";
import { ArrowDown2, ArrowUp2, Key } from "iconsax-react";
import { Checkbox } from "enterprisze-global-components";

export interface ChecklistItem {
  id: string;
  label: string;
  checklist: Record<string, boolean>;
}

export interface ChecklistOption {
  key: string;
  label: string;
}

interface CollapsableDropdownChecklistProps {
  title: string;
  icon?: React.ReactNode;
  iconColor?: string;
  items: ChecklistItem[];
  backgroundColor?: string;
  checklistOptions: ChecklistOption[];
  onChecklistChange?: (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => void;
  onAllChecklistChange?: (itemId: string, checked: boolean) => void;
  className?: string;
  searchTerm?: string;
}

const CollapsableDropdownChecklist: React.FC<
  CollapsableDropdownChecklistProps
> = ({
  title,
  icon = <Key variant="Bold" />,
  iconColor = "szDarkGrey600",
  backgroundColor = "bg-szWhite100",
  items,
  checklistOptions,
  onChecklistChange,
  onAllChecklistChange,
  className = "",
  searchTerm = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [highlightedItems, setHighlightedItems] = useState<Set<string>>(
    new Set()
  );
  const [isTitleHighlighted, setIsTitleHighlighted] = useState(false);

  // Search highlighting effect
  useEffect(() => {
    if (searchTerm.trim()) {
      const newHighlightedItems = new Set<string>();
      const searchTermLower = searchTerm.toLowerCase().trim();

      // Check if title matches (exact match or whole word match)
      const titleLower = title.toLowerCase();
      if (
        titleLower === searchTermLower ||
        titleLower.includes(` ${searchTermLower} `) ||
        titleLower.startsWith(`${searchTermLower} `) ||
        titleLower.endsWith(` ${searchTermLower}`)
      ) {
        setIsTitleHighlighted(true);
        setTimeout(() => setIsTitleHighlighted(false), 3000);
      }

      // Check if any item labels match (exact match or whole word match)
      items.forEach((item) => {
        const labelLower = item.label.toLowerCase();
        if (
          labelLower === searchTermLower ||
          labelLower.includes(` ${searchTermLower} `) ||
          labelLower.startsWith(`${searchTermLower} `) ||
          labelLower.endsWith(` ${searchTermLower}`)
        ) {
          newHighlightedItems.add(item.id);
        }
      });

      if (newHighlightedItems.size > 0) {
        setHighlightedItems(newHighlightedItems);
        setTimeout(() => setHighlightedItems(new Set()), 3000);
      }
    }
  }, [searchTerm, title, items]);

  const handleChecklistChange = (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    if (onChecklistChange) {
      onChecklistChange(itemId, checklistKey, checked);
    }
  };

  const handleAllChecklistChange = (itemId: string, checked: boolean) => {
    if (onAllChecklistChange) {
      onAllChecklistChange(itemId, checked);
    }
  };

  // Helper function to check if all checklist items are selected
  const areAllChecklistSelected = (item: ChecklistItem) => {
    return checklistOptions
      .filter((option) => option.key.toLowerCase() !== "all") // Exclude the "all" option itself
      .every((option) => item.checklist[option.key] === true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`p-[8px] ${backgroundColor} rounded-lg border border-szGrey300 ${className}`}
    >
      {/* Header ---------------------------*/}
      <div
        className={`flex items-center justify-between cursor-pointer ${
          isExpanded ? "border-b border-szPrimary200 py-2 " : ""
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-[8px]">
          <div className="border-b border-szGrey300 p-[2px]">
            {React.cloneElement(icon as React.ReactElement, {
              className: `w-[12px] h-[12px] text-${iconColor}`,
            })}
          </div>

          <p
            className={`font-body-small-strong font-medium truncate cursor-help ${
              isTitleHighlighted
                ? "text-success700"
                : isExpanded
                ? "text-szSecondary700 text-medium"
                : "text-szBlack800"
            }`}
          >
            {title}
          </p>
        </div>
        {!isExpanded ? (
          <div className="p-2">
            <ArrowDown2 className="w-[16px] h-[16px] text-szPrimary900" />
          </div>
        ) : (
          <div className="flex">
            <div className="flex sm:gap-[10px] flex-shrink-0">
              {checklistOptions.map((option) => (
                <p
                  key={`hdr-${option.key}`}
                  className="w-[44px] sm:w-[60px] text-caption-all-caps uppercase text-szDarkGrey600 text-center"
                >
                  {option.label}
                </p>
              ))}
            </div>
          </div>
        )}
        {/* Column headers aligned to checkbox columns */}
      </div>

      {/* Expanded -------------------------- */}
      {isExpanded && (
        <div className="h-fit">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-[8px] h-fit border-b border-szGrey300"
            >
              {/* Item Header */}
              <div className="flex items-start gap-[8px] min-w-0 max-w-[calc(100%-200px)] sm:max-w-[calc(100%-300px)]">
                <div className="border-b border-szGrey300 p-[2px] flex-shrink-0">
                  {React.cloneElement(icon as React.ReactElement, {
                    className: "w-[12px] h-[12px] text-szDarkGrey600",
                  })}
                </div>
                <p
                  className={`text-body-caption-reg font-medium truncate cursor-help ${
                    highlightedItems.has(item.id)
                      ? "text-success700"
                      : "text-szBlack800"
                  }`}
                  title={item.label}
                >
                  {item.label}
                </p>
              </div>

              {/* Dynamic Checklist Items (including ALL from options) */}
              <div className="flex sm:gap-[10px] flex-shrink-0">
                {checklistOptions.map((option) => {
                  const isAll = option.key.toLowerCase() === "all";
                  return (
                    <div
                      key={option.key}
                      className="w-[44px] sm:w-[60px] flex items-center justify-center"
                    >
                      {isAll ? (
                        <Checkbox
                          checked={areAllChecklistSelected(item)}
                          onChange={() => {
                            const newCheckedState =
                              !areAllChecklistSelected(item);
                            handleAllChecklistChange(item.id, newCheckedState);
                          }}
                        />
                      ) : (
                        <Checkbox
                          checked={item.checklist[option.key] || false}
                          onChange={() => {
                            const newCheckedState = !item.checklist[option.key];
                            handleChecklistChange(
                              item.id,
                              option.key,
                              newCheckedState
                            );
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Bottom arrow (collapse control) */}
          <div className="flex justify-end p-2 cursor-pointer">
            <ArrowUp2
              className="w-[16px] h-[16px] text-szPrimary900"
              onClick={toggleExpanded}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsableDropdownChecklist;

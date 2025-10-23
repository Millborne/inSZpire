import React, { useState, useEffect } from "react";
import { ArrowDown2, ArrowUp2, Key } from "iconsax-react";
import { Checkbox } from "enterprisze-global-components";

export interface SubContentItem {
  id: string;
  label: string;
  checklist: Record<string, boolean>;
  content?: string;
}

export interface ChecklistItemContent {
  id: string;
  label: string;
  checklist: Record<string, boolean>;
  content?: string;
  subContent?: SubContentItem[];
}

export interface ChecklistOptionContent {
  key: string;
  label: string;
  textColor?: string;
}

interface CollapsableDropdownChecklistProps {
  title: string;
  expanded?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  iconColor?: string;
  items: ChecklistItemContent[];
  backgroundColor?: string;
  checklistOptions: ChecklistOptionContent[];
  onChecklistChange?: (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => void;
  onAllChecklistChange?: (itemId: string, checked: boolean) => void;
  onSubContentChecklistChange?: (
    itemId: string,
    subContentId: string,
    checklistKey: string,
    checked: boolean
  ) => void;
  onSubContentAllChecklistChange?: (
    itemId: string,
    subContentId: string,
    checked: boolean
  ) => void;
  subContentIcon?: React.ReactNode;
  subContentIconColor?: string;
  className?: string;
  searchTerm?: string;
}

const CollapsableDropdownContent: React.FC<
  CollapsableDropdownChecklistProps
> = ({
  title,
  expanded = false,
  showIcon = true,
  icon = <Key variant="Bold" />,
  iconColor = "szDarkGrey600",
  backgroundColor = "bg-szWhite100",
  items,
  checklistOptions,
  onChecklistChange,
  onAllChecklistChange,
  onSubContentChecklistChange,
  onSubContentAllChecklistChange,
  subContentIcon = <Key variant="Bold" />,
  subContentIconColor = "szDarkGrey600",
  className = "",
  searchTerm = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
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

        // Check subcontent labels
        if (item.subContent) {
          item.subContent.forEach((subContent) => {
            const subContentLabelLower = subContent.label.toLowerCase();
            if (
              subContentLabelLower === searchTermLower ||
              subContentLabelLower.includes(` ${searchTermLower} `) ||
              subContentLabelLower.startsWith(`${searchTermLower} `) ||
              subContentLabelLower.endsWith(` ${searchTermLower}`)
            ) {
              newHighlightedItems.add(subContent.id);
            }
          });
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

    // If this is not the "all" checkbox and the item has subcontent,
    // also update all subcontent checkboxes
    if (checklistKey.toLowerCase() !== "all" && onSubContentChecklistChange) {
      const item = items.find((item) => item.id === itemId);
      if (item && item.subContent) {
        item.subContent.forEach((subContent) => {
          onSubContentChecklistChange(
            itemId,
            subContent.id,
            checklistKey,
            checked
          );
        });
      }
    }
  };

  const handleAllChecklistChange = (itemId: string, checked: boolean) => {
    if (onAllChecklistChange) {
      onAllChecklistChange(itemId, checked);
    }

    // If the item has subcontent, also update all subcontent "all" checkboxes
    if (onSubContentAllChecklistChange) {
      const item = items.find((item) => item.id === itemId);
      if (item && item.subContent) {
        item.subContent.forEach((subContent) => {
          onSubContentAllChecklistChange(itemId, subContent.id, checked);
        });
      }
    }
  };

  const handleSubContentChecklistChange = (
    itemId: string,
    subContentId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    if (onSubContentChecklistChange) {
      onSubContentChecklistChange(itemId, subContentId, checklistKey, checked);
    }
  };

  const handleSubContentAllChecklistChange = (
    itemId: string,
    subContentId: string,
    checked: boolean
  ) => {
    if (onSubContentAllChecklistChange) {
      onSubContentAllChecklistChange(itemId, subContentId, checked);
    }
  };

  // Helper function to check if all checklist items are selected
  const areAllChecklistSelected = (item: ChecklistItemContent) => {
    return checklistOptions
      .filter((option) => option.key.toLowerCase() !== "all") // Exclude the "all" option itself
      .every((option) => item.checklist[option.key] === true);
  };

  // Helper function to check if all subcontent items are selected for a specific option
  const areAllSubContentSelectedForOption = (
    item: ChecklistItemContent,
    optionKey: string
  ) => {
    if (!item.subContent || item.subContent.length === 0) {
      return true; // If no subcontent, consider it as "all selected"
    }
    return item.subContent.every(
      (subContent) => subContent.checklist[optionKey] === true
    );
  };

  // Helper function to check if all checklist items are selected for subcontent
  const areAllSubContentChecklistSelected = (subContent: SubContentItem) => {
    return checklistOptions
      .filter((option) => option.key.toLowerCase() !== "all") // Exclude the "all" option itself
      .every((option) => subContent.checklist[option.key] === true);
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
          isExpanded ? "border-b border-szGrey300 pb-2 " : ""
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex flex-1 items-center gap-[8px]">
          {showIcon && (
            <div className="border-b border-szGrey300 p-[2px]">
              {React.cloneElement(icon as React.ReactElement, {
                className: `w-[12px] h-[12px] text-${iconColor}`,
              })}
            </div>
          )}
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

        {isExpanded && (
          <div className="flex">
            <div className="flex sm:gap-[10px] flex-shrink-0 pr-[8px]">
              {checklistOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={
                      items.length > 0 &&
                      items.every((item) => {
                        if (option.key.toLowerCase() === "all") {
                          return areAllChecklistSelected(item);
                        }
                        // For individual options, check both parent and all subcontent
                        return (
                          item.checklist[option.key] === true &&
                          areAllSubContentSelectedForOption(item, option.key)
                        );
                      })
                    }
                    onChange={() => {
                      const isAllSelected =
                        items.length > 0 &&
                        items.every((item) => {
                          if (option.key.toLowerCase() === "all") {
                            return areAllChecklistSelected(item);
                          }
                          // For individual options, check both parent and all subcontent
                          return (
                            item.checklist[option.key] === true &&
                            areAllSubContentSelectedForOption(item, option.key)
                          );
                        });
                      const newCheckedState = !isAllSelected;

                      // Apply to all items
                      items.forEach((item) => {
                        if (option.key.toLowerCase() === "all") {
                          handleAllChecklistChange(item.id, newCheckedState);
                        } else {
                          handleChecklistChange(
                            item.id,
                            option.key,
                            newCheckedState
                          );
                        }
                      });
                    }}
                  />
                  <p
                    className={`text-caption-all-caps uppercase text-medium w-[40px] sm:w-fit ${
                      option.textColor ? option.textColor : "text-szBlack800"
                    }`}
                  >
                    {option.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="p-2">
          {!isExpanded ? (
            <ArrowDown2 className="w-[16px] h-[16px] text-szPrimary900" />
          ) : (
            <ArrowUp2 className="w-[16px] h-[16px] text-szPrimary900" />
          )}
        </div>
      </div>

      {/* Expanded -------------------------- */}
      {isExpanded && (
        <div className="flex flex-col gap-[4px] h-fit">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-[4px] bg-szGrey150 p-2"
            >
              {/* Main Item */}
              <div className="flex justify-between h-fit rounded-sm">
                {/* Item Header */}
                <div className="flex items-start gap-[8px] min-w-0 max-w-[calc(100%-200px)] sm:max-w-[calc(100%-300px)]">
                  {showIcon && (
                    <div className="border-b border-szGrey300 p-[2px] flex-shrink-0">
                      {React.cloneElement(icon as React.ReactElement, {
                        className: "w-[12px] h-[12px] text-szDarkGrey600",
                      })}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-[4px] w-fit">
                    <p
                      className={`text-caption-reg font-medium truncate cursor-help ${
                        highlightedItems.has(item.id)
                          ? "text-success700"
                          : "text-szBlack800"
                      }`}
                      title={item.label}
                    >
                      {item.label}
                    </p>
                    {item.content && (
                      <p className="font-dmSans text-[11px]">
                        • {item.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dynamic Checklist Items (including ALL from options) */}
                <div className="flex sm:gap-[10px] flex-shrink-0 mr-[33px]">
                  {checklistOptions.map((option) => {
                    const isAll = option.key.toLowerCase() === "all";
                    return (
                      <div
                        key={option.key}
                        className=" flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isAll ? (
                          <div className="flex items-center ">
                            <Checkbox
                              label={option.label}
                              checked={areAllChecklistSelected(item)}
                              onChange={() => {
                                const newCheckedState =
                                  !areAllChecklistSelected(item);
                                handleAllChecklistChange(
                                  item.id,
                                  newCheckedState
                                );
                              }}
                            />
                            <p
                              className={`text-caption-all-caps uppercase text-medium ${
                                option.textColor
                                  ? option.textColor
                                  : "text-szBlack800"
                              }`}
                            >
                              {option.label}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center ">
                            <Checkbox
                              //   label={option.label}
                              checked={item.checklist[option.key] || false}
                              onChange={() => {
                                const newCheckedState =
                                  !item.checklist[option.key];
                                handleChecklistChange(
                                  item.id,
                                  option.key,
                                  newCheckedState
                                );
                              }}
                            />
                            <p
                              className={`text-caption-all-caps uppercase text-medium w-[40px] sm:w-fit ${
                                option.textColor
                                  ? option.textColor
                                  : "text-szBlack800"
                              }`}
                            >
                              {option.label}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SubContent Items */}
              {item.subContent && item.subContent.length > 0 && (
                <div className="flex flex-col gap-[2px] ml-[16px] border-l-2 border-szPrimary500">
                  {item.subContent.map((subContent) => (
                    <div
                      key={subContent.id}
                      className="flex justify-between py-2 gap-2 h-fit rounded-sm border-b border-szGrey300 mx-1 "
                    >
                      {/* SubContent Header */}

                      <div className="flex flex-1 flex-col gap-[4px] w-fit ">
                        <div className="pl-1">
                          <div className="flex items-start gap-[8px] ">
                            {showIcon && (
                              <div className="border-b border-szGrey300 p-[2px] flex-shrink-0">
                                {React.cloneElement(
                                  subContentIcon as React.ReactElement,
                                  {
                                    className: `w-[12px] h-[12px] text-${subContentIconColor}`,
                                  }
                                )}
                              </div>
                            )}
                            <p
                              className={`text-caption-reg ${
                                highlightedItems.has(subContent.id)
                                  ? "text-success700"
                                  : "text-szBlack800"
                              }`}
                              title={subContent.label}
                            >
                              {subContent.label}
                            </p>
                          </div>

                          {subContent.content && (
                            <p className="font-dmSans text-[11px] text-szBlack800">
                              • {subContent.content}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Checklist Items for SubContent */}
                      <div className="flex sm:gap-[10px] flex-shrink-0 mr-[30px]">
                        {checklistOptions.map((option) => {
                          const isAll = option.key.toLowerCase() === "all";
                          return (
                            <div
                              key={option.key}
                              className=" flex items-center justify-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {isAll ? (
                                <div className="flex items-center ">
                                  <Checkbox
                                    label={option.label}
                                    checked={areAllSubContentChecklistSelected(
                                      subContent
                                    )}
                                    onChange={() => {
                                      const newCheckedState =
                                        !areAllSubContentChecklistSelected(
                                          subContent
                                        );
                                      handleSubContentAllChecklistChange(
                                        item.id,
                                        subContent.id,
                                        newCheckedState
                                      );
                                    }}
                                  />
                                  <p
                                    className={`text-caption-all-caps uppercase text-medium w-[40px] sm:w-fit ${
                                      option.textColor
                                        ? option.textColor
                                        : "text-szBlack800"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center ">
                                  <Checkbox
                                    checked={
                                      subContent.checklist[option.key] || false
                                    }
                                    onChange={() => {
                                      const newCheckedState =
                                        !subContent.checklist[option.key];
                                      handleSubContentChecklistChange(
                                        item.id,
                                        subContent.id,
                                        option.key,
                                        newCheckedState
                                      );
                                    }}
                                  />
                                  <p
                                    className={`text-caption-all-caps uppercase text-medium w-[40px] sm:w-fit ${
                                      option.textColor
                                        ? option.textColor
                                        : "text-szBlack800"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Bottom arrow (collapse control) */}
          <div
            className="flex justify-end p-2 cursor-pointer"
            onClick={toggleExpanded}
          >
            <ArrowUp2 className="w-[16px] h-[16px] text-szPrimary900" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsableDropdownContent;

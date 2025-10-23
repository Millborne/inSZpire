import { useState } from "react";
import { Key } from "iconsax-react";
import CollapsableDropdownChecklist, {
  ChecklistItem,
  ChecklistOption,
} from "./CollapsableDropdownChecklist";
import CollapsableDropdownContent, {
  ChecklistOptionContent,
  ChecklistItemContent,
  SubContentItem,
} from "./CollapsableDropdownContent";

const KassyComponents = () => {
  //? ============================================================================
  //? SEARCH STATE
  //? ============================================================================
  const [searchTerm, setSearchTerm] = useState("");

  //? ============================================================================
  //? SHARED CONFIGURATION & HELPER FUNCTIONS
  //? ============================================================================

  // Define the checklist options dynamically
  const checklistOptions: ChecklistOption[] = [
    { key: "all", label: "All" },
    { key: "create", label: "Create" },
    { key: "read", label: "Read" },
    { key: "update", label: "Update" },
    { key: "delete", label: "Delete" },
  ];

  const checklistOptionsContent: ChecklistOptionContent[] = [
    { key: "hide", label: "Hide", textColor: "text-error700" },
    { key: "view", label: "View", textColor: "text-szPrimary700" },
    {
      key: "allow-updates",
      label: "Allow Updates",
      textColor: "text-greenText",
    },
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

  // Helper function to create initial checklist state for content
  const createInitialChecklistContent = (
    items: {
      id: string;
      label: string;
      content?: string;
      subContent?: SubContentItem[];
    }[]
  ): ChecklistItemContent[] => {
    return items.map((item) => ({
      id: item.id,
      label: item.label,
      content: item.content,
      subContent: item.subContent,
      checklist: checklistOptionsContent.reduce((acc, option) => {
        acc[option.key] = false;
        return acc;
      }, {} as Record<string, boolean>),
    }));
  };

  // Helper function to create initial checklist state for subcontent
  const createInitialSubContentChecklist = (
    items: { id: string; label: string; content?: string }[]
  ): SubContentItem[] => {
    return items.map((item) => ({
      id: item.id,
      label: item.label,
      content: item.content,
      checklist: checklistOptionsContent.reduce((acc, option) => {
        acc[option.key] = false;
        return acc;
      }, {} as Record<string, boolean>),
    }));
  };

  //! ============================================================================
  //! COLLAPSABLE DROPDOWN CHECKLIST - EMPLOYEE COMPONENT
  //! ============================================================================

  // Define employee items
  const employeeItems = [
    { id: "employee-list", label: "Employee List" },
    { id: "employee-details", label: "Employee Details" },
    { id: "employee-documents", label: "Employee Documents" },
    { id: "employee-performance", label: "Employee Performance" },
    { id: "employee-reports", label: "Employee Reports" },
    { id: "employee-settings", label: "Employee Settings" },
  ];

  // State for employee checklist
  const [employeeChecklist, setEmployeeChecklist] = useState<ChecklistItem[]>(
    createInitialChecklist(employeeItems)
  );

  // Handlers for employee checklist
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

  //! ============================================================================
  //! COLLAPSABLE DROPDOWN CONTENT - SUMMARY COMPONENT
  //! ============================================================================

  // Define summary items
  const summaryItems = [
    {
      id: "summary",
      label: "Summary",
      content:
        "Employee ID, Category Rank, Supervisor, Location, Employment Status, Company, ",
    },
    {
      id: "addresses-and-contacts",
      label: "Addresses and Contacts",
      content: "Company Email, Personal Email, Work Address, Current Address",
    },
    {
      id: "emergency-information",
      label: "Emergency Information",
      content: "Emergency Contact Name, Emergency Contact Number, Blood Type",
    },
  ];

  // State for summary checklist
  const [summaryChecklist, setSummaryChecklist] = useState<
    ChecklistItemContent[]
  >(createInitialChecklistContent(summaryItems));

  // Handlers for summary checklist
  const handleChecklistChangeContent = (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    setSummaryChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: { ...item.checklist, [checklistKey]: checked },
            }
          : item
      )
    );
  };

  const handleAllChecklistChangeContent = (
    itemId: string,
    checked: boolean
  ) => {
    setSummaryChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: checklistOptionsContent.reduce((acc, option) => {
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

  //! ============================================================================
  //! COLLAPSABLE DROPDOWN CONTENT - DOCUMENTS COMPONENT
  //! ============================================================================

  // Define main documents items
  const mainDocumentsItems = [
    {
      id: "application-documents",
      label: "Application Documents",
      content:
        "NBI Clearance, Police Clearance, SSS Documents, TIN Documents, Pag-IBIG, Birth Certificate, Marriage Certificate, COE, 2316 ITR, School Documents, Curriculum Vitae, Proof Income, Medical Examination",
    },
    {
      id: "work-documents",
      label: "Work Documents",
      content:
        "E-Signature, Work Document, Signed Document, Signed Contract, Signed Job Offer",
    },
  ];

  // State for main documents checklist
  const [mainDocumentsChecklist, setMainDocumentsChecklist] = useState<
    ChecklistItemContent[]
  >(createInitialChecklistContent(mainDocumentsItems));

  // Handlers for main documents checklist
  const handleMainDocumentsChecklistChange = (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    setMainDocumentsChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: { ...item.checklist, [checklistKey]: checked },
            }
          : item
      )
    );
  };

  const handleMainDocumentsAllChecklistChange = (
    itemId: string,
    checked: boolean
  ) => {
    setMainDocumentsChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: checklistOptionsContent.reduce((acc, option) => {
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

  //! ============================================================================
  //! COLLAPSABLE DROPDOWN CONTENT - NESTED SUBCONTENT EXAMPLE
  //! ============================================================================

  // Define nested subcontent items (similar to the image)
  const nestedSubContentItems = [
    {
      id: "employment-id",
      label: "Employment ID",
    },
    {
      id: "employment-id",
      label: "Employment ID",
    },
    {
      id: "employment-id",
      label: "Employment ID",
    },
    {
      id: "employment-id",
      label: "Employment ID",
    },
    {
      id: "employment-id-1",
      label: "Employment ID",
      subContent: createInitialSubContentChecklist([
        {
          id: "employee-status",
          label: "Employee Status",
          content:
            "Last Name, First Name, Middle Name, Nickname, Extension, Date of Birth, Age, Place of Birth, Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type, Present Address, Permanent Address",
        },
        {
          id: "birth-info",
          label: "Date of Birth, Age, Place of Birth",
          content:
            "Birth-related information including date, calculated age, and birthplace details",
        },
        {
          id: "personal-details",
          label:
            "Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type",
          content:
            "Personal characteristics and identity information including religious affiliation, gender details, and medical information",
        },
        {
          id: "address-info",
          label: "Present Address, Permanent Address",
          content:
            "Current and permanent residential address information for contact and legal purposes",
        },
      ]),
    },
    {
      id: "employment-id-1",
      label: "Employment ID",
      subContent: createInitialSubContentChecklist([
        {
          id: "employee-status",
          label: "Employee Status",
          content:
            "Last Name, First Name, Middle Name, Nickname, Extension, Date of Birth, Age, Place of Birth, Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type, Present Address, Permanent Address",
        },
        {
          id: "birth-info",
          label: "Date of Birth, Age, Place of Birth",
          content:
            "Birth-related information including date, calculated age, and birthplace details",
        },
        {
          id: "personal-details",
          label:
            "Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type",
          content:
            "Personal characteristics and identity information including religious affiliation, gender details, and medical information",
        },
        {
          id: "address-info",
          label: "Present Address, Permanent Address",
          content:
            "Current and permanent residential address information for contact and legal purposes",
        },
      ]),
    },
    {
      id: "employment-id-1",
      label: "Employment ID",
      subContent: createInitialSubContentChecklist([
        {
          id: "employee-status",
          label: "Employee Status",
          content:
            "Last Name, First Name, Middle Name, Nickname, Extension, Date of Birth, Age, Place of Birth, Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type, Present Address, Permanent Address",
        },
        {
          id: "birth-info",
          label: "Date of Birth, Age, Place of Birth",
          content:
            "Birth-related information including date, calculated age, and birthplace details",
        },
        {
          id: "personal-details",
          label:
            "Religion, Sex, Civil Status, Gender Identity, Pronouns, Blood Type",
          content:
            "Personal characteristics and identity information including religious affiliation, gender details, and medical information",
        },
        {
          id: "address-info",
          label: "Present Address, Permanent Address",
          content:
            "Current and permanent residential address information for contact and legal purposes",
        },
      ]),
    },
  ];

  // State for nested subcontent checklist
  const [nestedSubContentChecklist, setNestedSubContentChecklist] = useState<
    ChecklistItemContent[]
  >(createInitialChecklistContent(nestedSubContentItems));

  // Handlers for nested subcontent checklist
  const handleNestedSubContentChecklistChange = (
    itemId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    setNestedSubContentChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: { ...item.checklist, [checklistKey]: checked },
            }
          : item
      )
    );
  };

  const handleNestedSubContentAllChecklistChange = (
    itemId: string,
    checked: boolean
  ) => {
    setNestedSubContentChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checklist: checklistOptionsContent.reduce((acc, option) => {
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

  // Handlers for subcontent checklist
  const handleSubContentChecklistChange = (
    itemId: string,
    subContentId: string,
    checklistKey: string,
    checked: boolean
  ) => {
    setNestedSubContentChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subContent: item.subContent?.map((subContent) =>
                subContent.id === subContentId
                  ? {
                      ...subContent,
                      checklist: {
                        ...subContent.checklist,
                        [checklistKey]: checked,
                      },
                    }
                  : subContent
              ),
            }
          : item
      )
    );
  };

  const handleSubContentAllChecklistChange = (
    itemId: string,
    subContentId: string,
    checked: boolean
  ) => {
    setNestedSubContentChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subContent: item.subContent?.map((subContent) =>
                subContent.id === subContentId
                  ? {
                      ...subContent,
                      checklist: checklistOptionsContent.reduce(
                        (acc, option) => {
                          if (option.key.toLowerCase() !== "all") {
                            acc[option.key] = checked;
                          }
                          return acc;
                        },
                        {} as Record<string, boolean>
                      ),
                    }
                  : subContent
              ),
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F0F1F4] overflow-auto overflow-x-hidden">
      <h2 className="text-h2 text-szBlack700">Kassy Components</h2>
      <div className="flex flex-col flex-1 px-7 py-8 gap-6">
        {/* Search Test Section */}
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-szGrey300">
          <h4 className="text-h4 text-szBlack700">Search Highlighting Test</h4>
          <p className="text-body-small-reg text-szDarkGrey600">
            Type in the search box below to test the highlighting functionality.
            Try searching for: "Employee", "Summary", "Documents",
            "Application", "Work", "Emergency", "Addresses", etc.
          </p>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search for titles or item labels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-szGrey300 rounded-lg focus:outline-none focus:ring-2 focus:ring-szPrimary500 focus:border-transparent"
            />
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-szGrey300 text-szBlack800 rounded-lg hover:bg-szGrey400 transition-colors"
            >
              Clear
            </button>
          </div>
          {searchTerm && (
            <p className="text-caption-reg text-szPrimary700">
              Searching for: "<span className="font-medium">{searchTerm}</span>"
            </p>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="text-h3 text-szBlack700">
            Collapsable Dropdown Checklist
          </h4>
          <p>This component is used to display checklist items only.</p>
          <div className="w-full max-w-4xl">
            <CollapsableDropdownChecklist
              title="Employee"
              expanded={true}
              items={employeeChecklist}
              checklistOptions={checklistOptions}
              onChecklistChange={handleChecklistChange}
              onAllChecklistChange={handleAllChecklistChange}
              searchTerm={searchTerm}
            />
          </div>{" "}
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-h3 text-szBlack700">
            Collapsable Dropdown Content
          </h4>
          <p>This component is used to display checklist items with content.</p>
          <div className="w-full max-w-4xl space-y-2">
            <CollapsableDropdownContent
              title="Summary"
              expanded={true}
              items={summaryChecklist}
              checklistOptions={checklistOptionsContent}
              onChecklistChange={handleChecklistChangeContent}
              onAllChecklistChange={handleAllChecklistChangeContent}
              showIcon={false}
              searchTerm={searchTerm}
            />
            <CollapsableDropdownContent
              title="Documents"
              items={mainDocumentsChecklist}
              checklistOptions={checklistOptionsContent}
              onChecklistChange={handleMainDocumentsChecklistChange}
              onAllChecklistChange={handleMainDocumentsAllChecklistChange}
              backgroundColor="bg-szWhite100"
              searchTerm={searchTerm}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-h3 text-szBlack700">
            Collapsable Dropdown Content with Nested SubContent
          </h4>
          <p>
            This component demonstrates nested subcontent with their own
            checkboxes and icons, similar to the image.
          </p>
          <div className="w-full max-w-4xl space-y-2">
            <CollapsableDropdownContent
              title="Personal Information"
              items={nestedSubContentChecklist}
              checklistOptions={checklistOptionsContent}
              onChecklistChange={handleNestedSubContentChecklistChange}
              onAllChecklistChange={handleNestedSubContentAllChecklistChange}
              onSubContentChecklistChange={handleSubContentChecklistChange}
              onSubContentAllChecklistChange={
                handleSubContentAllChecklistChange
              }
              subContentIcon={<Key variant="Bold" />}
              subContentIconColor="szDarkGrey600"
              backgroundColor="bg-szWhite100"
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KassyComponents;

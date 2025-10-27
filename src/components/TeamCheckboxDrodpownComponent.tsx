import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

//icons
import { Filter } from "iconsax-reactjs";

//components
import { Inputs, ButtonsIcon } from "enterprisze-global-components";
import SelectedFilter from "./SelectedFilter";
import SearchTeamGroup from "./SearchTeamGroup";
import EmployeeeChecbox from "./EmployeeeChecbox";
import BatchSelectedView from "../pages/Teams/components/modals/Add Team Members Modal/BatchSelectedView";

//types
import { Employee, Team } from "../types/team";

export interface TeamCheckboxDropdownConfig {
  // Search configuration
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilter?: boolean;

  // Empty state configuration
  showEmptyState?: boolean;
  emptyStateImage?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateHighlightText?: string;

  // Selection configuration
  allowTeamSelection?: boolean;
  allowEmployeeSelection?: boolean;
  allowIndividualEmployeeSelection?: boolean;

  // Access mode configuration
  defaultAccessMode?: "all" | "specific";
  showAccessMode?: boolean;

  // UI configuration
  maxHeight?: string;
  showSelectionCounts?: boolean;
  enableSearchFiltering?: boolean;

  // Unaffiliated configuration
  enableUnaffiliatedSearch?: boolean;
  unaffiliatedSearchTerm?: string;
}

export interface TeamCheckboxDropdownProps {
  // Data
  data: Team[];

  // Configuration
  config?: TeamCheckboxDropdownConfig;

  // Selection state
  selectedEmployeeIds?: Set<string>;
  selectedTeamIds?: Set<string>;

  // Callbacks
  onSelectionChange: (
    employees: Employee[],
    employeeIds: Set<string>,
    teamIds: Set<string>
  ) => void;
  onSearchChange?: (searchTerm: string) => void;
  onFilterToggle?: (isFilterSelected: boolean) => void;

  // Additional props
  className?: string;
  disabled?: boolean;
}

const TeamCheckboxDropdownComponent: React.FC<TeamCheckboxDropdownProps> = ({
  data,
  config = {},
  selectedEmployeeIds = new Set(),
  selectedTeamIds = new Set(),
  onSelectionChange,
  onSearchChange,
  onFilterToggle,
  className = "",
  disabled = false,
}) => {
  // Default configuration
  const defaultConfig: Required<TeamCheckboxDropdownConfig> = {
    searchPlaceholder: "Search for employees and teams",
    showSearch: true,
    showFilter: true,
    showEmptyState: true,
    emptyStateImage: "",
    emptyStateTitle: "Search for employees and teams",
    emptyStateDescription:
      "I'll search for your employees and team. You could also search the word",
    emptyStateHighlightText: "Unaffiliated",
    allowTeamSelection: true,
    allowEmployeeSelection: true,
    allowIndividualEmployeeSelection: true,
    defaultAccessMode: "all",
    showAccessMode: true,
    maxHeight: "300px",
    showSelectionCounts: true,
    enableSearchFiltering: true,
    enableUnaffiliatedSearch: true,
    unaffiliatedSearchTerm: "Unaffiliated",
  };

  const finalConfig = { ...defaultConfig, ...config };

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [selectedTeams, setSelectedTeams] =
    useState<Set<string>>(selectedTeamIds);
  const [selectedEmployees, setSelectedEmployees] =
    useState<Set<string>>(selectedEmployeeIds);

  // Refs to track previous prop values
  const prevSelectedEmployeeIds = useRef<Set<string>>(selectedEmployeeIds);
  const prevSelectedTeamIds = useRef<Set<string>>(selectedTeamIds);
  const hasInitialized = useRef<boolean>(false);

  // Reset component state when modal is opened fresh
  useEffect(() => {
    const isModalOpenedFresh =
      selectedEmployeeIds.size === 0 && selectedTeamIds.size === 0;

    if (isModalOpenedFresh && !hasInitialized.current) {
      setSearchTerm("");
      setIsFilterSelected(false);
      setSelectedTeams(new Set());
      setSelectedEmployees(new Set());

      prevSelectedEmployeeIds.current = new Set();
      prevSelectedTeamIds.current = new Set();
      hasInitialized.current = true;
    } else if (!isModalOpenedFresh) {
      hasInitialized.current = false;
    }
  }, [selectedEmployeeIds.size, selectedTeamIds.size]);

  // Additional reset effect when component mounts with empty props
  useEffect(() => {
    if (selectedEmployeeIds.size === 0 && selectedTeamIds.size === 0) {
      setSearchTerm("");
      setIsFilterSelected(false);
      setSelectedTeams(new Set());
      setSelectedEmployees(new Set());
      hasInitialized.current = true;
    }
  }, []);

  // Get all employees from all teams for unaffiliated detection
  const allEmployeesFromTeams = useMemo(() => {
    const allEmployees: Employee[] = [];
    data.forEach((team: Team) => {
      allEmployees.push(...team.employees);
    });
    return allEmployees;
  }, [data]);

  // Filter teams and employees based on search term
  const { filteredTeams, individualEmployees, unaffiliatedEmployees } =
    useMemo(() => {
      if (!finalConfig.enableSearchFiltering || !searchTerm.trim()) {
        return {
          filteredTeams: [],
          individualEmployees: [],
          unaffiliatedEmployees: [],
        };
      }

      const teamsWithNameMatch: Team[] = [];
      const individualEmployeesList: Employee[] = [];
      const unaffiliatedEmployeesList: Employee[] = [];

      // Check if search term is "Unaffiliated" (case-insensitive)
      const isUnaffiliatedSearch =
        finalConfig.enableUnaffiliatedSearch &&
        searchTerm.toLowerCase() ===
          finalConfig.unaffiliatedSearchTerm?.toLowerCase();

      if (isUnaffiliatedSearch) {
        // Find employees with no team assignment (team is null, undefined, or empty)
        const unaffiliated = allEmployeesFromTeams.filter(
          (employee: Employee) =>
            !employee.team ||
            employee.team.trim() === "" ||
            employee.team.toLowerCase() === "unaffiliated"
        );
        unaffiliatedEmployeesList.push(...unaffiliated);
      } else {
        // Regular search logic
        data.forEach((team: Team) => {
          // Check if team name matches
          const teamNameMatch = team.team_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          // Check if any employee name matches
          const matchingEmployees = team.employees.filter(
            (employee: Employee) =>
              employee.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (teamNameMatch) {
            teamsWithNameMatch.push(team);
          } else if (matchingEmployees.length > 0) {
            individualEmployeesList.push(...matchingEmployees);
          }
        });
      }

      return {
        filteredTeams: teamsWithNameMatch,
        individualEmployees: individualEmployeesList,
        unaffiliatedEmployees: unaffiliatedEmployeesList,
      };
    }, [
      data,
      searchTerm,
      finalConfig.enableSearchFiltering,
      finalConfig.enableUnaffiliatedSearch,
      finalConfig.unaffiliatedSearchTerm,
      allEmployeesFromTeams,
    ]);

  // Calculate counts for the filter display
  const teamCount = selectedTeams.size;
  const employeeCount = selectedEmployees.size;

  // Handle search change
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  // Handle filter toggle
  const handleFilterClick = () => {
    const newFilterState = !isFilterSelected;
    setIsFilterSelected(newFilterState);
    onFilterToggle?.(newFilterState);
  };

  // Handle team selection
  const handleTeamSelection = useCallback(
    (teamId: string, checked: boolean) => {
      if (!finalConfig.allowTeamSelection) return;

      setSelectedTeams((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(teamId);
        } else {
          newSet.delete(teamId);
        }
        return newSet;
      });
    },
    [finalConfig.allowTeamSelection]
  );

  // Handle employee selection
  const handleEmployeeSelection = useCallback(
    (employeeId: string, checked: boolean) => {
      if (!finalConfig.allowEmployeeSelection) return;

      setSelectedEmployees((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(employeeId);
        } else {
          newSet.delete(employeeId);
        }
        return newSet;
      });
    },
    [finalConfig.allowEmployeeSelection]
  );

  // Get selected teams and employees as arrays
  const selectedTeamsData = useMemo(() => {
    return data.filter((team) => selectedTeams.has(team.team_ID));
  }, [data, selectedTeams]);

  const selectedEmployeesData = useMemo(() => {
    const allEmployees: Employee[] = [];
    data.forEach((team) => {
      allEmployees.push(...team.employees);
    });
    return allEmployees.filter((employee) =>
      selectedEmployees.has(employee.id)
    );
  }, [data, selectedEmployees]);

  // Update local state when props change
  useEffect(() => {
    const employeeIdsChanged =
      selectedEmployeeIds.size !== prevSelectedEmployeeIds.current.size ||
      [...selectedEmployeeIds].some(
        (id) => !prevSelectedEmployeeIds.current.has(id)
      );

    const teamIdsChanged =
      selectedTeamIds.size !== prevSelectedTeamIds.current.size ||
      [...selectedTeamIds].some((id) => !prevSelectedTeamIds.current.has(id));

    if (employeeIdsChanged) {
      setSelectedEmployees(selectedEmployeeIds);
      prevSelectedEmployeeIds.current = selectedEmployeeIds;
    }

    if (teamIdsChanged) {
      setSelectedTeams(selectedTeamIds);
      prevSelectedTeamIds.current = selectedTeamIds;
    }
  }, [selectedEmployeeIds, selectedTeamIds]);

  // Memoize the onSelectionChange callback
  const memoizedOnSelectionChange = useCallback(
    (employees: Employee[], employeeIds: Set<string>, teamIds: Set<string>) => {
      onSelectionChange(employees, employeeIds, teamIds);
    },
    [onSelectionChange]
  );

  // Notify parent component when selections change
  useEffect(() => {
    memoizedOnSelectionChange(
      selectedEmployeesData,
      selectedEmployees,
      selectedTeams
    );
  }, [
    selectedEmployeesData,
    selectedEmployees,
    selectedTeams,
    memoizedOnSelectionChange,
  ]);

  // Render empty state
  const renderEmptyState = () => {
    if (!finalConfig.showEmptyState) return null;

    return (
      <div className="flex flex-col items-center gap-[16px]">
        {finalConfig.emptyStateImage && (
          <img
            src={finalConfig.emptyStateImage}
            alt="Empty state"
            className="w-[120px] h-[120px]"
          />
        )}
        <p className="max-w-[343px] text-center text-body-base-strong text-szBlack800">
          {finalConfig.emptyStateDescription}{" "}
          <span className="text-body-base-strong text-szPrimary500">
            {finalConfig.emptyStateHighlightText}
          </span>{" "}
          to reveal employees with no team.
        </p>
      </div>
    );
  };

  // Render search results
  const renderSearchResults = () => {
    if (!searchTerm.trim()) return null;

    return (
      <div
        className={`flex flex-col w-full gap-[8px] max-h-[${finalConfig.maxHeight}] overflow-y-auto`}
      >
        {filteredTeams.length > 0 ||
        individualEmployees.length > 0 ||
        unaffiliatedEmployees.length > 0 ? (
          <>
            {/* Render teams that match by name */}
            {filteredTeams.map((team: Team) => (
              <SearchTeamGroup
                key={team.team_name}
                teamCheckboxes={{
                  team_name: team.team_name,
                  managedBy: team.managedBy,
                  selectedCount: 0,
                  totalCount: team.employees.length,
                  onChange: (checked) => {
                    handleTeamSelection(team.team_ID, checked);
                  },
                }}
                accessModeFilter={finalConfig.defaultAccessMode}
                employees={team.employees}
                checked={selectedTeams.has(team.team_ID)}
                teamId={team.team_ID}
                onTeamSelection={handleTeamSelection}
                onEmployeeSelection={handleEmployeeSelection}
                selectedEmployees={selectedEmployees}
              />
            ))}

            {/* Render unaffiliated employees */}
            {unaffiliatedEmployees.length > 0 && (
              <SearchTeamGroup
                key="unaffiliated"
                teamCheckboxes={{
                  team_name: "Unaffiliated",
                  managedBy: "None",
                  selectedCount: unaffiliatedEmployees.filter((emp) =>
                    selectedEmployees.has(emp.id)
                  ).length,
                  totalCount: unaffiliatedEmployees.length,
                  onChange: (checked) => {
                    // Handle unaffiliated team selection if needed
                    console.log("Unaffiliated team selection:", checked);
                  },
                }}
                accessModeFilter={finalConfig.defaultAccessMode}
                employees={unaffiliatedEmployees}
                checked={false} // Unaffiliated team is not selectable as a team
                teamId="unaffiliated"
                onTeamSelection={() => {}} // No team selection for unaffiliated
                onEmployeeSelection={handleEmployeeSelection}
                selectedEmployees={selectedEmployees}
                unaffiliated={true}
              />
            )}

            {/* Render individual employees when no teams match but employees do */}
            {filteredTeams.length === 0 &&
              unaffiliatedEmployees.length === 0 &&
              individualEmployees.length > 0 &&
              finalConfig.allowIndividualEmployeeSelection && (
                <div className="flex flex-col w-full gap-[8px]">
                  <div className=" border border-szGrey300 rounded-[8px] px-[16px] py-[8px]">
                    <div className="flex flex-col gap-[8px]">
                      {individualEmployees.map((employee: Employee) => (
                        <EmployeeeChecbox
                          key={employee.id}
                          id={employee.id}
                          name={employee.name}
                          team={employee.team}
                          position={employee.position}
                          avatar={employee.avatar}
                          checked={selectedEmployees.has(employee.id)}
                          onChange={(checked) => {
                            handleEmployeeSelection(employee.id, checked);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-[16px] py-[40px]">
            <p className="text-body-base-strong text-szBlack800">
              No teams or employees found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center gap-[16px]">
        {/* Search and Filter Controls */}
        <div className="flex flex-row gap-[8px] w-full items-center">
          {finalConfig.showSearch && (
            <Inputs
              placeholder={finalConfig.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={disabled}
            />
          )}
          {finalConfig.showFilter && (
            <>
              <ButtonsIcon
                icon={<Filter />}
                variant="ghost"
                size="medium"
                onClick={() => {}}
                disabled={disabled}
              />
              {finalConfig.showSelectionCounts && (
                <SelectedFilter
                  teamCount={teamCount}
                  employeeCount={employeeCount}
                  selected={isFilterSelected}
                  onClick={handleFilterClick}
                />
              )}
            </>
          )}
        </div>

        {/* Content Area */}
        {isFilterSelected ? (
          // Show selected items view when filter is selected
          <div className="w-full">
            <BatchSelectedView
              selectedItems={{
                teams: selectedTeamsData,
                employees: selectedEmployeesData,
              }}
              onTeamSelection={handleTeamSelection}
              onEmployeeSelection={handleEmployeeSelection}
              selectedEmployees={selectedEmployees}
            />
          </div>
        ) : (
          <>
            {/* Show empty state when no search is performed */}
            {!searchTerm.trim() && renderEmptyState()}

            {/* Show search results when search is performed */}
            {searchTerm.trim() && renderSearchResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamCheckboxDropdownComponent;

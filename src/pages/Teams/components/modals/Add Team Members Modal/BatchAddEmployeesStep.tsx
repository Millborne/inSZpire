import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import PapaZ from "../../../../../assets/papa-z-csr.png";

//icons
import { Filter } from "iconsax-reactjs";

//components
import { Inputs, ButtonsIcon } from "enterprisze-global-components";
import SelectedFilter from "../../../../../components/SelectedFilter";
import SearchTeamGroup from "../../../../../components/SearchTeamGroup";
import EmployeeeChecbox from "../../../../../components/EmployeeeChecbox";
import BatchSelectedView from "./BatchSelectedView";

//types
import { Employee, Team } from "../../../../../types/team";

interface AddEmployeesStepProps {
  data: Team[];
  onSelectionChange: (
    employees: Employee[],
    employeeIds: Set<string>,
    teamIds: Set<string>
  ) => void;
  selectedEmployeeIds?: Set<string>;
  selectedTeamIds?: Set<string>;
}

const BatchAddEmployeesStep: React.FC<AddEmployeesStepProps> = ({
  data,
  onSelectionChange,
  selectedEmployeeIds = new Set(),
  selectedTeamIds = new Set(),
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterSelected, setIsFilterSelected] = useState(false);

  // State for selected items - initialize with passed props
  const [selectedTeams, setSelectedTeams] =
    useState<Set<string>>(selectedTeamIds);
  const [selectedEmployees, setSelectedEmployees] =
    useState<Set<string>>(selectedEmployeeIds);

  // Refs to track previous prop values to prevent unnecessary updates
  const prevSelectedEmployeeIds = useRef<Set<string>>(selectedEmployeeIds);
  const prevSelectedTeamIds = useRef<Set<string>>(selectedTeamIds);
  const hasInitialized = useRef<boolean>(false);

  // Reset component state when modal is opened fresh (both props are empty)
  useEffect(() => {
    const isModalOpenedFresh =
      selectedEmployeeIds.size === 0 && selectedTeamIds.size === 0;

    if (isModalOpenedFresh && !hasInitialized.current) {
      // Reset all local state when modal is opened fresh
      setSearchTerm("");
      setIsFilterSelected(false);
      setSelectedTeams(new Set());
      setSelectedEmployees(new Set());

      // Update refs to match the reset state
      prevSelectedEmployeeIds.current = new Set();
      prevSelectedTeamIds.current = new Set();
      hasInitialized.current = true;
    } else if (!isModalOpenedFresh) {
      // Reset the initialization flag when modal has data (coming back from step 2)
      hasInitialized.current = false;
    }
  }, [selectedEmployeeIds.size, selectedTeamIds.size]);

  // Additional reset effect when component mounts with empty props
  useEffect(() => {
    if (selectedEmployeeIds.size === 0 && selectedTeamIds.size === 0) {
      // Force reset on mount if props are empty
      setSearchTerm("");
      setIsFilterSelected(false);
      setSelectedTeams(new Set());
      setSelectedEmployees(new Set());
      hasInitialized.current = true;
    }
  }, []); // Empty dependency array - runs only on mount

  // Filter teams and employees based on search term
  const { filteredTeams, individualEmployees } = useMemo(() => {
    if (!searchTerm.trim()) {
      return { filteredTeams: [], individualEmployees: [] };
    }

    const teamsWithNameMatch: Team[] = [];
    const individualEmployeesList: Employee[] = [];

    data.forEach((team: Team) => {
      // Check if team name matches
      const teamNameMatch = team.team_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check if any employee name matches
      const matchingEmployees = team.employees.filter((employee: Employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (teamNameMatch) {
        // If team name matches, show the whole team
        teamsWithNameMatch.push(team);
      } else if (matchingEmployees.length > 0) {
        // If only employee names match, add individual employees
        individualEmployeesList.push(...matchingEmployees);
      }
    });

    return {
      filteredTeams: teamsWithNameMatch,
      individualEmployees: individualEmployeesList,
    };
  }, [data, searchTerm]);

  // Calculate counts for the filter display - show actual selected items
  const teamCount = selectedTeams.size;
  const employeeCount = selectedEmployees.size;

  // Handle SelectedFilter click
  const handleFilterClick = () => {
    setIsFilterSelected(!isFilterSelected);
  };

  // Functions to handle team selection
  const handleTeamSelection = (teamId: string, checked: boolean) => {
    setSelectedTeams((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(teamId);
      } else {
        newSet.delete(teamId);
      }
      return newSet;
    });
  };

  // Functions to handle employee selection
  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    setSelectedEmployees((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(employeeId);
      } else {
        newSet.delete(employeeId);
      }
      return newSet;
    });
  };

  // Get selected teams and employees as arrays for BatchSelectedView
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

  // Update local state when props change (when going back from step 2)
  useEffect(() => {
    // Only update if the props have actually changed
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

  // Memoize the onSelectionChange callback to prevent unnecessary re-renders
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

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex flex-row gap-[8px] w-full items-center">
          <Inputs
            placeholder="Search for employees and teams"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ButtonsIcon
            icon={<Filter />}
            variant="ghost"
            size="medium"
            onClick={() => {}}
          />
          <SelectedFilter
            teamCount={teamCount}
            employeeCount={employeeCount}
            selected={isFilterSelected}
            onClick={handleFilterClick}
          />
        </div>

        {/* Show BatchSelectedView when filter is selected */}
        {isFilterSelected ? (
          <BatchSelectedView
            selectedItems={{
              teams: selectedTeamsData,
              employees: selectedEmployeesData,
            }}
            onTeamSelection={handleTeamSelection}
            onEmployeeSelection={handleEmployeeSelection}
            selectedEmployees={selectedEmployees}
          />
        ) : (
          <>
            {/* Show default view when no search is performed */}
            {!searchTerm.trim() && (
              <div className="flex flex-col items-center gap-[16px]">
                <img src={PapaZ} alt="PapaZ" className="w-[120px] h-[120px]" />
                <p className="max-w-[343px] text-center text-body-base-strong text-szBlack800">
                  I'll search for your employees and team. You could also search
                  the word{" "}
                  <span className="text-body-base-strong text-szPrimary500">
                    "Unaffiliated"
                  </span>{" "}
                  to reveal employees with no team.
                </p>
              </div>
            )}

            {/* Render search results when search is performed */}
            {searchTerm.trim() && (
              <div className="flex flex-col w-full gap-[8px] max-h-[300px] overflow-y-auto">
                {filteredTeams.length > 0 || individualEmployees.length > 0 ? (
                  <>
                    {/* Render teams that match by name */}
                    {filteredTeams.map((team: Team) => (
                      <SearchTeamGroup
                        key={team.team_name}
                        teamCheckboxes={{
                          team_name: team.team_name,
                          managedBy: team.managedBy,
                          selectedCount: 0, // This will be overridden by SearchTeamGroup
                          totalCount: team.employees.length,
                          onChange: (checked) => {
                            handleTeamSelection(team.team_ID, checked);
                          },
                        }}
                        accessModeFilter="all"
                        employees={team.employees}
                        checked={selectedTeams.has(team.team_ID)}
                        teamId={team.team_ID}
                        onTeamSelection={handleTeamSelection}
                        onEmployeeSelection={handleEmployeeSelection}
                        selectedEmployees={selectedEmployees}
                      />
                    ))}

                    {/* Render individual employees when no teams match but employees do */}
                    {filteredTeams.length === 0 &&
                      individualEmployees.length > 0 && (
                        <div className="flex flex-col w-full gap-[8px]">
                          <div className="border border-szGrey300 rounded-[8px] px-[16px] py-[8px]">
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
                                    handleEmployeeSelection(
                                      employee.id,
                                      checked
                                    );
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BatchAddEmployeesStep;

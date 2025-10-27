import { useState } from "react";
import AccessControlSidebar from "../AccessControlSidebar";
import DataScopeModal from "../DataScopeModal";
import MiniModalAccessControl from "../MiniModalAccessControl";
import { Button } from "enterprisze-global-components";

const millcomponents = () => {
    const [isOpenDataScopeModal, setIsOpenDataScopeModal] = useState(false);
    const [isOpenMiniModalTeam, setIsOpenMiniModalTeam] = useState(false);
    const [isOpenMiniModalEmployee, setIsOpenMiniModalEmployee] =
        useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<
        { label: string; value: string } | undefined
    >(undefined);
    const [selectedEmployee, setSelectedEmployee] = useState<
        { label: string; value: string } | undefined
    >(undefined);

    // Sample team options
    const teamOptions = [
        { label: "Business Solutions & Innovation", value: "bsi" },
        { label: "Engineering Team", value: "engineering" },
        { label: "Product Team", value: "product" },
        { label: "Design Team", value: "design" },
        { label: "Marketing Team", value: "marketing" },
        { label: "Sales Team", value: "sales" },
    ];

    // Sample employee options with chips
    const employeeOptions = [
        {
            label: "Edwards, Perry",
            value: "edwards-perry",
            showChip: true,
            chipLabel: "with subordinates",
            chipColor: "red" as const,
            textType: "allCapsSmall" as const,
        },
        {
            label: "Smith, John",
            value: "smith-john",
            showChip: true,
            chipLabel: "team lead",
            chipColor: "default" as const,
            textType: "allCapsSmall" as const,
        },
        {
            label: "Kehlani, Kate",
            value: "kehlani-kate",
        },
        {
            label: "Doe, Jane",
            value: "doe-jane",
        },
        {
            label: "Wilson, Michael",
            value: "wilson-michael",
            showChip: true,
            chipLabel: "manager",
            chipColor: "green" as const,
            textType: "allCapsSmall" as const,
        },
    ];

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Access control sidebar</h1>
                <h3 className="text-lg font-bold">
                    Pages & Features -----------------------
                </h3>
                <AccessControlSidebar page="pages-features" />
                <br />
                <h3 className="text-lg font-bold">
                    Profile Fields -----------------------
                </h3>
                <AccessControlSidebar page="profile-fields" />
            </div>
            <br />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Data scope modal</h1>
                <h3 className="text-lg font-bold">Default</h3>
                <Button
                    label="Open Modal"
                    variant="primary"
                    onClick={() => {
                        setIsOpenDataScopeModal(true);
                    }}
                />
                <DataScopeModal
                    isOpen={isOpenDataScopeModal}
                    onClose={() => {
                        setIsOpenDataScopeModal(false);
                    }}
                    onSave={() => {
                        setIsOpenDataScopeModal(false);
                    }}
                    roleName="Super Admin"
                    children={<div>Hello</div>}
                />
            </div>
            <br />
            <div className="p-4">
                <h1 className="text-2xl font-bold">
                    Mini Modal Access Control
                </h1>

                {/* Team Permission Example */}
                <h3 className="text-lg font-bold">Team Permission</h3>
                <Button
                    label="Open Team Permission Modal"
                    variant="primary"
                    onClick={() => {
                        setShowWarning(false);
                        setIsOpenMiniModalTeam(true);
                    }}
                />
                <MiniModalAccessControl
                    isOpen={isOpenMiniModalTeam}
                    onClose={() => {
                        setIsOpenMiniModalTeam(false);
                        setSelectedTeam(undefined);
                        setShowWarning(false);
                    }}
                    onSubmit={() => {
                        console.log("Team Permission submitted:", selectedTeam);
                        setIsOpenMiniModalTeam(false);
                        setSelectedTeam(undefined);
                        setShowWarning(false);
                    }}
                    title="Team Permission"
                    subtitle="Assign new Profile Field Permission for a team."
                    dropdownPlaceholder="Select Team"
                    dropdownOptions={teamOptions}
                    selectedValue={selectedTeam}
                    onDropdownChange={(selected: any) => {
                        const value = Array.isArray(selected)
                            ? selected[0]
                            : selected;
                        setSelectedTeam(value);
                        // Check if Business Solutions & Innovation is selected to show warning
                        if (value?.value === "bsi") {
                            setShowWarning(true);
                        } else {
                            setShowWarning(false);
                        }
                    }}
                    showWarning={showWarning}
                    warningMessage="Warning! This team already has permission. Please search and review their existing permission."
                    submitButtonLabel="Add User Role"
                    cancelButtonLabel="Cancel"
                />

                <br />
                <br />

                {/* User Permission Example */}
                <h3 className="text-lg font-bold">User Permission</h3>
                <Button
                    label="Open User Permission Modal"
                    variant="primary"
                    onClick={() => {
                        setIsOpenMiniModalEmployee(true);
                    }}
                />
                <MiniModalAccessControl
                    isOpen={isOpenMiniModalEmployee}
                    onClose={() => {
                        setIsOpenMiniModalEmployee(false);
                        setSelectedEmployee(undefined);
                    }}
                    onSubmit={() => {
                        console.log(
                            "Employee Permission submitted:",
                            selectedEmployee
                        );
                        setIsOpenMiniModalEmployee(false);
                        setSelectedEmployee(undefined);
                    }}
                    title="Employee Permission"
                    subtitle="Assign new Profile Field Permission for an employee."
                    dropdownPlaceholder="Select Employee"
                    dropdownOptions={employeeOptions}
                    selectedValue={selectedEmployee}
                    onDropdownChange={(selected: any) => {
                        const value = Array.isArray(selected)
                            ? selected[0]
                            : selected;
                        setSelectedEmployee(value);
                    }}
                    showWarning={false}
                    submitButtonLabel="Add Permission"
                    cancelButtonLabel="Cancel"
                />
            </div>
        </>
    );
};

export default millcomponents;

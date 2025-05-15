import { useState } from "react";
import { Tab } from "enterprisze-global-components";
import EmployeeDetails from "../components/EmployeeDetails";
import TeamMember from "../components/TeamMember";
import EmploymentHistory from "../components/EmploymentHistory";

const tabs = ["Employee Details", "Team Members", "Employment History"];

const Work = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex flex-col gap-6 p-6 h-full">
            <div className="flex">
                <Tab
                    label="Employee Details"
                    type="left"
                    isFirst
                    active={activeTab === "Employee Details"}
                    onClick={() => setActiveTab("Employee Details")}
                />
                <Tab
                    label="Team Members"
                    type="middle"
                    active={activeTab === "Team Members"}
                    onClick={() => setActiveTab("Team Members")}
                />
                <Tab
                    label="Employment History"
                    type="right"
                    active={activeTab === "Employment History"}
                    onClick={() => setActiveTab("Employment History")}
                />
            </div>

            {activeTab === "Employee Details" ? (
                <EmployeeDetails />
            ) : activeTab === "Team Members" ? (
                <TeamMember />
            ) : (
                <EmploymentHistory />
            )}
        </div>
    );
};

export default Work;

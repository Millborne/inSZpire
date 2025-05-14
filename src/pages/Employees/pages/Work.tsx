import { Tab } from "enterprisze-global-components";
import { useState } from "react";

const tabs = ["Employee Details", "Team Members", "Employment History"];

const Work = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex flex-col gap-[24px] p-4">
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
        </div>
    );
};

export default Work;

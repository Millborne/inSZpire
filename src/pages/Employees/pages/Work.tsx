import { useState } from "react";
import { CardContainer, Tabs } from "enterprisze-global-components";
import EmployeeDetails from "../components/EmployeeDetails";
import TeamMember from "../components/TeamMember";
import EmploymentHistory from "../components/EmploymentHistory";

const tabOptions = [
    {
        label: "Employee Details",
        value: "Employee Details",
        number: 1,
    },
    {
        label: "Team Members",
        value: "Team Members",
        number: 2,
    },
    {
        label: "Employment History",
        value: "Employment History",
        number: 3,
    },
];

const tabContentMap: Record<string, JSX.Element> = {
    "Employee Details": <EmployeeDetails />,
    "Team Members": <TeamMember />,
    "Employment History": <EmploymentHistory />,
};

const Work = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="grid w-full">
                <Tabs options={tabOptions} activeIndex={activeTabIndex} onTabChange={setActiveTabIndex} />
            </div>

            {tabContentMap[tabOptions[activeTabIndex].value]}
        </div>
    );
};

export default Work;

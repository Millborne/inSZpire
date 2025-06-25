import { useState } from "react";
import { CardContainer, Tab } from "enterprisze-global-components";
import PersonalDocuments from "../components/PersonalDocuments";
import WorkDocuments from "../components/WorkDocuments";

const TABS = ["Personal Documents", "Work Documents"];

const tabContentMap: Record<string, JSX.Element> = {
    "Personal Documents": <PersonalDocuments />,
    "Work Documents": <WorkDocuments />,
};

const Documents = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex">
                {TABS.map((label, index) => (
                    <Tab
                        key={label}
                        label={label}
                        type={index === 0 ? "left" : "right"}
                        isFirst={index === 0}
                        active={activeTab === label}
                        onClick={() => setActiveTab(label)}
                    />
                ))}
            </div>

            <CardContainer backgroundColor="bg-white" content={tabContentMap[activeTab]} />
        </div>
    );
};

export default Documents;

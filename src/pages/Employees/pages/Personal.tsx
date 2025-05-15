import { useState } from "react";
import { CardContainer, Tab } from "enterprisze-global-components";
import BasicInfo from "../components/BasicInfo";
import Contacts from "../components/Contacts";
import Family from "../components/Family";
import ID from "../components/ID";

const TABS = ["Basic Info", "Contacts", "Family", "IDs"];

const tabContentMap: Record<string, JSX.Element> = {
  "Basic Info": <BasicInfo />,
  Contacts: <Contacts />,
  Family: <Family />,
  IDs: <ID />,
};

const Personal = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex w-full">
        {TABS.map((label, index) => (
          <Tab
            key={label}
            label={label}
            isFirst={index === 0}
            type={
              index === 0
                ? "left"
                : index === TABS.length - 1
                ? "right"
                : "middle"
            }
            active={activeTab === label}
            onClick={() => setActiveTab(label)}
          />
        ))}
      </div>

      <CardContainer
        backgroundColor="bg-white"
        content={tabContentMap[activeTab]}
      />
    </div>
  );
};

export default Personal;

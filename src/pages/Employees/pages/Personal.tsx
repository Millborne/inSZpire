import { useState } from "react";
import { CardContainer, Tabs } from "enterprisze-global-components";
import BasicInfo from "../components/BasicInfo";
import Contacts from "../components/Contacts";
import Family from "../components/Family";
import ID from "../components/ID";
import Education from "../components/Education";

const tabOptions = [
  {
    label: "Basic Info",
    value: "Basic Info",
    number: 1,
  },
  {
    label: "Education",
    value: "Education",
    number: 2,
  },
  {
    label: "Family",
    value: "Family",
    number: 3,
  },
  {
    label: "Contacts",
    value: "Contacts",
    number: 4,
  },
  {
    label: "IDs",
    value: "IDs",
    number: 5,
  },
];

const tabContentMap: Record<string, JSX.Element> = {
  "Basic Info": <BasicInfo />,
  Education: <Education />,
  Family: <Family />,
  Contacts: <Contacts />,
  IDs: <ID />,
};

const Personal = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid w-full">
        <Tabs
          options={tabOptions}
          activeIndex={activeTabIndex}
          onTabChange={setActiveTabIndex}
        />
      </div>

      <CardContainer
        backgroundColor="bg-white"
        content={tabContentMap[tabOptions[activeTabIndex].value]}
      />
    </div>
  );
};

export default Personal;

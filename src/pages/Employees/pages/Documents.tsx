import { useState } from "react";
import { CardContainer, Tabs } from "enterprisze-global-components";
import PersonalDocuments from "../components/PersonalDocuments";
import WorkDocuments from "../components/WorkDocuments";

const tabOptions = [
  {
    label: "Personal Documents",
    value: "Personal Documents",
    number: 1,
  },
  {
    label: "Work Documents",
    value: "Work Documents",
    number: 2,
  },
];

const tabContentMap: Record<string, JSX.Element> = {
  "Personal Documents": <PersonalDocuments />,
  "Work Documents": <WorkDocuments />,
};

const Documents = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6">
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

export default Documents;

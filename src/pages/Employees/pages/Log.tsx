import { useState } from "react";
import { CardContainer, Tabs } from "enterprisze-global-components";

//components
import CalendarLogs from "../components/CalendarLogs";
import DTRLogs from "../components/DTRLogs";
import AuditTrails from "../components/AuditTrails";
import QRLogs from "../components/QRLogs";

const tabOptions = [
  {
    label: "Calendar",
    value: "Calendar",
    number: 1,
  },
  {
    label: "DTR Logs",
    value: "DTR Logs",
    number: 2,
  },
  {
    label: "QR Logs",
    value: "QR Logs",
    number: 3,
  },
  {
    label: "Audit Trails",
    value: "Audit Trails",
    number: 4,
  },
];

const tabContentMap: Record<string, JSX.Element> = {
  Calendar: <CalendarLogs />,
  "DTR Logs": <DTRLogs />,
  "QR Logs": <QRLogs />,
  "Audit Trails": <AuditTrails />,
};

const Log = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <CardContainer
      content={
        <div className="flex flex-col gap-[24px]">
          <div className="grid w-full">
            <Tabs
              options={tabOptions}
              activeIndex={activeTabIndex}
              onTabChange={setActiveTabIndex}
            />
          </div>
          {tabContentMap[tabOptions[activeTabIndex].value]}
        </div>
      }
    />
  );
};

export default Log;

import React, { useState } from "react";
import { Tab, CardContainer } from "enterprisze-global-components";

//components
import CalendarLogs from "../components/CalendarLogs";
import DTRLogs from "../components/DTRLogs";
import AuditTrails from "../components/AuditTrails";
import QRLogs from "../components/QRLogs";

const TABS = ["Calendar", "DTR Logs", "QR Logs", "Audit Trails"];

const tabContentMap: Record<string, JSX.Element> = {
  Calendar: <CalendarLogs />,
  "DTR Logs": <DTRLogs />,
  "QR Logs": <QRLogs />,
  "Audit Trails": <AuditTrails />,
};

const Log = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <CardContainer
      content={
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
          {tabContentMap[activeTab]}
        </div>
      }
    />
  );
};

export default Log;

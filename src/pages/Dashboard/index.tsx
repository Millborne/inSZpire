import { useState } from "react";
import { Element3, User, People, Notification, Diagram, ProgrammingArrows, Setting2, Calendar } from "iconsax-react";

// global components
import { MenuItem, SideMenu, Header } from "enterprisze-global-components";
import Dashboard2 from "./pages/dashboard2";

const Dashboard = () => {
    const [selected, setSelected] = useState("dashboard");

    //side menu
    const menuItems: MenuItem[] = [
        { id: "dashboard", icon: <Element3 variant="Bulk" className="text-szPrimary500" />, label: "Dashboard" },
        { id: "employees", icon: <User variant="Bulk" className="text-szPrimary500" />, label: "Employees" },
        { id: "teams", icon: <People variant="Bulk" className="text-szPrimary500" />, label: "Teams" },
        { id: "notifications", icon: <Notification variant="Bulk" className="text-szPrimary500" />, label: "Notifications" },
        { id: "analyticsReports", icon: <Diagram variant="Bulk" className="text-szPrimary500" />, label: "Analytics & Reports" },
        {
            id: "employeeTransition",
            icon: <ProgrammingArrows variant="Bulk" className="text-szPrimary500" />,
            label: "Employee Transition",
        },
        { id: "settings", icon: <Setting2 variant="Bulk" className="text-szPrimary500" />, label: "Settings" },
        { id: "attendance", icon: <Calendar variant="Bulk" className="text-szPrimary500" />, label: "Attendance" },
        { id: "rulesMemos", icon: <Calendar variant="Bulk" className="text-szPrimary500" />, label: "Rules and Memos" },
        { id: "announcements", icon: <Calendar variant="Bulk" className="text-szPrimary500" />, label: "Announcements" },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center bg-szGrey150">
            <Header />
            <div className="w-full flex items-start p-7">
                <SideMenu menuItems={menuItems} selected={selected} setSelected={setSelected}>
                    {selected === "dashboard" && <Dashboard2 />}
                    {selected === "personal" && <div>Personal Content</div>}
                    {/* Add more as needed */}
                </SideMenu>
            </div>
        </div>
    );
};

export default Dashboard;

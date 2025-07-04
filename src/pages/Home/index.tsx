import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Header, SideMenu } from "enterprisze-global-components";
import { Outlet } from "react-router-dom";
import { Diagram, Element3, Notification, People, ProgrammingArrows, Setting2, User } from "iconsax-reactjs";

const Home = () => {
    const [selected, setSelected] = useState("1");
    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        {
            id: "1",
            icon: <Element3 variant="Bulk" className={selected === "1" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Dashboard",
            url: "dashboard",
        },
        {
            id: "2",
            icon: <User variant="Bulk" className={selected === "2" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Employees",
            url: "employees",
        },
        {
            id: "3",
            icon: <People variant="Bulk" className={selected === "3" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Teams",
            url: "teams",
        },
        {
            id: "4",
            icon: <Notification variant="Bulk" className={selected === "4" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Notifications",
            url: "notifications",
        },
        {
            id: "5",
            icon: <Diagram variant="Bulk" className={selected === "5" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Analytics & Report",
            url: "analytics-and-report",
        },
        {
            id: "6",
            icon: <ProgrammingArrows variant="Bulk" className={selected === "6" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Employee Transition",
            url: "employee-transition",
        },
        {
            id: "7",
            icon: <Setting2 variant="Bulk" className={selected === "7" ? "text-szPrimary100" : "text-szPrimary500"} />,
            label: "Settings",
            url: "settings",
        },
    ];

    const handleMenuSelect = (id: string) => {
        setSelected(id);
        const selectedMenu = menu.find((item) => item.id === id);
        if (selectedMenu) {
            navigate(`/home/${selectedMenu.url}`);
        }
    };

    useEffect(() => {
        // Get the current path after "/home/"
        const pathSegments = location.pathname.split("/"); // Split the path into segments
        const currentPath = pathSegments[2]; // Get the segment after "/home/"

        // Check if the current path is empty, which means the user is at "/home"
        if (!currentPath) {
            navigate("/home/dashboard");
            return; // Exit early since we are navigating
        }

        // Find the selected menu item based on the current path
        const selectedMenu = menu.find((item) => item.url === currentPath);
        if (selectedMenu) {
            setSelected(selectedMenu.id);
        }
    }, [location, menu, navigate]);

    return (
        <div className="flex flex-col w-full h-screen bg-[#F0F1F4] overflow-auto overflow-x-hidden">
            <Header text={"HRMSZ"} />
            <div className="flex-1 px-7 py-8">
                <SideMenu menuItems={menu} selected={selected} setSelected={handleMenuSelect}>
                    <div className="flex h-full ">
                        <div className="inline-block w-5"></div>
                        <div className="flex-1 inline-block w-[calc(100%-1.25rem)]">
                            <Outlet />
                        </div>
                    </div>
                </SideMenu>
            </div>
        </div>
    );
};

export default Home;

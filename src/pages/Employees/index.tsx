import { SideMenuWithProfile } from "enterprisze-global-components";
import {
    Briefcase,
    Calendar,
    Clipboard,
    DocumentCopy,
    Personalcard,
    ReceiptText,
    Wallet1,
} from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Employees = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems: {
        id: string;
        icon: React.ReactNode;
        label: string;
        url: string;
    }[] = [
        {
            id: "summary",
            icon: <Clipboard />,
            label: "Summary",
            url: "summary",
        },
        {
            id: "personal",
            icon: <Personalcard />,
            label: "Personal",
            url: "personal",
        },
        {
            id: "documents",
            icon: <DocumentCopy />,
            label: "Documents",
            url: "documents",
        },
        { id: "work", icon: <Briefcase />, label: "Work", url: "work" },
        { id: "log", icon: <Calendar />, label: "Logs", url: "log" },
        {
            id: "compensation",
            icon: <Wallet1 />,
            label: "Compensation",
            url: "compensation",
        },
        {
            id: "payslip",
            icon: <ReceiptText />,
            label: "Payslip",
            url: "payslip",
        },

        // {
        //     id: "hoof-trails",
        //     icon: <Hoof pt />,
        //     label: "Hoof Trails",
        //     url: "hoof-trails",
        // },
    ];

    const [selected, setSelected] = useState("summary");
    const currentPath = location.pathname.split("/").pop();

    const user = {
        name: "John Smith B. Fernandez",
        role: "Junior Developer",
        department: "Business Innovations & Solutions",
    };

    const handleMenuSelect = (id: string) => {
        setSelected(id);
        const selectedMenu = menuItems.find((item) => item.id === id);
        if (selectedMenu) {
            navigate(`${selectedMenu.url}`);
        }
    };

    useEffect(() => {
        // Get the current path
        const currentPath = location.pathname; // e.g., "/home/employees/documents"

        // Check if the path starts with "/home/employees/"
        if (currentPath.startsWith("/home/employees/")) {
            // Extract the sub-route after "/home/employees/"
            const subRoute = currentPath.split("/").pop(); // Get the last segment

            // Find the selected menu item based on the sub-route
            const selectedMenu = menuItems.find(
                (item) => item.url === subRoute
            );
            if (selectedMenu) {
                setSelected(selectedMenu.id); // Set the selected state
            } else {
                navigate(""); // Redirect to root if no valid route is found
            }
        }
    }, [location, menuItems, navigate]);

    return (
        <div className="h-full">
            {currentPath === "employees" ? (
                <Outlet />
            ) : (
                <SideMenuWithProfile
                    user={user}
                    menuItems={menuItems}
                    selected={selected}
                    setSelected={handleMenuSelect}
                >
                    <Outlet />
                </SideMenuWithProfile>
            )}
        </div>
    );
};

export default Employees;

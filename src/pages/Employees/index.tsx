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
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const employeeIdIndex =
            pathSegments.findIndex((segment) => segment === "employees") + 1;
        const employeeId = pathSegments[employeeIdIndex];
        const nextSegment = pathSegments[employeeIdIndex + 1];

        if (!employeeId) return;

        if (!nextSegment) {
            // No route after employee ID → redirect to summary
            navigate(`/home/employees/${employeeId}/summary`, {
                replace: true,
            });
            return;
        }

        const matchedMenu = menuItems.find((item) => item.url === nextSegment);
        if (matchedMenu) {
            setSelected(matchedMenu.id);
        }

        // else {
        //     // Not a valid menu route → redirect to summary
        //     navigate(`/home/employees/${employeeId}/summary`, {
        //         replace: true,
        //     });
        // }
    }, [location.pathname, navigate]);

    return (
            <SideMenuWithProfile
                user={user}
                menuItems={menuItems}
                selected={selected}
                setSelected={handleMenuSelect}
            >
                <div className=" h-full">
                    <Outlet />
                </div>
            </SideMenuWithProfile>
    );
};

export default Employees;

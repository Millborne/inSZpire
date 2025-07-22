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
import { useSummaryService } from "../../services/employee-profile/summary/use-summary";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";

const Employees = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Employee RTK State
    const selectedEmployee = useSelector(
        (state: RootState) => state.employeeState.selectedEmployee
    );
    const { getByIdView } = useSummaryService();

    const menuItems: {
        id: string;
        label: string;
        url: string;
        icon: React.ReactNode;
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

    // const user = {
    //     name: "John Smith B. Fernandez",
    //     role: "Junior Developer",
    //     department: "Business Innovations & Solutions",
    // };

    const [user, setUser] = useState<{
        name: string;
        role: string;
        department: string;
    } | null>(null);

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

    // Get employee ID from URL params
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const employeeIdIndex =
        pathSegments.findIndex((segment) => segment === "employees") + 1;
    const employeeId = pathSegments[employeeIdIndex];

    // Removed employee data fetching - using fallback data instead
    // useEffect(() => {
    //     const fetchEmployeeData = async () => {
    //         try {
    //             const result = await getByIdView({ employeeId: employeeId });

    //             if (result.data) {
    //                let userData = {
    //                    name: `${result.data.data.first_name} ${result.data.data.middle_name[0]}. ${result.data.data.last_name}`,
    //                    role: result.data.data.position_name,
    //                    department: result.data.data.team_name,
    //                };
    //                setUser(userData);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching employee data:", error);
    //         }
    //     };

    //     if (employeeId) {
    //         fetchEmployeeData();
    //     }
    // }, [employeeId, getByIdView]);
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                if (!selectedEmployee?.employee_ID) return;
                const result = await getByIdView({
                    employeeId: selectedEmployee.employee_ID,
                });

                if (result.data) {
                    let userData = {
                        name: `${result.data.data.first_name} ${result.data.data.middle_name[0]}. ${result.data.data.last_name}`,
                        role: result.data.data.position_name,
                        department: result.data.data.team_name,
                    };
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        if (selectedEmployee) {
            fetchEmployeeData();
        } else {
            navigate("/home/employees");
        }
    }, [selectedEmployee]); // Removed getByIdView from dependencies to prevent infinite loop

    return (
        user && (
            <SideMenuWithProfile
                user={
                    selectedEmployee && user
                        ? user
                        : {
                              name: "John Smith B. Fernandez",
                              role: "Junior Developer",
                              department: "Business Innovations & Solutions",
                          }
                }
                menuItems={menuItems}
                selected={selected}
                setSelected={handleMenuSelect}
                backgroundColor="bg-[#FFFFFF]"
            >
                <div className=" h-full">
                    <Outlet />
                </div>
            </SideMenuWithProfile>
        )
    );
};

export default Employees;

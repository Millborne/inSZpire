import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { SidebarMenu } from "enterprisze-global-components";

export const SidebarContext = createContext({
    isSidebarOpen: false,
    toggleSidebar: () => {},
    // closeSidebar: () => {},
});

const SecuritySettings = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);
    const [selected, setSelected] = useState("security-configuration");
    const isLargeScreen = window.innerWidth >= 768;

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const sidebarMenuItems = [
        {
            id: "security-configuration",
            label: "Security Configuration",
            url: "security-configuration",
            display: true,
        },
        {
            id: "2-factor-authentication",
            label: "2FA",
            url: "2-factor-authentication",
            display: true,
        },
        {
            id: "active-session-management",
            label: "Active Session Management",
            url: "active-session-management",
            display: true,
        },
        {
            id: "data-privacy",
            label: "Data Privacy",
            url: "data-privacy",
            display: true,
        },
        {
            id: "email-verification",
            label: "Email Verification",
            url: "email-verification",
            display: true,
        },
        {
            id: "hoof-trail",
            label: "Hoof Trails",
            url: "hoof-trail",
            display: true,
        },
    ];

    const handleMenuSelect = (id: string) => {
        setSelected(id);
        const selectedMenu = sidebarMenuItems.find((item) => item.id === id);
        if (selectedMenu) {
            navigate(`${selectedMenu.url}`);
        }
        if (!isLargeScreen) {
            toggleSidebar(); //
        }
    };

    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        // First, try to find an exact match
        const exactMatch = sidebarMenuItems.find((item) => item.url === lastSegment);

        if (exactMatch) {
            setSelected(exactMatch.id);
            return;
        }

        // If no exact match, try to find a parent route
        const parentMatch = sidebarMenuItems.find((item) => {
            return location.pathname.includes(`/security-settings/${item.url}`);
        });

        if (parentMatch) {
            setSelected(parentMatch.id);
            return;
        }

        // If still no match, find the first visible menu item as fallback
        const fallbackMenu = sidebarMenuItems.find((item) => item.display !== false);

        if (fallbackMenu) {
            setSelected(fallbackMenu.id);
            navigate(fallbackMenu.url, { replace: true });
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        const handleResize = () => {
            const isLarge = window.innerWidth >= 768;
            setSidebarVisible(isLarge);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // }, [sidebarVisible]);
    }, []);
    return (
        <>
            <SidebarContext.Provider value={{ isSidebarOpen: sidebarVisible, toggleSidebar }}>
                <section className="relative flex h-full w-full">
                    {/* Sidebar for lg and up */}

                    {isLargeScreen && (
                        <div className="relative flex h-full">
                            <SidebarMenu
                                sidebarMenuItems={sidebarMenuItems.filter((item) => item.display !== false)}
                                selected={selected}
                                setSelected={handleMenuSelect}
                                onToggleSidebar={toggleSidebar}
                                title="Setting Configuration"
                            />
                        </div>
                    )}

                    {/* Sidebar overlay for md and down */}
                    {!isLargeScreen && sidebarVisible && (
                        <>
                            <div className="fixed inset-0 z-40 bg-opacity-40" onClick={toggleSidebar} />
                            <div
                                className="absolute top-0 left-0  w-[200px] z-50 bg-szPrimary900 rounded-l-2xl shadow-lg overflow-y-auto h-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <SidebarMenu
                                    sidebarMenuItems={sidebarMenuItems}
                                    selected={selected}
                                    setSelected={handleMenuSelect}
                                    onToggleSidebar={toggleSidebar}
                                    title="Setting Configuration"
                                />
                            </div>
                        </>
                    )}
                    {/* Main content always present */}
                    <div className="flex-1 overflow-y-auto z-0 md:bg-[#F9F9F9] md:p-[24px]">
                        <Outlet />
                    </div>
                </section>
            </SidebarContext.Provider>
        </>
    );
};

export default SecuritySettings;

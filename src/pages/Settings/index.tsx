import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { SidebarMenu } from "enterprisze-global-components";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  // closeSidebar: () => {},
});

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [selected, setSelected] = useState("accounts");
  const isLargeScreen = window.innerWidth >= 768;

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const sidebarMenuItems = [
    {
      id: "accounts",
      label: "Accounts",
      url: "accounts",
    },
    {
      id: "tags",
      label: "Tags",
      url: "tags",
    },
    {
      id: "positions",
      label: "Positions",
      url: "positions",
    },
    {
      id: "job-title",
      label: "Job Title",
      url: "job-title",
    },
    // {
    //     id: "fields",
    //     label: "Fields",
    //     url: "fields",
    // },
    // {
    //     id: "resolution-center",
    //     label: "Resolution Center",
    //     url: "resolution-center",
    // },
    // {
    //     id: "request-approval-settings",
    //     label: "Request Approval Settings",
    //     url: "request-approval-settings",
    // },
    // {
    //     id: "in-szpire-access",
    //     label: "inSZpire Access",
    //     url: "in-szpire-access",
    // },
    // {
    //     id: "hoof-trail",
    //     label: "Hoof Trail",
    //     url: "hoof-trail",
    // },
  ];

  const handleMenuSelect = (id: string) => {
    setSelected(id);
    const selectedMenu = sidebarMenuItems.find((item) => item.id === id);
    if (selectedMenu) {
      navigate(`${selectedMenu.url}`);
    }
    if (!isLargeScreen) {
      toggleSidebar(); // 👈 Close overlay on mobile
    }
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Check if we're on any archived route (archived-accounts, archived-tags, etc.)
    const archivedSegment = pathSegments.find((segment) =>
      segment.startsWith("archived-")
    );
    if (archivedSegment) {
      const baseRoute = archivedSegment.replace("archived-", "");
      const matchedMenu = sidebarMenuItems.find(
        (item) => item.url === baseRoute
      );
      if (matchedMenu) {
        setSelected(matchedMenu.id);
        return;
      }
    }

    const lastSegment = pathSegments[pathSegments.length - 1];

    const matchedMenu = sidebarMenuItems.find(
      (item) => item.url === lastSegment
    );

    if (matchedMenu) {
      setSelected(matchedMenu.id);
    } else {
      // fallback to accounts if route is invalid
      navigate("accounts", { replace: true });
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
      <SidebarContext.Provider
        value={{ isSidebarOpen: sidebarVisible, toggleSidebar }}
      >
        <section className="relative flex h-full w-full">
          {/* Sidebar for lg and up */}

          {isLargeScreen && (
            <div className="relative flex h-full">
              <SidebarMenu
                sidebarMenuItems={sidebarMenuItems}
                selected={selected}
                setSelected={handleMenuSelect}
                onToggleSidebar={toggleSidebar}
              />
            </div>
          )}

          {/* Sidebar overlay for md and down */}
          {!isLargeScreen && sidebarVisible && (
            <>
              <div
                className="fixed inset-0 z-40 bg-opacity-40"
                onClick={toggleSidebar}
              />
              <div
                className="absolute top-0 left-0  w-[200px] z-50 bg-szPrimary900 rounded-l-2xl shadow-lg overflow-y-auto h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarMenu
                  sidebarMenuItems={sidebarMenuItems}
                  selected={selected}
                  setSelected={setSelected}
                  onToggleSidebar={toggleSidebar}
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

export default Settings;

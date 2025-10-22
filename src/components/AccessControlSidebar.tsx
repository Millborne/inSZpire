import React, { useState } from "react";
import AccessRoleIconPagesFeatures from "../assets/AccessRoleIconPagesFeatures.svg";
import AccessRoleIconProfileFields from "../assets/AccessRoleIconProfileFields.svg";
import {
    UserOctagon,
    ArrowLeft2,
    SearchNormal1,
    Add,
    InfoCircle,
    ArrowDown2,
    Profile2User,
    People,
    Eye,
    ArrowRight2,
} from "iconsax-react";
import { Button, DropdownMenu, Inputs } from "enterprisze-global-components";

interface AccessControlSidebarProps {
    page: "pages-features" | "profile-fields";
}

const AccessControlSidebar: React.FC<AccessControlSidebarProps> = ({
    page = "pages-features",
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedOption, setSelectedOption] = useState<
        "Role" | "Users" | "Teams"
    >(page === "pages-features" ? "Role" : "Users");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const roles = [
        "Super Admin",
        "Admin",
        "Editor",
        "Viewer",
        "Contributor",
        "Moderator",
        "Analyst",
        "Designer",
        "Developer",
        "Product Owner",
        "Quality Assurance",
        "Support",
    ];

    const users = [
        "John Doe",
        "Jane Smith",
        "Michael Johnson",
        "Emily Davis",
        "David Wilson",
        "Sarah Brown",
        "James Taylor",
        "Emma Martinez",
        "Robert Anderson",
        "Lisa Thomas",
        "William Garcia",
        "Jennifer Rodriguez",
    ];

    const teams = [
        "Engineering",
        "Product",
        "Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Human Resources",
        "Finance",
        "Operations",
        "Legal",
        "Research & Development",
        "Quality Assurance",
    ];

    const getCurrentList = () => {
        switch (selectedOption) {
            case "Role":
                return roles;
            case "Users":
                return users;
            case "Teams":
                return teams;
        }
    };

    const filteredItems = getCurrentList().filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleCollapse = () => {
        setIsDropdownOpen(false);
        setIsCollapsed(!isCollapsed);
    };

    const handleOptionSelect = (option: "Role" | "Users" | "Teams") => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        setSearchQuery(""); // Clear search when switching options
        setSelectedRole(null); // Clear selection when switching
    };

    const getSearchPlaceholder = () => {
        switch (selectedOption) {
            case "Role":
                return "Search Roles";
            case "Users":
                return "Search Users";
            case "Teams":
                return "Search Teams";
        }
    };

    return (
        <div
            className={`${
                isCollapsed ? "w-[60px] flex items-center" : "w-[232px]"
            } h-[574px] bg-white py-2 rounded-2xl shadow-lg flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 mb-2 min-w-[60px] relative">
                <div
                    className={`flex items-center gap-2 ${
                        isCollapsed && "flex-col justify-center"
                    }`}
                >
                    {isCollapsed && (
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={toggleCollapse}
                        >
                            <ArrowRight2 size={20} />
                        </button>
                    )}
                    {page === "pages-features" ? (
                        <img
                            src={AccessRoleIconPagesFeatures}
                            alt="Access Role Icon"
                            className="w-6 h-6 hover:cursor-pointer"
                            onClick={toggleCollapse}
                        />
                    ) : (
                        <img
                            src={AccessRoleIconProfileFields}
                            alt="Access Role Icon"
                            className="w-6 h-6 hover:cursor-pointer"
                            onClick={toggleCollapse}
                        />
                    )}
                    {!isCollapsed && (
                        <div className="relative w-fit ">
                            <button
                                className={`flex items-center justify-between w-fit px-3 py-2 border border-[1px] border-szGrey200 rounded-[23px] bg-white gap-[8px]`}
                                onClick={() =>
                                    setIsDropdownOpen((open) => !open)
                                }
                            >
                                <span className="flex items-center gap-2">
                                    <p className="text-body-small-reg text-szPrimary500 min-w-[50px]">
                                        {selectedOption}
                                    </p>
                                </span>
                                <ArrowDown2
                                    className="icon-sm"
                                    color="#292D32"
                                />
                            </button>
                            {isDropdownOpen &&
                                (page === "pages-features" ? (
                                    <DropdownMenu
                                        items={[
                                            {
                                                label: "Role",
                                                onClick: () =>
                                                    handleOptionSelect("Role"),
                                            },
                                            {
                                                label: "Users",
                                                onClick: () =>
                                                    handleOptionSelect("Users"),
                                            },
                                            {
                                                label: "Teams",
                                                onClick: () =>
                                                    handleOptionSelect("Teams"),
                                            },
                                        ]}
                                        className="absolute left-0 mt-1 w-full"
                                    />
                                ) : (
                                    <DropdownMenu
                                        items={[
                                            {
                                                label: "Users",
                                                onClick: () =>
                                                    handleOptionSelect("Users"),
                                            },
                                            {
                                                label: "Teams",
                                                onClick: () =>
                                                    handleOptionSelect("Teams"),
                                            },
                                        ]}
                                        className="absolute left-0 mt-1 w-full"
                                    />
                                ))}
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={toggleCollapse}
                    >
                        <ArrowLeft2 size={20} />
                    </button>
                )}
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-2 px-1 mb-2">
                    {/* Search Input */}
                    <div className="relative">
                        <Inputs
                            type={"text"}
                            placeholder={getSearchPlaceholder()}
                            value={searchQuery}
                            icon={SearchNormal1}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {page === "pages-features" ? (
                        selectedOption === "Role" && (
                            <Button
                                leftIcon={<Add variant="Linear" />}
                                label="New Role"
                                variant="primary"
                                size="small"
                            />
                        )
                    ) : (
                        <Button
                            leftIcon={<Add variant="Linear" />}
                            label="New Permission"
                            variant="primary"
                            size="small"
                        />
                    )}
                </div>
            )}
            {/* Items List */}
            {!isCollapsed && (
                <div className="flex-1 overflow-y-auto pb-2">
                    <div className="space-y-1">
                        {filteredItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => setSelectedRole(item)}
                                className={`w-full flex items-center gap-1 py-2 px-3 text-left transition-colors ${
                                    selectedRole === item
                                        ? "bg-szPrimary900 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {selectedOption === "Role" && (
                                    <InfoCircle
                                        size={18}
                                        className={
                                            selectedRole === item
                                                ? "text-white"
                                                : "text-gray-600"
                                        }
                                    />
                                )}
                                <span className="text-sm">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessControlSidebar;

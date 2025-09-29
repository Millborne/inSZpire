import { useContext, useState } from "react";
import { Unlock, HamburgerMenu, TickCircle, UserOctagon, SearchNormal, Edit2, ArchiveBox } from "iconsax-reactjs";
import { CardContainer, Dropdown, Inputs, Option, Pagination, Table, HeaderType, Toggle, Avatar } from "enterprisze-global-components";
import { SidebarContext } from "..";
import profile from "../../../assets/noAvatar.png";

//icons

const TwoFactorAuthentication = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [toggle, setToggle] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState("authenticator");

    // const navigate = useNavigate();

    const options = [
        { label: "Authenticator", value: "authenticator" },
        { label: "Email", value: "email" },
    ];

    const handleSelectionChange = (selected: Option | Option[]) => {
        setSelectedMethod(selected.value);
    };

    const setSearchTerm: (arg0: string) => void = (string) => {
        throw new Error("Function not implemented.");
    };

    const setCurrentPage: (arg0: number) => void = (number) => {
        throw new Error("Function not implemented.");
    };

    const headers: HeaderType[] = [
        {
            type: "string",
            header: "Full Name",
            accessor: "fullName",
        },
        { type: "string", header: "2FA Method", accessor: "twofaMethod" },
        { type: "string", header: "Registered Email", accessor: "registeredEmail" },
        { type: "string", header: "Last Updated", accessor: "lastUpdated" },
    ];

    const data = [
        {
            fullName: (
                <div className="flex flex-row items-center gap-2">
                    <Avatar size="xsmall" src={profile} />
                    <div className="flex flex-col">
                        <p className="text-body-small-strong">Pangilinan, Maria Alma Angela</p>
                        <p className="text-caption-all-caps text-szGrey500 uppercase">Business Solutions & Innovations</p>
                    </div>
                </div>
            ),
            twofaMethod: "Authenticator",
            registeredEmail: "pangilinan.mariaalmaangela@supportzebra.com",
            lastUpdated: "Dec 12, 2023 03:26:00",
        },
        {
            fullName: (
                <div className="flex flex-row items-center gap-2">
                    <Avatar size="xsmall" src={profile} />
                    <div className="flex flex-col">
                        <p className="text-body-small-strong">Maria, Maria Alma Angela</p>
                        <p className="text-caption-all-caps text-szGrey500 uppercase">Business Solutions & Innovations</p>
                    </div>
                </div>
            ),
            twofaMethod: "Authenticator",
            registeredEmail: "pangilinan.mariaalmaangela@supportzebra.com",
            lastUpdated: "Dec 12, 2023 03:26:00",
        },
        {
            fullName: (
                <div className="flex flex-row items-center gap-2">
                    <Avatar size="xsmall" src={profile} />
                    <div className="flex flex-col">
                        <p className="text-body-small-strong">Alma, Maria Alma Angela</p>
                        <p className="text-caption-all-caps text-szGrey500 uppercase">Business Solutions & Innovations</p>
                    </div>
                </div>
            ),
            twofaMethod: "Authenticator",
            registeredEmail: "pangilinan.mariaalmaangela@supportzebra.com",
            lastUpdated: "Dec 12, 2023 03:26:00",
        },
    ];

    const moreOptions = [
        {
            icon: <Edit2 />,
            label: "Edit Account",
            onClick: (index: number) => console.log("Edit row:", index),
        },
        { icon: <ArchiveBox />, label: "Archive Account", onClick: (index: number) => console.log("Delete row:", index) },
    ];

    const handleRowClick = (rowIndex: number) => {
        console.log("Row clicked:", rowIndex);
    };

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-[8px]">
                                <HamburgerMenu className="text-szPrimary700 cursor-pointer block md:hidden" onClick={toggleSidebar} />
                                <Unlock className="text-szSecondary500" />
                                <h6 className="text-h6 text-szPrimary700 font-montserrat">Two-Factor Authentication (2FA) </h6>
                            </div>
                            <p className="text-body-base-reg text-szDarkGrey600">
                                Enable/Disable 2FA in all accounts and select the preferred method for enhance security
                            </p>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between items-center">
                                <div className="flex flex-row gap-[8px] items-center">
                                    <div>
                                        <TickCircle className="text-success700" />
                                    </div>
                                    <div>
                                        <p className="text-body-small-strong">2FA Status</p>
                                        <p className="text-caption-reg text-szDarkGrey600">Two-factor authentication is enabled</p>
                                    </div>
                                </div>
                                <div>
                                    <Toggle
                                        isOn={toggle}
                                        onToggle={() => {
                                            setToggle(!toggle);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between">
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong">Preferred Method</p>
                                    <p className="text-caption-reg text-szDarkGrey600">
                                        {selectedMethod === "authenticator"
                                            ? "Ensure Authenticator is deployed organization-wide."
                                            : "Email as default 2FA"}
                                    </p>
                                </div>
                                <div className="w-[150px]">
                                    <Dropdown
                                        label=""
                                        placeholder={options[0].label}
                                        options={options}
                                        onSelectionChange={handleSelectionChange}
                                        size="small"
                                        usePortal={true}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex flex-row gap-[8px]">
                                    <UserOctagon className="text-szSecondary500" />
                                    <h6 className="text-h6 text-szPrimary700 font-montserrat">Verified Employee</h6>
                                </div>
                                <p className="text-body-base-reg text-szDarkGrey600">List of employees and their 2FA method</p>
                            </div>
                            <div className="w-full">
                                <Inputs
                                    placeholder="Search by Name or Team"
                                    icon={SearchNormal}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <Table
                            headers={headers}
                            data={data}
                            moreOptions={moreOptions}
                            tableHeight="h-[500px]"
                            onRowClick={handleRowClick}
                        />

                        <section className="flex justify-end">
                            <Pagination
                                currentPage={1}
                                totalPages={Math.ceil(totalCount / 10)}
                                visiblePages={3}
                                onChange={handlePageChange}
                            />
                        </section>
                    </div>
                }
            />
        </>
    );
};

export default TwoFactorAuthentication;

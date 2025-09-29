import { useContext, useState } from "react";
import { Clock, HamburgerMenu, SearchNormal, Edit2, ArchiveBox, CloseCircle } from "iconsax-reactjs";
import { CardContainer, Inputs, Pagination, Table, HeaderType, Avatar } from "enterprisze-global-components";
import { SidebarContext } from "..";
import profile from "../../../assets/noAvatar.png";

//icons

const ActiveSessionManagement = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [totalCount, setTotalCount] = useState(0);

    // const navigate = useNavigate();

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
        { type: "string", header: "IP Address", accessor: "ipAddress" },
        { type: "string", header: "Location", accessor: "location" },
        { type: "string", header: "Device", accessor: "device" },
        { type: "string", header: "Last Active", accessor: "lastActive" },
        { type: "string", header: "", accessor: "close" },
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
            ipAddress: "192.168.1.1",
            location: "CAGAYAN DE ORO, PHL",
            device: "chrome/5.0 (windows nt 10.0; Win64; x64)",
            lastActive: "Dec 12, 2023 03:26:00",
            close: <CloseCircle className="text-error700" />,
        },
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
            ipAddress: "192.168.1.1",
            location: "CAGAYAN DE ORO, PHL",
            device: "chrome/5.0 (windows nt 10.0; Win64; x64)",
            lastActive: "Dec 12, 2023 03:26:00",
            close: <CloseCircle className="text-error700" />,
        },
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
            ipAddress: "192.168.1.1",
            location: "CAGAYAN DE ORO, PHL",
            device: "chrome/5.0 (windows nt 10.0; Win64; x64)",
            lastActive: "Dec 12, 2023 03:26:00",
            close: <CloseCircle className="text-error700" />,
        },
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
            ipAddress: "192.168.1.1",
            location: "CAGAYAN DE ORO, PHL",
            device: "chrome/5.0 (windows nt 10.0; Win64; x64)",
            lastActive: "Dec 12, 2023 03:26:00",
            close: <CloseCircle className="text-error700" />,
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
                                <Clock className="text-szSecondary500" />
                                <h6 className="text-h6 text-szPrimary700 font-montserrat">Active Session Management</h6>
                            </div>
                            <p className="text-body-base-reg text-szDarkGrey600">
                                Manage current sessions. Users can view and terminate their sessions. Admins can see all. 
                            </p>
                        </div>
                        <div className="flex flex-col gap-[16px]">
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

export default ActiveSessionManagement;

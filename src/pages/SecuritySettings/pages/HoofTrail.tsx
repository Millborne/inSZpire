import { useContext, useState } from "react";
import { HamburgerMenu, SearchNormal, Edit2, ArchiveBox } from "iconsax-reactjs";
import { CardContainer, Inputs, Pagination, Table, HeaderType } from "enterprisze-global-components";
import { SidebarContext } from "..";
import hoofTrails from "../../../assets/Hoofprints.svg";

//icons

const fullName = "Michael Sanchez";
const action = "Max Failed Login Attempts";
const oldValue = "5";
const newValue = "10";

const HoofTrail = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [totalCount, setTotalCount] = useState(0);

    // const navigate = useNavigate();

    const setSearchTerm: (arg0: string) => void = () => {
        throw new Error("Function not implemented.");
    };

    const setCurrentPage: (arg0: number) => void = () => {
        throw new Error("Function not implemented.");
    };

    const headers: HeaderType[] = [
        {
            type: "string",
            header: "Activity",
            accessor: "activity",
        },
        { type: "string", header: "Details", accessor: "details" },
        { type: "string", header: "Date", accessor: "date" },
    ];

    const data = [
        {
            activity: "CONFIGURATION",
            details: (
                <span>
                    <span className="text-szSecondary700">{fullName}</span> updated the <span className="text-greenText">{action}</span>{" "}
                    from <span className="text-error700">{oldValue}</span> to <span className="text-error700">{newValue}</span>
                </span>
            ),
            date: "Sep 06, 2025 10:21:51 AM",
        },
        {
            activity: "CONFIGURATION",
            details: (
                <span>
                    <span className="text-szSecondary700">{fullName}</span> updated the <span className="text-greenText">{action}</span>{" "}
                    from <span className="text-error700">{oldValue}</span> to <span className="text-error700">{newValue}</span>
                </span>
            ),
            date: "Sep 06, 2025 10:21:51 AM",
        },
        {
            activity: "CONFIGURATION",
            details: (
                <span>
                    <span className="text-szSecondary700">{fullName}</span> updated the <span className="text-greenText">{action}</span>{" "}
                    from <span className="text-error700">{oldValue}</span> to <span className="text-error700">{newValue}</span>
                </span>
            ),
            date: "Sep 06, 2025 10:21:51 AM",
        },
        {
            activity: "CONFIGURATION",
            details: (
                <span>
                    <span className="text-szSecondary700">{fullName}</span> updated the <span className="text-greenText">{action}</span>{" "}
                    from <span className="text-error700">{oldValue}</span> to <span className="text-error700">{newValue}</span>
                </span>
            ),
            date: "Sep 06, 2025 10:21:51 AM",
        },
        {
            activity: "CONFIGURATION",
            details: (
                <span>
                    <span className="text-szSecondary700">{fullName}</span> updated the <span className="text-greenText">{action}</span>{" "}
                    from <span className="text-error700">{oldValue}</span> to <span className="text-error700">{newValue}</span>
                </span>
            ),
            date: "Sep 06, 2025 10:21:51 AM",
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
                                <img src={hoofTrails} alt="Hoof Trails" className="text-szSecondary500" />
                                <h6 className="text-h6 text-szPrimary700 font-montserrat">Hoof Trails (Security Setting)</h6>
                            </div>
                            <p className="text-body-base-reg text-szDarkGrey600">
                                All Activities and Changes made within the Security Settings.
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

export default HoofTrail;

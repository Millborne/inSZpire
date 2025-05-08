import { useState, useEffect } from "react";
import { ArrowDown2, ArrowUp2, Airplane, Flash, Rank, Calendar, Profile2User, ArrowUp, Radar2 } from "iconsax-react";

// quick access
import ExpenSZReport from "../../../assets/expensz_report.png";
import RequestApproved from "../../../assets/request_approvedd.png";
import RequestLeave from "../../../assets/request_leave.png";

// global components
import { CardContainer } from "enterprisze-global-components";

const Dashboard2 = () => {
    const [showAll, setShowAll] = useState(false);
    const [columns, setColumns] = useState(1);

    // team highlights
    const teamMembers = [
        { id: 1, name: "James David", score: "89,911" },
        { id: 2, name: "Donald Duckies", score: "85,911" },
        { id: 3, name: "James David", score: "89,911" },
        { id: 4, name: "Donald Duckies", score: "85,911" },
        { id: 5, name: "Bob Marley", score: "77,300" },
    ];

    const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 4);

    useEffect(() => {
        const updateColumns = () => {
            setColumns(window.innerWidth >= 768 ? 2 : 1);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // quick access
    const quickAccessItems = [
        { img: ExpenSZReport, text: "EXPENSZ REPORT" },
        { img: RequestLeave, text: "REQUEST APPROVED" },
        { img: RequestApproved, text: "FEEDBACK" },
    ];

    // your calendar
    const events = [
        {
            date: "FEB 10 TUE",
            time: "10:00 AM - 10:30 AM",
            title: "Scrum Meeting",
            organizer: "Alex Simon Dacer",
        },
        {
            date: "FEB 11 WED",
            time: "1:00 PM - 1:45 PM",
            title: "Project Sync",
            organizer: "Maria Johnson",
        },
    ];

    // timely suggestion
    const leaveRequests = [
        {
            id: 1,
            icon: <Airplane />,
            title: "You have an upcoming Vacation Leave",
            date: "January 12, 2025",
            link: "Check your approval",
        },
        {
            id: 2,
            icon: <Airplane />,
            title: "Your sick leave is approved",
            date: "February 5, 2025",
            link: "View details",
        },
    ];

    return (
        <div className="flex flex-col gap-6 mx-5">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                <CardContainer
                    content={
                        <div>
                            <div className="flex justify-between">
                                <p className="text-h1">650</p>
                                <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                    <Profile2User className="text-szPrimary500" variant="Bold" />
                                </div>
                            </div>
                            <p className="text-body-small-strong">Total number of employees</p>
                            <div className="flex flex-row items-center gap-2">
                                <ArrowUp className="text-success700" />
                                <p className="text-caption-reg text-szGrey500">1% than last quarter</p>
                            </div>
                        </div>
                    }
                />
                <CardContainer
                    content={
                        <div>
                            <div className="flex justify-between">
                                <p className="text-h1">75%</p>
                                <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                    <Profile2User className="text-szPrimary500" variant="Bold" />
                                </div>
                            </div>
                            <p className="text-body-small-strong">Employee Turnover Rate</p>
                            <div className="flex flex-row items-center gap-2">
                                <ArrowUp className="text-error700" />
                                <p className="text-caption-reg text-szGrey500">1% than last quarter</p>
                            </div>
                        </div>
                    }
                />
                <CardContainer
                    content={
                        <div>
                            <div className="flex justify-between">
                                <p className="text-h1">650</p>
                                <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                    <Profile2User className="text-szPrimary500" variant="Bold" />
                                </div>
                            </div>
                            <p className="text-body-small-strong">Current Clients</p>
                            <div className="flex flex-row items-center gap-2">
                                <ArrowUp className="text-success700" />
                                <p className="text-caption-reg text-szGrey500">99% than last quarter</p>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <CardContainer
                        icon={<Radar2 variant="Bold" className="text-szSecondary500" />}
                        title="Team Highlights"
                        content={
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {displayedMembers.map((member, index) => {
                                        const row = Math.floor(index / columns);
                                        const col = index % columns;

                                        let bgClass = "";
                                        if (columns === 1) {
                                            bgClass = row % 2 === 0 ? "bg-szPrimary100" : "bg-szSecondary100";
                                        } else {
                                            bgClass =
                                                (col === 0 && row % 2 === 0) || (col === 1 && row % 2 !== 0)
                                                    ? "bg-szPrimary100"
                                                    : "bg-szSecondary100";
                                        }

                                        return (
                                            <div key={member.id} className={`flex flex-col ${bgClass} rounded-lg p-2 gap-2`}>
                                                <div className="rounded-lg">
                                                    <img
                                                        // src={profile}
                                                        className="rounded-lg w-full h-36 object-cover"
                                                        alt={member.name}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-body-small-reg">{member.name}</p>
                                                    <p className="text-caption-reg">{member.score}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-row items-center gap-2 pt-3" onClick={() => setShowAll(!showAll)}>
                                    {showAll ? (
                                        <>
                                            <ArrowUp2 />
                                            <p className="text-szPrimary700 text-body-base-strong">View Less</p>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowDown2 />
                                            <p className="text-szPrimary700 text-body-base-strong">View More</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        }
                    />
                    <CardContainer
                        icon={<Rank variant="Bold" className="text-szSecondary500" />}
                        title="Team Highlights"
                        content={
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {displayedMembers.map((member, index) => {
                                        const row = Math.floor(index / columns);
                                        const col = index % columns;

                                        let bgClass = "";
                                        if (columns === 1) {
                                            bgClass = row % 2 === 0 ? "bg-szPrimary100" : "bg-szSecondary100";
                                        } else {
                                            bgClass =
                                                (col === 0 && row % 2 === 0) || (col === 1 && row % 2 !== 0)
                                                    ? "bg-szPrimary100"
                                                    : "bg-szSecondary100";
                                        }

                                        return (
                                            <div key={member.id} className={`flex flex-col ${bgClass} rounded-lg p-2 gap-2`}>
                                                <div className="rounded-lg">
                                                    <img
                                                        // src={profile}
                                                        className="rounded-lg w-full h-36 object-cover"
                                                        alt={member.name}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-body-small-reg">{member.name}</p>
                                                    <p className="text-caption-reg">{member.score}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-row items-center gap-2 pt-3" onClick={() => setShowAll(!showAll)}>
                                    {showAll ? (
                                        <>
                                            <ArrowUp2 />
                                            <p className="text-szPrimary700 text-body-base-strong">View Less</p>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowDown2 />
                                            <p className="text-szPrimary700 text-body-base-strong">View More</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <CardContainer
                        icon={<Flash variant="Bulk" className="text-szSecondary500" />}
                        title="Quick Access"
                        content={
                            <div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                                    {quickAccessItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-szGrey150 flex flex-col items-center text-center px-5 py-4 rounded-2xl gap-1"
                                        >
                                            <img src={item.img} className="w-9 h-9" alt={item.text} />
                                            <p className="text-sm font-medium uppercase">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    />

                    <CardContainer
                        icon={<Calendar className="text-szSecondary500" />}
                        title="Your Calendar"
                        content={
                            <div>
                                {events.map((event, index) => (
                                    <div key={index} className="flex flex-wrap py-3 gap-3">
                                        <div className="rounded-md border border-szBlack900 min-w-40 px-3 gap-1">
                                            <p className="text-caption-all-caps">{event.date}</p>
                                            <p className="text-caption-reg">{event.time}</p>
                                        </div>
                                        <div>
                                            <p className="text-body-small-reg text-szPrimary700">{event.title}</p>
                                            <p className="text-body-small-reg text-szDarkGrey600">{event.organizer}</p>
                                        </div>
                                    </div>
                                ))}
                                <p className="text-body-base-strong text-szPrimary700 py-3 px-6">Go to Microsoft Teams Calendar</p>
                            </div>
                        }
                    />

                    <CardContainer
                        icon={<Calendar className="text-szSecondary500" />}
                        title="Timely Suggestion"
                        content={
                            <div>
                                {leaveRequests.map((leave, index) => (
                                    <div key={leave.id}>
                                        <div className="flex flex-row gap-3 py-3">
                                            <div className="rounded-full bg-szGrey150 w-11 h-11 flex justify-center items-center">
                                                {leave.icon}
                                            </div>
                                            <div className="w-full">
                                                <p className="text-body-small-strong">{leave.title}</p>
                                                <p className="text-caption-reg text-szLightGrey400">{leave.date}</p>
                                                <p className="flex justify-end text-caption-all-caps text-[#38B6FF]">{leave.link}</p>
                                            </div>
                                        </div>
                                        {index < leaveRequests.length - 1 && <hr className="border-szGrey150" />}
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;

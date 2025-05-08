import { useState, useEffect } from "react";
import { ArrowDown2, ArrowUp2, Airplane, Calendar, ArrowUp, ArrowSwapHorizontal, Add, ProfileAdd } from "iconsax-react";

// img
import profile from "../../assets/profile.jpg";
import Staff from "../../assets/Staff.svg";
import Vector from "../../assets/Vector.svg";
import Layer_1 from "../../assets/Layer_1.svg";
import Action from "../../assets/Action.svg";
import Calendar_1 from "../../assets/Calendar_1.svg";
import Feedback from "../../assets/Feedback.svg";
import Highlights from "../../assets/Highlights.svg";
import QuickTask from "../../assets/QuickTask.svg";
import ImportantDates from "../../assets/ImportantDates.svg";
import Suggestions from "../../assets/Suggestions.svg";

// global components
import { CardContainer } from "enterprisze-global-components";

const Dashboard = () => {
    const [showAll, setShowAll] = useState(false);
    const [columns, setColumns] = useState(1);

    // awaiting your action
    const awaitingAction = [
        {
            id: 1,
            img: <img src={Calendar_1} alt="calendar" />,
            title: "Time-off Request:",
            name: "Jane Ortega",
            type: "INBOX",
            time: "1 minute ago",
        },
        {
            id: 2,
            img: <img src={Feedback} alt="feedback" />,
            title: "Submit Feedback:",
            name: "Jane Soy Dora",
            type: "INBOX",
            time: "1 minute ago",
        },
    ];

    // my team
    const teamMembers = [
        { id: 1, profile: profile, name: "James David", score: "89,911" },
        { id: 2, profile: profile, name: "Donald Duckies", score: "85,911" },
        { id: 3, profile: profile, name: "James David", score: "89,911" },
        { id: 4, profile: profile, name: "Donald Duckies", score: "85,911" },
        { id: 5, profile: profile, name: "Bob Marley", score: "77,300" },
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

    // quick task
    const quickTasksItems = [
        {
            icon: <ArrowSwapHorizontal size={36} />,
            text: "Batch Transfer",
        },
        { icon: <Add size={36} />, text: "add team" },
        { icon: <ProfileAdd variant="Bulk" size={36} />, text: "add employee to team" },
    ];

    // important dates
    const importantDates = [
        {
            id: 1,
            date: "TODAY",
            title: "Vacation Leave for Admin (1-2 days)",
            organizer: "Jane Ortega",
        },
        {
            id: 2,
            date: "FEB 10",
            title: "EMS Planning and Prototyping",
            organizer: "Jane Ortega",
        },
        {
            id: 3,
            date: "FEB 17 - 18",
            title: "Daily Scrum",
            organizer: "BSI",
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
            link: "Schedule Now",
        },
    ];

    return (
        <div className="flex flex-col gap-6 mx-5">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                <CardContainer
                    content={
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="text-h1">650</p>
                                <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                    <img src={Staff} alt="first icon" />
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
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="text-h1">75%</p>
                                <div className="rounded-full bg-szSecondary50 w-12 h-12 flex justify-center items-center">
                                    <img src={Vector} alt="second icon" />
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
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="text-h1">650</p>
                                <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                    <img src={Layer_1} alt="third icon" />
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
                        icon={<img src={Action} alt="action" />}
                        title="Awaiting your action"
                        content={
                            <div>
                                {awaitingAction.map((awaiting, index) => (
                                    <div key={awaiting.id}>
                                        <div className="flex flex-row gap-3 py-3 ">
                                            <div className="rounded-full bg-szPrimary100 w-12 h-12 flex justify-center items-center">
                                                {awaiting.img}
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-body-small-strong flex flex-row">
                                                    {awaiting.title} {awaiting.name}
                                                </p>
                                                <p className="text-caption-all-caps uppercase gap-2 flex flex-row">
                                                    <span>{awaiting.type} </span>
                                                    <span className="text-szLightGrey400">{awaiting.time}</span>
                                                </p>
                                            </div>
                                        </div>
                                        {index < awaitingAction.length - 1 && <hr className="border-szGrey150" />}
                                    </div>
                                ))}
                            </div>
                        }
                    />

                    <CardContainer
                        icon={<img src={Highlights} alt="highlight" />}
                        title="My Team"
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
                                                        src={member.profile}
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
                        icon={<img src={QuickTask} alt="quick task" />}
                        title="Quick Tasks"
                        content={
                            <div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-10 py-4">
                                    {quickTasksItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-szPrimary100 flex flex-col items-center text-center px-2 py-4 rounded-2xl gap-1"
                                        >
                                            <span className="text-szPrimary500">{item.icon}</span>
                                            <p className="text-caption-all-caps uppercase">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    />

                    <CardContainer
                        icon={<img src={ImportantDates} alt="important dates" />}
                        title="Important Dates"
                        content={
                            <div>
                                {importantDates.map((importantdates, index) => (
                                    <div key={importantdates.id}>
                                        <div className="flex flex-wrap py-3 gap-3 items-center">
                                            <div className="rounded-md border border-szBlack900 w-20 h-12 items-center justify-center flex">
                                                {(() => {
                                                    const [month, ...rest] = importantdates.date.split(/\s+/);
                                                    const days = rest.join(" ");
                                                    return (
                                                        <p className="uppercase flex flex-col items-center justify-center">
                                                            <span className="text-caption-all-caps">{month} </span>
                                                            <span className="text-h4">{days}</span>
                                                        </p>
                                                    );
                                                })()}
                                            </div>
                                            <div className="flex flex-col text-body-small-reg text-szDarkGrey600">
                                                <p>{importantdates.title}</p>
                                                <p>{importantdates.organizer}</p>
                                            </div>
                                        </div>
                                        {index < importantDates.length - 1 && <hr className="border-szGrey150" />}
                                    </div>
                                ))}
                                <hr className="border-szGrey150" />
                                <p className="text-body-base-strong text-szPrimary700 py-3 px-6">Go to Teams Calendar</p>
                            </div>
                        }
                    />

                    <CardContainer
                        icon={<img src={Suggestions} alt="suggestions" />}
                        title="Timely Suggestion"
                        content={
                            <div>
                                {leaveRequests.map((leave, index) => (
                                    <div key={leave.id}>
                                        <div className="flex flex-row gap-3 py-3">
                                            <div className="rounded-full bg-szGrey150 w-12 h-12 flex justify-center items-center">
                                                {leave.icon}
                                            </div>
                                            <div className="flex flex-col w-11/12">
                                                <p className="text-body-small-strong">{leave.title}</p>
                                                <p className="text-caption-reg text-szLightGrey400">{leave.date}</p>
                                                <p className="flex justify-end text-body-base-strong text-szPrimary700">{leave.link}</p>
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

export default Dashboard;

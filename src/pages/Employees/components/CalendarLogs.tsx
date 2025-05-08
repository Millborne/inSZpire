import React, { useState } from "react";
import { Calendar } from "enterprisze-global-components";
import { format } from "date-fns";

// import { Calendar } from "enterprisze-global-components";

const CalendarLogs = () => {
  const [currentCalendarDisplay, setCurrentCalendarDisplay] = useState(
    format(new Date(), "MMMM yyyy")
  );

  // Mock schedule for April 2025
  const shiftData: {
    date: string;
    type:
      | "rest"
      | "holiday"
      | "shift"
      | "business"
      | "leave"
      | "workOnLeave"
      | "suspended"
      | "absent";
    start?: string;
    end?: string;
    withPay?: boolean;
    schedules?: {
      start: string;
      end: string;
      type:
        | "rest"
        | "holiday"
        | "shift"
        | "business"
        | "leave"
        | "workOnLeave"
        | "suspended"
        | "absent";
    }[];
  }[] = [
    {
      date: "2025-04-01",
      type: "workOnLeave",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-02",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-03",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-04",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    { date: "2025-04-05", type: "rest" }, // Saturday
    { date: "2025-04-06", type: "rest" }, // Sunday
    {
      date: "2025-04-07",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-08",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-09",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-10",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-11",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    { date: "2025-04-12", type: "rest" }, // Saturday
    { date: "2025-04-13", type: "rest" }, // Sunday
    {
      date: "2025-04-14",
      type: "absent",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-15",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    { date: "2025-04-16", type: "leave", withPay: true },
    { date: "2025-04-17", type: "holiday", withPay: true },
    { date: "2025-04-18", type: "holiday", withPay: true },
    { date: "2025-04-19", type: "rest" }, // Saturday
    { date: "2025-04-20", type: "rest" }, // Sunday
    {
      date: "2025-04-21",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    { date: "2025-04-22", type: "business" },
    {
      date: "2025-04-23",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-24",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-04-25",
      type: "suspended",
      // schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    { date: "2025-04-26", type: "rest" }, // Saturday
    { date: "2025-04-27", type: "rest" }, // Sunday
    {
      date: "2025-04-28",
      type: "shift",
      schedules: [
        { start: "9:00 AM", end: "6:00 PM", type: "shift" },
        { start: "7:00 PM", end: "12:00 AM", type: "absent" },
      ],
    },
    {
      date: "2025-04-29",
      type: "shift",
      schedules: [
        { start: "1:00 AM", end: "8:00 AM", type: "shift" },
        { start: "9:00 AM", end: "6:00 PM", type: "suspended" },
      ],
    },
    {
      date: "2025-04-30",
      type: "shift",
      schedules: [
        { start: "9:00 AM", end: "6:00 PM", type: "suspended" },
        { start: "7:00 PM", end: "12:00 AM", type: "shift" },
      ],
    },
  ];

  const shiftDataMay: {
    date: string;
    type:
      | "rest"
      | "holiday"
      | "shift"
      | "business"
      | "leave"
      | "workOnLeave"
      | "suspended"
      | "absent";
    start?: string;
    end?: string;
    withPay?: boolean;
    schedules?: {
      start: string;
      end: string;
      type:
        | "rest"
        | "holiday"
        | "shift"
        | "business"
        | "leave"
        | "workOnLeave"
        | "suspended"
        | "absent";
    }[];
  }[] = [
    {
      date: "2025-05-01",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-02",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-03",
      type: "rest", // Saturday
    },
    {
      date: "2025-05-04",
      type: "rest", // Sunday
    },
    {
      date: "2025-05-05",
      type: "holiday",
      withPay: true,
    },
    {
      date: "2025-05-06",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-07",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-08",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-09",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-10",
      type: "rest", // Sunday
    },
    {
      date: "2025-05-11",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-12",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-13",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-14",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-15",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-16",
      type: "rest", // Saturday
    },
    {
      date: "2025-05-17",
      type: "rest", // Sunday
    },
    {
      date: "2025-05-18",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-19",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-20",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-21",
      type: "leave",
    },
    {
      date: "2025-05-22",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-23",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-24",
      type: "rest", // Saturday
    },
    {
      date: "2025-05-25",
      type: "rest", // Sunday
    },
    {
      date: "2025-05-26",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-27",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-28",
      type: "absent",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-29",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-30",
      type: "shift",
      schedules: [{ start: "9:00 AM", end: "6:00 PM", type: "shift" }],
    },
    {
      date: "2025-05-31",
      type: "rest", // Sunday
    },
  ];

  const [valueShifts, setValueShifts] = useState(shiftDataMay);

  return (
    <div className="pb-[24px]">
      <Calendar
        // value={new Date(2025, 3, 1)}
        shiftData={valueShifts}
        onChange={(date) => {
          const currentDate = new Date(date.year, date.month.value); // Create a date object
          const isApril =
            currentDate.getMonth() === 4 && currentDate.getFullYear() === 2025; // April is month 3 (0-indexed)
          const isMay =
            currentDate.getMonth() === 5 && currentDate.getFullYear() === 2025; // May is month 4 (0-indexed)

          if (isApril) {
            setValueShifts(shiftData);
          } else if (isMay) {
            setValueShifts(shiftDataMay);
          }

          setCurrentCalendarDisplay(`${date.month.name} ${date.year}`);
        }}
        // enableMonthYearFilter={false}
        // width="500px"
      />{" "}
    </div>
  );
};

export default CalendarLogs;

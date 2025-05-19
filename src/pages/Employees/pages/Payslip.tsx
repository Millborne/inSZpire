import { useState } from "react";
import { Button, CardContainer, CustomDatePicker, Dropdown, Option, Payslip } from "enterprisze-global-components";
import watermark2 from "../../../assets/watermark2.svg";

// Generate year options
const currentYear = new Date().getFullYear();
const yearOptions: Option[] = Array.from({ length: 10 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { label: year, value: year };
});

// Month options (January to December)
const monthOptions: Option[] = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
];

const user = {
    name: "John Smith B. Fernandez",
    role: "Junior Developer",
    department: "Business Innovations & Solutions",
};

const dataPayslip = [
    { category: "Salary", amount: "₱19,000" },
    { category: "Clothing", amount: "₱200" },
    { category: "Laundry", amount: "₱100" },
    { category: "Rice", amount: "₱100" },
    { category: "Medical", amount: "₱100" },
    { category: "Night Differential", amount: "₱100" },
    { category: "Hazard Pay", amount: "₱100" },
    { category: "Holiday Pay", amount: "₱100" },
];

const dataPayslip2 = [
    { category: "Withholding Tax", amount: "₱19,000" },
    { category: "SSS Premium", amount: "₱200" },
    { category: "HDMF Premium", amount: "₱100" },
    { category: "PhilHealth", amount: "₱100" },
];

const dataPayslip3 = [{ category: "Other Allowances", amount: "₱1,500" }];

const PaySlip = () => {
    const [selectedYear, setSelectedYear] = useState<Option>(yearOptions[0]);
    const [selectedMonth, setSelectedMonth] = useState<Option>(monthOptions[new Date().getMonth()]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleYearChange = (selected: Option | Option[]) => {
        if (!Array.isArray(selected)) {
            setSelectedYear(selected);
            console.log("Selected Year:", selected.value);
        }
    };

    const handleMonthChange = (selected: Option | Option[]) => {
        if (!Array.isArray(selected)) {
            setSelectedMonth(selected);
            console.log("Selected Month:", selected.value);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <CardContainer
                content={
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between">
                            <p className="text-h6 text-szPrimary700 font-montserrat">Payslip</p>
                            <Button label="Request to HR" variant="secondary" />
                        </div>
                        <div className="flex lg:flex-row flex-col justify-between gap-2">
                            <div className="flex flex-col min-w-48">
                                <p className="text-caption-all-caps text-szGrey500 uppercase ">Year</p>
                                <Dropdown
                                    label="Year"
                                    options={yearOptions}
                                    size="medium"
                                    value={selectedYear}
                                    onSelectionChange={handleYearChange}
                                />
                            </div>

                            <div className="flex flex-col min-w-48">
                                <p className="text-caption-all-caps text-szGrey500 uppercase">Month</p>
                                <Dropdown
                                    label="Month"
                                    options={monthOptions}
                                    size="medium"
                                    value={selectedMonth}
                                    onSelectionChange={handleMonthChange}
                                />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-caption-all-caps text-szGrey500 uppercase">Coverage</p>
                                <div className="flex lg:flex-row flex-col gap-2">
                                    <CustomDatePicker label="Start Date" value={startDate || undefined} onChange={setStartDate} />
                                    <CustomDatePicker label="End Date" value={endDate || undefined} onChange={setEndDate} />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <Button label="Show" variant="primary" size="large" />
                            </div>
                        </div>
                        <div className="flex lg:flex-row flex-col gap-4">
                            <div className="w-full">
                                <Payslip
                                    backgroundColor="bg-[#FAFFFB]"
                                    user={user}
                                    dateRange="Feb 26, 2025 - Mar 10, 2025"
                                    atm={true}
                                    dataGroups={[dataPayslip, dataPayslip2]}
                                    totalbackgroundColors={["bg-success900", "bg-error900"]}
                                    title={["Earnings", "Deduction"]}
                                    bottomTitle={["Total Earnings", "Total Deduction"]}
                                />
                            </div>
                            <div className="w-full">
                                <Payslip
                                    backgroundColor="bg-[#FFFAF2]"
                                    user={user}
                                    dateRange="Feb 26, 2025 - Mar 10, 2025"
                                    atm={true}
                                    dataGroups={[dataPayslip3]}
                                    totalbackgroundColors={["bg-szSecondary400"]}
                                    bottomTitle={["Total Bonus"]}
                                    textcolor="text-szBlack900"
                                />
                            </div>
                        </div>
                        <div
                            className={"flex flex-row w-full gap-2 p-4 bg-cover bg-center bg-no-repeat "}
                            style={{ backgroundImage: `url(${watermark2})` }}
                        >
                            <p className="text-h6 uppercase">Take Home Pay: </p>
                            <p className="text-h6 text-szPrimary700">₱19,000.00</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default PaySlip;

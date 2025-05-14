import { CardContainer, TextContent } from "enterprisze-global-components";
import { Edit2 } from "iconsax-reactjs";

const Compensation = () => {
    return (
        <div className="p-4">
            <CardContainer
                backgroundColor="bg-white"
                content={
                    <div className="flex flex-col gap-7">
                        {/* Rates */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Rates
                                </h6>
                                <Edit2 className="icon-sm text-szPrimary900" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent
                                        header="Monthly"
                                        text={"₱ 35,000"}
                                    />
                                </div>
                                <div>
                                    <TextContent
                                        header="bi-monthly"
                                        text={"₱ 15"}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent
                                        header="Daily"
                                        text={"₱ 780"}
                                    />
                                </div>
                                <div>
                                    <TextContent
                                        header="Hourly"
                                        text={"₱ 100"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Allowances */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Allowances
                                </h6>
                                <Edit2 className="icon-sm text-szPrimary900" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent
                                        header="Clothing"
                                        text={"₱ 780"}
                                    />
                                </div>
                                <div>
                                    <TextContent
                                        header="Laundry"
                                        text={"₱ 200"}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent header="rice" text={"₱ 800"} />
                                </div>
                                <div>
                                    <TextContent
                                        header="Medical"
                                        text={"₱ 800"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bonuses */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Bonuses
                                </h6>
                                <Edit2 className="icon-sm text-szPrimary900" />
                            </div>
                            <div className="grid  gap-4">
                                <div>
                                    <TextContent
                                        header="Other allowances"
                                        text={"₱ 1500"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payroll */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Payroll
                                </h6>
                                <Edit2 className="icon-sm text-szPrimary900" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent
                                        header="Salary mode"
                                        text={"Bi-Monthly"}
                                    />
                                </div>
                                <div>
                                    <TextContent
                                        header="Workdays per week"
                                        text={"5"}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <TextContent
                                        header="ATM account number"
                                        text={"4627 1819 1823 1738"}
                                    />
                                </div>
                                <div>
                                    <TextContent
                                        header="atm mode"
                                        text={"ATM"}
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div>
                                    <TextContent
                                        header="cost center"
                                        text={"FBC"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Semi Monthly Government Paymenrs */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Semi Monthly Government Paymenrs
                                </h6>
                                <Edit2 className="icon-sm text-szPrimary900" />
                            </div>
                            <div className="grid  gap-4">
                                <div>
                                    <TextContent
                                        header="pag-ibig additional"
                                        text={"₱ 800"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Compensation;

import {
    Avatar,
    Button,
    CardContainer,
    Document,
    TextContent,
} from "enterprisze-global-components";
import { Edit2 } from "iconsax-reactjs";
import qrcode from "../../../assets/qrcode.png";

const EmployeeDetails = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Account Details */}
            <CardContainer
                backgroundColor="bg-white"
                content={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <h6 className="text-h6 text-szPrimary700">
                                Account Details
                            </h6>
                            <Edit2 className="icon-sm text-szPrimary900" />
                        </div>

                        {/* content */}
                        <div className="md:flex gap-6 w-full">
                            <div className="flex justify-center">
                                <div className="md:w-[150px] w-full max-w-[300px] p-3">
                                    <img
                                        src={qrcode}
                                        alt="employee"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                {/* 1st row */}
                                <div className="w-full grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <TextContent
                                            header="username"
                                            text={"js_fernandez"}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-caption-all-caps text-szGrey500 uppercase">
                                                    Password
                                                </p>
                                                <div>
                                                    <Button
                                                        label="Change Password"
                                                        variant="secondary"
                                                        size="small"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2nd row */}
                                <div className="w-full grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <TextContent
                                            header="id number"
                                            text={"2022100107"}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-caption-all-caps text-szGrey500 uppercase">
                                                    e-signature
                                                </p>
                                                <div>
                                                    <Document
                                                        onFileChange={(
                                                            file
                                                        ) => {
                                                            if (file) {
                                                                console.log(
                                                                    "Selected file:",
                                                                    file
                                                                );
                                                            } else {
                                                                console.log(
                                                                    "File removed."
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3rd row */}
                                <div className="w-full grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <TextContent
                                            header="Team"
                                            text={"BSI"}
                                        />
                                    </div>

                                    <div>
                                        <TextContent
                                            header="ACCOunt"
                                            text={"No billable account"}
                                        />
                                    </div>
                                </div>

                                {/* 4th row */}
                                <div className="w-full grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <TextContent
                                            header="position"
                                            text={"Junior Web Developer"}
                                        />
                                    </div>

                                    <div>
                                        <TextContent
                                            header="earned leave"
                                            text={"Yes"}
                                        />
                                    </div>
                                </div>

                                {/* 5th row */}
                                <div className="w-full grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <TextContent
                                            header="employment status"
                                            text={"Regular"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Direct Head */}
            <CardContainer
                backgroundColor="bg-white"
                content={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <h6 className="text-h6 text-szPrimary700">
                                Direct Head
                            </h6>
                            <Edit2 className="icon-sm text-szPrimary900" />
                        </div>

                        {/* content */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <TextContent
                                    icon={
                                        <Avatar
                                            firstName="eyyy"
                                            lastName="yoy"
                                            size="small"
                                        />
                                    }
                                    header="name"
                                    text={"22010123"}
                                />
                            </div>

                            <div>
                                <TextContent
                                    header="Work email"
                                    text={"@supportzebra.com"}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default EmployeeDetails;

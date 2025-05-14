import { CardContainer, Table } from "enterprisze-global-components";
import { Edit2 } from "iconsax-reactjs";
import papaZEager from "../../../assets/papaz-eager.png";

const TeamMember = () => {
    const showData = false;
    const headers: Array<
        | { type: "string"; header: string; accessor: string }
        | { type: "more"; header: React.ReactNode; accessor: "more" }
        | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    > = [
        { type: "string", header: "Name", accessor: "name" },
        { type: "string", header: "ID", accessor: "id" },
        { type: "string", header: "Team", accessor: "team" },
        { type: "string", header: "Job Title", accessor: "jobTitle" },
        { type: "string", header: "Job Code", accessor: "jobCode" },
        { type: "string", header: "Direct Head", accessor: "directHead" },
        { type: "more", header: <></>, accessor: "more" },
    ];

    const data = [
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
        {
            id: "1234567890",
            name: (
                <div className=" flex items-center gap-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
                    <span className="text-body-base-reg">
                        Germanotta, Stephanie Luke A.
                    </span>
                </div>
            ),
            team: "BSI",
            jobTitle: "Junior Web Developer",
            jobCode: "1234567890",
            directHead: "John Doe",
        },
    ];

    const moreOptions = [
        {
            label: "View",
            onClick: (index: number) => {
                console.log("navigate to row:", index);
            },
        },
        {
            label: "Delete",
            onClick: (index: number) => console.log("Delete row:", index),
        },
    ];

    return (
        <CardContainer
            backgroundColor="bg-white"
            content={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex justify-between">
                        <h6 className="text-h6 text-szPrimary700">
                            Team Members
                        </h6>
                        <Edit2 className="icon-sm text-szPrimary900" />
                    </div>
                    <div
                        className={`flex  ${
                            showData
                                ? ""
                                : "justify-center items-center h-[400px]"
                        } `}
                    >
                        {showData ? (
                            <div className="w-full h-[400px] overflow-auto">
                                <Table
                                    headers={headers}
                                    data={data}
                                    moreOptions={moreOptions}
                                />
                            </div>
                        ) : (
                            <div className="md:flex justify-center items-center gap-[10px]">
                                <div className="flex justify-center items-center">
                                    <div className="w-[236px]">
                                        <img src={papaZEager} alt="employee" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-center">
                                        <span className="text-body-big-reg">
                                            You don't have any team members
                                            under you.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        />
    );
};

export default TeamMember;

import { CardContainer } from "enterprisze-global-components";
import { Edit2 } from "iconsax-reactjs";
import papaZEager from "../../../assets/papaz-eager.png";

import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
    { id: "1", data: { label: "SPT Supervisor 2" } },
    {
        id: "2",
        data: { label: "Junior Web Developer 2" },
        style: {
            background: "#FF9900",
            border: "1px solid #CC7A00",
            borderRadius: "8px",
            padding: "10px",
            color: "#FFFFFF",
        },
    },
    {
        id: "3",
        data: { label: "Junior Web Developer 3" },
    },
].map((node, index) => ({
    ...node,
    // Calculate positions dynamically based on index
    position: {
        x: 400, // Center x position
        y: 200 + index * 100, // Stack vertically with 100px spacing
    },
}));

const initialEdges = [
    { id: "e1-2", source: "1", target: initialNodes.length.toLocaleString() },
];

const TeamMember = () => {
    const showData = true;
    // const headers: Array<
    //     | { type: "string"; header: string; accessor: string }
    //     | { type: "more"; header: React.ReactNode; accessor: "more" }
    //     | { type: "checkbox"; header: React.ReactNode; accessor: "checkbox" }
    // > = [
    //     { type: "string", header: "Name", accessor: "name" },
    //     { type: "string", header: "ID", accessor: "id" },
    //     { type: "string", header: "Team", accessor: "team" },
    //     { type: "string", header: "Job Title", accessor: "jobTitle" },
    //     { type: "string", header: "Job Code", accessor: "jobCode" },
    //     { type: "string", header: "Direct Head", accessor: "directHead" },
    //     { type: "more", header: <></>, accessor: "more" },
    // ];

    // const data = [
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    //     {
    //         id: "1234567890",
    //         name: (
    //             <div className=" flex items-center gap-1">
    //                 <div className="w-[14px] h-[14px] rounded-full bg-success700"></div>
    //                 <span className="text-body-base-reg">
    //                     Germanotta, Stephanie Luke A.
    //                 </span>
    //             </div>
    //         ),
    //         team: "BSI",
    //         jobTitle: "Junior Web Developer",
    //         jobCode: "1234567890",
    //         directHead: "John Doe",
    //     },
    // ];

    // const moreOptions = [
    //     {
    //         label: "View",
    //         onClick: (index: number) => {
    //             console.log("navigate to row:", index);
    //         },
    //     },
    //     {
    //         label: "Delete",
    //         onClick: (index: number) => console.log("Delete row:", index),
    //     },
    // ];

    return (
        <CardContainer
            backgroundColor="bg-white"
            content={
                <div className="flex flex-col h-full gap-4 w-full">
                    <div className="flex justify-between">
                        <h6 className="text-h6 text-szPrimary700">
                            Team Members
                        </h6>
                        <Edit2 className="icon-sm text-szPrimary900" />
                    </div>
                    <div
                        className={`h-[500px] ${
                            showData
                                ? "overflow-x-auto"
                                : "flex justify-center items-center "
                        } `}
                    >
                        {showData ? (
                            <>
                                <div className="h-full overflow-y-auto">
                                    <div className="bg-[#F9F9F9] h-full rounded-[16px] font-montserrat">
                                        <ReactFlow
                                            className="bg-[#F9F9F9] h-full rounded-[16px] font-montserrat"
                                            nodes={initialNodes.map(
                                                (node) => ({
                                                    ...node,
                                                    style: !node.style
                                                        ? {
                                                              background:
                                                                  "#FFEFD6",
                                                              border: "1px solid #FFDEAD",
                                                              borderRadius:
                                                                  "8px",
                                                              padding: "10px",
                                                          }
                                                        : node.style,
                                                })
                                            )}
                                            edges={initialEdges}
                                            defaultEdgeOptions={{
                                                style: {
                                                    stroke: "#FFDEAD",
                                                    strokeWidth: 2,
                                                },
                                                type: "default",
                                                animated: false,
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
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

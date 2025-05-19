import { useState } from "react";
import { CardContainer, Document, HeaderType, ItemLimitDropdown, Pagination, Tab, Table, TextContent } from "enterprisze-global-components";
import docs from "../../../assets/docs.svg";
import pdf from "../../../assets/pdf.svg";

const applicationDocuments = [
    { id: 1, header: "nbi clearance" },
    { id: 2, header: "police clearance" },
    { id: 3, header: "sss documents" },
    { id: 4, header: "tin documents" },
    { id: 5, header: "pag-ibig" },
    { id: 6, header: "birth certificate" },
    { id: 7, header: "marriage certificate" },
    { id: 8, header: "coe" },
    { id: 9, header: "2316 itr" },
    { id: 10, header: "school documents" },
    { id: 11, header: "curriculum vitae" },
    { id: 12, header: "proof income" },
    { id: 13, header: "medical examination" },
];

const workDocuments = [
    { id: 1, header: "e-signature" },
    { id: 2, header: "work document" },
    { id: 3, header: "signed document" },
    { id: 4, header: "signed contract" },
    { id: 5, header: "signed job offer" },
];

const headers: HeaderType[] = [
    { type: "string", header: "Name", accessor: "name" },
    { type: "string", header: "Modified", accessor: "modified" },
    { type: "string", header: "Owner", accessor: "owner" },
    { type: "string", header: "Activity", accessor: "activity" },
];

const data = [
    {
        name: (
            <div className="flex flex-row gap-2">
                <img src={docs} alt="docs" />
                <div>
                    <p className="text-body-small-reg">Project_Proposal.docs</p>
                    <TextContent header="Business Solutions and Innovations" />
                </div>
            </div>
        ),
        modified: "2 days ago",
        owner: "Frederick Lee",
        activity: "You Edited this",
    },
    {
        name: (
            <div className="flex flex-row gap-2">
                <img src={pdf} alt="docs" />
                <div>
                    <p className="text-body-small-reg">Teams and Accounts.pdf</p>
                    <TextContent header="Business Solutions and Innovations" />
                </div>
            </div>
        ),
        modified: "23 days ago",
        owner: "Larry Johnson",
        activity: "You View this",
    },
    {
        name: (
            <div className="flex flex-row gap-2">
                <img src={pdf} alt="docs" />
                <div>
                    <p className="text-body-small-reg">SZebra Credit V2.5 QA.pdf</p>
                    <TextContent header="Business Solutions and Innovations" />
                </div>
            </div>
        ),
        modified: "25 days ago",
        owner: "Millbourne Galamiton",
        activity: "You Edited this",
    },
    {
        name: (
            <div className="flex flex-row gap-2">
                <img src={pdf} alt="docs" />
                <div>
                    <p className="text-body-small-reg">ERP ATS and EMS Module Main.pdf</p>
                    <TextContent header="Business Solutions and Innovations" />
                </div>
            </div>
        ),
        modified: "30 days ago",
        owner: "Alex Simene",
        activity: "You View this",
    },
    {
        name: (
            <div className="flex flex-row gap-2">
                <img src={pdf} alt="docs" />
                <div>
                    <p className="text-body-small-reg">Zapp Documentation.pdf</p>
                    <TextContent header="Business Solutions and Innovations" />
                </div>
            </div>
        ),
        modified: "35 days ago",
        owner: "Analita Autida",
        activity: "You Edited this",
    },
];

const Documents = () => {
    const [activeTab, setActiveTab] = useState("Personal Documents");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [limit, setLimit] = useState({ label: "10", value: "10" });

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex">
                <Tab
                    label="Personal Documents"
                    type="left"
                    isFirst
                    active={activeTab === "Personal Documents"}
                    onClick={() => setActiveTab("Personal Documents")}
                />
                <Tab
                    label="Work Documents"
                    type="right"
                    active={activeTab === "Work Documents"}
                    onClick={() => setActiveTab("Work Documents")}
                />
            </div>

            {activeTab === "Personal Documents" && (
                <CardContainer
                    content={
                        <div className="flex flex-col gap-2">
                            <p className="text-h6 text-szPrimary700">Application Documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {applicationDocuments.map((document) => (
                                    <div key={document.id} className="flex flex-col gap-2 pb-4 pr-20">
                                        <TextContent header={document.header} />
                                        <Document onFileChange={(file) => console.log(file ? "Selected file:" : "File removed.", file)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                />
            )}

            {activeTab === "Work Documents" && (
                <CardContainer
                    content={
                        <div className="flex flex-col gap-2">
                            <p className="text-h6 text-szPrimary700">Microsoft 360 Documents</p>
                            <Table headers={headers} data={paginatedData} />
                            <div className="flex flex-row justify-between">
                                <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
                                <ItemLimitDropdown
                                    value={limit}
                                    options={[
                                        { label: "5", value: "5" },
                                        { label: "10", value: "10" },
                                        { label: "25", value: "25" },
                                        { label: "50", value: "50" },
                                        { label: "100", value: "100" },
                                    ]}
                                    onChange={(value) => {
                                        setLimit(value);
                                        setItemsPerPage(Number(value.value));
                                        setCurrentPage(1);
                                    }}
                                    page={1}
                                />
                            </div>

                            <div className="flex flex-col w-1/2 gap-2">
                                <p className="text-h6 text-szPrimary700">Work Documents</p>
                                {workDocuments.map((document) => (
                                    <div key={document.id} className="flex flex-col gap-2 pb-4 pr-20">
                                        <TextContent header={document.header} />
                                        <Document onFileChange={(file) => console.log(file ? "Selected file:" : "File removed.", file)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default Documents;

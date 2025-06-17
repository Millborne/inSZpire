import { CardContainer, TextContent, Document } from "enterprisze-global-components";

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

const PersonalDocuments = () => {
    return (
        <>
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
        </>
    );
};

export default PersonalDocuments;

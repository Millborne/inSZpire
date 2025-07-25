// import React, { useEffect, useState } from "react";
import { CardContainer, TextContent, Document } from "enterprisze-global-components";
import { usePersonalDocuments } from "../../../services/employee-profile/work/documents/personal/use-personal-documents";
import { sanitizeUUID } from "../../../utils/uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/store";

// const EMPLOYEE_ID = "";

const applicationDocuments = [
    { id: "3e29e02e525611f0b6b802dcb324866b", header: "nbi clearance" },
    { id: "3e2a15a7525611f0b6b802dcb324866b", header: "police clearance" },
    { id: "3e2a16e7525611f0b6b802dcb324866b", header: "sss documents" },
    { id: "3e2a174a525611f0b6b802dcb324866b", header: "tin documents" },
    { id: "3e2a17a1525611f0b6b802dcb324866b", header: "pag-ibig" },
    { id: "3e2a17f4525611f0b6b802dcb324866b", header: "birth certificate" },
    { id: "3e2a18d8525611f0b6b802dcb324866b", header: "marriage certificate" },
    { id: "3e2a18f6525611f0b6b802dcb324866b", header: "coe" },
    { id: "3e2a1920525611f0b6b802dcb324866b", header: "2316 itr" },
    { id: "3e2a1941525611f0b6b802dcb324866b", header: "school documents" },
    { id: "3e2a1960525611f0b6b802dcb324866b", header: "curriculum vitae" },
    { id: "3e2a197e525611f0b6b802dcb324866b", header: "proof income" },
    { id: "3e2a33a7525611f0b6b802dcb324866b", header: "medical examination" },
];

const PersonalDocuments = () => {
    const selectedEmployee = useSelector((state: RootState) => state.employeeState.selectedEmployee);

    console.log(selectedEmployee);

    const { docMap, upload, deleteDocumentByEmployee } = usePersonalDocuments(selectedEmployee?.employee_ID || "", applicationDocuments);

    const handleUploadDocument = async (fileObj: any, docTypeId: string) => {
        // Convert the file object to a proper File object
        let file: File;

        if (fileObj.isLocal && fileObj.url) {
            // For local files, we need to fetch the blob from the URL
            try {
                const response = await fetch(fileObj.url);
                const blob = await response.blob();
                file = new File([blob], fileObj.name, { type: fileObj.mimeType });
            } catch (error) {
                console.error("Error converting file:", error);
                return;
            }
        } else {
            // If it's already a File object
            file = fileObj as File;
        }

        if (!selectedEmployee?.employee_ID) {
            console.error("No employee ID found");
            return;
        }

        await upload({
            file,
            employee_ID: selectedEmployee.employee_ID,
            doc_type_ID: docTypeId,
            title: fileObj.name || "uploaded-file",
            description: "uploaded from frontend",
        });
    };

    const handleDeleteDocument = async (document_ID: string, docTypeId: string) => {
        console.log("Deleting document:", document_ID, docTypeId);
        // await deleteDocument(document_ID, docTypeId);
        await deleteDocumentByEmployee({
            document_ID: sanitizeUUID(document_ID),
            profile_ID: selectedEmployee?.profile_ID || "",
            doc_type_ID: docTypeId,
        });
    };

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="text-h6 text-szPrimary700">Application Documents</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {applicationDocuments.map((document) => {
                                const existing = docMap?.[document.id];
                                return (
                                    <div key={document.id} className="flex flex-col gap-2 pb-4 pr-20">
                                        <TextContent header={document.header} />
                                        <Document
                                            inputId={`document-${document.id}`}
                                            value={
                                                existing
                                                    ? {
                                                          name: existing.document_title || "uploaded-file",
                                                          url: existing.url,
                                                          mimeType: existing.file_extension
                                                              ? `application/${existing.file_extension.replace(".", "")}`
                                                              : "application/octet-stream",
                                                          isLocal: false,
                                                      }
                                                    : null
                                            }
                                            onChange={async (file) => {
                                                if (file) {
                                                    await handleUploadDocument(file, document.id.toString());
                                                } else {
                                                    // Only delete if we have a valid document ID
                                                    if (existing?.document_ID) {
                                                        await handleDeleteDocument(existing.document_ID, document.id.toString());
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default PersonalDocuments;

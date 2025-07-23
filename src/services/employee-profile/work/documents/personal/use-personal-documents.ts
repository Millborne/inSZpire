import { useEffect, useState } from "react";
import { useFetchPersonalDocumentsQuery, useActionPersonalDocumentsMutation, useFetchDocumentByTypeMutation } from "./personalDocumentsAPI";

type UploadArgs = {
    file: File;
    employee_ID: string;
    doc_type_ID: string;
    title: string;
    description?: string;
};

export const usePersonalDocuments = (employee_ID: string, docTypeList: { id: string }[]) => {
    /* ---------- FETCH ONE ---------- */
    const fetchOne = async (doc_type_ID: string) => {
        try {
            console.log(`Fetching single document for type: ${doc_type_ID}`);
            const response = await fetchDocumentByType({
                employee_ID,
                doc_type_ID,
            }).unwrap();

            console.log(`Single fetch response for ${doc_type_ID}:`, response);

            setDocMap((prev) => ({
                ...prev,
                [doc_type_ID]: response?.data?.documents?.[0] ?? null,
            }));
        } catch (error) {
            console.error(`Error fetching document for type ${doc_type_ID}:`, error);
        }
    };

    /* ---------- POST ---------- */
    const [actionMutation, { isLoading: isUploading }] = useActionPersonalDocumentsMutation();

    const upload = async (args: UploadArgs) => {
        const formData = new FormData();
        formData.append("employee_ID", args.employee_ID);
        formData.append("doc_type_ID", args.doc_type_ID);
        formData.append("document_title", args.title);
        formData.append("description", args.description ?? "");
        formData.append("file", args.file);

        await actionMutation({
            queryParameters: "/upload",
            method: "POST",
            body: formData,
        });

        await fetchOne(args.doc_type_ID);
    };

    /* ---------- DELETE ---------- */
    const [deleteMutation, { isLoading: isDeleting }] = useActionPersonalDocumentsMutation();

    const deleteDocument = async (document_ID: string, doc_type_ID: string) => {
        await deleteMutation({
            queryParameters: document_ID,
            method: "DELETE",
        });
        await fetchOne(doc_type_ID);
    };

    /* ---------- FETCH DOCUMENT BY TYPE ---------- */
    const [fetchDocumentByType] = useFetchDocumentByTypeMutation();
    const [docMap, setDocMap] = useState<Record<string, any>>({}); // keyed by doc_type_ID

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    docTypeList.map(async (doc) => {
                        try {
                            const response = await fetchDocumentByType({
                                employee_ID,
                                doc_type_ID: doc.id,
                            }).unwrap();

                            // Extract the first document from the documents array
                            const document = response?.data?.documents?.[0] ?? null;
                            return { [doc.id]: document };
                        } catch (error) {
                            return { [doc.id]: null };
                        }
                    })
                );

                const merged = Object.assign({}, ...results);
                setDocMap(merged);
            } catch (error) {
                console.error("Error in fetchAll:", error);
            }
        };

        if (employee_ID) fetchAll();
    }, [employee_ID, docTypeList]);

    return {
        docMap,
        isUploading,
        isDeleting,
        upload,
        deleteDocument,
    };
};

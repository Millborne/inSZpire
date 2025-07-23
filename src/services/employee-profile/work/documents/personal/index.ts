export { personalDocumentsAPI, useFetchPersonalDocumentsQuery, useActionPersonalDocumentsMutation } from "./personalDocumentsAPI";
export { documentsAPI, useFetchDocumentsQuery, useActionDocumentsMutation } from "./documentsAPI";
export {
    usePersonalDocuments,
    usePersonalDocumentsService,
    type PersonalDocumentData,
    type UploadDocumentRequest,
    type ViewDocumentRequest,
    type PersonalDocumentDetailsRequest,
    type UpdateDocumentRequest,
    type BatchUpdateStatusRequest,
} from "./use-personal-documents";
export {
    useDocuments,
    useDocumentsService,
    type DocumentData,
    type UploadDocumentRequest as DocumentsUploadRequest,
} from "./use-documents";

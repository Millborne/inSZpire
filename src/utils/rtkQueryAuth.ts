import Cookies from "js-cookie";

/**
 * Centralized authorization utility for RTK Query prepareHeaders
 * Handles different token types used across the application
 *
 * Usage examples:
 *
 * For standard token authentication:
 * ```typescript
 * import { prepareStandardAuthHeaders } from '../../../utils/rtkQueryAuth';
 *
 * export const myAPI = createApi({
 *   baseQuery: fetchBaseQuery({
 *     baseUrl: 'your-base-url',
 *     prepareHeaders: (headers) => {
 *       return prepareStandardAuthHeaders(headers);
 *     },
 *   }),
 *   // ... rest of your API config
 * });
 * ```
 *
 * For shared auth token authentication:
 * ```typescript
 * import { prepareSharedAuthHeaders } from '../../../utils/rtkQueryAuth';
 *
 * export const myAPI = createApi({
 *   baseQuery: fetchBaseQuery({
 *     baseUrl: 'your-base-url',
 *     prepareHeaders: (headers) => {
 *       return prepareSharedAuthHeaders(headers);
 *     },
 *   }),
 *   // ... rest of your API config
 * });
 * ```
 *
 * For custom token type:
 * ```typescript
 * import { prepareAuthHeaders } from '../../../utils/rtkQueryAuth';
 *
 * export const myAPI = createApi({
 *   baseQuery: fetchBaseQuery({
 *     baseUrl: 'your-base-url',
 *     prepareHeaders: (headers) => {
 *       return prepareAuthHeaders(headers, 'yourCustomToken');
 *     },
 *   }),
 *   // ... rest of your API config
 * });
 * ```
 */
export const prepareAuthHeaders = (
    headers: any,
    tokenType: "authToken"  // Changed to match the actual cookie name from main portal
) => {
    const token = Cookies.get(tokenType);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzRTQ1NjdFODlCMTJEM0E0NTY0MjY2NTU0NDAwMDEiLCJlbWFpbCI6ImRvbnNhbXBsZUBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiZG9uc2FtcGxlIiwicm9sZXMiOltdLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzU2NzIwNTAwLCJleHAiOjE3NTY3MjE0MDAsImF1ZCI6IndlYi1hcHBzIiwiaXNzIjoiYXV0aC1hcGkifQ.4ZDSBCdbr4WchMT3TSjUz-PRB56osotYhFSW9XhsyYM"

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
};

/**
 * Convenience function for standard token authentication
 */
export const prepareStandardAuthHeaders = (headers: any) => {
    return prepareAuthHeaders(headers, "authToken");  // Changed to match actual cookie name
};

/**
 * Convenience function for shared auth token authentication
 */
export const prepareSharedAuthHeaders = (headers: any) => {
    return prepareAuthHeaders(headers, "authToken");  // Changed to match actual cookie name
};

/**
 * Checks if a value is a valid UUID (version-agnostic)
 * @param value - The value to check
 * @returns True if valid UUID, false otherwise
 */
export const isValidUUID = (value?: string | null): boolean =>
    !!value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        value
    );

/**
 * Removes dashes and spaces from a UUID string
 * @param uuid - The UUID string to sanitize
 * @returns Sanitized UUID string
 */
export const sanitizeUUID = (uuid: string): string =>
    uuid.replace(/[-\s]/g, "");

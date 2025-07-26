export * from "./uuid";

/**
 * Converts a Date object to YYYY-MM-DD format without timezone issues
 * Uses local date methods to avoid timezone conversion
 * @param date - Date object to convert
 * @returns string in YYYY-MM-DD format
 */
export const formatDateForBackend = (date: Date | null): string => {
    if (!date) return "";
    
    // Use local date methods to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

/**
 * Converts a date string (YYYY-MM-DD) to a Date object without timezone issues
 * Creates date in local timezone to avoid timezone conversion issues
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object representing the local date
 */
export const parseDateFromBackend = (dateString: string | null | undefined): Date => {
    if (!dateString || dateString === "null" || dateString === "undefined" || dateString.trim() === "") {
        return new Date();
    }
    
    // Handle ISO date strings (e.g., "2025-07-24T16:00:00.000Z")
    if (dateString.includes('T') || dateString.includes('Z')) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.warn("Invalid ISO date format:", dateString);
            return new Date();
        }
        // Extract just the date part (YYYY-MM-DD) to avoid timezone issues
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        return new Date(year, month - 1, day); // Create date in local timezone
    }
    
    // Handle YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        
        // Validate the parsed values
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            console.warn("Invalid date components:", { year, month, day, original: dateString });
            return new Date();
        }
        
        // Create date in local timezone to avoid timezone conversion issues
        return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    }
    
    console.warn("Unsupported date format:", dateString);
    return new Date();
};

/**
 * Safely converts a date string to YYYY-MM-DD format for backend
 * Handles both Date objects and date strings without timezone conversion
 * @param dateInput - Date object or date string
 * @returns string in YYYY-MM-DD format
 */
export const safeFormatDateForBackend = (dateInput: Date | string | null | undefined): string => {
    if (!dateInput) return '';
    
    if (dateInput instanceof Date) {
        return formatDateForBackend(dateInput);
    }
    
    // If it's already a string in YYYY-MM-DD format, return as is
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        return dateInput;
    }
    
    // If it's an ISO date string, handle it properly
    if (typeof dateInput === 'string' && (dateInput.includes('T') || dateInput.includes('Z'))) {
        const date = new Date(dateInput);
        if (!isNaN(date.getTime())) {
            return formatDateForBackend(date);
        }
    }
    
    // If it's a string that needs parsing, parse it first
    const date = parseDateFromBackend(dateInput);
    return formatDateForBackend(date);
};

/**
 * Converts a date string to a Date object for CustomDatePicker
 * Returns undefined if the date string is empty or invalid
 * Creates date in local timezone to avoid timezone conversion issues
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object or undefined
 */
export const parseDateForDatePicker = (dateString: string | null | undefined): Date | undefined => {
    if (!dateString || dateString.trim() === '') return undefined;
    
    // Handle ISO date strings (e.g., "2025-07-24T16:00:00.000Z")
    if (dateString.includes('T') || dateString.includes('Z')) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return undefined;
        }
        // Extract just the date part (YYYY-MM-DD) to avoid timezone issues
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        return new Date(year, month - 1, day); // Create date in local timezone
    }
    
    // If it's already a valid date string, parse it in local timezone
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        // Create date in local timezone to avoid timezone conversion issues
        return new Date(year, month - 1, day);
    }
    
    return undefined;
};

/**
 * Test function to verify date handling works correctly across timezones
 * This function can be called to test our date utilities
 */
export const testDateHandling = () => {
    console.log("Testing date handling utilities...");
    
    // Test cases for different dates
    const testDates = [
        new Date(2024, 0, 25), // January 25, 2024
        new Date(2024, 11, 31), // December 31, 2024
        new Date(2025, 1, 14), // February 14, 2025
    ];
    
    testDates.forEach((date, index) => {
        const formatted = formatDateForBackend(date);
        const parsed = parseDateFromBackend(formatted);
        const reparsed = formatDateForBackend(parsed);
        
        console.log(`Test ${index + 1}:`, {
            original: date.toDateString(),
            formatted,
            parsed: parsed.toDateString(),
            reparsed,
            success: formatted === reparsed
        });
    });
    
    console.log("Date handling test completed.");
};

export const testPositionStatusMapping = () => {
    console.log("=== TESTING POSITION STATUS MAPPING ===");
    
    // Test all possible frontend values
    const frontendValues = ["TRAINEE", "PROBATIONARY", "REGULAR", "CONTRACT", "PART_TIME", "INTERN", "ACTIVE"];
    
    frontendValues.forEach(value => {
        console.log(`Frontend value: "${value}"`);
        
        // Test the mapping function (we'll need to import it)
        // This is just for debugging - we'll implement the actual test later
        console.log(`  → Would map to database ID`);
    });
    
    // Test all possible database IDs
    const databaseIDs = [
        "1a23aec4526211f0b6b802dcb324866b", // Active
        "1a23b074526211f0b6b802dcb324866b", // Training  
        "1a23b100526211f0b6b802dcb324866b", // Promoted
        "1a23b128526211f0b6b802dcb324866b", // Transferred
        "1a23b14a526211f0b6b802dcb324866b"  // Closed
    ];
    
    databaseIDs.forEach(id => {
        console.log(`Database ID: "${id}"`);
        console.log(`  → Would map to frontend value`);
    });
    
    console.log("=== END TEST ===");
};

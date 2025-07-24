// Helper function to convert Buffer to hex string
export const bufferToHex = (bufferObj: any): string => {
    if (!bufferObj || !bufferObj.data || !Array.isArray(bufferObj.data)) {
        return "";
    }
    return bufferObj.data
        .map((byte: number) => byte.toString(16).padStart(2, "0"))
        .join("");
};

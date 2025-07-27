export const formatDateForDisplay = (
  dateString: string | null | undefined
): string => {
  if (!dateString || dateString.trim() === "") {
      return "—";
  }

  try {
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
          return "—";
      }

      // Format the date using toLocaleDateString and toLocaleTimeString
      const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
      });

      return `${formattedDate} ${formattedTime}`;
  } catch (error) {
      console.warn("Error formatting date:", dateString, error);
      return "—";
  }
};

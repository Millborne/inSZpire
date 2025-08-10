import { EmployeeHistoryViewData } from '../services/employee-profile/work/employee-history/employeeHistoryAPI';

/**
 * Calculate duration between two dates
 */
export const calculateDuration = (startDate: string, endDate: string | null): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const months = Math.floor(diffDays / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) {
    return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'mo' : 'mos'}`;
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }
};

/**
 * Format date for display (e.g., "Nov 2024")
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
};

/**
 * Format date range for display (e.g., "Nov 2024 - Mar 2025")
 */
export const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatDateForDisplay(startDate);
  const end = endDate ? formatDateForDisplay(endDate) : 'Present';
  return `${start} - ${end}`;
};

/**
 * Transform API data to timeline format
 */
export const transformToTimelineData = (historyData: EmployeeHistoryViewData[]) => {
  return historyData.map((item) => ({
    position: item.current_position_name,
    positionCode: item.current_position_code,
    startDate: new Date(item.start_date),
    endDate: item.end_date ? new Date(item.end_date) : null,
    department: item.employment_status, // Using employment_status as department for now
    length: calculateDuration(item.start_date, item.end_date),
    changeType: item.change_type,
    employmentStatus: item.employment_status,
    employeeStatus: item.employee_status,
    // Additional fields for expandable content
    directHead: "N/A", // This would come from a different API
    directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
    category: "Rank and File (Admin)",
    monthlyCompensation: item.basic_salary?.toString() || "N/A",
    otherAllowance: "N/A",
    clothingAllowance: "N/A",
    riceAllowance: "N/A",
    laundryAllowance: "N/A",
  }));
};

/**
 * Sort history data by start date (newest first)
 */
export const sortHistoryByDate = (historyData: EmployeeHistoryViewData[]): EmployeeHistoryViewData[] => {
  return [...historyData].sort((a, b) => {
    const dateA = new Date(a.start_date).getTime();
    const dateB = new Date(b.start_date).getTime();
    return dateB - dateA; // Newest first
  });
};

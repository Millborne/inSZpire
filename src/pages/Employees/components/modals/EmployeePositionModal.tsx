// import { useState } from "react";
 
// icons
 
// components
import { Dropdown, Modal } from "enterprisze-global-components";
import { useState, useEffect } from "react";
import EmployeePositionConfirmationModal from "./EmployeePositionConfirmationModal";
import { useFetchPositionsQuery, useUpdatePositionMutation } from "../../../../services/employee-profile/work/employee-history/positionsAPI";
import { useUpdateEmployeeMutation } from "../../../../services/employee-profile/work/employee-history/employeeHistoryAPI";
import { useEmployeeService } from "../../../../services/employee/list/use-employee";
 
export interface employeePositionData {
    position: string;
    positionStatus: string;
    employmentStatus: string;
}
 
interface EmployeePositionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    employeePositionData?: employeePositionData; // Make optional
    employee_ID?: string; // Add employee ID prop
    employeeName?: string; // Add employee name prop
}
 
const EmployeePositionModal: React.FC<EmployeePositionModalProps> = ({
    isOpen,
    onClose,
    onSubmitSuccess,
    employee_ID,
    employeeName = "Employee"
}) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentEmployeePositionData, setCurrentEmployeePositionData] = useState<employeePositionData | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<string>("");
    const [selectedPositionStatus, setSelectedPositionStatus] = useState<string>("");
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);
 
    // Fetch positions from external API
    const { data: positionsData, isLoading: positionsLoading, error: positionsError } = useFetchPositionsQuery(undefined, {
        skip: !isOpen, // Only fetch when modal is open
    });
 
    // Update mutations
    const [updatePosition, { isLoading: isUpdatingPosition }] = useUpdatePositionMutation();
    const [updateEmployee, { isLoading: isUpdatingEmployee }] = useUpdateEmployeeMutation();
   
    // Employee service for fetching updated data
    const employeeService = useEmployeeService();
 
    // Debug logging
    useEffect(() => {
        if (isOpen) {
            console.log('🔧 Modal opened, fetching positions...');
        }
    }, [isOpen]);
 
    useEffect(() => {
        if (positionsData) {
            console.log('🔧 Positions data received:', positionsData);
        }
    }, [positionsData]);
 
    useEffect(() => {
        if (positionsError) {
            console.error('🔧 Positions error:', positionsError);
        }
    }, [positionsError]);
 
    // Transform positions data for dropdown - FIXED: Use positionsData.positions instead of positionsData.data
    const positionOptions = positionsData?.positions?.map(position => ({
        value: position.position_ID,
        label: `${position.position_code} - ${position.position_name}`
    })) || [];
 
    console.log('🔧 Position options:', positionOptions);
 
    // Position status options from tbl_position_status (only non-archived statuses)
    const positionStatusOptions = [
        { value: "1a23aec4526211f0b6b802dcb324866b", label: "Active" },
        { value: "1a23b074526211f0b6b802dcb324866b", label: "Training" },
        { value: "1a23b100526211f0b6b802dcb324866b", label: "Promoted" },
        { value: "1a23b128526211f0b6b802dcb324866b", label: "Transferred" },
        { value: "1a23b14a526211f0b6b802dcb324866b", label: "Closed" },
    ];
 
    // Employment status options from tbl_employment_status (only non-archived statuses)
    const employmentStatusOptions = [
        { value: "bb52e0c9526111f0b6b802dcb324866b", label: "Probationary" },
        { value: "bb52e29b526111f0b6b802dcb324866b", label: "Regular" },
        { value: "bb52e354526111f0b6b802dcb324866b", label: "Contractual" },
        { value: "bb52e392526111f0b6b802dcb324866b", label: "Terminated" },
        { value: "bb52e3cb526111f0b6b802dcb324866b", label: "Resigned" },
    ];
 
    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
        setCurrentEmployeePositionData(null);
    };
 
    const handleProceed = async () => {
        if (!employee_ID) {
            console.error('❌ No employee ID provided');
            return;
        }
 
        if (!selectedPosition || !selectedPositionStatus || !selectedEmploymentStatus) {
            console.error('❌ Please fill in all required fields');
            return;
        }
 
        setIsUpdating(true);
 
        try {
            console.log('🔧 Starting position update process...');
 
            // Use a single endpoint approach like the Teams component
            console.log('🔧 Updating employee position via single endpoint...');
           
            const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
           
            // Use the nested structure expected by the backend
            const employeeUpdateData = {
                employee_ID: employee_ID,
                employee: {
                    current_position_ID: selectedPosition,
                    position_status_ID: selectedPositionStatus,
                    basic_salary: 60000
                },
                employment_status: selectedEmploymentStatus,
                change_type_ID: "641e194c525f11f0b6b802dcb324866b"
            };
           
            console.log('🔧 Employee update data being sent:', employeeUpdateData);
           
            const employeeUpdateResult = await updateEmployee(employeeUpdateData).unwrap();
 
            console.log('✅ Employee position update successful:', employeeUpdateResult);
 
            // 3. Force refetch of employee history data to update the UI
            try {
                console.log('🔧 Forcing refetch of employee history data...');
                // Add a longer delay to allow backend view to update
                await new Promise(resolve => setTimeout(resolve, 3000));
                // Call onSubmitSuccess to trigger parent component refresh
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
                console.log('✅ Employee history data refetch triggered');
               
                // 4. Force a complete page refresh as a fallback
                console.log('🔄 Forcing complete page refresh in 2 seconds...');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (fetchError) {
                console.warn('⚠️ Could not trigger data refetch:', fetchError);
                // Continue with the process even if refetch fails
            }
 
            // 4. Create the position data object for confirmation modal with actual names
            const positionData: employeePositionData = {
                position: getPositionNameById(selectedPosition),
                positionStatus: getPositionStatusNameById(selectedPositionStatus),
                employmentStatus: getEmploymentStatusNameById(selectedEmploymentStatus),
            };
           
            // Log the position details for debugging
            console.log('🔧 Position update details:', {
                positionId: selectedPosition,
                positionName: getPositionNameById(selectedPosition),
                positionStatusId: selectedPositionStatus,
                positionStatusName: getPositionStatusNameById(selectedPositionStatus),
                employmentStatusId: selectedEmploymentStatus,
                employmentStatusName: getEmploymentStatusNameById(selectedEmploymentStatus),
            });
           
            setCurrentEmployeePositionData(positionData);
            setShowConfirmationModal(true);
            onClose();
 
            // 5. Success callback will be called by the confirmation modal when user clicks "Update Position"
 
        } catch (error) {
            console.error('❌ Update failed:', error);
           
            // Log detailed error information
            if (error && typeof error === 'object') {
                console.error('❌ Error details:', {
                    status: (error as any).status,
                    data: (error as any).data,
                    message: (error as any).message,
                    originalStatus: (error as any).originalStatus,
                    error: error
                });
               
                // Log the full error response if available
                if ((error as any).data) {
                    console.error('❌ Server error response:', JSON.stringify((error as any).data, null, 2));
                }
            }
           
            // Show error to user
            alert('Failed to update position. Please check the console for details.');
        } finally {
            setIsUpdating(false);
        }
    };
 
    const handlePositionChange = (selected: any) => {
        if (selected && typeof selected === 'object' && 'value' in selected) {
            setSelectedPosition(selected.value);
        }
    };
 
    const handlePositionStatusChange = (selected: any) => {
        if (selected && typeof selected === 'object' && 'value' in selected) {
            setSelectedPositionStatus(selected.value);
        }
    };
 
    const handleEmploymentStatusChange = (selected: any) => {
        if (selected && typeof selected === 'object' && 'value' in selected) {
            setSelectedEmploymentStatus(selected.value);
        }
    };
 
    // Helper function to get error message
    const getErrorMessage = () => {
        if (!positionsError) return '';
       
        if ('status' in positionsError) {
            return `Error: ${positionsError.status} - ${JSON.stringify(positionsError.data)}`;
        }
       
        if ('message' in positionsError) {
            return `Error: ${positionsError.message}`;
        }
       
        return 'Unknown error occurred';
    };
 
    // Helper function to get position name by ID
    const getPositionNameById = (positionId: string) => {
        const position = positionsData?.positions?.find(pos => pos.position_ID === positionId);
        return position ? `${position.position_code} - ${position.position_name}` : 'Unknown Position';
    };
 
    // Helper function to get status name by ID
    const getPositionStatusNameById = (statusId: string) => {
        const status = positionStatusOptions.find(status => status.value === statusId);
        return status ? status.label : 'Unknown Status';
    };
 
    // Helper function to get employment status name by ID
    const getEmploymentStatusNameById = (statusId: string) => {
        const status = employmentStatusOptions.find(status => status.value === statusId);
        return status ? status.label : 'Unknown Status';
    };
 
    // Check if form is valid
    const isFormValid = selectedPosition && selectedPositionStatus && selectedEmploymentStatus;
 
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Update Position for Employee"
                modalWidth="w-[900px]"
                contentHeight="h-[400px]"
                showButton={false}
                footerOptions="stacked-left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                        disabled: isUpdating,
                    },
                    {
                        label: isUpdating ? "Updating..." : "Proceed",
                        variant: "primary",
                        onClick: handleProceed,
                        size: "medium",
                        disabled: !isFormValid || isUpdating,
                    },
                ]}
                content={
                    <div className="flex flex-col w-full gap-[24px]">
                        <div className="grid grid-cols-1 gap-6 pt-1">
                            {/* Position and Position Status Row */}
                            <div className="relative">
                                <div className="flex flex-col lg:flex-row gap-[16px]">
                                    <div className="flex-1">
                                        <Dropdown
                                            label="POSITION"
                                            placeholder={positionsLoading ? "Loading positions..." : "Select Position"}
                                            options={positionOptions}
                                            onSelectionChange={handlePositionChange}
                                            disabled={positionsLoading || isUpdating}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Dropdown
                                            label="POSITION STATUS"
                                            placeholder="Select Position Status"
                                            options={positionStatusOptions}
                                            onSelectionChange={handlePositionStatusChange}
                                            disabled={isUpdating}
                                        />
                                    </div>
                                </div>
                            </div>
 
                            {/* Employment Status Row */}
                            <div className="relative">
                                <div className="flex flex-col lg:flex-row gap-[16px]">
                                    <div className="flex-1">
                                        <Dropdown
                                            label="EMPLOYMENT STATUS"
                                            placeholder="Select Employment Status"
                                            options={employmentStatusOptions}
                                            onSelectionChange={handleEmploymentStatusChange}
                                            disabled={isUpdating}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        {/* Empty space for future field or to maintain layout */}
                                    </div>
                                </div>
                            </div>
 
                            {/* Show error if positions failed to load */}
                            {positionsError && (
                                <div className="text-red-500 text-sm mt-2">
                                    Failed to load positions. Please try again.
                                    <br />
                                    <small className="text-gray-500">
                                        {getErrorMessage()}
                                    </small>
                                </div>
                            )}
 
                            {/* Show validation message */}
                            {!isFormValid && (
                                <div className="text-amber-600 text-sm mt-2">
                                    Please fill in all required fields to proceed.
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
 
            <EmployeePositionConfirmationModal
                isOpen={showConfirmationModal}
                onClose={handleConfirmationClose}
                employeePositionData={currentEmployeePositionData}
                employeeName={employeeName}
                currentPositionName={getPositionNameById(selectedPosition || '')}
                currentPositionStatus={getPositionStatusNameById(selectedPositionStatus || '')}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};
 
export default EmployeePositionModal;
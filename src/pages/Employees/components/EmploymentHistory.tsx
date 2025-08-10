import { useState, useEffect } from "react";
import { Button, CardContainer, JobPositionHistory, PurpleTaggedCard, TextContent } from "enterprisze-global-components";
import EmployeePositionModal from "./modals/EmployeePositionModal";
import { useEmployeeHistoryView } from "../../../services/employee-profile/work/employee-history/use-employee-history";
import { transformToTimelineData, sortHistoryByDate } from "../../../utils/employeeHistoryUtils";

interface EmploymentHistoryProps {
    employeeId?: string;
}

const EmploymentHistory = ({ employeeId }: EmploymentHistoryProps) => {
    const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
    const [companyHistory, setCompanyHistory] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { fetchEmployeeHistory, isLoading, error: apiError } = useEmployeeHistoryView();

    const handleUpdatePosition = () => {
        setIsUpdatePositionModalOpen(true);
    };

    // Fetch employee history data
    const fetchEmployeeHistoryData = async () => {
        if (!employeeId) {
            setError("Employee ID is required");
            console.log('❌ No employee ID provided to EmploymentHistory component');
            return;
        }

        setError(null);
        console.log('🔍 EmploymentHistory: Fetching employee history for:', employeeId);
        console.log('🔍 EmploymentHistory: This should trigger when Employment History tab is clicked');

        try {
            const response = await fetchEmployeeHistory({
                employee_ID: employeeId,
                offset: 0,
                limit: 25
            });

            console.log('✅ EmploymentHistory: Employee history response:', response);

            if (response.success) {
                const sortedHistory = sortHistoryByDate(response.data.history);
                const transformedData = transformToTimelineData(sortedHistory);
                setCompanyHistory(transformedData);
                console.log('✅ EmploymentHistory: Transformed timeline data:', transformedData);
            } else {
                setError(response.message || "Failed to fetch employee history");
            }
        } catch (err: any) {
            console.error('❌ EmploymentHistory: Employee history fetch error:', err);
            setError(err.message || "Failed to fetch employee history");
        }
    };

    // Fetch data when component mounts or employeeId changes
    useEffect(() => {
        console.log('🔄 EmploymentHistory: Component mounted/updated with employeeId:', employeeId);
        if (employeeId) {
            console.log('🔄 EmploymentHistory: Employee ID changed, fetching history for:', employeeId);
            fetchEmployeeHistoryData();
        } else {
            console.log('❌ EmploymentHistory: No employee ID provided');
        }
    }, [employeeId]);

    // Mock data for other employee history (keeping existing structure)
    const otherEmployeeHistory = [
        {
            position: "Senior Web Developer",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department:
                "I work on developing and maintaining websites and web applications, primarily using HTML, CSS, JavaScript, and basic frameworks. I assist in building responsive front-end interfaces, fixing bugs, and collaborating with designers and senior developers to improve user experience. I'm also continuously learning and growing my skills in full-stack development.",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
        {
            position: "Mortician",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department:
                "I prepare deceased individuals for burial or cremation, coordinate funeral services, and support grieving families with compassion and professionalism throughout the process.",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
        {
            position: "Intern",
            positionCode: "90182",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2025-03-31"),
            department: "BSI",
            length: "5 mos",
            directHead: "Stephanie Germanotta",
            directHeadPhotoUrl: "https://i.pravatar.cc/100?img=32",
            category: "Rank and File (Admin)",
            monthlyCompensation: "Stephanie Germanotta",
            otherAllowance: "Stephanie Germanotta",
            clothingAllowance: "Stephanie Germanotta",
            riceAllowance: "Stephanie Germanotta",
            laundryAllowance: "Stephanie Germanotta",
        },
    ];

    return (
        <CardContainer
            backgroundColor="bg-white"
            content={
                <div className="flex flex-col gap-6">
                    {/* Current Position */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <h6 className="text-h6 text-szPrimary700">Current Position</h6>
                            <Button variant="secondary" size="medium" label="Update Position" onClick={handleUpdatePosition} />
                        </div>

                        <div>
                            <PurpleTaggedCard
                                label="Accounts Manager"
                                children={
                                    <div className="flex flex-col gap-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <TextContent header="job code" text="AM_T" />
                                            </div>

                                            <div>
                                                <TextContent header="Status" text="October 21, 1996" />
                                            </div>

                                            <div>
                                                <TextContent header="Status" text="Regular" />
                                            </div>
                                        </div>
                                        <div>
                                            <TextContent header="start date" text="Feb 21, 2023" />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* Company History*/}
                    <div className="flex flex-col gap-2">
                        <div>
                            <h6 className="text-h6 text-szPrimary700">Company History</h6>
                        </div>
                        
                        {isLoading && (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-szPrimary500"></div>
                            </div>
                        )}

                        {(error || apiError) && (
                            <div className="text-red-500 text-sm py-2">
                                <strong>Error:</strong> {error || (apiError && typeof apiError === 'object' && 'error' in apiError ? apiError.error : "Failed to fetch employee history")}
                                <br />
                                <small className="text-gray-500">
                                    Employee ID: {employeeId} | 
                                    Endpoint: POST /api/v1/employee-history/view
                                </small>
                            </div>
                        )}

                        {!isLoading && !error && !apiError && companyHistory.length === 0 && (
                            <div className="text-gray-500 text-sm py-2">
                                No employment history found for employee: {employeeId}
                            </div>
                        )}

                        {!isLoading && !error && !apiError && companyHistory.map((item, index) => (
                            <div key={index} className="flex h-full">
                                <div className="flex flex-col h-full items-center w-[32px] gap-2">
                                    <div>
                                        <div className="h-[8px] w-[8px] rounded-full bg-szPrimary500"></div>
                                    </div>

                                    {index < companyHistory.length - 1 && (
                                        <div className="h-full">
                                            <div className="h-full w-[1px] bg-szPrimary200"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <JobPositionHistory data={item} state="closed" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Employee History*/}
                    <div className="flex flex-col gap-2">
                        <div>
                            <h6 className="text-h6 text-szPrimary700">Other Employee History</h6>
                        </div>
                        <div className="flex flex-col gap-2 h-full w-full">
                            {otherEmployeeHistory.map((item, index) => (
                                <JobPositionHistory key={index} data={item} state="other" />
                            ))}
                        </div>
                    </div>

                    <EmployeePositionModal
                        isOpen={isUpdatePositionModalOpen}
                        onClose={() => setIsUpdatePositionModalOpen(false)}
                        employeePositionData={{
                            startDate: "",
                            position: "",
                            positionStatus: "",
                        }}
                    />
                </div>
            }
        />
    );
};

export default EmploymentHistory;

import { useState, useEffect, useCallback } from "react";
import {
  Button,
  CardContainer,
  JobPositionHistory,
  PurpleTaggedCard,
  TextContent,
} from "enterprisze-global-components";
import EmployeePositionModal from "./modals/EmployeePositionModal";
import { useParams } from "react-router-dom";
import { useFetchEmployeeHistoryQuery } from "../../../services/employee-profile/work/employee-history/employeeHistoryAPI";
import { useEmployeeHistoryView } from "../../../services/employee-profile/work/employee-history/use-employee-history";
import { transformToTimelineData, sortHistoryByDate } from "../../../utils/employeeHistoryUtils";

// 🚧 TEMPORARY: Set to false to disable timeline API calls while backend is being developed
const ENABLE_TIMELINE_API = true;

const EmploymentHistory = () => {
  const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
  const [timelineHistory, setTimelineHistory] = useState<any[]>([]);
  const [timelineError, setTimelineError] = useState<string | null>(null);
  const [hasAttemptedTimelineFetch, setHasAttemptedTimelineFetch] = useState(false);
  const { employee_ID } = useParams();

  const shouldSkip = !employee_ID;

  // 🆕 NEW: Company History timeline API (for the new timeline feature)
  const { fetchEmployeeHistory, isLoading: timelineLoading, error: timelineApiError } = useEmployeeHistoryView();

  // ✅ EXISTING: Current and company history API (workmate's existing endpoint)
  const { data, isLoading, isError, refetch } = useFetchEmployeeHistoryQuery(
    { body: { employee_ID } },
    { skip: shouldSkip }
  );

  // Memoize the fetch function to prevent infinite re-renders
  const fetchTimelineData = useCallback(async () => {
    if (!employee_ID || hasAttemptedTimelineFetch || !ENABLE_TIMELINE_API) return;

    try {
      console.log('🔍 Fetching timeline data for employee:', employee_ID);
      setHasAttemptedTimelineFetch(true);
      
      const response = await fetchEmployeeHistory({
        employee_ID: employee_ID,
        offset: 0,
        limit: 25
      });

      if (response.success) {
        const sortedHistory = sortHistoryByDate(response.data.history);
        const transformedData = transformToTimelineData(sortedHistory);
        setTimelineHistory(transformedData);
        console.log('✅ Timeline data loaded:', transformedData);
      } else {
        setTimelineError(response.message || "Failed to fetch timeline data");
      }
    } catch (err: any) {
      console.error('❌ Timeline fetch error:', err);
      setTimelineError(err.message || "Failed to fetch timeline data");
      // Don't retry on 404 errors
      if (err?.status === 404) {
        console.log('⚠️ Timeline API endpoint not implemented yet, using fallback data');
      }
    }
  }, [employee_ID, fetchEmployeeHistory, hasAttemptedTimelineFetch]);

  // Fetch timeline data only once when component mounts
  useEffect(() => {
    fetchTimelineData();
  }, [fetchTimelineData]);

  if (shouldSkip) return <div>Loading employee details...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <div>Error loading employee history.</div>;

  const rawCurrentPosition = data.data.currentPosition;
  const companyHistory = data.data.companyHistory || [];

  // include the current position ID so we can optionally filter it in the modal
  const currentPosition = rawCurrentPosition
    ? {
        id: rawCurrentPosition.current_position_ID
          ? String(rawCurrentPosition.current_position_ID)
          : undefined,
        position_name: rawCurrentPosition.current_position_name ?? "N/A",
        position_code: rawCurrentPosition.current_position_code ?? "N/A",
        employment_status: rawCurrentPosition.employment_status ?? "N/A",
        employee_status: rawCurrentPosition.employee_status ?? "N/A",
        start_date: rawCurrentPosition.start_date
          ? new Date(rawCurrentPosition.start_date).toDateString()
          : "N/A",
      }
    : null;

  return (
    <CardContainer
      backgroundColor="bg-white"
      content={
        <div className="flex flex-col gap-6">
          {/* Current Position */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h6 className="text-h6 text-szPrimary700">Current Position</h6>
              <Button
                variant="secondary"
                size="medium"
                label="Update Position"
                onClick={() => setIsUpdatePositionModalOpen(true)}
              />
            </div>

            {currentPosition ? (
              <PurpleTaggedCard
                label={currentPosition.position_name}
                children={
                  <div className="flex flex-col gap-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <TextContent header="Job Code" text={currentPosition.position_code} />
                      <TextContent header="Employment Status" text={currentPosition.employment_status} />
                      <TextContent header="Employee Status" text={currentPosition.employee_status} />
                    </div>
                    <div>
                      <TextContent header="Start Date" text={currentPosition.start_date} />
                    </div>
                  </div>
                }
              />
            ) : (
              <div className="text-szGray500">No current position found.</div>
            )}
          </div>

          {/* Company History - Timeline Version (NEW) */}
          <div className="flex flex-col gap-2">
            <h6 className="text-h6 text-szPrimary700">Company History</h6>
            
            {!ENABLE_TIMELINE_API && (
              <div className="text-blue-600 text-sm py-2 bg-blue-50 rounded p-3">
                <strong>Timeline Feature:</strong> Timeline API is currently disabled while backend is being developed.
                <br />
                <small className="text-gray-600">
                  Showing existing company history data. Set ENABLE_TIMELINE_API = true when backend is ready.
                </small>
              </div>
            )}
            
            {timelineLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-szPrimary500"></div>
              </div>
            )}

            {(timelineError || timelineApiError) && (
              <div className="text-amber-600 text-sm py-2 bg-amber-50 rounded p-3">
                <strong>Timeline API Note:</strong> The new timeline feature is not yet implemented on the backend.
                <br />
                <small className="text-gray-600">
                  Showing existing company history data instead. Timeline feature will be available once the backend API is ready.
                </small>
              </div>
            )}

            {!timelineLoading && !timelineError && !timelineApiError && timelineHistory.length === 0 && (
              <div className="text-gray-500 text-sm py-2">
                No timeline history found for employee: {employee_ID}
              </div>
            )}

            {!timelineLoading && !timelineError && !timelineApiError && timelineHistory.map((item, index) => (
              <div key={index} className="flex h-full">
                <div className="flex flex-col h-full items-center w-[32px] gap-2">
                  <div>
                    <div className="h-[8px] w-[8px] rounded-full bg-szPrimary500"></div>
                  </div>

                  {index < timelineHistory.length - 1 && (
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

            {/* Fallback to existing company history if timeline is empty */}
            {!timelineLoading && (timelineError || timelineApiError || timelineHistory.length === 0 || !ENABLE_TIMELINE_API) && companyHistory.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-500 mb-2">Showing existing company history data:</div>
                {companyHistory.map((item: any, index: number) => {
                  const normalizedItem = {
                    ...item,
                    position_name: item.current_position_name ?? "N/A",
                    position_code: item.current_position_code ?? "N/A",
                    start_date: item.start_date
                      ? new Date(item.start_date).toDateString()
                      : "N/A",
                    end_date: item.end_date
                      ? new Date(item.end_date).toDateString()
                      : "Present",
                    employment_status: item.employment_status ?? "N/A",
                    employee_status: item.employee_status ?? "N/A",
                  };

                  return (
                    <div key={index} className="flex h-full">
                      <div className="flex flex-col h-full items-center w-[32px] gap-2">
                        <div>
                          <div className="h-[8px] w-[8px] rounded-full bg-szPrimary500"></div>
                        </div>
                        <div className="h-full">
                          <div className="h-full w-[1px] bg-szPrimary200"></div>
                        </div>
                      </div>
                      <div className="w-full">
                        <JobPositionHistory data={normalizedItem} state="closed" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Other Employee History (unchanged) */}
          <div className="flex flex-col gap-2 mt-8">
            <h6 className="text-h6 text-szPrimary700">Other Employee History</h6>
            <div className="flex flex-col gap-4 text-sm text-szGray700">
              <div>
                <strong className="text-szPrimary700">Senior Web Developer</strong> · 90182
                <div>Nov 2024 – Mar 2025 · 5 mos</div>
                <p>
                  I work on developing and maintaining websites and web applications, primarily
                  using HTML, CSS, JavaScript, and basic frameworks. I assist in building responsive
                  front-end interfaces, fixing bugs, and collaborating with designers and senior
                  developers to improve user experience. I'm also continuously learning and growing
                  my skills in full-stack development.
                </p>
              </div>
              <div>
                <strong className="text-szPrimary700">Mortician</strong> · 90182
                <div>Nov 2024 – Mar 2025 · 5 mos</div>
                <p>
                  I prepare deceased individuals for burial or cremation, coordinate funeral
                  services, and support grieving families with compassion and professionalism
                  throughout the process.
                </p>
              </div>
              <div>
                <strong className="text-szPrimary700">Intern</strong> · 90182
                <div>Nov 2024 – Mar 2025 · 5 mos</div>
                <p>BSI</p>
              </div>
            </div>
          </div>

          {/* Position Update Modal */}
          <EmployeePositionModal
            isOpen={isUpdatePositionModalOpen}
            onClose={() => setIsUpdatePositionModalOpen(false)}
            onSubmitSuccess={() => {
              refetch();                 // refresh after update
              setIsUpdatePositionModalOpen(false);
            }}
            employeePositionData={{
              startDate: currentPosition?.start_date || "",
              position: currentPosition?.position_name || "",
              positionStatus: currentPosition?.employment_status || ""
            }}
          />
        </div>
      }
    />
  );
};

export default EmploymentHistory;









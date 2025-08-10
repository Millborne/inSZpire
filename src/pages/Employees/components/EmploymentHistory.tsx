import { useState } from "react";
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

const EmploymentHistory = () => {
  const [isUpdatePositionModalOpen, setIsUpdatePositionModalOpen] = useState(false);
  const { employee_ID } = useParams();

  const shouldSkip = !employee_ID;

  const { data, isLoading, isError, refetch } = useFetchEmployeeHistoryQuery(
    { body: { employee_ID } },
    { skip: shouldSkip }
  );

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

          {/* Company History */}
          <div className="flex flex-col gap-2">
            <h6 className="text-h6 text-szPrimary700">Company History</h6>
            {companyHistory.length === 0 ? (
              <div className="text-szGray500">No history found.</div>
            ) : (
              companyHistory.map((item: any, index: number) => {
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
              })
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
                  developers to improve user experience. I’m also continuously learning and growing
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
            currentPositionId={currentPosition?.id} // optional filter
            employeeID={employee_ID as string}     // required by modal/confirm
            updatedBy="ffe063c8dfe942728541670773163f73" // TODO: replace with logged-in user id
          />
        </div>
      }
    />
  );
};

export default EmploymentHistory;









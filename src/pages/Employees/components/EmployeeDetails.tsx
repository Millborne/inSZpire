import {
  Avatar,
  Button,
  CardContainer,
  Document,
  TextContent,
} from "enterprisze-global-components";
import { Edit2 } from "iconsax-reactjs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import qrcode from "../../../assets/qrcode.png";
import { RootState } from "../../../reducers/store";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { employee_ID } = useParams();
  
  // Employee RTK State
  const selectedEmployee = useSelector(
    (state: RootState) => state.employeeState.selectedEmployee
  );

  console.log(selectedEmployee);

  const handleChangePassword = () => {
    navigate(`/change-password?employeeId=${employee_ID}`);
  };

  // No data state
  if (!selectedEmployee) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-szGrey500">No employee data found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Account Details */}
      <CardContainer
        backgroundColor="bg-white"
        content={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h6 className="text-h6 text-szPrimary700">Account Details</h6>
              <Edit2 className="icon-sm text-szPrimary900" />
            </div>

            {/* content */}
            <div className="md:flex gap-6 w-full">
              <div className="flex justify-center">
                <div className="md:w-[150px] w-full max-w-[300px] p-3">
                  <img
                    src={selectedEmployee.qr_code_url || qrcode}
                    alt="employee qr code"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                {/* 1st row */}
                <div className="w-full grid sm:grid-cols-2 gap-4">
                  <div>
                    <TextContent 
                      header="username" 
                      text={selectedEmployee.work_email?.split('@')[0] || selectedEmployee.preferred_name || "N/A"} 
                    />
                  </div>

                  <div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex flex-col gap-1">
                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                          Password
                        </p>
                        <div>
                          <Button
                            label="Change Password"
                            variant="secondary"
                            size="small"
                            onClick={handleChangePassword}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd row */}
                <div className="w-full grid sm:grid-cols-2 gap-4">
                  <div>
                    <TextContent 
                      header="id number" 
                      text={selectedEmployee.employee_number || selectedEmployee.old_employee_number || "N/A"} 
                    />
                  </div>

                  <div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="flex flex-col gap-1">
                        <p className="text-caption-all-caps text-szGrey500 uppercase">
                          e-signature
                        </p>
                        <div>
                          <Document
                            value={selectedEmployee.e_sig_url ? {
                              name: "e-signature",
                              url: selectedEmployee.e_sig_url,
                              mimeType: "application/pdf",
                              isLocal: false
                            } : null}
                            onChange={(file: any) => {
                              if (file) {
                                console.log("Selected file:", file);
                              } else {
                                console.log("File removed.");
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3rd row */}
                <div className="w-full grid sm:grid-cols-2 gap-4">
                  <div>
                    <TextContent 
                      header="Team" 
                      text={selectedEmployee.team_name || "N/A"} 
                    />
                  </div>

                  <div>
                    <TextContent
                      header="Account"
                      text={selectedEmployee.work_email || "No billable account"}
                    />
                  </div>
                </div>

                {/* 4th row */}
                <div className="w-full grid sm:grid-cols-2 gap-4">
                  <div>
                    <TextContent
                      header="position"
                      text={selectedEmployee.position_name || selectedEmployee.job_title || "N/A"}
                    />
                  </div>

                  <div>
                    <TextContent 
                      header="earned leave" 
                      text={selectedEmployee.is_leave_earned ? "Yes" : "No"} 
                    />
                  </div>
                </div>

                {/* 5th row */}
                <div className="w-full grid sm:grid-cols-2 gap-4">
                  <div>
                    <TextContent 
                      header="employment status" 
                      text={selectedEmployee.employment_status || "N/A"} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Direct Head */}
      <CardContainer
        backgroundColor="bg-white"
        content={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h6 className="text-h6 text-szPrimary700">Direct Head</h6>
              <Edit2 className="icon-sm text-szPrimary900" />
            </div>

            {/* content */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <TextContent
                  icon={
                    <Avatar 
                      firstName={selectedEmployee.supervisor_first_name || "N/A"} 
                      lastName={selectedEmployee.supervisor_last_name || "N/A"} 
                      size="small" 
                    />
                  }
                  header="name"
                  text={`${selectedEmployee.supervisor_first_name || ""} ${selectedEmployee.supervisor_last_name || ""}`.trim() || "N/A"}
                />
              </div>

              <div>
                <TextContent 
                  header="Work email" 
                  text={selectedEmployee.work_email || "N/A"} 
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EmployeeDetails;

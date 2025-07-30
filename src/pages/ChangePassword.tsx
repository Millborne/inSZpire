import { useNavigate, useSearchParams } from "react-router-dom";
import zebraBg from "../assets/zebra-bg.png";
import { Button, CardContainer, Inputs } from "enterprisze-global-components";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get("employeeId");

  //   const [formData, setFormData] = useState({
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   });

  return (
    <div
      className="flex items-center justify-center min-h-screen h-screen overflow-y-auto p-6"
      style={{ backgroundImage: `url(${zebraBg})` }}
    >
      <div className="w-[514px] h-[448px]">
        <CardContainer
          content={
            <div className="flex flex-col gap-[32px] items-center py-[54px]  h-full">
              <div className="text-center">
                <h6 className="text-h6">Change your password</h6>
                <p>Enter a new password below to change your password</p>
              </div>
              <div className="flex flex-col gap-[16px] w-[300px] justify-center items-center ">
                <Inputs placeholder="Current Password" type="password" />
                <Inputs placeholder="New Password" type="password" />
                <Inputs placeholder="Confirm Password" type="password" />
              </div>
              <div className="flex flex-col gap-[8px] w-[300px]">
                <Button size="medium" label="Change Password" fullWidth />
                <Button
                  size="medium"
                  label="Cancel"
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate(-1)}
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ChangePassword;

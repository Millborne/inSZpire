import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import zebraBg from "../assets/zebra-bg.png";
import { Button, CardContainer, Inputs, SnackbarAlert } from "enterprisze-global-components";
import { useChangePasswordMutation } from "../services/authentication/changePasswordAPI";
import { useSharedAuth } from "../hooks/authentication/useSharedAuth";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get("employeeId");
  const { logout } = useSharedAuth();

  // Form state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // API mutation
  const [changePassword] = useChangePasswordMutation();

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await changePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      }).unwrap();

      if (response.success) {
        setShowSuccess(true);
        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Logout user after successful password change (as per API response)
        setTimeout(() => {
          logout();
          navigate("/");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Change password error:", error);
      
      if (error?.data?.message) {
        setErrorMessage(error.data.message);
      } else if (error?.status === 401) {
        setErrorMessage("Current password is incorrect");
      } else if (error?.status === 400) {
        setErrorMessage("Invalid password format or requirements not met");
      } else {
        setErrorMessage("Failed to change password. Please try again.");
      }
      
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen h-screen overflow-y-auto p-6"
      style={{ backgroundImage: `url(${zebraBg})` }}
    >
      <div className="w-[514px] h-[448px]">
        <CardContainer
          content={
            <div className="flex flex-col gap-[32px] items-center py-[54px] h-full">
              <div className="text-center">
                <h6 className="text-h6">Change your password</h6>
                <p>Enter a new password below to change your password</p>
              </div>
              
              <div className="flex flex-col gap-[16px] w-[300px] justify-center items-center">
                <div className="w-full">
                  <Inputs 
                    placeholder="Current Password" 
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>
                
                <div className="w-full">
                  <Inputs 
                    placeholder="New Password" 
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>
                
                <div className="w-full">
                  <Inputs 
                    placeholder="Confirm Password" 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-[8px] w-[300px]">
                <Button 
                  size="medium" 
                  label={isLoading ? "Changing Password..." : "Change Password"} 
                  fullWidth 
                  onClick={handleSubmit}
                  disabled={isLoading}
                />
                <Button
                  size="medium"
                  label="Cancel"
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Success Alert */}
      <SnackbarAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        showCloseButton={true}
        type="success"
        title="Password Changed Successfully!"
        message="Your password has been updated. You will be logged out for security."
        animation="slide-up"
      />

      {/* Error Alert */}
      <SnackbarAlert
        isOpen={showError}
        onClose={() => setShowError(false)}
        showCloseButton={true}
        type="error"
        title="Password Change Failed"
        message={errorMessage}
        animation="slide-up"
      />
    </div>
  );
};

export default ChangePassword;

import { useForm, FormProvider } from "react-hook-form";
import "./style.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../shared-components/CustomButton";
import Input from "../shared-components/Input";

function PasswordReset() {
  const methods = useForm({ mode: "onChange" });
  const { handleSubmit, getFieldState } = methods;
  const navigate = useNavigate();

  const codeState = getFieldState("add-code");
  const isCodeValid = codeState.isTouched && !codeState.invalid;
  const passwordState = getFieldState("add-password");
  const isPasswordValid = passwordState.isTouched && !passwordState.invalid;
  const handleCancel = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    navigate('/home')
  };

  return (
    <main className="reset-container">
      <div className="logo-container">
        <img src="/assets/variant2-logo.png" alt="Safi Greens logo" className="reset-logo" />
      </div>
      <div className="input-container">
        <h1 className="input-header">Reset Password</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="input-container">
            <div className="reset-input">
              <Input
                label="Enter code sent to your email"
                id="code"
                type="tel"
                name="add-code"
                placeholder="Enter code"
                disabled={false}
                validation={{
                  required: { value: true, message: "Required" },
                  minLength: { value: 6, message: "Invalid code"},
                  maxLength: { value: 6, message: "Invalid code"},
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid code",
                  },
                }}
              />
              <Input
                id="password"
                label="Create password"
                type="password"
                name="add-password"
                placeholder="Create new password"
                disabled={!isCodeValid}
                validation={{
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 6, message: "Password must be at least 6 characters long!" },
                }}
              />
                <Input
                id="confirm-password"
                label="Confirm password"
                type="password"
                name="confirm-password"
                placeholder="Confirm password"
                disabled={!isCodeValid || !isPasswordValid}
                validation={{
                  required: {
                    value: true,
                    message: "Please confirm your password",
                  },
                  validate: (value) =>
                    value === methods.getValues("add-password") || "Passwords do not match",
                }}
              />
            </div>
            <div className="button-group">
              <CustomButton
                buttonText="Cancel"
                variant="cancel-reset"
                onClick={handleCancel}
              />
              <CustomButton
                buttonText="Continue"
                variant="continue-reset"
                type="submit"
                onClick={onSubmit}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
export default PasswordReset;

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./style.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../shared-components/CustomButton";
import Input from "../shared-components/Input";

const ResetEmail = () => {
    const methods = useForm({ mode: "onChange" });
    const {  handleSubmit } = methods;
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    }
    const onSubmit = (data) => {
        navigate('/PasswordReset')
    };
   return(
   <main className="email-container">
        <div className="logo-container">
            <img src="/assets/variant2-logo.png" alt="Safi Greens logo" className="reset-logo" />
        </div>
        <div className="email-input-container">
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="input-container">
            <div className="email-input">
                <h1 className="input-header">Reset Password</h1>
                <Input
                    label="Enter your email"
                    type="email"
                    name="add-email"
                    placeholder="admin@gmail.com"
                    disabled={false}
                    validation={{
                    required: { value: true, message: "Required" },
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
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
                />
            </div>
            </form>
        </FormProvider>
        </div>
    </main>
    );
}

export default ResetEmail;
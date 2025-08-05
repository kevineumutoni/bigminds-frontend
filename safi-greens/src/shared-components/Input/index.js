import React, { useState } from "react";
import './style.css'
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Input = ({label, name, type, id, placeholder, validation, disabled}) => {
    const {register, formState:{errors},} = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <main>
            <div className="custom-label">
                <label 
                htmlFor={id} 
                className='label'>
                    {label}
                </label>
            </div>
            <div className="custom-input">
                <input 
                id={id}
                name ={name} 
                type={inputType} 
                className='input' 
                placeholder={placeholder}
                disabled={disabled}
                {...register(name, validation)}/>
                {errors[name] && (
                    <p className="error-message"><FontAwesomeIcon icon={faExclamationCircle}/> {errors[name].message}</p>
                )}
                {type === "password" && (
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon"/>
                )}
            </div>
        </main>
    )
}

export default Input;
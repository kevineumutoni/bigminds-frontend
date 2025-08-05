import React from "react";
import './style.css';

const CustomButton = ({buttonText, variant, onClick}) => {
    return (
        <button onClick={onClick} className={`button ${variant}`} >
        {buttonText}
        </button>
    )
}

export default CustomButton;
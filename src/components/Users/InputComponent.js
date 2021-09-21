import React from "react";

function InputComponent({
  inputType,
  inputClass,
  inputID,
  placeholderTitle,
  handleOnChange,
  inputValue,
  label,
  isReadOnly,
  isPattern,
  dbsDismiss,
  errorMessage,
  isError,
}) {
  return (
    <>
      <input
        style={{border: isError && `red 2px solid`}}
        type={inputType}
        className={inputClass}
        id={inputID}
        placeholder={placeholderTitle}
        readOnly={isReadOnly && true}
        onChange={(e) => handleOnChange(e.target.value)}
        value={inputValue}
        pattern={isPattern && "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}"}
        title={isPattern && `Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters`}
        data-bs-dismiss={dbsDismiss}
        // required      
      />
      {label ? <label>{label}</label> : ""}
      {errorMessage && errorMessage}
    </>
  );
}

export default InputComponent;

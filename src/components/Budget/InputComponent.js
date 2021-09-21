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
        onChange={handleOnChange}
        value={inputValue}
        data-bs-dismiss={dbsDismiss}    
      />
      {label ? <label>{label}</label> : ""}
      {errorMessage && errorMessage}
    </>
  );
}

export default InputComponent;

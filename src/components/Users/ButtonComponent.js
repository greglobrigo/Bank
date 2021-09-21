import React from 'react'

const ButtonComponent = ({btnClass, dbsToggle, dbsTarget, dbsDismiss, handleFunction, iconName, ariaLabel, btnDescription, resetTransaction, style}) => {
    
    return (
        <>
            <button type="button" className={btnClass} data-bs-dismiss={dbsDismiss} data-bs-toggle={dbsToggle} data-bs-target={dbsTarget} onClick={resetTransaction? resetTransaction : handleFunction} aria-label={ariaLabel}> {iconName ? iconName : null} {btnDescription}</button>

        </>
    )
}

export default ButtonComponent
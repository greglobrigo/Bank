import React, {useState} from 'react'
import ButtonComponent from './ButtonComponent'
import InputComponent from './InputComponent'
import {Modal, Button} from 'react-bootstrap'

const ModalForDetailsComponent = (  
  {currentSelectedData,  
  convertToMoney,
  setAmountToWithdraw,
  amountToWithdraw,
  handleWithdraw,
  setAmountToDeposit,
  amountToDeposit,
  handleDeposit,
  setTransferTo,
  setAmountToTransfer,
  transferTo,
  amountToTransfer,  
  handleTransfer,
  modalDetailsAlert,
  resetTransaction,  
  show,
  setShow
  }
) => {       
    return ( 
        <div className="modal-details-component">              
        <Modal show={show}>
          <Modal.Header>          
          <Modal.Title><h5 className="modal-title" id="exampleModalLabel">User Information</h5></Modal.Title>
          <button type="button" className="btn-close modal-close-btn" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setShow(false); resetTransaction()}}></button>
        </Modal.Header>
         <Modal.Body>        
                    <div className="modal-content">                   
                    <div className="modal-body admin-modal-details">
                        <div className="user-row">
                            <div className="form-floating mb-3">
                            <InputComponent
                             inputType={"text"}
                             inputClass={"read-only-user-detail form-control"}
                             placeholderTitle={"Account No."}
                             inputID={"floatingAccountNumberDetails"}
                             isReadOnly={true}
                             inputValue={currentSelectedData.account_no}
                             label={"Account No."}
                            />
                            </div>
                            <div className="form-floating mb-3">
                            <InputComponent
                             inputType={"text"}
                             inputClass={"read-only-user-detail form-control"}
                             placeholderTitle={"User Name"}
                             inputID={"floatingUserNameDetails"}
                             isReadOnly={true}
                             inputValue={currentSelectedData.username}
                             label={"User Name"}
                            />
                            </div>
                        </div>
                        <div className="user-row">
                            <div className="form-floating mb-3">
                                <InputComponent
                                 inputType={"text"}
                                 inputClass={"read-only-user-detail form-control"}
                                 placeholderTitle={"First Name"}
                                 inputID={"floatingFirstNameDetails"}
                                 isReadOnly={true}
                                 inputValue={currentSelectedData.first_name}
                                 label={"First Name"}
                                 />
                            </div>
                            <div className="form-floating mb-3">
                                <InputComponent
                                 inputType={"text"}
                                 inputClass={"read-only-user-detail form-control"}
                                 placeholderTitle={"Last Name"}
                                 inputID={"floatingLastNameDetails"}
                                 isReadOnly={true}
                                 inputValue={currentSelectedData.last_name}
                                 label={"Last Name"}
                                 />
                            </div>
                        </div>
                        <div className="user-row">
                            <div className="form-floating mb-3">
                                <InputComponent
                                 inputType={"text"}
                                 inputClass={"read-only-user-detail form-control"}
                                 placeholderTitle={"Address"}
                                 inputID={"floatingAddressDetails"}
                                 isReadOnly={true}
                                 inputValue={currentSelectedData.address}
                                 label={"Address"}
                                 />
                            </div>
                            <div className="form-floating mb-3">
                                <InputComponent
                                inputType={"number"}
                                inputClass={"read-only-user-detail form-control"}
                                placeholderTitle={"Active Mobile No."}
                                inputID={"floatingActiveNoDetails"}
                                isReadOnly={true}
                                inputValue={currentSelectedData.mobile_no}
                                label={"Active Mobile No."}
                                />
                            </div>
                        </div>
                        <div className="user-row">
                            <div className="form-floating mb-3">
                                <InputComponent
                                inputType={"email"}
                                inputClass={"read-only-user-detail form-control"}
                                placeholderTitle={"Email Address"}
                                inputID={"floatingEmailDetails"}
                                isReadOnly={true}
                                inputValue={currentSelectedData.email}
                                label={"Email Address"}
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <InputComponent
                                inputType={"text"}
                                inputClass={"read-only-user-detail form-control"}
                                placeholderTitle={"Balance"}
                                inputID={"floatingBalanceDetails"}
                                isReadOnly={true}
                                inputValue={convertToMoney(currentSelectedData.balance)}
                                label={"Balance"}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                         <div className='modal-header'>
                            <h5 className="modal-title" >Transactions</h5>
                        </div>
                        <div className="transaction-body-container">
                            <div className="transaction-body user-row">
                                <div className="transaction form-floating mb-3">
                                    <InputComponent
                                        inputType={"number"}
                                        inputClass={"form-control"}
                                        inputID={"floatingWithdraw"}
                                        placeholderTitle={"Withdraw"}
                                        handleOnChange={setAmountToWithdraw}
                                        inputValue={amountToWithdraw}
                                        label={"₱ Amount to Withdraw"} 
                                        // errorMessage={modalDetailsAlert.insufficientBalance && <p className="error-message">You have an Insufficient Balance. Please Try Again!</p>}
                                        // successfulMessage={modalDetailsAlert.successful && <p className="success-message">Withdrawn Successfully!</p>}
                                        // enterAnAmountToWithdraw={modalDetailsAlert.enterAnAmountToWithdraw && <p className="enter-an-amount-message">Please enter an Amount to Withdraw</p>}
                                    />
                                </div>
                                
                                <ButtonComponent
                                    btnClass={"btn btn-primary"}                                   
                                    handleFunction={() => handleWithdraw()}                                    
                                    btnDescription={"Withdraw"}
                                />
                            </div>

                            <div style={{marginBottom: '1rem'}}>
                                {modalDetailsAlert.insufficientBalance && <p className="error-message">You have an Insufficient Balance. Please Try Again!</p>}                                
                                {modalDetailsAlert.enterAnAmountToWithdraw && <p className="enter-an-amount-message">Please enter an Amount to Withdraw.</p>}
                                {modalDetailsAlert.amountEnteredIsNegativeWithdraw && <p className="error-message">Amount withdrawn cannot be negative.</p>}                                
                            </div>

                            <div className="transaction-body user-row">
                                <div className="transaction form-floating mb-3">
                                    <InputComponent
                                        inputType={"number"}
                                        inputClass={"form-control"}
                                        inputID={"floatingDeposit"}
                                        placeholderTitle={"Deposit"}
                                        handleOnChange={setAmountToDeposit}
                                        inputValue={amountToDeposit}
                                        label={"₱ Amount to Deposit"}
                                    />
                                </div>
                                
                                <ButtonComponent
                                    btnClass={"btn btn-primary"}
                                    handleFunction={() => handleDeposit()}
                                    btnDescription={"Deposit"}
                                />
                            </div>

                            <div style={{marginBottom: '1rem'}}>                               
                                {modalDetailsAlert.enterAnAmountToDeposit && <p className="enter-an-amount-message">Please enter an Amount to Deposit.</p>}
                                {modalDetailsAlert.amountEnteredIsNegativeDeposit && <p className="error-message">Amount deposited cannot be negative.</p>}
                            </div>

                            <h6 className="modal-title" >Transfer Funds</h6>
                            <p>To</p>
                            <div className="transaction-body user-row">
                                <div className="transaction form mb-3">
                                    <InputComponent
                                        inputType={"text"}
                                        inputClass={"transfer-names form-control"}
                                        inputID={"floatingTransferTo"}
                                        placeholderTitle={"Account No."}
                                        handleOnChange={setTransferTo}
                                        inputValue={transferTo}
                                    />
                                </div>
                            </div>
                            <p>Amount</p>
                            <div className="transaction-body user-row">
                                <div className="transaction form-floating mb-3">                                                                
                                    <InputComponent 
                                        inputType={"number"}
                                        inputClass={"form-control"}
                                        inputID={"floatingTransfer"}
                                        placeholderTitle={"Transfer"}
                                        inputValue={amountToTransfer}
                                        handleOnChange={setAmountToTransfer}                                        
                                        isLabel={true}
                                        label={`Amount to Transfer`}
                                    />                                    
                                </div>
                                
                                <ButtonComponent
                                    btnClass={"btn btn-primary"}
                                    handleFunction={() => handleTransfer()}
                                    btnDescription={"Transfer"}
                                />
                            </div>
                            <div style={{marginBottom: '1rem'}}>
                                {modalDetailsAlert.amountEnteredIsNegative && <p className="error-message">Amount entered cannot be negative.</p>}
                                {modalDetailsAlert.insufficientBalanceTransfer && <p className="error-message">You have an Insufficient Balance. Please Try Again.</p>}                                
                                {modalDetailsAlert.enterAnAmountToTransfer && <p className="enter-an-amount-message">Please enter an amount to transfer.</p>}
                                {modalDetailsAlert.sameAccountNumber &&  <p className="enter-an-amount-message">Invalid Action. You cannot send amount to the same Account #. Please Try Again.</p>}
                                {modalDetailsAlert.accountNumberNotValidTransfer && <p className="error-message">Account# is not valid. Please Try Again.</p>}                      
                                {modalDetailsAlert.accountNumberCannotBeBlank && <p className="error-message">Account# to transfer to cannot be blank. Please Try Again. </p>}
                            </div>
                        </div>
                    </div>                 
                    </div>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShow(false); resetTransaction()}}>
            Close
          </Button>        
        </Modal.Footer>
    </Modal>
    </div> 
    )
}

export default ModalForDetailsComponent

import React from 'react'
import InputComponent from './InputComponent'
import Modal from 'react-bootstrap/Modal'


const ModalComponent = ({expenseDetails, setExpenseDetails, handleSaveUsers, errorState, modalShow, closeModalComponent, resetUserInput}) => {
    return (
        
        <div>
              <Modal
                    show={modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                >
                        <Modal.Header>
                             <Modal.Title id="contained-modal-title-vcenter">
                             <div style={{display: 'flex', flexDirection: 'column'}}>
                                <h5 className="modal-title" id="exampleModalLabel">Expenses Information</h5>
                                <p className="required">***All Fields are REQUIRED***</p>
                            </div>
                             <button type="button" className="btn-close modal-close-btn" data-bs-dismiss="modal" aria-label="Close" onClick={() => {closeModalComponent()}}></button>
                             </Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <form onSubmit={handleSaveUsers}  noValidate>
                                {/* <div className="form-floating mb-3">
                                    <InputComponent
                                        inputType={"text"}
                                        inputClass={"form-control"}
                                        inputID={"floatingInput"}
                                        placeholderTitle={"Account No."}                                
                                        inputValue={accountNo}                                
                                        label={`Account No.`}
                                        isReadOnly={true}                                
                                    />
                                </div> */}
                                <div className="form-floating mb-3">
                                    <InputComponent
                                        inputType={"text"}
                                        inputClass={"form-control"}
                                        inputID={"floatingUserName"}
                                        placeholderTitle={"Item Name"}
                                        handleOnChange={(e) => setExpenseDetails({...expenseDetails, itemName: e.target.value})}                                
                                        inputValue={expenseDetails.itemName}                                
                                        label={`Item Name`}
                                        // errorMessage={errorState.username && <p className="error-message">Username is required</p>}  
                                        // isError={errorState.username}                                                           
                                    />
                                </div>
                                <div className="form-floating mb-3">
                                    <InputComponent
                                        inputType={"number"}
                                        inputClass={"form-control"}
                                        inputID={"floatingPassword"}
                                        placeholderTitle={"Quantity"}
                                        handleOnChange={(e) => setExpenseDetails({...expenseDetails, quantity: e.target.value})}                                
                                        inputValue={expenseDetails.quantity}                                
                                        label={`Quantity`}     
                                        // errorMessage={errorState.password && <p className="error-message">Password is required</p>}  
                                        // isError={errorState.password}                                                       
                                    />
                                </div>
                                <div className="form-floating mb-3">
                                    <InputComponent
                                        inputType={"number"}
                                        inputClass={"form-control"}
                                        inputID={"floatingRetypePassword"}
                                        placeholderTitle={"Price"}
                                        handleOnChange={(e) => setExpenseDetails({...expenseDetails, price: e.target.value})}                                
                                        inputValue={expenseDetails.price}                                
                                        label={`Price`}
                                        // errorMessage={errorState.retypePassword && <p className="error-message">Retype Password is required</p>}  
                                        // isError={errorState.retypePassword}  
                                    />
                                </div>
                                
                                <div className="form-floating mb-3">
                                    <InputComponent
                                        inputType={"submit"}
                                        inputClass={"submit-btn"}                              
                                        inputValue={'Submit'}                                                   
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                </Modal>
        </div>
    )
}

export default ModalComponent

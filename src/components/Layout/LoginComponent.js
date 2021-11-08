import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bankLogo from '../../assets/blg.png'
import { Link } from "react-router-dom";

const LoginModalComponent = ({modalShow,setModalShow, loginAccount, LogIn, usernameInput, setUsernameInput, passwordInput, setPasswordInput, handleCheckUser, passwordState, handleShowPassword, handleHidePassword}) => {
    
    return (
        <div className="login-modal-main-container">
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                dialogClassName="login-modal-main-container"
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className="login-modal-title-container">
                    <span className="fs-4 login-bank-logo"><img src={bankLogo} style={{width: '50%'}} alt="Bank Logo"/></span>
                    <h6 className="modal-title log-in-account-title" id="exampleModalLiveLabel"><LogIn/>Login to your account</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="account-row input-group mb-3">
                    <span>Username</span>
                    <input type="text" className="login form-control" placeholder="admin" onChange={(e) => setUsernameInput(e.target.value)} value={usernameInput}/>
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <div class="input-group" id="show_hide_password">
                        <input placeholder="1234" class="form-control" type={passwordState.password? 'text':"password"} onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput}/>
                        <div class="input-group-addon" onMouseDown={() => handleShowPassword(true)} onMouseUp={() => handleHidePassword(false)}>
                        {!passwordState.password? <i class="fa fa-eye-slash" aria-hidden="true"></i>:
                            <i class="fa fa-eye" aria-hidden="true" ></i>}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/"> 
                    <Button onClick={() => handleCheckUser()}>Login</Button>
                </Link>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LoginModalComponent

import './style.css';
import {
    PersonPlus,
    PayMoneyIcon
} from './component';

import ButtonComponent from './ButtonComponent';
import TableComponent from './TableComponent';
import ModalComponent from './ModalComponent';
import ModalDetailsComponent from './ModalDetailsComponent';
import useHooks from './hooks'

const Index = () => {
    const {
        currentSelectedData,
        setCurrentSelectedData, 
        users, 
        accountNo,  
        userName, 
        setUserName, 
        password, 
        setPassword, 
        retypePassword, 
        setRetypePassword, 
        firstName, 
        setFirstName, 
        lastName, 
        setLastName, 
        address, 
        setAddress, 
        mobileNo, 
        setMobileNo, 
        email, 
        setEmail, 
        balance, 
        setBalance, 
        amountToWithdraw, 
        setAmountToWithdraw, 
        amountToDeposit, 
        setAmountToDeposit, 
        transferTo, 
        setTransferTo, 
        amountToTransfer, 
        setAmountToTransfer,
        transferMessage,
        handleGenerateAccountNo,
        handleSaveUsers,
        handleDeleteUser,
        handleWithdraw,
        handleDeposit,
        handleTransfer,
        errorState,
        setErrorState,
        convertToMoney,
        modalDetailsAlert,
        resetTransaction,        
        modalShow,
        closeModalComponent,
        resetUserInput,
        insertUserData,
        withdrawMessage,
        depositMessage,
        loadDummyData,
        searchTerm,
        searchResults,
        searchHandler,
        expenses,
        expenseDetails,
        setExpenseDetails,
        expenseItems,
        userSelected
    } = useHooks();


    return (
        <div className="users-container">       
            <div className='btns-n-search'>
                <div className="add-client-btns">
                    <ButtonComponent
                        handleFunction = {handleGenerateAccountNo}
                        iconName = {<PayMoneyIcon/>}                
                        btnDescription = {"Add Expense Item"}
                        btnClass= {"btn btn-primary add-user-btn add-expense-btn"}
                        dbsToggle={"modal"}
                        dbsTarget={"#exampleModal"}
                    />
                    {/* <ButtonComponent
                        handleFunction = {insertUserData}                               
                        btnDescription = {"Load Data"} 
                        btnClass={loadDummyData ? "btn btn-secondary" : "btn btn-primary"}
                                    
                    /> */}
                </div>
                <div class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandler} value={searchTerm}/>
                </div>
            </div>
            <TableComponent
                handleDeleteUser={handleDeleteUser}
                expenses={searchTerm.length < 1 ? userSelected.expenses : searchResults}
                setCurrentSelectedData={setCurrentSelectedData}
            />       
            {/* <!-- Modal --> */}
            <ModalComponent
                accountNo={accountNo}  
                setUserName={setUserName}
                userName={userName}
                setPassword={setPassword}
                password={password}
                retypePassword={retypePassword}
                setRetypePassword={setRetypePassword}
                setFirstName={setFirstName}
                firstName={firstName}
                setLastName={setLastName}
                lastName={lastName}
                setAddress={setAddress}
                address={address}
                setMobileNo={setMobileNo}
                mobileNo={mobileNo}
                setEmail={setEmail}
                email={email}
                setBalance={setBalance}
                balance={balance}
                handleSaveUsers={handleSaveUsers}   
                errorState={errorState} 
                setErrorState={setErrorState}                 
                modalShow={modalShow}
                closeModalComponent={closeModalComponent}
                resetUserInput={resetUserInput}
                expenseDetails={expenseDetails}
                setExpenseDetails={setExpenseDetails}
            />   
            {/* ModalComponentForDetails */}             
            <ModalDetailsComponent
                currentSelectedData={currentSelectedData}            
                convertToMoney={convertToMoney}
                setAmountToWithdraw={setAmountToWithdraw}
                amountToWithdraw={amountToWithdraw}
                handleWithdraw={handleWithdraw}
                amountToDeposit={amountToDeposit}
                setAmountToDeposit={setAmountToDeposit}
                transferTo={transferTo}
                setTransferTo={setTransferTo}
                amountToTransfer={amountToTransfer}
                setAmountToTransfer={setAmountToTransfer}
                transferMessage={transferMessage}
                handleDeposit={handleDeposit}
                handleTransfer={handleTransfer}
                modalDetailsAlert={modalDetailsAlert}
                resetTransaction={resetTransaction}
                withdrawMessage={withdrawMessage}
                depositMessage={depositMessage}
                userSelected={userSelected}
                expenseItems={expenseItems[0]}
            />
        </div>
    )
}

export default Index;

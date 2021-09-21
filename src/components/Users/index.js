import './style.css';
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
        loadDummyData,
        searchTerm,
        searchResults,
        searchHandler,
        deleteDummyAccounts,
        sortByAccountNumber,
        sortByFullName,
        sortByAddress,
        sortByMobileNo,
        sortByEmail,
        sortByCurrentBalance,
        isOrdered,
        show,
        setShow                     
    } = useHooks();

    

    return (
        <div className="users-container">            
            <TableComponent
                handleDeleteUser={handleDeleteUser}
                users={searchTerm.length < 1 ? users : searchResults}
                setCurrentSelectedData={setCurrentSelectedData}
                insertUserData={insertUserData}
                loadDummyData={loadDummyData}
                searchHandler={searchHandler}
                searchTerm={searchTerm}
                deleteDummyAccounts={deleteDummyAccounts}
                handleGenerateAccountNo={handleGenerateAccountNo}
                sortByAccountNumber={sortByAccountNumber}
                sortByFullName={sortByFullName}                
                sortByAddress={sortByAddress}
                sortByMobileNo={sortByMobileNo}
                sortByEmail={sortByEmail}
                sortByCurrentBalance={sortByCurrentBalance}
                convertToMoney={convertToMoney}
                isOrdered={isOrdered}   
                show={show}
                setShow={setShow}                          
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
                handleDeposit={handleDeposit}
                handleTransfer={handleTransfer}
                modalDetailsAlert={modalDetailsAlert}
                resetTransaction={resetTransaction}                
                show={show}
                setShow={setShow}                
            />
        </div>
    )
}

export default Index;

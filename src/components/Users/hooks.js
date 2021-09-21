import { useState, useContext } from 'react'
import {AppContext} from '../Global/AppContext'
import useLocalStorage from './useLocalStorage'
import {convertToMoney} from '../lib/helpers'
import { toast } from 'react-toastify';

const useHooks = () => {    
    const {withdrawalHistories,
        depositHistories,
        transfersHistories,
        setWithdrawalHistories,
        setDepositHistories,
        setTransfersHistories} = useContext(AppContext)

    const [currentSelectedData, setCurrentSelectedData] = useState({});
    const [users, setUsers] = useLocalStorage('usersData', [])
    const [loadDummyData, setLoadDummyData] = useLocalStorage('dummyAccounts', false)
    const [accountNo, setAccountNo] = useState('')
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState('');
    const [amountToWithdraw, setAmountToWithdraw] = useState('')
    const [amountToDeposit, setAmountToDeposit] = useState('')
    const [transferTo, setTransferTo] = useState('')    
    const [amountToTransfer, setAmountToTransfer] = useState('')
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);  
    const [searchTerm, setSearchTerm] = useState('');  
    const [searchResults, setSearchResults] = useState([]);    
    const [modalDetailsAlert, setModalDetailsAlert] = useState({
        insufficientBalance: false,
        successful: false,
        enterAnAmountToWithdraw: false,
        successfulDeposit: false,
        enterAnAmountToDeposit: false,
        insufficientBalanceTransfer: false,
        successfulTransfer: false,
        enterAnAmountToTransfer: false,
        sameAccountNumber: false,
        accountNumberNotValidTransfer: false,
        accountNumberCannotBeBlank: false,
        amountEnteredIsNegative: false,
        amountEnteredIsNegativeWithdraw: false,
        amountEnteredIsNegativeDeposit: false
    });

    const [isOrdered, setIsOrdered] = useState({
        accountNumber: false,
        fullName: false,        
        address: false,
        mobileNo: false,
        email: false,
        balance: false,
    })  

    const [errorState, setErrorState] = useState({
        username: false,
        password: false,
        retypePassword: false,
        firstName: false,
        lastName: false,
        address: false,
        mobileNo: false,
        email: false,
        usernameAlreadyExists: false,
        passwordsDoNotMatch: false,
        firstNameCantStartWithNumber: false,
        lastNameCantStartWithNumber: false,
        usernameCantContainSpace: false,
        invalidEmailFormat: false
    })       

    // For Generating User Account Number
    const handleGenerateAccountNo = () => {
        let date = new Date();
        let minutes = '0' + date.getMinutes().toString().substr(-2)
        let hours = '0' + date.getHours().toString().substr(-2)
        let month = '0' + (date.getMonth() + 1).toString().substr(-2)
        let year = date.getFullYear().toString().substr(-2)
        setAccountNo(year + month + hours + minutes + Math.floor(10 + Math.random() * 90))
        setModalShow(true)
    }


    // Add user Close Modal - State Reset 
    const closeModalComponent = () => {
        setModalShow(false)
        setErrorState({
            username: false,
            password: false,
            retypePassword: false,
            firstName: false,
            lastName: false,
            address: false,
            mobileNo: false,
            email: false,
            usernameAlreadyExists: false,
            passwordsDoNotMatch: false,
            firstNameCantStartWithNumber: false,
            lastNameCantStartWithNumber: false,
            usernameCantContainSpace: false,
            invalidEmailFormat: false                        
        })
    }

    // Add user validations
    const validation = (newUser) => {
        if(users.find((user) => {return user.username === userName})) {            
            setErrorState({usernameAlreadyExists: true})
       }
       else if (password !== retypePassword) {            
            setErrorState({passwordsDoNotMatch: true})
       } 
       else if (!userName) {
            setErrorState({username: true})            
       }
       else if (!password) {
        setErrorState({password: true})
       }
       else if (!retypePassword) {
        setErrorState({retypePassword: true})
       }
       else if (!firstName) {
        setErrorState({firstName: true})
       }
       else if (!lastName) {
        setErrorState({lastName: true})
       }
       else if (!address) {
        setErrorState({address: true})
       }
       else if (!mobileNo) {
        setErrorState({ mobileNo: true})
       }
       else if (!email) {
        setErrorState({email: true})
       }
        else if (userName) {
            setErrorState({username: false})
              if(!userName.includes(" ")){                    
                 if (password) {
                    setErrorState({password: false})
                    if (retypePassword) {
                        setErrorState({retypePassword: false})
                        if (firstName) {
                            setErrorState({firstName: false})
                            if(isNaN(firstName.substring(0, 1))) {
                                if (lastName) {
                                    setErrorState({lastName: false})
                                    if(isNaN(lastName.substring(0, 1))){
                                        if (address) {
                                            setErrorState({address: false})
                                            if (mobileNo) {
                                                setErrorState({mobileNo: false})
                                                if (email) {
                                                    setErrorState({email: false})
                                                        if(email.includes("@" && ".com")){
                                                    setUsers([...users, newUser])
                                                    setAccountNo('')
                                                    setUserName('')
                                                    setPassword('')
                                                    setRetypePassword('')
                                                    setFirstName('')
                                                    setLastName('')
                                                    setAddress('')
                                                    setMobileNo('')
                                                    setEmail('')
                                                    setBalance(0)
                                                    setAmountToWithdraw(0)
                                                    setAmountToTransfer(0)
                                                    setAmountToDeposit(0)
                                                    setTransferTo('')
                                                    setModalShow(false)                                                
                                                    toastNotify("success", `Account Created for ${firstName}!`, "top-center", "colored")    
                                                    } else {
                                                        setErrorState({invalidEmailFormat: true})
                                                    }                                                   
                                                }
                                            }
                                        }
                                    }
                                    else {                                        
                                        setErrorState({lastNameCantStartWithNumber: true})
                                    }
                                }
                            }
                            else {                                
                                setErrorState({firstNameCantStartWithNumber: true})
                            }
                        }
                    }
               }
        }
        else {            
            setErrorState({usernameCantContainSpace: true})
        } 
    }
}
    // Modal Component Reset state
    const resetUserInput = () => {
        setAccountNo("");
        setUserName("");
        setPassword("");
        setRetypePassword("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setMobileNo("");
        setEmail("");
    }   

    // Adding user Account
    const handleSaveUsers = (e) => {
        e.preventDefault();
        try {
            let enPassword = Buffer.from(password).toString('base64');
            let lowerCasedUserName= userName.toLowerCase()
            const newUser = {
                account_no: accountNo,
                username: lowerCasedUserName, 
                password: enPassword,
                first_name: firstName,
                last_name: lastName,
                address: address,
                mobile_no: mobileNo,
                email: email,
                balance: balance,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            }
            validation(newUser);
       
        } catch(e) {
            console.log(`Error in handleSaveUsers`, e)
        }
    }

    // Deleting User Account
    const handleDeleteUser = (id) => {
        const index = users.findIndex(user => {return user.account_no === id})
        users.splice(index, 1)
        setUsers([...users])
        checkDummyData(users)   
    }

    // Checking if dummy exist - (Load Data button)
    const checkDummyData = (users) => {
        const userAccounts = users.map(user=>user.account_no)
        const dummyAccounts = ["22902201921", "22902201922", "22902201923", "22902201924", "22902201925", "22902201926", "22902201927", "22902201928", "22902201929", "22902201930"]
        if(!dummyAccounts.some(val=>userAccounts.includes(val))){
            setLoadDummyData(false)                     
        }        
   }   
   
    //  Deleting dummy accounts (Delete Data Button)
   const deleteDummyAccounts = ()=> {                 
        if(loadDummyData){           
        toastNotify("warn", `Deleted Test Data`, "top-right", "colored")
        const dummyAccounts = ["22902201921", "22902201922", "22902201923", "22902201924", "22902201925", "22902201926", "22902201927", "22902201928", "22902201929", "22902201930"]
        const newUsers = users.filter(user=>user =! dummyAccounts.includes(user.account_no))         
        setUsers([...newUsers])   
        } 
        setLoadDummyData(false)    
   }

    // Functions for Histories
    const handleHistories = (action) => {
        const newHistory = {
            account_no: currentSelectedData.account_no,
            username: currentSelectedData.username, 
            first_name: currentSelectedData.first_name,
            last_name: currentSelectedData.last_name,
            address: currentSelectedData.address,
            mobile_no: currentSelectedData.mobile_no,
            email: currentSelectedData.email,
            balance: currentSelectedData.balance,
            latestWithdrawnAmount: currentSelectedData.latestWithdrawnAmount,
            latestDepositAmount: currentSelectedData.latestDepositAmount,
            latestTransferAmount: currentSelectedData.latestTransferAmount,
            latestTransferTo: currentSelectedData.latestTransferTo,
            currentDatenTime: new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
        }
        if(action === 'withdraw') {
            setWithdrawalHistories([...withdrawalHistories, newHistory])
        }
        else if (action === 'deposit') {
            setDepositHistories([...depositHistories, newHistory])
        } else if (action === 'transfer') {
            setTransfersHistories([...transfersHistories, newHistory])
        }
    }

    // Withdraw Function 
    const handleWithdraw = () => {
        if(amountToWithdraw < 0){
            setModalDetailsAlert({amountEnteredIsNegativeWithdraw: true,})                        
        }
        else if(amountToWithdraw > 0) {                        
                if(amountToWithdraw <= currentSelectedData.balance) {
                     let currentBalance = currentSelectedData.balance - amountToWithdraw;
                     setUsers([...users], currentSelectedData.balance = currentBalance, currentSelectedData.latestWithdrawnAmount = amountToWithdraw)
                     handleHistories('withdraw');                                                                                    
                        toastNotify("success", `Successfully Withdrawn ${convertToMoney(amountToWithdraw)} from ${currentSelectedData.account_no}`, "top-right", "colored")                                      
                        setShow(false)
                        resetTransaction() 
                } else {
                 setModalDetailsAlert({insufficientBalance: true})
                } 
            }
         else {            
            setModalDetailsAlert({enterAnAmountToWithdraw: true})
        }
    }

    // Depositing Account
    const handleDeposit = () => {
        if(amountToDeposit < 0){
            setModalDetailsAlert({amountEnteredIsNegativeDeposit: true,})
        }
        else if(amountToDeposit > 0) {
            let currentBalance = (+currentSelectedData.balance) + (+amountToDeposit);
            setUsers([...users], currentSelectedData.balance = currentBalance, currentSelectedData.latestDepositAmount = amountToDeposit)
            handleHistories('deposit');            
                toastNotify("success", `Successfully Deposited ${convertToMoney(amountToDeposit)} to ${currentSelectedData.account_no}`, "top-right", "colored")                                      
                resetTransaction()
                setShow(false)            
        } else {
            setModalDetailsAlert({enterAnAmountToDeposit: true})
        }
    }

    
    // Transferring money from user to another
    const handleTransfer = () => {
        if(transferTo){
            const toUser = users.find(user => {return user.account_no === transferTo})                    
            if(toUser) {
                if(toUser.account_no !== currentSelectedData.account_no) {
                    if(amountToTransfer < 0) {
                        setModalDetailsAlert({amountEnteredIsNegative: true})
                    } else {
                        if(amountToTransfer > 0) {
                            if(amountToTransfer <= currentSelectedData.balance) {
                                let currentBalance = (+currentSelectedData.balance) - (+amountToTransfer)
                                let toUserCurrentBalance = (+toUser.balance) + (+amountToTransfer);
                                setUsers([...users], 
                                    currentSelectedData.balance = currentBalance, 
                                    currentSelectedData.latestTransferAmount = amountToTransfer, 
                                    currentSelectedData.latestTransferTo = transferTo,
                                    toUser.balance = toUserCurrentBalance)
                                handleHistories('transfer');                                
                                    toastNotify("success",`Successfully Transferred ${convertToMoney(amountToTransfer)} from ${currentSelectedData.account_no} to ${transferTo}`, "top-right", "colored")                                      
                                    setShow(false) 
                                    resetTransaction()
                            } else {
                                setModalDetailsAlert({insufficientBalanceTransfer: true})
                            }
                        } else {
                            setModalDetailsAlert({amountToTransfer: true})
                        }
                    }
                } else {
                    setModalDetailsAlert({sameAccountNumber: true})
                }
            } else {
                setModalDetailsAlert({accountNumberNotValidTransfer: true})
            }
        } else {
            setModalDetailsAlert({accountNumberCannotBeBlank: true})
        }
    }

    // Reset Transaction when click (close button - user modal details)
    const resetTransaction = () => {
        setAmountToWithdraw('')
        setAmountToDeposit('')
        setAmountToTransfer('')
        setTransferTo('')        
        setModalDetailsAlert({
            insufficientBalance: false,
            successful: false,
            enterAnAmountToWithdraw: false,
            successfulDeposit: false,
            enterAnAmountToDeposit: false,
            insufficientBalanceTransfer: false,
            successfulTransfer: false,
            enterAnAmountToTransfer: false,
            sameAccountNumber: false,
            accountNumberNotValidTransfer: false,
            accountNumberCannotBeBlank: false,
            amountEnteredIsNegative: false,
            amountEnteredIsNegativeWithdraw: false,
        });
    }

    // Adding 10 users on one click
    const insertUserData = (e) => {             
            if(!loadDummyData){           
            toastNotify("success", "Successfully Loaded Test Data", "top-right", "colored")    
            setUsers([...users, {
                account_no: "22902201921",
                username: "Bryan", 
                password: "QnJ5YW4=",
                first_name: "Bryan",
                last_name: "L",
                address: "Boardwalk",
                mobile_no: 921985641,
                email: "Bryan@email.com",
                balance: 2000000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201922",
                username: "Greg", 
                password: "R3JlZw==",
                first_name: "Greg",
                last_name: "L",
                address: "Park Place",
                mobile_no: 952314785,
                email: "Greg@email.com",
                balance: 575000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201923",
                username: "Martney", 
                password: "TWFydG5leQ==",
                first_name: "Martney",
                last_name: "A",
                address: "Pennsylvania Avenue",
                mobile_no: 996214756,
                email: "Martney@email.com",
                balance: 600000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,   
            },
            {
                account_no: "22902201924",
                username: "Lebron", 
                password: "TGVicm9u",
                first_name: "Lebron",
                last_name: "J",
                address: "North Carolina Avenue",
                mobile_no: 965987412,
                email: "Lebron@email.com",
                balance: 1650000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201925",
                username: "Adrian", 
                password: "QWRyaWFu",
                first_name: "Adrian",
                last_name: "C",
                address: "Pacific Avenue",
                mobile_no: 975632145,
                email: "Adrian@email.com",
                balance: 700000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201926",
                username: "John", 
                password: "Sm9obg==",
                first_name: "John",
                last_name: "Y",
                address: "Marvin Gardens",
                mobile_no: 932564782,
                email: "John@email.com",
                balance: 750000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201927",
                username: "Victor", 
                password: "VmljdG9y",
                first_name: "Victor",
                last_name: "R",
                address: "Ventnor Avenue",
                mobile_no: 945632187,
                email: "Victor@email.com",
                balance: 800000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201928",
                username: "Jerick", 
                password: "SmVyaWNr",
                first_name: "Jerick",
                last_name: "B",
                address: "Atlantic Avenue",
                mobile_no: 986325412,
                email: "Jerick@email.com",
                balance: 900000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201929",
                username: "Stephen", 
                password: "SXNpYWg=",
                first_name: "Isiah",
                last_name: "C",
                address: "Indiana Avenue",
                mobile_no: 916543874,
                email: "Isiah@email.com",
                balance: 1200000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            },
            {
                account_no: "22902201930",
                username: "Carla", 
                password: "Q2FybGE=",
                first_name: "Carla",
                last_name: "M",
                address: "Kentucky Avenue",
                mobile_no: 932564128,
                email: "Carla@email.com",
                balance: 1100000,
                role: 'client' ,
                thumbnail_url: '',
                latestWithdrawnAmount: amountToWithdraw,
                latestDepositAmount: amountToDeposit,
                latestTransferAmount: amountToTransfer,
                latestTransferTo: transferTo,
            }
            ])
            setLoadDummyData(true)
        } else {
            e.preventDefault()
        }   
    }

    // For querying user accounts
    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
        if(searchTerm !== '') {
            const newUserList = users.filter((user) => {
               return Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            });
            setSearchResults(newUserList)
        }
        else {
            setSearchResults(users)
        }
    }
    
    // Sorting function section
    const sortByAccountNumber = () => {
        setIsOrdered({...isOrdered,
            accountNumber: !isOrdered.accountNumber,
            // firstName: false,
            // lastName: false,
            // address: false,
            // mobileNo: false,
            // email: false  
        })        
        users.sort((a, b)=>{
        return (isOrdered.accountNumber ? a.account_no - b.account_no : b.account_no - a.account_no)
        })
        setUsers([...users])      
        toastNotify("success", "Sorted By Account Number", "top-right")            
    } 

    
    const sortByFullName = () => {  
        setIsOrdered({...isOrdered,
            fullName: !isOrdered.fullName,
            // accountNumber: false,    
            // lastName: false,
            // address: false,
            // mobileNo: false,
            // email: false  
        })                
            users.sort((a, b)=>{              
            let nameA = a.first_name.toUpperCase() + " " + a.last_name.toUpperCase();
            let nameB = b.first_name.toUpperCase() + " " + b.last_name.toUpperCase();                    
            if (nameA > nameB) {
                return (isOrdered.fullName ? 1: -1)
              }
            if (nameA < nameB) {
                return (isOrdered.fullName ? -1: 1)
              }
              return 0        
          });            
            setUsers([...users])    
            toastNotify("success", "Sorted By Full Name", "top-right")  
    }    

    const sortByAddress = () => {
        setIsOrdered({...isOrdered,
            address: !isOrdered.address,
            // lastName: false
            // firstName: false
            // accountNumber: false,    
            // mobileNo: false,
            // email: false  
        })                 
        users.sort((a, b)=>{              
        let nameA = a.address.toUpperCase();
        let nameB = b.address.toUpperCase();                    
        if (nameA > nameB) {
            return (!isOrdered.address ? 1: -1)
          }
        if (nameA < nameB) {
            return (!isOrdered.address ? -1: 1)
          } 
          return 0          
      });            
        setUsers([...users])
        toastNotify("success", "Sorted By Address", "top-right")
    }

    const sortByMobileNo = () => {
        setIsOrdered({...isOrdered,
            mobileNo: !isOrdered.mobileNo,
            // address: false
            // lastName: false
            // firstName: false
            // accountNumber: false,       
            // email: false  
        })        
        users.sort((a, b)=>{
        return (isOrdered.mobileNo ? a.mobile_no - b.mobile_no : b.mobile_no - a.mobile_no)
        })
        setUsers([...users])     
        toastNotify("success", "Sorted By Phone Number", "top-right")           
    } 

    const sortByEmail = () => {
        setIsOrdered({...isOrdered,
            email: !isOrdered.email  
            // mobileNo: false
            // address: false
            // lastName: false
            // firstName: false
            // accountNumber: false,           
        })                  
        users.sort((a, b)=>{              
        let emailA = a.email.toUpperCase();
        let emailB = b.email.toUpperCase();                    
        if (emailA > emailB) {
            return (isOrdered.email ? 1: -1)
          }
        if (emailA < emailB) {
            return (isOrdered.email ? -1: 1)
          } 
          return 0          
      });            
        setUsers([...users])
        toastNotify("success", "Sorted By Email", "top-right")
    }

    const sortByCurrentBalance = () => {
        setIsOrdered({...isOrdered,
            balance: !isOrdered.balance,           
        })        
        users.sort((a, b)=>{
        return (isOrdered.balance ? a.balance - b.balance : b.balance - a.balance)
        })
        setUsers([...users])      
        toastNotify("success", "Sorted By Current Balance", "top-right")
    }   
    
    const toastNotify = (type, str, position, colored=null) => {
            if(type==="success"){
            toast.success(str, {
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: colored            
            }); 
        } else if (type==="warn"){
            toast.warning(str, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined, 
                theme: colored
                }); 
        } 
    }
    
    return {
        currentSelectedData,
        setCurrentSelectedData, 
        users, 
        setUsers, 
        accountNo, 
        setAccountNo, 
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
        setModalShow,
        modalShow,
        closeModalComponent,
        resetUserInput,
        insertUserData,        
        loadDummyData,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
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
    }
}

export default useHooks

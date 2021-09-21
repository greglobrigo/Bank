import { useState, useContext, useEffect } from 'react'
import {AppContext} from '../Global/AppContext'
import useLocalStorage from '../Users/useLocalStorage'
import {convertToMoney} from '../lib/helpers'
import useSessionStorage from '../Layout/useSessionStorage'

const useHooks = () => {    
    const {withdrawalHistories,
        depositHistories,
        transfersHistories,
        setWithdrawalHistories,
        setDepositHistories,
        setTransfersHistories} = useContext(AppContext)

    const [users, setUsers] = useLocalStorage('usersData', [])
    const [loginAccount, setLoginAccount] = useSessionStorage('loginAccount', []);
    const [currentSelectedData, setCurrentSelectedData] = useState(loginAccount[0])
    const [expenses, setExpenses] = useLocalStorage('expensesData', [])
    const [loadDummyData, setLoadDummyData] = useLocalStorage('dummyAccounts', false)
    const [expenseDetails, setExpenseDetails] = useState({
        itemName: '',
        quantity: '',
        price: ''
    })
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [transferMessage, setTransferMessage] = useState({})
    const [withdrawMessage, setwithdrawMessage] = useState('')
    const [depositMessage, setDepositMessage] = useState('')
    const [amountToTransfer, setAmountToTransfer] = useState('')
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
    const [errorState, setErrorState] = useState({
        username: false,
        password: false,
        retypePassword: false,
        firstName: false,
        lastName: false,
        address: false,
        mobileNo: false,
        email: false
    })
    let userSelected = users.find((user) => {return user.account_no === currentSelectedData.account_no})
    
    let userExpenses = users.map((user) => {
        return {    
            ...user, 
            expenses: expenses.filter((expense) => {
                return expense.account_no === user.account_no
            })
        }
    })


    let expenseItems = userExpenses.filter((userExpense) => {
        return (userExpense.account_no === userSelected.account_no)
    })

    
    const handleGenerateAccountNo = () => {
        setModalShow(true)
    }

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
            email: false
        })
    }
    const validation = (newExpense) => {
    //     if(expenses.find((expense) => {return expense.item_name === item_name})) {
    //         alert('Username already exists.')
    //    } else {
        setExpenses([...expenses, newExpense])
        setModalShow(false)
        alert('Expenses added')
    //    }
    }

    // const resetUserInput = () => {
    //     setAccountNo("");
    //     setUserName("");
    //     setPassword("");
    //     setRetypePassword("");
    //     setFirstName("");
    //     setLastName("");
    //     setAddress("");
    //     setMobileNo("");
    //     setEmail("");
    // }   

    useEffect(() => {
        setUsers(users.map((user) => {
            return {    
                ...user, 
                expenses: expenses.filter((expense) => {
                    return expense.account_no === user.account_no
                })
            }
        }))
    }, [expenses])


    const handleSaveUsers = (e) => {
        e.preventDefault();
        try {
            const newExpense = {
                account_no: userSelected.account_no,
                item_name: expenseDetails.itemName, 
                quantity: expenseDetails.quantity,
                price: expenseDetails.price,
            }
            
            validation(newExpense)
        } catch(e) {
            console.log(`Error in handleSaveExpenses`, e)
        }
    }

    const handleDeleteUser = (id) => {
        const index = users.findIndex(user => {return user.account_no === currentSelectedData.account_no})
        console.log({id})
        // users[index].expenses.splice(id, 1)
        expenseItems[0].expenses.splice(id, 1)
        setUsers([...users])
        console.log({expenseItems})
        console.log({users})
    }

    // const handleHistories = (action) => {
    //     const newHistory = {
    //         account_no: currentSelectedData.account_no,
    //         username: currentSelectedData.username, 
    //         first_name: currentSelectedData.first_name,
    //         last_name: currentSelectedData.last_name,
    //         address: currentSelectedData.address,
    //         mobile_no: currentSelectedData.mobile_no,
    //         email: currentSelectedData.email,
    //         balance: currentSelectedData.balance,
    //         latestWithdrawnAmount: currentSelectedData.latestWithdrawnAmount,
    //         latestDepositAmount: currentSelectedData.latestDepositAmount,
    //         latestTransferAmount: currentSelectedData.latestTransferAmount,
    //         latestTransferTo: currentSelectedData.latestTransferTo,
    //         currentDatenTime: new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    //     }
    //     if(action === 'withdraw') {
    //         setWithdrawalHistories([...withdrawalHistories, newHistory])
    //     }
    //     else if (action === 'deposit') {
    //         setDepositHistories([...depositHistories, newHistory])
    //     } else if (action === 'transfer') {
    //         setTransfersHistories([...transfersHistories, newHistory])
    //     }
    // }


    // const handleWithdraw = () => {
    //     if(amountToWithdraw < 0){
    //         setModalDetailsAlert({amountEnteredIsNegativeWithdraw: true,})                        
    //     }
    //     else if(amountToWithdraw > 0) {                        
    //             if(amountToWithdraw <= currentSelectedData.balance) {
    //                  let currentBalance = currentSelectedData.balance - amountToWithdraw;
    //                  setExpenses([...expenses], currentSelectedData.balance = currentBalance, currentSelectedData.latestWithdrawnAmount = amountToWithdraw)
    //                  handleHistories('withdraw');
    //                  setModalDetailsAlert({insufficientBalance: false})
    //                  setModalDetailsAlert({successful: true})
    //                  setwithdrawMessage(amountToWithdraw)
    //                  setAmountToWithdraw('')
    //             } else {
    //              setModalDetailsAlert({insufficientBalance: true})
    //             } 
    //         }
    //      else {            
    //         setModalDetailsAlert({enterAnAmountToWithdraw: true})
    //     }
    // }

    // const handleDeposit = () => {
    //     if(amountToDeposit < 0){
    //         setModalDetailsAlert({amountEnteredIsNegativeDeposit: true,})
    //     }
    //     else if(amountToDeposit > 0) {
    //         let currentBalance = (+currentSelectedData.balance) + (+amountToDeposit);
    //         setExpenses([...expenses], currentSelectedData.balance = currentBalance, currentSelectedData.latestDepositAmount = amountToDeposit)
    //         handleHistories('deposit');
    //         setDepositMessage(amountToDeposit)
    //         setAmountToDeposit('')
    //         setModalDetailsAlert({successfulDeposit: true})
    //     } else {
    //         setModalDetailsAlert({enterAnAmountToDeposit: true})
    //     }
    // }

    

    // const handleTransfer = () => {
    //     if(transferTo){
    //         const toUser = expenses.find(user => {return user.account_no === transferTo})                    
    //         if(toUser) {
    //             if(toUser.account_no !== currentSelectedData.account_no) {
    //                 if(amountToTransfer < 0) {
    //                     setModalDetailsAlert({amountEnteredIsNegative: true})
    //                 } else {
    //                     if(amountToTransfer > 0) {
    //                         if(amountToTransfer <= currentSelectedData.balance) {
    //                             let currentBalance = (+currentSelectedData.balance) - (+amountToTransfer)
    //                             let toUserCurrentBalance = (+toUser.balance) + (+amountToTransfer);
    //                             setExpenses([...expenses], 
    //                                 currentSelectedData.balance = currentBalance, 
    //                                 currentSelectedData.latestTransferAmount = amountToTransfer, 
    //                                 currentSelectedData.latestTransferTo = transferTo,
    //                                 toUser.balance = toUserCurrentBalance)
    //                             handleHistories('transfer');
    //                             setTransferMessage({transferAmount: amountToTransfer, accountNo: transferTo, firstName: toUser.first_name, lastName: toUser.last_name})                            
    //                             setTransferTo('')
    //                             setAmountToTransfer('')
    //                             setModalDetailsAlert({successfulTransfer: true})
    //                         } else {
    //                             setModalDetailsAlert({insufficientBalanceTransfer: true})
    //                         }
    //                     } else {
    //                         setModalDetailsAlert({amountToTransfer: true})
    //                     }
    //                 }
    //             } else {
    //                 setModalDetailsAlert({sameAccountNumber: true})
    //             }
    //         } else {
    //             setModalDetailsAlert({accountNumberNotValidTransfer: true})
    //         }
    //     } else {
    //         setModalDetailsAlert({accountNumberCannotBeBlank: true})
    //     }
    // }

    // const resetTransaction = () => {
    //     setAmountToWithdraw('')
    //     setAmountToDeposit('')
    //     setAmountToTransfer('')
    //     setTransferTo('')
    //     setTransferMessage({})
    //     setModalDetailsAlert({
    //         insufficientBalance: false,
    //         successful: false,
    //         enterAnAmountToWithdraw: false,
    //         successfulDeposit: false,
    //         enterAnAmountToDeposit: false,
    //         insufficientBalanceTransfer: false,
    //         successfulTransfer: false,
    //         enterAnAmountToTransfer: false,
    //         sameAccountNumber: false,
    //         accountNumberNotValidTransfer: false,
    //         accountNumberCannotBeBlank: false,
    //         amountEnteredIsNegative: false,
    //         amountEnteredIsNegativeWithdraw: false,
    //     });
    // }

    

    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
        if(searchTerm !== '') {
            const newUserList = expenses.filter((user) => {
               return Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            });
            setSearchResults(newUserList)
        }
        else {
            setSearchResults(expenses)
        }
    }


    return {
        currentSelectedData,
        setCurrentSelectedData, 
        // users, 
        // setUsers, 
        expenses,
        setExpenses,
        // accountNo, 
        // setAccountNo, 
        // userName, 
        // setUserName, 
        // password, 
        // setPassword, 
        // retypePassword, 
        // setRetypePassword, 
        // firstName, 
        // setFirstName, 
        // lastName, 
        // setLastName, 
        // address, 
        // setAddress, 
        // mobileNo, 
        // setMobileNo, 
        // email, 
        // setEmail, 
        // balance, 
        // setBalance, 
        // amountToWithdraw, 
        // setAmountToWithdraw, 
        // amountToDeposit, 
        // setAmountToDeposit, 
        // transferTo, 
        // setTransferTo,
        transferMessage,
        amountToTransfer, 
        setAmountToTransfer,
        handleGenerateAccountNo,
        handleSaveUsers,
        handleDeleteUser,
        // handleWithdraw,
        // handleDeposit,
        // handleTransfer,
        errorState,
        setErrorState,
        convertToMoney,
        modalDetailsAlert,
        // resetTransaction,
        setModalShow,
        modalShow,
        closeModalComponent,
        // resetUserInput,
        // insertUserData,
        withdrawMessage,
        depositMessage,
        loadDummyData,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        searchHandler,
        expenseDetails,
        setExpenseDetails,
        expenseItems,
        userSelected
    }
}

export default useHooks

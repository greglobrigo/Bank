import { useState } from 'react'
import useLocalStorage from '../../Users/useLocalStorage'
import { toast } from 'react-toastify';

const useHooks = () => {    
    const [depositHistories, setDepositHistories] = useLocalStorage('depositHistories', [])

    const [isOrdered, setIsOrdered] = useState({
        accountNumber: false,
        fullName: false,
        date: false,
        depositAmount: false,                
        currentBalance: false,            
    })    

    const sortByAccountNumber = () => {
        setIsOrdered({...isOrdered,
            accountNumber: !isOrdered.accountNumber,        
        })        
        depositHistories.sort((a, b)=>{
        return (isOrdered.accountNumber ? a.account_no - b.account_no : b.account_no - a.account_no)
        })
        setDepositHistories([...depositHistories]) 
        toastNotify("success", "Sorted By Account Number", "top-right")                          
    } 
    
    const sortByFullName = () => {  
        setIsOrdered({...isOrdered,
            fullName: !isOrdered.fullName,         
        })                
            depositHistories.sort((a, b)=>{              
            let nameA = `${a.first_name.toUpperCase()} ${a.last_name.toUpperCase()}`;
            let nameB = `${b.first_name.toUpperCase()} ${b.last_name.toUpperCase()}`;                    
            if (nameA > nameB) {
                return (isOrdered.fullName ? 1: -1)
              }
            if (nameA < nameB) {
                return (isOrdered.fullName ? -1: 1)
              }
              return 0        
          });            
            setDepositHistories([...depositHistories]) 
            toastNotify("success", "Sorted By Full Name", "top-right")           
    }

    const sortByDate = () => {
        setIsOrdered({...isOrdered,
            date: !isOrdered.date,           
        })        
        depositHistories.sort((a, b)=>{
        const regex = ["/", ":", ",", " "]
        const date1 = parseInt(a.currentDatenTime.slice(0, 16).split("").filter(num=>num =! regex.includes(num)).join(""))
        const date2 = parseInt(b.currentDatenTime.slice(0, 16).split("").filter(num=>num =! regex.includes(num)).join(""))
        return (isOrdered.date ? date1 - date2 : date2 - date1)
        })
        setDepositHistories([...depositHistories]) 
        toastNotify("success", "Sorted By Date", "top-right")
    }
  

    const sortByDepositAmount = () => {
        setIsOrdered({...isOrdered,
            depositAmount: !isOrdered.depositAmount,           
        })        
        depositHistories.sort((a, b)=>{
        return (isOrdered.depositAmount ? a.latestDepositAmount - b.latestDepositAmount : b.latestDepositAmount - a.latestDepositAmount)
        })
        setDepositHistories([...depositHistories])  
        toastNotify("success", "Sorted By Deposit Amount", "top-right")               
    }    

    const sortByCurrentBalance = () => {
        setIsOrdered({...isOrdered,
            currentBalance: !isOrdered.currentBalance,           
        })        
        depositHistories.sort((a, b)=>{
        return (isOrdered.currentBalance ? a.balance - b.balance : b.balance - a.balance)
        })
        setDepositHistories([...depositHistories])   
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
        depositHistories,
        setDepositHistories,
        isOrdered,  
        sortByAccountNumber,        
        sortByDate,
        sortByFullName,
        sortByDepositAmount,        
        sortByCurrentBalance        
    }
}

export default useHooks

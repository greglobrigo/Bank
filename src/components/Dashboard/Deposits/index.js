import './style.css';
import {convertToMoney} from '../../lib/helpers'
import { ArrowSortedDownIcon, ArrowSortedUpIcon } from '../../Users/component';
import useHooks from './hooks';
import { ToastContainer } from 'react-toastify';
import Fade  from 'react-reveal/Fade'

const Index = ({loginAccount, isUser}) => {       

    const {depositHistories,
        setDepositHistories,
        isOrdered,
        sortByAccountNumber,        
        sortByDate,
        sortByFullName,
        sortByDepositAmount,
        sortByCurrentBalance} = useHooks()   

        const filteredHistory = depositHistories.filter((user) => {return user.account_no === loginAccount[0].account_no})

    return (
        <>
           <ToastContainer
            pauseOnFocusLoss={false}   
            limit={8}      
            />
        <div className="transaction-header">
            <Fade down>
            <h1>Deposits History</h1>  
            </Fade>           
            </div>
        <div className="dashboard-container">            
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th scope="col">#</th>
                        <th style={{cursor: "pointer"}} onClick={()=>!isUser && sortByAccountNumber()} scope="col">
                        Acct # {!isUser ? isOrdered.accountNumber ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/> : null}
                        </th>
                        <th style={{cursor: "pointer"}} onClick={()=> !isUser &&  sortByFullName()} scope="col">
                        Full Name {!isUser ? isOrdered.fullName ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/> : null}
                        </th> 
                        <th style={{cursor: "pointer"}} onClick={()=>sortByDate()} scope="col">
                        Date {isOrdered.date ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
                        </th>
                        <th style={{cursor: "pointer"}} onClick={()=>sortByDepositAmount()} scope="col">
                        Deposit Amt. {isOrdered.depositAmount ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
                        </th>
                        <th style={{cursor: "pointer"}} onClick={()=>sortByCurrentBalance()} scope="col">
                        Current Bal. {isOrdered.currentBalance ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!isUser ? 
                    depositHistories.map((user, index) => {
                        return (
                            <Fade up duration={index>10 ? 1000: `${index}00`}>
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{user.account_no}</td>
                                <td>{user.first_name + " " + user.last_name}</td>
                                <td>{user.currentDatenTime}</td>
                                <td>{convertToMoney(user.latestDepositAmount)}</td>
                                <td>{convertToMoney(user.balance)}</td>
                            </tr>
                            </Fade>
                        )
                    })
                    :
                    filteredHistory.map((user, index) => {
                        return (
                            <Fade up duration={index>10 ? 1000: `${index}00`}>
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{user.account_no}</td>
                                <td>{user.first_name + " " + user.last_name}</td>
                                <td>{user.currentDatenTime}</td>
                                <td>{convertToMoney(user.latestDepositAmount)}</td>
                                <td>{convertToMoney(user.balance)}</td>
                            </tr>
                            </Fade>
                        )
                    })
                }
                   
                </tbody>
            </table>
        </div>
    </>
    )
}

export default Index

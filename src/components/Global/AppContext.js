import React from 'react'
import useLocalStorage from '../Users/useLocalStorage'
export const AppContext = React.createContext();


const AppProvider = (props) => {
    const [withdrawalHistories, setWithdrawalHistories] = useLocalStorage('withdrawalHistories', [])
    const [depositHistories, setDepositHistories] = useLocalStorage('depositHistories', [])
    const [transfersHistories, setTransfersHistories] = useLocalStorage('transfersHistories', [])

    const state = {
        withdrawalHistories,
        depositHistories,
        transfersHistories
    }

    const func = {
        setWithdrawalHistories,
        setDepositHistories,
        setTransfersHistories
    }

    return (
        <AppContext.Provider value={{ ...state, ...func }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;

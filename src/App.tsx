import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from 'shared/theme'
import { useConnectWallet, useUpdateBlockNumber } from 'state/app/updater'
import { useTransactionsUpdater } from 'state/transactions/hooks'
import Routes from './Routes'
import './App.css'

export function Updaters(): null {
    useUpdateBlockNumber()
    useTransactionsUpdater()
    useConnectWallet()

    return null
}

function App(): JSX.Element {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App

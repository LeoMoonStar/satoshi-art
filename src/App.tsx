import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from 'shared/theme'
import {
    useConnectWallet,
    useUpdateBlockNumber,
    useUserWhiteListChecking,
} from 'state/app/updater'
import { useTransactionsUpdater } from 'state/transactions/hooks'
import Routes from './Routes'
import './App.css'
import WrongNetworkModal from 'shared/WrongNetwork'
import WarningMobileResolutions from 'shared/WarningMobileResoultions'
import MintingInProgressModal from 'shared/MintingInProgressModal'

export function Updaters(): null {
    useUpdateBlockNumber()
    useTransactionsUpdater()
    useConnectWallet()
    useUserWhiteListChecking()

    return null
}

function App(): JSX.Element {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Suspense fallback={null}>
                    <WrongNetworkModal />
                    <WarningMobileResolutions />
                    <MintingInProgressModal />
                    <Routes />
                </Suspense>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App

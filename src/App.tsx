import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from 'shared/theme'
import { useConnectWallet, useUpdateBlockNumber } from 'state/app/updater'
import { useTransactionsUpdater } from 'state/transactions/hooks'
import Routes from './Routes'
import './App.css'
import APIErrorProvider from 'providers/APIErrorProvider'
import WrongNetworkModal from 'shared/WrongNetwork'
import WarningMobileResolutions from 'shared/WarningMobileResoultions'
import MintingInProgressModal from 'shared/MintingInProgressModal'
import APIErrorModal from 'shared/APIErrorModal'

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
                <APIErrorProvider>
                    <Suspense fallback={null}>
                        <WrongNetworkModal />
                        <WarningMobileResolutions />
                        <MintingInProgressModal />
                        <APIErrorModal />
                        <Routes />
                    </Suspense>
                </APIErrorProvider>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App

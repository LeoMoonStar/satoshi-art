import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'

import { checkUserWhitelisted } from 'api/user'
import theme from 'shared/theme'
import { useConnectWallet } from './state/app/updater'
import Routes from './Routes'
import './App.css'
import { changeWhitelistedStatus } from './state/app/actions'

export function Updaters(): null {
    const dispatch = useDispatch()
    const { account } = useConnectWallet()

    useEffect(() => {
        if (!account) return

        checkUserWhitelisted(account).then((res) => {
            dispatch(changeWhitelistedStatus(res.isWhitelisted))
        })
    }, [dispatch, account])

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

import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from 'shared/theme'
import Layout from 'shared/Layout'
import TokenDetails from './components/TokenDetails'
import './App.css'

function App(): JSX.Element {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Layout>
                    <TokenDetails />
                </Layout>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App

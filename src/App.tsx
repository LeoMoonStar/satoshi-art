import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from 'shared/theme'
import Layout from 'shared/Layout'
import './App.css'

function App(): JSX.Element {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Layout>
                    <div>product page</div>
                </Layout>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App

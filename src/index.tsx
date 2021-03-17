import React from 'react'
import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css'
import App from './App'
import { getLibrary } from './utils/helpers'
import './i18n'

function SatoshiArt() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    )
}

ReactDOM.render(<SatoshiArt />, document.getElementById('root'))

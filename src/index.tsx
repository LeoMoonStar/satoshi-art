import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css'
import App, { Updaters } from './App'
import { getLibrary } from './utils/helpers'
import store from './state'
import './i18n'

function SatoshiArt() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <Updaters />
                <App />
            </Provider>
        </Web3ReactProvider>
    )
}

ReactDOM.render(<SatoshiArt />, document.getElementById('root'))

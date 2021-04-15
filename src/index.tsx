import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
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

/**
 * We should avoid error catching via sentry in development mode.
 *
 * tracesSampleRate - allow us check performance of the app.
 * Receive float value from 0 to 1.0 that means how often we should receive performance details.
 */
if (
    process.env.NODE_ENV !== 'development' &&
    process.env.REACT_APP_SENTRY_DSN
) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 0.2,
    })
}

ReactDOM.render(<SatoshiArt />, document.getElementById('root'))

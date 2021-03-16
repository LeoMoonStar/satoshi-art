import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Product from 'screens/Product'
import ConnectWallet from 'screens/ConnectWallet'

function Routes(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`/productpage`}>
                    <Product />
                </Route>
                <Route path={`/connect`}>
                    <ConnectWallet />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes

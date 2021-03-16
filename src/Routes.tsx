import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Product from 'screens/Product'

function Routes(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`/productpage`}>
                    <Product />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes

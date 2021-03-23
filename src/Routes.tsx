import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Product from 'screens/Product'
import ConnectWallet from 'screens/ConnectWallet'
import Artist from 'screens/Artist'
import CreateCollectible from 'screens/CreateCollectible'
import Search from 'screens/Search'
import Home from 'screens/Home'
import OrderList from 'screens/OrderList'

function Routes(): JSX.Element {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/productpage">
                        <Product />
                    </Route>
                    <Route path="/connect">
                        <ConnectWallet />
                    </Route>
                    <Route path="/artists/:id">
                        <Artist />
                    </Route>
                    <Route path="/create-collectible">
                        <CreateCollectible />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/dashboard/order-list">
                        <OrderList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default Routes

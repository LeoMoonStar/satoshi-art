import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from './state'

import Product from 'screens/Product'
import ConnectWallet from 'screens/ConnectWallet'
import Artist from 'screens/Artist'
import CreateCollectibleType from 'screens/CreateCollectibleType'
import CreateCollectible from 'screens/CreateCollectible'
import Search from 'screens/Search'
import Home from 'screens/Home'
import OrderList from 'screens/OrderList'
import DropOfTheDay from 'screens/DropOfTheDay'
import Support from 'screens/Support'
import {
    Privacy,
    SatoshiArt,
    TermsAndConditions,
    CookiePrivacy,
} from 'screens/InfoPages'
import Collection from 'screens/Collection'

import { permittedToUseWalletAndWhiteListedSelector } from 'state/app/selectors'
import UserDashboard from './screens/UserDashboard'

const PrivateRoute = (props: RouteProps) => {
    const isWhiteListedAndHasPermittedWallet = useSelector<AppState, boolean>(
        permittedToUseWalletAndWhiteListedSelector
    )

    if (!isWhiteListedAndHasPermittedWallet) {
        return <Redirect to="/" />
    }

    return <Route {...props} />
}
const DevelopRoute = (props: RouteProps) => {
    if (process.env.REACT_APP_SPECIAL_MODE === 'production') {
        return <Redirect to="/" />
    }
    return <Route {...props} />
}

function Routes(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/connect">
                    <ConnectWallet />
                </Route>
                <Route path="/support">
                    <Support />
                </Route>
                <Route path="/privacy">
                    <Privacy />
                </Route>
                <Route path="/about-satoshi-art">
                    <SatoshiArt />
                </Route>
                <Route path="/cookie-privacy">
                    <CookiePrivacy />
                </Route>
                <Route path="/terms-and-conditions">
                    <TermsAndConditions />
                </Route>
                <PrivateRoute path="/dashboard/user">
                    <UserDashboard />
                </PrivateRoute>
                <DevelopRoute path="/artists/:id">
                    <Artist />
                </DevelopRoute>
                <DevelopRoute path="/collections/:id">
                    <Collection />
                </DevelopRoute>
                <DevelopRoute path="/search">
                    <Search />
                </DevelopRoute>
                <DevelopRoute path="/drop-of-the-day">
                    <DropOfTheDay />
                </DevelopRoute>
                <Route path="/productpage">
                    <Product />
                </Route>
                <Route path="/dashboard/order-list">
                    <OrderList />
                </Route>
                <PrivateRoute exact path="/create-collectible">
                    <CreateCollectibleType />
                </PrivateRoute>
                <PrivateRoute
                    exact
                    path="/create-collectible/:type(single|multiple)/"
                >
                    <CreateCollectible />
                </PrivateRoute>
                <Route>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes

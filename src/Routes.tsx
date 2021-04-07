import React, { Suspense } from 'react'
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
import WrongNetworkModal from 'shared/WrongNetwork'
import WarningMobileResolutions from 'shared/WarningMobileResoultions'
import { getWhiteListedStatus } from 'state/app/selectors'

const PrivateRoute = (props: RouteProps) => {
    const isWhitelisted = useSelector<AppState, boolean>(getWhiteListedStatus)

    if (!isWhitelisted) {
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
        <Suspense fallback={null}>
            <WrongNetworkModal />
            <WarningMobileResolutions />
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
                    <DevelopRoute path="/artists/:id">
                        <Artist />
                    </DevelopRoute>
                    <DevelopRoute path="/search">
                        <Search />
                    </DevelopRoute>
                    <DevelopRoute path="/drop-of-the-day">
                        <DropOfTheDay />
                    </DevelopRoute>
                    <DevelopRoute path="/productpage">
                        <Product />
                    </DevelopRoute>
                    <DevelopRoute path="/dashboard/order-list">
                        <OrderList />
                    </DevelopRoute>
                    <PrivateRoute exact path="/create-collectible">
                        <CreateCollectibleType />
                    </PrivateRoute>
                    <PrivateRoute path="/create-collectible/:type(single|multiple)/">
                        <CreateCollectible />
                    </PrivateRoute>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default Routes

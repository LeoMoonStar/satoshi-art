import React from 'react';
import { BrowserRouter, Switch, Route, RouteProps, Redirect, Router } from 'react-router-dom';
import ConnectWallet from 'pages/ConnectWallet';
import Support from './pages/Support/Support';
import { Privacy, SatoshiArt, TermsAndConditions, CookiePrivacy } from 'pages/InfoPages';
import EditProfile from 'pages/EditProfile';
import UserDashboard from 'pages/UserDashboard';
import Artist from 'pages/Artist';
import Users from 'pages/Users';
import Collection from 'pages/Collection';
import Search from 'pages/Search';
import DropOfTheDay from 'pages/Home/DropOfTheDay';
import DropOfTheDayHistory from 'pages/DropOfTheDayHistory';
import Product from 'pages/Product';
import OrderList from 'pages/OrderList';
import CreateCollectible from 'pages/CreateCollectible';
import AdminLogin from 'pages/AdminLogin';
import Home from 'pages/Home';
import { createBrowserHistory } from 'history';

const DevelopRoute = (props: RouteProps) => {
  if (process.env.REACT_APP_SPECIAL_MODE == 'production') return <Redirect to={'/'} />;
  return <Route {...props} />;
};

function AppRouter(): JSX.Element {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path='/connect'>
          <ConnectWallet />
        </Route>
        <Route path='/support'>
          <Support />
        </Route>
        <Route path='/privacy'>
          <Privacy />
        </Route>
        <Route path='/about-satoshi-art'>
          <SatoshiArt />
        </Route>
        <Route path='/cookie-privacy'>
          <CookiePrivacy />
        </Route>
        <Route path='/terms-and-conditions'>
          <TermsAndConditions />
        </Route>
        <DevelopRoute path='/edit-profile'>
          <EditProfile />
        </DevelopRoute>
        <Route path='/dashboard/user'>
          <UserDashboard />
        </Route>
        <DevelopRoute path='/artists/:id'>
          <Artist />
        </DevelopRoute>
        <DevelopRoute path='/users'>
          <Users />
        </DevelopRoute>
        <DevelopRoute path='/collections/:id'>
          <Collection />
        </DevelopRoute>
        <DevelopRoute path='/search/:artist'>
          <Search />
        </DevelopRoute>
        <DevelopRoute path='/drop-of-the-day'>
          <DropOfTheDay />
        </DevelopRoute>
        <DevelopRoute path='/drop-of-the-day-history'>
          <DropOfTheDayHistory />
        </DevelopRoute>
        <DevelopRoute path='/product/:id'>
          <Product />
        </DevelopRoute>
        <Route path='/dashboard/order-list'>
          <OrderList />
        </Route>
        <Route exact path='/create-collectible'>
          <CreateCollectible />
        </Route>
        <Route path='/admin/login'>
          <AdminLogin />
        </Route>
        <Route exact path='/' component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;

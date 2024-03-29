import React from 'react';
import { BrowserRouter, Switch, Route, RouteProps, Redirect, Router } from 'react-router-dom';
import ConnectWallet from 'pages/ConnectWallet';
import Support from './pages/Support/Support';
import { Privacy, SatoshiArt, TermsAndConditions, CookiePrivacy } from 'pages/InfoPages';
import EditProfile from 'pages/EditProfile';
import UserDashboard from 'pages/UserDashboard';
import Artist from 'pages/Artist';
import Users from 'pages/Users';
import User from 'pages/User';
import Videos from 'pages/Videos'
import Collection from 'pages/Collection';
import Search from 'pages/Search';
import DropOfTheDay from 'pages/DropOfTheDay';
import DropOfTheDayHistory from 'pages/DropOfTheDayHistory';
import Product from 'pages/Product';
import OrderList from 'pages/OrderList';
import OrderItem from 'pages/OrderItem';
import CreateCollectible from 'pages/CreateCollectible';
import EditCollectible from 'pages/EditCollectible';
import EditCelebrityProfile from 'pages/EditCelebrityProfile';
import Home from 'pages/Home';
import { createBrowserHistory } from 'history';

const DevelopRoute = (props: RouteProps) => {
  if (process.env.REACT_APP_SPECIAL_MODE == 'production') return <Redirect to={'/'} />;
  return <Route {...props} />;
};

function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/connect'><ConnectWallet /></Route>
        <Route path='/support'><Support /></Route>
        <Route path='/privacy'><Privacy /></Route>
        <Route path='/about-satoshi-art'><SatoshiArt /></Route>
        <Route path='/cookie-privacy'><CookiePrivacy /></Route>
        <Route path='/terms-and-conditions'><TermsAndConditions /></Route>
        <DevelopRoute path='/edit-profile'><EditProfile /></DevelopRoute>
        <Route path='/dashboard/user'><UserDashboard /></Route>
        <DevelopRoute path='/artists/:id'><Artist /></DevelopRoute>
        <DevelopRoute path='/users/:type'><Users /></DevelopRoute>
        <DevelopRoute path='/user/:id'><User /></DevelopRoute>
        <DevelopRoute path='/videos'><Videos /></DevelopRoute>
        <DevelopRoute path='/collections/:id'><Collection /></DevelopRoute>
        <DevelopRoute path='/search/:artist'><Search /></DevelopRoute>
        <DevelopRoute path='/drop-of-the-day/:id'><DropOfTheDay /></DevelopRoute>
        <DevelopRoute path='/drop-of-the-day-history'><DropOfTheDayHistory /></DevelopRoute>
        <DevelopRoute path='/product/:id'><Product /></DevelopRoute>
        <Route path='/dashboard/order-list'><OrderList /></Route>
        <Route exact path='/create-collectible'><CreateCollectible /></Route>
        <Route exact path='/edit-collectible/:id'><EditCollectible /></Route>
        <Route exact path='/edit-celebrity-profile/:id'><EditCelebrityProfile /></Route>
        <Route exact path='/' component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;

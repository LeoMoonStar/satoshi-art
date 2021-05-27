import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'components/theme';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import store from './state';
import { createBrowserHistory } from 'history';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './utils/helpers';
import Home from './pages/Home';
import AppRouter from 'routes';

const routes = (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </Web3ReactProvider>
);

render(routes, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

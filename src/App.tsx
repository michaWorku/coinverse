import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';
import { Navbar, Footer } from './components';

import {
  Exchanges,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from './pages';

const App: React.FC = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>

    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route
              exact
              path="/"
            >
              <Homepage />
            </Route>

            <Route
              exact
              path="/exchanges"
            >
              <Exchanges />
            </Route>

            <Route
              exact
              path="/cryptocurrencies"
            >
              <Cryptocurrencies />
            </Route>

            <Route
              exact
              path="/crypto/:coinId"
            >
              <CryptoDetails />
            </Route>

            <Route
              exact
              path="/news"
            >
              <News />
            </Route>
          </Switch>
        </div>
      </Layout>
      <Footer />
    </div>
  </div>
);

export default App;

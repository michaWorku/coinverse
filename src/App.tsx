import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import './App.css';
import { Navbar } from './components';

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
            <Route exact path="/">
              <Homepage />
            </Route>

            <Route exact path="/exchanges">
              <Exchanges />
            </Route>

            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>

            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>

            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </Layout>

      <div className="footer">
        <Typography.Title
          level={5}
          style={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Coinverse
          <br />
          All right reserverd.
        </Typography.Title>

        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>

    </div>
  </div>
);

export default App;

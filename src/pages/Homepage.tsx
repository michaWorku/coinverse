import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import {
  Typography,
  Row,
  Col,
  Statistic,
} from 'antd';

import { useGetStatsQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from '../components/Loader';

const { Title } = Typography;

const Homepage: React.FC = () => {
  // Hooks
  const { data, isFetching } = useGetStatsQuery();
  const globalStats = data?.data;

  if (isFetching || !globalStats) {
    return <Loader />;
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>

      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.totalCoins}
          />

          <Statistic
            title="Total Exanges"
            value={millify(globalStats.totalExchanges)}
          />

          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />

          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />

          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />

        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>

        <Title level={2} className="show-more">
          <Link
            to="/cryptocurrencies"
          >
            Show more
          </Link>
        </Title>
      </div>
      <Cryptocurrencies
        simplified
      />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>

        <Title level={2} className="show-more">
          <Link
            to="/news"
          >
            Show more
          </Link>
        </Title>
      </div>
      <News
        simplified
      />

    </>
  );
};

export default Homepage;

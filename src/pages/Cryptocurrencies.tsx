import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Input,
} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from '../components/Loader';
import { Coin } from '../types/cryptoApi';

interface CryptocurrenciesProps {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({
  simplified,
}) => {
  const count = simplified ? 10 : 100;

  // Hooks
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // States
  const [cryptos, setCryptos] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Effects
  useEffect(() => {
    if (!isFetching && cryptosList && Array.isArray(cryptosList?.data?.coins)) {
      const filteredData: Coin[] = cryptosList
        .data
        .coins
        .filter((crypto) => crypto
          .name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

      setCryptos(filteredData);
    }
  }, [cryptosList, isFetching, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {
        !simplified && (
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )
      }

      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
      >
        {
          cryptos.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link
                to={`/crypto/${currency.uuid}`}
              >
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={(
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt={currency.name}
                    />
                  )}
                  hoverable
                >
                  <p>
                    Price:
                    {' '}
                    { millify(currency.price) }
                  </p>
                  <p>
                    Market Cap:
                    {' '}
                    { millify(currency.marketCap) }
                  </p>
                  <p>
                    Daily Change:
                    {' '}
                    { millify(currency.change) }
                    %
                  </p>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  );
};

Cryptocurrencies.defaultProps = {
  simplified: false,
};

export default Cryptocurrencies;

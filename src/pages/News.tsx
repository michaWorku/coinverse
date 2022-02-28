import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Avatar,
  Card,
  Select,
} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from '../components/Loader';

const DEMO_IMAGE = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;

interface NewsProps {
  simplified?: boolean;
}

const News: React.FC<NewsProps> = ({
  simplified,
}) => {
  const count = simplified ? 6 : 12;

  // State
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  // Hooks
  const { data, isLoading: loadingCryptoCurrencies } = useGetCryptosQuery(100);
  const coins = data?.data?.coins || [];
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (!cryptoNews || !Array.isArray(cryptoNews?.value)) {
    return <Loader />;
  }

  return (
    <Row
      gutter={[24, 24]}
    >

      {
        !simplified && (
          <Col
            span={24}
          >
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              options={
                coins.map((coin) => ({
                  value: coin.name,
                  label: coin.name,
                  key: coin.uuid.toString(),
                }))
              }
              onChange={(value: string) => setNewsCategory(value)}
              filterOption={(input, option) => {
                const val = option?.value as (string | undefined);
                return val?.toLowerCase().includes(input.toLowerCase()) || false;
              }}
              loading={loadingCryptoCurrencies}
            />
          </Col>
        )
      }

      {
        cryptoNews.value.map((news, index) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            key={index.toString()}
            className="news-card-container"
          >
            <Card
              hoverable
              className="news-card"
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title
                    className="news-title"
                    level={4}
                  >
                    { news.name }
                  </Title>

                  <img
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                    }}
                    src={news?.image?.thumbnail?.contentUrl || DEMO_IMAGE}
                    alt={news.name}
                  />
                </div>

                <p>
                  {
                    news.description?.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description
                  }
                </p>

                <div className="provider-container">
                  <div>
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    />

                    <Text className="provider-name">
                      { news.provider[0]?.name }
                    </Text>
                  </div>

                  <Text>
                    { moment(news.datePublished).startOf('s').fromNow() }
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }

    </Row>
  );
};

News.defaultProps = {
  simplified: false,
};

export default News;

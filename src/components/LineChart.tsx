import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Col,
  Row,
  Typography,
} from 'antd';
import millify from 'millify';

import { GetCoinHistoryResponse } from '../types/cryptoApi';

const { Title } = Typography;

interface LineChartProps {
  coinName: string;
  coinHistory: GetCoinHistoryResponse;
  currentPrice: number;
}

const LineChart: React.FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  const chartMeta = useMemo(() => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory.data.history.length; i += 1) {
      coinPrice.push(coinHistory.data.history[i].price);
      coinTimestamp.push(
        new Date(coinHistory.data.history[i].timestamp).toLocaleDateString('en-US'),
      );
    }

    const output = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price in USD',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071db',
          borderColor: '#0071db',
        },
      ],
    };

    return output;
  }, [coinHistory]);

  const data = chartMeta;

  return (
    <>
      <Row className="chart-header">
        <Title
          level={2}
          className="chart-title"
        >
          { coinName }
          {' '}
          Price Chart
        </Title>

        <Col className="price-container">
          <Title
            level={5}
            className="price-change"
          >
            { coinHistory?.data?.change }
            %
          </Title>

          <Title
            level={5}
            className="current-price"
          >
            Current
            { ' ' }
            { coinName }
            { ' ' }
            Price:
            { ' ' }
            { millify(currentPrice) }
          </Title>
        </Col>
      </Row>

      <Line
        data={data}
        options={{
          scales: {
            xAxis: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
};

export default LineChart;

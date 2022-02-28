import React, { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  Typography,
  Avatar,
} from 'antd';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import ICON from '../images/coinverse.png';

const Navbar: React.FC = () => {
  // Hooks
  const location = useLocation<unknown>();

  // States
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number | null>(null);

  // Effects
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize !== null && screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // Methods
  const hideAfterClick = () => {
    if (screenSize !== null && screenSize < 768) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar
          src={ICON}
          size="large"
        />

        <Typography.Title level={2} className="logo">
          <Link to="/">
            CoinVerse
          </Link>
        </Typography.Title>

        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu((v) => !v)}
          icon={(<MenuOutlined />)}
        />
      </div>

      {
        activeMenu && (
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            onClick={hideAfterClick}
          >
            <Menu.Item
              icon={<HomeOutlined />}
              key="home"
            >
              <Link
                to="/"
              >
                Home
              </Link>
            </Menu.Item>

            <Menu.Item
              icon={<FundOutlined />}
              key="cryptocurrencies"
            >
              <Link
                to="/cryptocurrencies"
              >
                Cryptocurrencies
              </Link>
            </Menu.Item>

            <Menu.Item
              icon={<MoneyCollectOutlined />}
              key="exchanges"
            >
              <Link
                to="/exchanges"
              >
                Exchanges
              </Link>
            </Menu.Item>

            <Menu.Item
              icon={<BulbOutlined />}
              key="news"
            >
              <Link
                to="/news"
              >
                News
              </Link>
            </Menu.Item>

          </Menu>
        )
      }

    </div>
  );
};

export default Navbar;

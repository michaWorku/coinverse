import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Space } from 'antd';

const Footer: React.FC = () => { 
    return (
    <div className="footer">
        <Typography.Title
            level={5}
            style={{
            color: "white",
            textAlign: "center",
            }}
        >
            Coinverse <br />
            All right reserverd.
        </Typography.Title>

        <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
        </Space>
    </div>
    
    );
};

export default Footer
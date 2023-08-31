import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import './page404.scss';

function Page404(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <img
        src="https://cdn.dribbble.com/users/621155/screenshots/3204988/le404.png"
        alt="404"
      />
      <div>
        {' '}
        <Space className="site-button-ghost-wrapper" wrap>
          <Button
            ghost
            onClick={() => {
              navigate('/');
            }}
          >
            <LeftCircleOutlined />
            На главную страницу
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Page404;

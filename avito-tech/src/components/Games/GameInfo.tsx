import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Carousel } from 'antd';
const { Meta } = Card;
const dayjs = require('dayjs');
import { Button, Space } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function GameInfo(): JSX.Element {
  const { gamesArr } = useSelector((store: RootState) => store.game);
  const navigate = useNavigate();
  const { id } = useParams();
  const singleGame = gamesArr.find((el) => el.id === Number(id));
  return (
    <div className="single-game">
      {singleGame && (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="thumbnail" src={singleGame.thumbnail} />}
        >
          <p>Издатель: {singleGame.publisher}</p>
          <p>Разработчик: {singleGame.developer}</p>
          <p>
            Дата релиза: {dayjs(singleGame.release_date).format('DD-MM-YYYY')}
          </p>
          {/*TODO: Системные требования и карусель скриншотов */}
          <Carousel>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <Meta title={singleGame.title} description={singleGame.genre} />
          <Space className="site-button-ghost-wrapper" wrap>
            <Button
              ghost
              onClick={() => {
                navigate('/');
              }}
            >
              <LeftCircleOutlined />
              Назад на главную страницу
            </Button>
          </Space>
        </Card>
      )}
    </div>
  );
}

export default GameInfo;

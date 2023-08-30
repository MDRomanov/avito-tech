import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Carousel, Image } from 'antd';
const { Meta } = Card;
const dayjs = require('dayjs');
import { Spin, Button, Space } from 'antd';
import { LeftCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { gameById } from './slice/gameSlice';
import './games.scss';
import Error from '../../features/Error/Error';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function GameInfo(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { gamesArr, error } = useSelector((store: RootState) => store.game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'b545eeda71mshada78c65b70eee6p13801fjsn0614f2dfea4d',
  //     'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  //   }
  // };
  const singleGame = gamesArr.find((el) => el.id === Number(id));
  // useEffect(() => {
  //   dispatch(gameById(Number(id)))
  // }, [id, dispatch])
  // useEffect(() => {
  //   const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  //   fetch(url, options).then((res) => res.json())
  // }, [id])

  if (isLoading) {
    return (
      <div className="spin">
        <Spin indicator={antIcon} />
      </div>
    );
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="single-game">
      {singleGame && (
        <>
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
            <Image style={{maxWidth: '20vmax', marginBottom:'0.5vmin'}} src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-1.jpg" alt="Image" />
              </div>
              <div>
              <Image style={{maxWidth: '20vmax', marginBottom:'0.5vmin'}} src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-2.jpg" alt="Image" />
              </div>
              <div>
              <Image style={{maxWidth: '20vmax', marginBottom:'0.5vmin'}} src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-3.jpg" alt="Image" />
              </div>
              <div>
              <Image style={{maxWidth: '20vmax', marginBottom:'0.5vmin'}} src="https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg" alt="Image" />
              </div>
            </Carousel>
            <Meta title={singleGame.title} description={singleGame.genre} />
          </Card>
          <Space className="site-button-ghost-wrapper" wrap>
            <Button
              ghost
              onClick={() => {
                navigate(-1);
              }}
            >
              <LeftCircleOutlined />
              Назад на главную страницу
            </Button>
          </Space>
        </>
      )}
    </div>
  );
}

export default GameInfo;

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

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function GameInfo(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const abortController = new AbortController();
  const { error, singleGame } = useSelector((store: RootState) => store.game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleAbort = (): void => {
    abortController.abort();
    navigate(-1);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(gameById(Number(id)));
    if (localStorage.getItem(`Game number ${id}`)) {
      let getLocalStorageData = JSON.parse(
        localStorage.getItem(`Game number ${id}`) || '',
      );
      if (
        Number(new Date()) - Number(new Date(getLocalStorageData.time)) <
        5 * 60 * 1000
      ) {
        dispatch(gameById(getLocalStorageData.data.id));
      } else {
        localStorage.removeItem(`Game number ${id}`);
        dispatch(gameById(Number(id)));
      }
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="spin">
        <Spin indicator={antIcon} size="large" />
      </div>
    );
  }
  if (error || (!isLoading && Object.keys(singleGame).length === 0)) {
    return (
      <>
        <Error />
        <Button
          ghost
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftCircleOutlined />
          Назад на главную страницу
        </Button>
      </>
    );
  }

  return (
    <div className="single-game">
      {'id' in singleGame && (
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
            <h4>Минимальные системные требования:</h4>
            {singleGame.minimum_system_requirements ? (
              <div className="system-requirements">
                <h5>
                  Операционная система:{' '}
                  {singleGame.minimum_system_requirements.os}
                </h5>
                <h5>
                  Процессор: {singleGame.minimum_system_requirements.processor}
                </h5>
                <h5>ОЗУ: {singleGame.minimum_system_requirements.memory}</h5>
                <h5>
                  Видеокарта: {singleGame.minimum_system_requirements.graphics}
                </h5>
                <h5>
                  Место на жестком диске:{' '}
                  {singleGame.minimum_system_requirements.storage}
                </h5>
              </div>
            ) : (
              <h4>Не указаны</h4>
            )}
            <div className="carousel">
              <Carousel>
                {singleGame.screenshots.map((photo) => (
                  <div key={photo.id}>
                    <Image
                      style={{ maxWidth: '20vmax', marginBottom: '0.5vmin' }}
                      src={photo.image}
                      alt={`screenshot №${photo.id}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <Meta
              title={singleGame.title}
              description={`Жанр: ${singleGame.genre}`}
            />
          </Card>
          <Space className="site-button-ghost-wrapper" wrap>
            <Button
              ghost
              onClick={() => {
                handleAbort();
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

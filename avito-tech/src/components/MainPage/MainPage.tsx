import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import './MainPage.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GamesList from '../Games/GamesList';
import Pagination from '../../features/Pagination/Pagination';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function MainPage(): JSX.Element {
  const { gamesArr } = useSelector((store: RootState) => store.game);
  return (
    <div className="main-page">
      <div className="free-games-logo">
        <img
          src="https://cdn.bagogames.com/wp-content/uploads/2020/10/26144328/free-to-play-super-popular-featured-image-bg.jpeg?strip=all&lossy=1&ssl=1"
          alt="logo"
        />
      </div>
      {gamesArr.length === 0 ? (
        <div className='spin'>
        <Spin indicator={antIcon} />
        </div>
      ) : (
      <div className="card-list">
      {gamesArr.map((game) => <GamesList game={game} key={game.id} />)}
      </div>
      )}
      <div className='pagination'>
        <Pagination />
      </div>
    </div>
  );
}

export default MainPage;

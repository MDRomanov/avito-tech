import React from 'react';
import { Card } from 'antd';
import { Game } from './types/types';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const dayjs = require("dayjs");

function GamesList({ game }: { game: Game }): JSX.Element {
  const navigate = useNavigate()
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="thumbnail" src={game.thumbnail} />}
        onClick={() => navigate(`/games/${game.id}`)}
      >
        <p>Издатель: {game.publisher}</p>
        <p>Дата релиза: {dayjs(game.release_date).format('DD-MM-YYYY')}</p>
        <Meta title={game.title} description={`Жанр: ${game.genre}`} />
      </Card>
    </>
  );
}

export default GamesList;

import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import GameInfo from '../components/Games/GameInfo';
import Page404 from '../features/Page404/Page404';
import { useAppDispatch } from '../store';
import { initGames } from '../components/Games/slice/gameSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(initGames()), 1000);
  }, [dispatch]);
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/games/:id" element={<GameInfo />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;

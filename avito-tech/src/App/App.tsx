import React, { useEffect, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import GameInfo from '../components/Games/GameInfo';
import Page404 from '../features/Page404/Page404';
import { useAppDispatch } from '../store';
import { gameByFilter, gameBySorting, initGames } from '../components/Games/slice/gameSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // Constants for sorting
  const [platforms, setPlatforms] = useState('');
  const [sorting, setSorting] = useState('');
  const [categories, setCategories] = useState('')
  const [tag, setTag] = useState<string[]>([])
  //
  useEffect(() => {
    const abortController = new AbortController();
    if (!platforms && !sorting && !categories && tag.length === 0){
    setTimeout(() => dispatch(initGames()), 1000);
    } else {
      abortController.abort();
    }
    if (tag.length === 0) {
      dispatch(gameBySorting({platforms, sorting, categories}))
    } else {
      abortController.abort();
    dispatch(gameByFilter({platforms, tag}))
    }
  }, [platforms, sorting, categories, tag, dispatch]);
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<MainPage setPlatforms={setPlatforms} setSorting={setSorting} setCategories={setCategories} tag={tag} setTag={setTag} />} />
        <Route path="/games/:id" element={<GameInfo />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;

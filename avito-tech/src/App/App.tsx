import React, { useEffect, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import GameInfo from '../components/Games/GameInfo';
import Page404 from '../features/Page404/Page404';
import { useAppDispatch } from '../store';
import { gameBySorting, initGames } from '../components/Games/slice/gameSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // Constants for sorting
  const [platforms, setPlatforms] = useState('');
  const [sorting, setSorting] = useState('');
  const [categories, setCategories] = useState('')
  //
  useEffect(() => {
    const abortController = new AbortController();
    if (!platforms && !sorting && !categories){
    setTimeout(() => dispatch(initGames()), 1000);
    } else {
      abortController.abort();
    }
      dispatch(gameBySorting({platforms, sorting, categories}))
  }, [platforms, sorting, categories, dispatch]);

  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<MainPage platforms={platforms} sorting={sorting} setPlatforms={setPlatforms} setSorting={setSorting} categories={categories} setCategories={setCategories} />} />
        <Route path="/games/:id" element={<GameInfo />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;

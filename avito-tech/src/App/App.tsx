import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';
import GameInfo from '../components/Games/GameInfo';
import Page404 from '../features/Page404/Page404';

function App() : JSX.Element {
  return (
    <div className='App-header'>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/games/:id" element={<GameInfo />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
    </div>
  );
}

export default App;

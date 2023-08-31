import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { gameByFilter, gameBySorting, initGames } from '../components/Games/slice/gameSlice';

const mockDispatch = jest.fn();

jest.mock('../store', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../components/Games/slice/gameSlice', () => ({
  gameByFilter: jest.fn(),
  gameBySorting: jest.fn(),
  initGames: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Рендер страницы 404', () => {
    render(
      <Provider store={createStore(() => {})}>
        <MemoryRouter initialEntries={['/testing']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const testImage = document.querySelector("img") as HTMLImageElement;
    expect(testImage.alt).toContain("404");
  });

});

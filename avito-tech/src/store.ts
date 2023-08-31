import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gameSlice from './components/Games/slice/gameSlice';

const store = configureStore({
  reducer: {
    game: gameSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;

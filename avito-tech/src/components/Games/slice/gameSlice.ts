import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
import { Game, GameCategory, GameId, GamePlatform, State } from '../types/types';

const initialState : State = {
    gamesArr: [],
    error: undefined,
}

export const initGames = createAsyncThunk('game/init', () => api.initGames())

export const gameById = createAsyncThunk('game/byId', (action: GameId) => api.gameById(action))
export const gameByCategory = createAsyncThunk('game/byCategory', (action: GameCategory) => api.gameByCategory(action))
export const gameByPlatform = createAsyncThunk('game/byPlatform', (action: GamePlatform) => api.gameByPlatform(action))

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers( builder ) {
        builder
        .addCase(initGames.fulfilled, (state, action) => {
            state.gamesArr = action.payload;
          })
          .addCase(initGames.rejected, (state, action) => {
            state.error = action.error.message;
          })
          .addCase(gameById.fulfilled, (state, action) => {
            state.gamesArr = state.gamesArr.filter((game) => game.id === Number(action.payload));
          })
          .addCase(gameById.rejected, (state, action) => {
            state.error = action.error.message;
          })
        //   .addCase(gameByCategory.fulfilled, (state, action) => {
        //     state.gamesArr = state.gamesArr.filter((game) => game.genre === action.payload);
        //   })
        //   .addCase(gameByCategory.rejected, (state, action) => {
        //     state.error = action.error.message;
        //   })
        //   .addCase(gameByPlatform.fulfilled, (state, action) => {
        //     state.gamesArr = state.gamesArr.filter((game) => game.platform === action.payload);
        //   })
        //   .addCase(gameByPlatform.rejected, (state, action) => {
        //     state.error = action.error.message;
        //   })
    },
})

export default gameSlice.reducer;
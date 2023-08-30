import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
import { State } from '../types/types';

const initialState : State = {
    gamesArr: [],
    error: undefined,
    singleGame: {}
}

export const initGames = createAsyncThunk('game/init', () => api.initGames())

export const gameById = createAsyncThunk('game/byId', (action: Number) => api.gameById(action))

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
            state.singleGame = action.payload
          })
          .addCase(gameById.rejected, (state, action) => {
            state.error = action.error.message;
          })
    },
})

export default gameSlice.reducer;
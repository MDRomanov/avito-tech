import { Game, GameCategory, GameId, GameInfo, GamePlatform } from "./types/types";

export const initGames = async () : Promise<Game[]> => {
    try {
      const res = await fetch('api/games');
      return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  };

  export const gameById = async (id: GameId) : Promise<GameInfo> => {
    try {
        const res = await fetch(`api/games/${id}`);
        return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  }

  export const gameByCategory = async (category: GameCategory) : Promise<Game[]> => {
    try {
        const res = await fetch(`api/games/${category}`);
        return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  }

  export const gameByPlatform = async (platform: GamePlatform) : Promise<Game[]> => {
    try {
        const res = await fetch(`api/games/${platform}`);
        return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  }
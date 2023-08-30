import { Game, GameCategory, GameId, GameInfo, GamePlatform } from "./types/types";

const apiURL = 'free-to-play-games-database.p.rapidapi.com'

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b545eeda71mshada78c65b70eee6p13801fjsn0614f2dfea4d',
      'X-RapidAPI-Host': apiURL
    }
  };

export const initGames = async () : Promise<Game[]> => {
    const url = `https://${apiURL}/api/games`;
    try {
      const res = await fetch(url, options);
      return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  };

  export const gameById = async (id: GameId) : Promise<GameInfo> => {
    try {
        const url = `https://${apiURL}/api/game?id=${id}`;
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
      throw new Error('Ошибка сервера, попробуйте позже');
    }
  }

  export const gameByFilter = async (params: any) : Promise<Game[]> => {
    try {
        let url = `https://${apiURL}/api/filter?tag=${params}`;
        if (params.length) {
            url += params.join('.')
        }
        const res = await fetch(url, options)
        return await res.json()
    } catch (error) {
        throw new Error('Ошибка сервера, попробуйте позже');
    }
  }

//   export const gameByCategory = async (category: GameCategory) : Promise<Game[]> => {
//     try {
//         const res = await fetch(`api/games/${category}`);
//         return await res.json();
//     } catch (error) {
//       throw new Error('Ошибка сервера, попробуйте позже');
//     }
//   }

//   export const gameByPlatform = async (platform: GamePlatform) : Promise<Game[]> => {
//     try {
//         const res = await fetch(`api/games/${platform}`);
//         return await res.json();
//     } catch (error) {
//       throw new Error('Ошибка сервера, попробуйте позже');
//     }
//   }
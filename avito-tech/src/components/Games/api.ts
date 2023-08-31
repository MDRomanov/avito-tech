import { FilterGame, Game, GameInfo, SortGame } from "./types/types";

const apiURL = 'free-to-play-games-database.p.rapidapi.com'
const apiKEY = 'b545eeda71mshada78c65b70eee6p13801fjsn0614f2dfea4d'

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKEY,
      'X-RapidAPI-Host': apiURL
    }
  };

  const maxAttempts = 3;
  const delay = 1000
  
  export const initGames = async () : Promise<Game[]> => {
  let attempts = 0;
    const url = `https://${apiURL}/api/games`;
    try {
      const res = await fetch(url, options);
      return await res.json();
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        console.log(`Попытка ${attempts + 1} не удалась. Пробую еще раз через ${delay}мс...`);
        return new Promise((resolve) => setTimeout(resolve, delay)).then(initGames);
      }
      throw error;
    }
  };

  export const gameById = async (id: Number) : Promise<GameInfo> => {
    let attempts = 0;
    try {
        const url = `https://${apiURL}/api/game?id=${id}`;
        const res = await fetch(url, options);
        const response = await res.json()
        localStorage.setItem(
          `Game number ${id}`,
          JSON.stringify({ data: response, time: new Date() })
        );
        return response;
      } catch (error) {
        if (attempts < maxAttempts) {
          console.log(`Попытка ${attempts + 1} не удалась. Пробую еще раз через ${delay}мс...`);
          await new Promise((resolve) => setTimeout(async () => {
            await gameById(id);
            attempts++;
            resolve;
          }, delay));
        }
        throw new Error(`Failed to fetch data after ${maxAttempts} attempts`);
      }
  }

  export const gameBySorting = async (data: SortGame) : Promise<Game[]> => {
    let attempts = 0;
    try {
        let url = `https://${apiURL}/api/games`;
        if (data.platforms || data.categories || data.sorting) {
          const params: string[] = [];
          if (data.platforms) params.push(`platform=${data.platforms}`);
          if (data.categories) params.push(`category=${data.categories}`);
          if (data.sorting) params.push(`sort-by=${data.sorting}`);
          url += `?${params.join('&')}`;
      }
        const res = await fetch(url, options)
        return await res.json()
      } catch (error) {
        if (attempts < maxAttempts) {
          console.log(`Попытка ${attempts + 1} не удалась. Пробую еще раз через ${delay}мс...`);
          await new Promise((resolve) => setTimeout(async () => {
            await gameBySorting(data);
            attempts++;
            resolve;
          }, delay));
        }
        throw new Error(`Failed to fetch data after ${maxAttempts} attempts`);
      }
  }

  export const gameByFilter = async (data: FilterGame) : Promise<Game[]> => {
    let attempts = 0;
    try {
        let url = `https://${apiURL}/api/filter`;
        if (data.platforms || data.tag) {
          const params: string[] = [];
          if (data.platforms) params.push(`platform=${data.platforms}`);
          if (data.tag) params.push(`tag=${data.tag}`);
          url += `?${params.join('&').replaceAll(',', '.')}`;
      }
        const res = await fetch(url, options)
        return await res.json()
      } catch (error) {
        if (attempts < maxAttempts) {
          console.log(`Попытка ${attempts + 1} не удалась. Пробую еще раз через ${delay}мс...`);
          await new Promise((resolve) => setTimeout(async () => {
            await gameByFilter(data);
            attempts++;
            resolve;
          }, delay));
        }
        throw new Error(`Failed to fetch data after ${maxAttempts} attempts`);
      }
  }
export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type GameInfo = Game & {
  description: string;
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: Array<{ id: number; image: string }>;
  status: string;
};

export type GameCategory = Pick<Game, 'genre'>;
export type GamePlatform = Pick<Game, 'platform'>;

export type State = { gamesArr: Game[]; error: undefined | string, singleGame: GameInfo | {} };

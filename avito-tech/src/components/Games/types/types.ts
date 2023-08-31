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

export type SortGame = {
  platforms?: string;
  sorting?: string;
  categories?: string;
}

export type FilterGame = Pick<SortGame, 'platforms'> & {
  tag?: string[];
}

export type State = { gamesArr: Game[]; error: undefined | string, singleGame: GameInfo | {} };

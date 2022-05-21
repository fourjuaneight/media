/* eslint-disable camelcase */
export interface Book {
  author: string;
  genre: string;
  id?: string;
  title: string;
}

export interface Game {
  genre: string;
  id?: string;
  platform: string;
  studio: string;
  title: string;
}

export interface Media {
  director: string;
  genre: string;
  id?: string;
  title: string;
}

export interface HasuraInsertResp {
  [key: string]: {
    title: string;
  };
}

export interface HasuraUpdateResp {
  [key: string]: {
    returning: {
      title: string;
    }[];
  };
}

export interface HasuraQueryBooksResp {
  data: {
    media_books: Book[];
  };
}

export interface HasuraQueryGamesResp {
  data: {
    media_games: Game[];
  };
}

export interface HasuraQueryMoviesResp {
  data: {
    media_movies: Media[];
  };
}

export interface HasuraQueryShowsResp {
  data: {
    media_shows: Media[];
  };
}

export interface HasuraErrors {
  errors: {
    extensions: {
      path: string;
      code: string;
    };
    message: string;
  }[];
}

export interface RequestPayload {
  key: string;
  type: string;
  tagList?: string;
  data?: ShelfItem;
  query?: string;
}

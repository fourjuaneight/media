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

export interface Video {
  director: string;
  genre: string;
  id?: string;
  title: string;
}

export type MediaItem = Book | Game | Video;

export interface HasuraInsertResp {
  data: {
    [key: string]: {
      title: string;
    };
  };
}

export interface HasuraUpdateResp {
  [key: string]: {
    returning: {
      title: string;
    }[];
  };
}

export interface HasuraQueryResp {
  data: {
    [key: string]: MediaItem[];
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
  type: string;
  table: string;
  tagList?: string;
  data?: MediaItem;
  query?: string;
}

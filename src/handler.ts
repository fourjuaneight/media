import { bookGenres, mediaGenres, gameGenres, gamePlatforms } from './tags';
import {
  addMediaItem,
  queryMediaItems,
  searchMediaItems,
  updateMediaItem,
} from './hasura';

import { RequestPayload, MediaItem } from './typings.d';

// default responses
const responseInit = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};
const badReqBody = {
  status: 400,
  statusText: 'Bad Request',
  ...responseInit,
};
const errReqBody = {
  status: 500,
  statusText: 'Internal Error',
  ...responseInit,
};
const noAuthReqBody = {
  status: 401,
  statusText: 'Unauthorized',
  ...responseInit,
};
// match tags list to array of tags
const tagsList: { [key: string]: string[] } = {
  bookGenres,
  mediaGenres,
  gameGenres,
  gamePlatforms,
};

const missingData = (data: MediaItem | undefined): boolean => {
  if (data) {
    const typedData = data as MediaItem;
    const cleanData = Object.keys(typedData)
      .reduce(
        (acc, key) => [...acc, { key, value: typedData[key] }],
        [] as { key: string; value: string }[]
      )
      .filter(item => item.key !== 'id');
    const missing = Object.values(cleanData).some(value => value === undefined);

    return missing;
  }

  return true;
};

/**
 * Helper method to determine which type/category to use.
 * @function
 * @async
 *
 * @param payload request payload
 * @returns {Promise<Response>} response
 */
const handleAction = async (payload: RequestPayload): Promise<Response> => {
  const { table, type } = payload;

  try {
    // determine which type and method to use
    switch (true) {
      case payload.type === 'Tags': {
        const list = payload.tagList as string;

        return new Response(
          JSON.stringify({
            tags: tagsList[list],
            table,
            location: list,
          }),
          responseInit
        );
      }
      case payload.type === 'Insert':
        const insertData = payload.data as MediaItem;

        await addMediaItem(table, insertData);

        return new Response(
          JSON.stringify({
            saved: data.name,
            table,
            location: type,
          }),
          responseInit
        );
        break;
      case payload.type === 'Update':
        const updateData = payload.data as MediaItem;

        await updateMediaItem(table, updateData.id as string, updateData);

        return new Response(
          JSON.stringify({
            updated: data.name,
            table,
            location: type,
          }),
          responseInit
        );
        break;
      case payload.type === 'Search':
        const searchPattern = payload.query as string;
        const searchItems = await searchMediaItems(table, searchPattern);

        return new Response(
          JSON.stringify({
            items: searchItems,
            table,
          }),
          responseInit
        );
        break;
      default: {
        const queryItems = await queryMediaItems(table);

        return new Response(
          JSON.stringify({
            items: queryItems,
            table,
          }),
          responseInit
        );
        break;
      }
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error, table, location: type }),
      errReqBody
    );
  }
};

/**
 * Handler method for all requests.
 * @function
 * @async
 *
 * @param {Request} request request object
 * @returns {Promise<Response>} response object
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  // POST requests only
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed',
    });
  }

  // content-type check (required)
  if (!request.headers.has('content-type')) {
    return new Response(
      JSON.stringify({ error: "Please provide 'content-type' header." }),
      badReqBody
    );
  }

  const contentType = request.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    const payload: RequestPayload = await request.json();

    // check for required fields
    switch (true) {
      case !payload.type:
        return new Response(
          JSON.stringify({ error: "Missing 'type' parameter." }),
          badReqBody
        );
      case !payload.table:
        return new Response(
          JSON.stringify({ error: "Missing 'table' parameter." }),
          badReqBody
        );
      case payload.type === 'Tags' && !payload.tagList:
        return new Response(
          JSON.stringify({ error: "Missing 'tagList' parameter." }),
          badReqBody
        );
      case payload.type === 'Insert' && missingData(payload.data):
        return new Response(
          JSON.stringify({ error: 'Missing Insert data.' }),
          badReqBody
        );
      case payload.type === 'Update' && missingData(payload.data):
        return new Response(
          JSON.stringify({ error: 'Missing Update data.' }),
          badReqBody
        );
      case payload.type === 'Search' && !payload.query:
        return new Response(
          JSON.stringify({ error: 'Missing Search query.' }),
          badReqBody
        );
      case !payload.key:
        return new Response(
          JSON.stringify({ error: "Missing 'key' parameter." }),
          noAuthReqBody
        );
      case payload.key !== AUTH_KEY:
        return new Response(
          JSON.stringify({
            error: "You're not authorized to access this API.",
          }),
          noAuthReqBody
        );
      default: {
        return handleAction(payload);
      }
    }
  }

  // default to bad content-type
  return new Response(null, {
    status: 415,
    statusText: 'Unsupported Media Type',
  });
};

import {
  HasuraErrors,
  HasuraInsertResp,
  HasuraQueryResp,
  HasuraUpdateResp,
  MediaItem,
} from './typings.d';

const MEDIA_FIELDS = {
  book: ['author', 'genre', 'title'],
  game: ['genre', 'platform', 'studio', 'title'],
  video: ['director', 'genre', 'title'],
};

const objToQueryString = (obj: { [key: string]: any }) =>
  Object.keys(obj).map(key => {
    const value = obj[key];
    const fmtValue =
      typeof value === 'string'
        ? `"${value
            .replace(/\\/g, '')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')}"`
        : Array.isArray(value)
        ? `"${value.join(',')}"`
        : value;

    return `${key}: ${fmtValue}`;
  });

/**
 * Add media entry to Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @param {MediaItem} item data to upload
 * @returns {Promise<void>}
 */
export const addMediaItem = async (
  table: string,
  item: MediaItem
): Promise<void> => {
  const query = `
    mutation {
      insert_media_${table}_one(object: { ${objToQueryString(item)} }) {
        name
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraInsertResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `Adding record to Hasura - Media - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }
  } catch (error) {
    throw `Adding record to Hasura - Media - ${table}: \n ${error}`;
  }
};

/**
 * Update media entry to Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @param {string} id item id
 * @param {MediaItem} item data to update
 * @returns {Promise<void>}
 */
export const updateMediaItem = async (
  table: string,
  id: string,
  item: MediaItem
): Promise<void> => {
  const query = `
    mutation {
      update_media_${table}(
        where: {id: {_eq: "${id}"}},
        _set: { ${objToQueryString(item)} }
      ) {
        returning {
          name
        }
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraUpdateResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `Updating record to Hasura - Media - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }
  } catch (error) {
    throw `Updating record to Hasura - Media - ${table}: \n ${error}`;
  }
};

/**
 * Get media entries from Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @returns {Promise<MediaItem[]>}
 */
export const queryMediaItems = async (table: string): Promise<MediaItem[]> => {
  const query = `
    {
      media_${table}(order_by: {name: asc}) {
        ${MEDIA_FIELDS[table].join('\n')}
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw new Error(
        `Querying records from Hasura - Media - ${table}: \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraQueryResp).data[`media_${table}`];
  } catch (error) {
    throw new Error(
      `Querying records from Hasura - Media - ${table}: \n ${error}`
    );
  }
};

/**
 * Search media entries from Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @param {string} term media item name
 * @returns {Promise<MediaItem[]>}
 */
export const searchMediaItems = async (
  table: string,
  patter: string
): Promise<MediaItem[]> => {
  const query = `
    {
      media_${table}(
        order_by: {name: asc},
        where: {name: {_iregex: ".*${patter}.*"}}
      ) {
        ${MEDIA_FIELDS[table].join('\n')}
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw new Error(
        `Searching records from Hasura - Media - ${table}: \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraQueryResp).data[`media_${table}`];
  } catch (error) {
    throw new Error(
      `Searching records from Hasura - Media - ${table}: \n ${error}`
    );
  }
};

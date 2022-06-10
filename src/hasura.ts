import {
  HasuraErrors,
  HasuraInsertResp,
  HasuraQueryResp,
  HasuraQueryTagsResp,
  HasuraUpdateResp,
  MediaItem,
} from './typings.d';

const MEDIA_FIELDS = {
  books: ['title', 'author', 'genre'],
  games: ['title', 'studio', 'platform', 'genre'],
  movies: ['title', 'director', 'genre'],
  shows: ['title', 'director', 'genre'],
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
 * Get media tags from Hasura.
 * @function
 * @async
 *
 * @param {string} db
 * @param {string} table
 * @returns {Promise<RecordData[]>}
 */
export const queryTags = async (
  db: string,
  table: string
): Promise<string[]> => {
  const query = `
    {
      meta_${db}(where: {schema: {_eq: "media"}, table: {_eq: "${table}"}}) {
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
    const response: HasuraQueryTagsResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryTags) - ${db} - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    const tags = (response as HasuraQueryTagsResp).data[`meta_${db}`].map(
      tag => tag.name
    );

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
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
      media_${table}(order_by: {title: asc}) {
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

      throw `Querying records from Hasura - Media - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraQueryResp).data[`media_${table}`];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Search media entries from Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @param {string} pattern media item title
 * @returns {Promise<MediaItem[]>}
 */
export const searchMediaItems = async (
  table: string,
  pattern: string
): Promise<MediaItem[]> => {
  const query = `
    {
      media_${table}(
        order_by: {title: asc},
        where: {title: {_iregex: ".*${pattern}.*"}}
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

      throw `(searchMediaItems) - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraQueryResp).data[`media_${table}`];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Add media entry to Hasura.
 * @function
 * @async
 *
 * @param {string} table
 * @param {MediaItem} item data to upload
 * @returns {Promise<string>}
 */
export const addMediaItem = async (
  table: string,
  item: MediaItem
): Promise<string> => {
  const query = `
    mutation {
      insert_media_${table}_one(object: { ${objToQueryString(item)} }) {
        title
      }
    }
  `;

  try {
    const existing = await searchMediaItems(table, item.title);

    if (existing.length !== 0) {
      throw `(addMediaItem): Media already exists.`;
    }

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

      throw `(addMediaItem) - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraInsertResp).data[`insert_media_${table}_one`]
      .title;
  } catch (error) {
    console.log(error);
    throw error;
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
 * @returns {Promise<string>}
 */
export const updateMediaItem = async (
  table: string,
  id: string,
  item: MediaItem
): Promise<string> => {
  const query = `
    mutation {
      update_media_${table}(
        where: {id: {_eq: "${id}"}},
        _set: { ${objToQueryString(item)} }
      ) {
        returning {
          title
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

      throw `(updateMediaItem) - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraUpdateResp)[`update_media_${table}`].returning[0]
      .title;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

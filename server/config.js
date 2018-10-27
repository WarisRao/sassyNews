
export const HN_DB_URI = process.env.DB_URI || 'https://hacker-news.firebaseio.com';
export const HN_API_VERSION = process.env.HN_API_VERSION || '/v0';
export const HN_API_URL = process.env.HN_API_URL || `${HN_DB_URI}${HN_API_VERSION}`;


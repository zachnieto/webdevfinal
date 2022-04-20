import axios from 'axios';

const API_BASE = 'https://api.igdb.com/v4';

// TODO: For some reason, these env variables are undefiened here,
//       but exist in the functions - looks like they're added at runtime?
// const headers = {
//   'Accept': 'application/json',
//   'Authorization': `Bearer ${process.env.REACT_APP_IGDB_ACCESS_TOKEN}`,
//   'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
// };
// console.log(headers)
// TODO: What's the best way to keep the access token fresh?
// console.log(process.env)
const api = axios.create({
  baseURL: API_BASE,
});

const fetchFromIgdb = async (url, data) => {
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_IGDB_ACCESS_TOKEN}`,
    'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
  };
  return api.post(`${API_BASE}${url}`, data, { headers });
};

// TODO: Add try catch
export const getGames = async () => {
  const resp = await fetchFromIgdb('/games', 'fields name; limit 50;');
  return resp;
};

export const searchGames = async (searchString) => {
  const resp = await fetchFromIgdb('/games',
    `search "${searchString}"; fields name; limit 50;`,
  );
  return resp.data;
};

export const getGameDetails = async (gameId) => {
  const gameDetailsResp = await fetchFromIgdb('/games',
    `where id = ${gameId}; 
    fields cover.image_id, 
    first_release_date, 
    involved_companies.company.name, 
    name, platforms.name, 
    similar_games.name, 
    summary, 
    total_rating, 
    total_rating_count, 
    websites.url;`,
  );
  const gameDetailsData = gameDetailsResp.data[0];

  return {
    ...gameDetailsData,
    involved_companies: undefined,
    companies: gameDetailsData.involved_companies?.map(
      involvedCompany => involvedCompany.company
      )
  };
};
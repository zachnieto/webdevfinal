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

const api = axios.create({
  baseURL: API_BASE,
});

// TODO: Add try catch
export const getGames = async () => {
  const resp = await api.post('/games', {
    data: 'fields name; limit 50;',
  });
  return resp;
};

export const searchGames = async (searchString) => {
  const resp = await api.post('/games',
    `search "${searchString}"; fields name; limit 50;`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_IGDB_ACCESS_TOKEN}`,
      'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
    },
  });
  return resp.data;
};

export const getGameDetails = async (gameId) => {
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_IGDB_ACCESS_TOKEN}`,
    'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
  };
  const gameDetailsResp = await api.post('/games',
    `where id = ${gameId}; 
    fields cover, first_release_date, involved_companies, name, similar_games, summary, total_rating, total_rating_count, websites;`,
    { headers },
  );
  const gameDetailsData = gameDetailsResp.data[0];
  // console.log(gameDetailsData);

  const { cover, involved_companies, similar_games, websites } = gameDetailsData;

  const coverPromise = cover ?
    api.post('/covers',
      `where id = ${cover};
       fields url, image_id;`,
      { headers },
    )
    : '';
  const companiesPromise = api.post('/involved_companies',
    `where id = (${involved_companies.join(', ')});
   fields company;`,
    { headers },
  );

  const websitesPromise = websites && websites.length >= 0
    ? api.post('/websites',
      `where id = (${websites.join(', ')});
       fields url;`,
      { headers })
    : [];


  const similarGamesPromise = similar_games && similar_games.length >= 0
    ? api.post('/games',
      `where id = (${similar_games.join(', ')});
       fields name;
       sort name asc;`,
      { headers }
    )
    : [];

  const [coverRes, companiesRes, websitesRes, similarGamesRes] = await Promise.all([
    coverPromise, companiesPromise, websitesPromise, similarGamesPromise,
  ]);

  // console.log({
  //   ...gameDetailsData,
  //   cover: coverRes.data[0].image_id,
  //   companies: companiesRes.data,
  //   websites: websitesRes.data.map(website => website.url),
  //   similar_games: similarGamesRes.data,
  // });
  return {
    ...gameDetailsData,
    cover: coverRes.data[0].image_id,
    companies: companiesRes.data,
    websites: websitesRes.data.map(website => website.url),
    similar_games: similarGamesRes.data,
  };
};
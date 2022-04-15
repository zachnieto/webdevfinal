import axios from 'axios';

const API_BASE = process.env.REACT_APP_SERVER;

export const searchGames = async (searchString) => {
  const resp = await axios.get(`${API_BASE}api/games/?search=${searchString}`);
  return resp.data
}

export const getGameDetails = async (gameId) => {
  const resp = await axios.get(`${API_BASE}api/games/${gameId}`);
  return resp.data;
}
import axios from 'axios';

const API_BASE = process.env.REACT_APP_SERVER;

export const searchGames = async (searchString) => {
  const resp = await axios.get(`${API_BASE}/api/games/?search=${searchString}`);
  return resp.data;
};

export const getGameDetails = async (gameId, userId) => {
  // Adds on userId if it is specified to receive user specific data (isLiked, isDisliked, isBookmarked)
  const resp = await axios.get(
    `${API_BASE}/api/games/${gameId}${userId ? `/user/${userId}` : ''}`
  );
  return resp.data;
};

export const updateGameLikeDislike = async (gameId, userId, isLiked) => {
  const resp = await axios.patch(`${API_BASE}/api/games/${gameId}/like-dislike`, { userId, isLiked });
  return resp.data;
};

// export const updateGameDislike = async (gameId, userId) => {
//   const resp = await axios.patch(`${API_BASE}/api/games/${gameId}/dislike`, { userId });
//   return resp.data;
// };
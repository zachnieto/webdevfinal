import axios from 'axios';

const API_BASE = process.env.REACT_APP_SERVER;

export const searchGames = async (searchQuery) => {
  const resp = await axios.get(`${API_BASE}/api/games/?search=${searchQuery}`);
  return resp.data;
};

export const getGameDetails = async (gameId, userId) => {
  // Adds on userId if it is specified to receive user specific data (isLiked, isDisliked, isBookmarked)
  const resp = await axios.get(
    `${API_BASE}/api/games/${gameId}${userId ? `/user/${userId}` : ''}`
  );
  return resp.data;
};

export const toggleBookmark = async (userId, igdbId, gameName) => {
  const resp = await axios.patch(`${API_BASE}/api/bookmarks`, { userId, igdbId, gameName });
  return resp.data;
};

export const updateGameLikeDislike = async (gameId, gameName, userId, isLiked) => {
  const resp = await axios.patch(`${API_BASE}/api/games/${gameId}/like-dislike`, { userId, gameName, isLiked });
  return resp.data;
};

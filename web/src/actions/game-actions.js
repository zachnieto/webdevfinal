import * as gameService from '../services/game-service';

export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const UPDATE_GAME_LIKE_DISLIKE = 'UPDATE_GAME_LIKE_DISLIKE';

export const searchGames = async (searchQuery) => {
  return await gameService.searchGames(searchQuery);
};

export const getGameDetails = async (dispatch, gameId, userId) => {
  const game = await gameService.getGameDetails(gameId, userId);
  dispatch({
    type: GET_GAME_DETAILS,
    game,
  });
};

export const toggleBookmark = async (userId, gameId, gameName) => {
  await gameService.toggleBookmark(userId, gameId, gameName);
};

export const updateGameLikeDislike = async (dispatch, gameId, gameName, userId, isLiked) => {
  const newLikeDislike = await gameService.updateGameLikeDislike(gameId, gameName, userId, isLiked);
  dispatch({
    type: UPDATE_GAME_LIKE_DISLIKE,
    isLiked: newLikeDislike.isLiked,
  });
};

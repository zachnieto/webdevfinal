import * as gameService from '../services/game-service';

export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const UPDATE_GAME_LIKE_DISLIKE = 'UPDATE_GAME_LIKE_DISLIKE';


export const getGameDetails = async (dispatch, gameId, userId) => {
  const game = await gameService.getGameDetails(gameId, userId);
  dispatch({
    type: GET_GAME_DETAILS,
    game,
  });
};

export const updateGameLikeDislike = async (dispatch, gameId, userId, isLiked) => {
  const newLikeDislike = await gameService.updateGameLikeDislike(gameId, userId, isLiked);
  dispatch({
    type: UPDATE_GAME_LIKE_DISLIKE,
    isLiked: newLikeDislike.isLiked,
  });
};

// export const dislikeGame = async (dispatch, gameId, userId) => {
//   const disliked = await gameService.updateGameDislike(gameId, userId);
//   dispatch({
//     type: DISLIKE_GAME,
//     dislike: disliked,
//   });
// };
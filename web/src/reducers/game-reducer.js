import { GET_GAME_DETAILS, UPDATE_GAME_LIKE_DISLIKE } from '../actions/game-actions';

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GAME_DETAILS:
      return action.game;
    case UPDATE_GAME_LIKE_DISLIKE:
      const isLiked = !!action.newLikeDislike;
      const isDisliked = !action.newLikeDislike;
      return {
        ...state,
        isLiked,
        isDisliked,
      };
    default:
      return state;
  }
};

export default gameReducer;
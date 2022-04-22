import userModel from '../users/user-model.js';
import likeDislikeModel from './like-dislike-model.js';

export const getLikeDislikeCountByGame = async (igdbId) => {
  const likeCount = likeDislikeModel.countDocuments({ igdbId, isLiked: true });
  const dislikeCount = likeDislikeModel.countDocuments({ igdbId, isLiked: false });

  return {
    likes: await likeCount,
    dislikes: await dislikeCount,
  };
};

export const getIsLikedDisliked = async (userId, igdbId) => {
  const likeDislike = await likeDislikeModel.findOne({ user:{_id: userId}, igdbId });
  console.log(likeDislike)
  return {
    isLiked: !!likeDislike?.isLiked,
    isDisliked: !likeDislike?.isLiked,
  };
};

/**
 * Toggles the like or disliked flag for a game by a user.
 * If a user has not liked/disliked a game yet, a new entry will be created.
 * If a user is unliking/undisliking a game, the existing entry will be deleted.
 * If a user is changing their opinion from like to disliked or vice versa,
 * the existing entry will be updated.
 * @param userId the user liking/disliking the game
 * @param igdbId the game being liked/disliked
 * @param isLiked true if the game is being liked, false if disliked, and undefined if neither
 */
export const toggleLikeDislike = async (userId, igdbId, isLiked) => {
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    throw `User with id ${userId} does not exist`;
  }

  let dbLikeDislike = await likeDislikeModel.findOne({ userId, igdbId });

  if (isLiked === undefined) {
    await likeDislikeModel.deleteOne({ userId, igdbId });
    dbLikeDislike.isLiked = isLiked;
  } else if (dbLikeDislike) {
    dbLikeDislike = await likeDislikeModel.updateOne({ userId, igdbId }, { isLiked });
  } else {
    dbLikeDislike = await likeDislikeModel.create({
      userId,
      igdbId,
      isLiked,
    });
  }

  return dbLikeDislike;
};

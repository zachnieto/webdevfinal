import * as likeDislikeDao from '../database/likes-dislikes/like-dislike-dao.js';
import * as userDao from '../database/users/user-dao.js';
import { getIgdbGames, searchIgdbGames } from '../services/igdb-service.js';


const searchGames = async (req, res) => {
  const searchString = req.query.search;
  const result = await searchIgdbGames(searchString);
  res.send(result);
};

export const getGameDetails = async (req, res) => {
  const { igdbId, userId } = req.params;
  try {
    const promises = [];
    promises.push(getIgdbGames(igdbId));
    promises.push(likeDislikeDao.getLikeDislikeCountByGame(igdbId));
    if (userId) {
      promises.push(userDao.getIsBookmarked(userId, igdbId));
      promises.push(likeDislikeDao.getIsLikedDisliked(userId, igdbId));
    }

    const data = await Promise.all(promises);
    res.json(data.reduce((result, datum) => ({ ...result, ...datum }), {}));
  } catch (e) {
    res.status(400).send(e);
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const updatedUser = await userDao.toggleUserBookmark(req.body.userId, req.body.igdbId);
    res.json(updatedUser);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const updateLikeDislike = async (req, res) => {
  try {
    const updatedLikeDislike = await likeDislikeDao.toggleLikeDislike(
      req.body.userId,
      req.params.igdbId,
      req.body.isLiked,
    );
    res.json(updatedLikeDislike);
  } catch (e) {
    res.status(400).send(e);
  }
};

// export const toggleDisLike = async (req, res) => {
//   try {
//     const dislike = await likeDislikeDao.toggleLikeDislike(
//       req.body.userId,
//       req.params.igdbId,
//       false,
//     );
//     res.json(dislike);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// };

export default (app) => {
  app.get('/api/games/', searchGames);
  app.get('/api/games/:igdbId', getGameDetails);
  app.get('/api/games/:igdbId/user/:userId', getGameDetails);
  app.patch('/api/bookmarks', toggleBookmark);
  app.patch('/api/games/:igdbId/like-dislike', updateLikeDislike);
};
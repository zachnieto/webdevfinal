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
    const gameData = await getIgdbGames(igdbId)
    promises.push(likeDislikeDao.getLikeDislikeCountByGame(igdbId));

    if (userId) {
      promises.push(userDao.getIsBookmarked(userId, igdbId));
      promises.push(likeDislikeDao.getIsLikedDisliked(userId, igdbId));
      userDao.addVisitedLink(userId, igdbId, gameData.name);
    }

    const data = await Promise.all(promises);
    data.push(gameData)
    const reduced = data.reduce((result, datum) => ({ ...result, ...datum }), {})
    res.json(reduced);
  } catch (e) {
    res.status(400).send(e);
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const updatedUser = await userDao.toggleUserBookmark(req.body.userId, req.body.igdbId, req.body.gameName);
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
      req.body.gameName,
      req.body.isLiked,
    );
    res.json(updatedLikeDislike);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default (app) => {
  app.get('/api/games/', searchGames);
  app.get('/api/games/:igdbId', getGameDetails);
  app.get('/api/games/:igdbId/user/:userId', getGameDetails);
  app.patch('/api/bookmarks', toggleBookmark);
  app.patch('/api/games/:igdbId/like-dislike', updateLikeDislike);
};
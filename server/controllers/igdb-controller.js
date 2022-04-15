import { getGameDetails, searchGames } from '../services/igdb-service.js';

const igdbController = (app) => {
  app.get('/api/games/', async (req, res) => {
    const searchString = req.query.search;
    const result = await searchGames(searchString);
    res.send(result);
  });

  app.get('/api/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const result = await getGameDetails(gameId);
    res.send(result);
  });
}

export default igdbController;
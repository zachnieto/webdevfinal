import mongoose from 'mongoose';
import gameSchema from './game-schema';

const gameModel = mongoose.model('GameModel', gameSchema);

export default gameModel;
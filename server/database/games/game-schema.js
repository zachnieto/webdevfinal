import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  igdbId: { type: Number, unique: true },
  likes: Number,
  dislikes: Number,
});

export default gameSchema;
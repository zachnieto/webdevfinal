import mongoose from "mongoose";
import likeDislikeSchema from './like-dislike-schema.js';

const likeDislikeModel = mongoose.model('LikesDislikesModel', likeDislikeSchema);

export default likeDislikeModel;
import mongoose from "mongoose";

const likeDislikeSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    igdbId: String,
    isLiked: Boolean, // true represents a like, false represents a dislike
}, { collection: 'likesDislikes' });

export default likeDislikeSchema;
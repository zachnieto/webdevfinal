import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}, { collection: 'users' });

export default userSchema;
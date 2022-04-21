import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    bookmarks: [String], // TODO: Double check this
}, { collection: 'users' });

export default userSchema;
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {type: String, defaultValue: "Member"},
    comments: {type: Array, defaultValue: []},
    bookmarks: [String],
}, { collection: 'users' });

export default userSchema;
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, defaultValue: "Member" },
    comments: { type: Array, defaultValue: [] },
    bookmarks: {type: Array, defaultValue: []},
    visitedLinks: { type: Array, defaultValue: [] }
}, { collection: 'users' });

export default userSchema;
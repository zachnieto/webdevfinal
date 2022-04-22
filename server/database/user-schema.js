import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: String,
    password: String,
    role: {type: String, defaultValue: "Member"},
    comments: {type: Array, defaultValue: []},
}, {collection: 'users'})

export default schema;
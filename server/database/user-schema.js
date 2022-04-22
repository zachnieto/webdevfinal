import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: String,
    password: String,
    comments: {type: Array, defaultValue: []},
}, {collection: 'users'})

export default schema;
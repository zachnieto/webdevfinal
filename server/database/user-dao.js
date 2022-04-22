import userModel from "./user-model.js";

export const createUser = (user) => userModel.create(user);
export const findUserByUsername = (user) => userModel.findOne({"username": user.username});
export const findUserById = (id) => userModel.findOne({"_id": id});
export const updateUser = (id, user) => userModel.updateOne({_id: id}, {$set: user});
export const deleteUser = (id) => userModel.deleteOne({_id: id});

export const comment = (id, comment) => userModel.updateOne({_id: id}, {$push: {comments: comment}});

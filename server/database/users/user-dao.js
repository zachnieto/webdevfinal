import userModel from "./user-model.js";

export const createUser = (user) => userModel.create(user);
export const findUserByUsername = (user) => userModel.findOne({ username: user.username });
export const findUserById = (id) => userModel.findOne({ _id: id });
export const updateUser = (id, user) => userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });

export const toggleUserBookmark = async (userId, igdbId) => {
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    throw `User with id ${userId} does not exist`;
  }

  let updatedUser;
  const dbUserBookmarks = user.bookmarks;
  if (dbUserBookmarks.includes(igdbId)) {
    // If there is already a bookmark, remove it from the user's bookmarks
    updatedUser = await userModel.updateOne({ _id: userId }, { $pull: { bookmarks: igdbId } });
  } else {
    // If there isn't a bookmark, add it to the user's bookmarks
    updatedUser = await userModel.updateOne({ _id: userId }, { $push: { bookmarks: igdbId } });
  }

  return updatedUser;
};

export const getIsBookmarked = async (userId, igdbId) => ({
  isBookmarked: !!(await userModel.exists({
    _id: userId,
    bookmarks: igdbId,
  }))
});
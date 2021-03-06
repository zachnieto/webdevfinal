import userModel from "./user-model.js";

export const createUser = (user) => userModel.create(user);
export const findUserByUsername = (username) => userModel.findOne({ "username": username });
export const findUserById = (id) => userModel.findOne({ _id: id });
export const updateUser = (id, user) => userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });
// Can optionally take in a username to use as a search query
export const users = (searchQuery) => {
  const findQuery = {};

  if (searchQuery) {
    // Escapes all special characters
    const escapedUsername = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(`${escapedUsername}`, 'i');
    findQuery.username = searchRegex;
  }

  return userModel.find(findQuery, { password: 0 });
};
export const comment = (id, comment) => userModel.updateOne({ _id: id }, { $push: { comments: comment } });
export const deleteComment = (id, comment) => userModel.updateOne({ _id: id }, { $pull: { comments: comment } });

export const toggleUserBookmark = async (userId, igdbId, gameName) => {
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    throw `User with id ${userId} does not exist`;
  }

  let updatedUser;
  const dbUserBookmarks = user.bookmarks;
  if (dbUserBookmarks.some(bookmark => bookmark.igdbId === igdbId)) {
    // If there is already a bookmark, remove it from the user's bookmarks
    updatedUser = await userModel.updateOne({ _id: userId }, { $pull: { bookmarks: { igdbId } } });
  } else {
    // If there isn't a bookmark, add it to the user's bookmarks
    updatedUser = await userModel.updateOne({ _id: userId }, { $push: { bookmarks: { igdbId, gameName } } });
  }

  return updatedUser;
};

// Params are passed in as strings, so igdbId must be converted into a number
export const getIsBookmarked = async (userId, igdbId) => ({
  isBookmarked: !!(await userModel.exists({
    _id: userId,
    bookmarks: { $elemMatch: { igdbId: parseInt(igdbId) } }
  }))
});


export const addVisitedLink = async (userId, igdbId, gameName) => {
  const user = await userModel.findOne({ _id: userId });
  if (!user)
    throw `User with id ${userId} does not exist`;

  const visitedLinks = user.visitedLinks.filter(link => link.id.toString() !== igdbId).slice(-9);
  visitedLinks.push({ id: igdbId, name: gameName });
  await userModel.updateOne({ _id: userId }, { $set: { visitedLinks: visitedLinks } });

  return visitedLinks;
};

export const getLinks = (userId) => userModel.findOne({ _id: userId }, { visitedLinks: 1 });

export const getNewestUser = () => userModel.find().sort({ $natural: -1 }).limit(1);

import * as userDao from "../database/users/user-dao.js";
import * as likesDislikesDao from '../database/likes-dislikes/like-dislike-dao.js';
import bcrypt from "bcrypt";

const saltRounds = 10;

const createUser = async (req, res) => {
    const newUser = req.body.params.user;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    const existingUser = await userDao.findUserByUsername(newUser.username);
    if (existingUser)
        return res.status(403).send("An account already exists with this username");

    const createdUser = await userDao.createUser(newUser);
    createdUser.password = "***";
    req.session.user = createdUser;

    res.json(createdUser);
};

const updateUser = async (req, res) => {
    const userId = req.params.uid;
    let existingUser = await userDao.findUserById(userId).lean();
    let updatedUser = req.body.params.user;

    if (existingUser.username !== updatedUser.username && await userDao.findUserByUsername(updatedUser.username))
        return res.status(403).send("An account already exists with this username");

    if (updatedUser.password !== "***" && updatedUser.password !== "")
        updatedUser.password = await bcrypt.hash(updatedUser.password, saltRounds);
    else
        updatedUser.password = existingUser.password;

    updatedUser.comments = existingUser.comments;

    updatedUser.comments = existingUser.comments;

    await userDao.updateUser(userId, updatedUser);
    updatedUser.password = "***";
    req.session.user = updatedUser;
    res.send(updatedUser);
};

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const status = await userDao.deleteUser(userId);
    req.session.destroy();
    res.send(status);
};

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

const login = async (req, res) => {
    const user = req.body.params.user;
    const existingUser = await userDao.findUserByUsername(user.username);

    if (!existingUser || !await bcrypt.compare(user.password, existingUser.password)) {
        return res.status(403).send("Invalid username and/or password");
    }

    existingUser.password = "***";
    req.session.user = existingUser;
    res.json(existingUser);
};

const getProfile = async (req, res) => {
    const username = req.params.username;
    const user = await userDao.findUserByUsername(username).lean();

    if (!user)
        return res.sendStatus(404);

    delete user.password;
    res.json(user);
};

const getPrivateProfile = async (req, res) => {
    const username = req.params.username;
    const user = await userDao.findUserByUsername(username).lean();
    if (!user) {
        return res.sendStatus(404)
    }

    const likesDislikes = await likesDislikesDao.getLikesDislikesByUser(user._id);
    res.json({ ...likesDislikes, bookmarked: user.bookmarks });
};

const comment = async (req, res) => {
    const userId = req.params.uid;
    const comment = req.body.params.comment;
    await userDao.comment(userId, comment);
    res.sendStatus(200);
};

const deleteComment = async (req, res) => {
    const userId = req.params.uid;
    const comment = req.body.params.comment;
    await userDao.deleteComment(userId, comment);
    res.sendStatus(200);
};

const getUsers = async (req, res) => {
    const searchQuery = req.query.search
    const users = await userDao.users(searchQuery);
    res.json(users);
};

const getLinks = async (req, res) => {
    const userData = await userDao.getLinks(req.session.user._id);
    res.json(userData.visitedLinks);
};

const getNewestUser = async (req, res) => {
    const userData = await userDao.getNewestUser();
    res.json(userData[0].username);
};

export default (app) => {
    app.put('/update/:uid', updateUser);
    app.delete('/delete/:uid', deleteUser);
    app.get('/logout', logout);
    app.put('/login', login);
    app.post('/signup', createUser);
    app.get('/profile/:username', getProfile);
    app.get('/profile/private/:username', getPrivateProfile);
    app.post('/comment/:uid', comment);
    app.post('/deletecomment/:uid', deleteComment);
    app.get('/users', getUsers);
    app.get('/links', getLinks);
    app.get('/newestuser', getNewestUser);
    app.get('/users/:username')
};

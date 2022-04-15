import * as userDao from "../database/user-dao.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const createUser = async (req, res) => {
    const newUser = req.body.params.user;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds)

    const existingUser = await userDao.findUserByUsername(newUser)
    if (existingUser)
        return res.status(403).send("An account already exists with this username")

    const createdUser = await userDao.createUser(newUser);
    createdUser.password = "***"
    req.session.user = createdUser;

    res.json(createdUser)
}

const updateUser = async (req, res) => {
    const userId = req.params.uid
    const existingUser = await userDao.findUserById(userId)
    const updatedUser = req.body.params.user;

    if (existingUser.username !== updatedUser.username && await userDao.findUserByUsername(updatedUser.username))
        return res.status(403).send("An account already exists with this username")

    if (updatedUser.password !== "***")
        updatedUser.password = await bcrypt.hash(updatedUser.password, saltRounds)
    else
        updatedUser.password = existingUser.password

    await userDao.updateUser(userId, updatedUser);
    res.send(updatedUser)
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const status = await userDao.deleteUser(userId);
    req.session.destroy();
    res.send(status);
}

const logout = async (req, res) => {
    req.session.destroy();
    res.send(200);
}

const login = async (req, res) => {
    const user = req.body.params.user;
    const existingUser = await userDao.findUserByUsername(user)

    if (!existingUser || !await bcrypt.compare(user.password, existingUser.password)) {
        return res.status(403).send("Invalid username and/or password")
    }

    existingUser.password = "***"
    req.session.user = existingUser;
    console.log(req.session)
    res.json(existingUser)
}

export default (app) => {
    app.put('/update/:uid', updateUser);
    app.delete('/delete/:uid', deleteUser);
    app.get('/logout', logout);
    app.put('/login', login);
    app.post('/signup', createUser);
}
import * as serverService from '../services/server-service';

export const SESSION = 'SESSION';
export const LOGOUT = 'LOGOUT';
export const USER = 'USER';

export const updateUser = async (dispatch, uid, updatedUser) => {
    const user = await serverService.updateUser(uid, updatedUser)
    dispatch({
        type: USER,
        user
    })
};

export const deleteAccountAndLogout = async (dispatch, uid) => {
    await serverService.deleteUser(uid)
    dispatch({
        type: LOGOUT
    })
};

export const deleteAccount = async (uid) => {
    await serverService.deleteUser(uid)
};

export const login = async (dispatch, authUser) => {
    const user = await serverService.login(authUser)
    dispatch({
        type: 'USER',
        user,
    })
};

export const logout = async (dispatch) => {
    await serverService.logout()
    dispatch({
        type: LOGOUT
    })
};

export const signup = async (dispatch, newUser) => {
    const user = await serverService.signup(newUser)
    dispatch({
        type: USER,
        user
    })
};

export const getSession = async (dispatch) => {
    const session = await serverService.getSession()
    dispatch({
        type: SESSION,
        session
    })
};

export const getProfile = async (username) => {
    return await serverService.getProfile(username)
};

export const getPrivateProfile = async (username) => {
    return await serverService.getPrivateProfile(username);
}

export const submitComment = async (userId, comment) => {
    await serverService.comment(userId, comment)
}

export const deleteComment = async (userId, comment) => {
    return await serverService.deleteComment(userId, comment)
}

export const getUsers = async () => {
    return await serverService.getUsers()
}

export const getVisitedLinks = async () => {
    return await serverService.getVisitedLinks()
}

export const getNewestUser = async () => {
    return await serverService.getNewestUser()
}


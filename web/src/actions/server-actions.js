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

export const deleteUser = async (dispatch, uid) => {
    await serverService.deleteUser(uid)
    dispatch({
        type: LOGOUT
    })
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


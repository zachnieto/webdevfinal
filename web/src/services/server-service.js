import axios from 'axios';

const API_BASE = process.env.REACT_APP_SERVER;

const api = axios.create({
    withCredentials: true
});


export const updateUser = async (uid, user) => {
    const resp = await api.put(`${API_BASE}/update/${uid}`, {
        params: {
            user: user
        }
    });
    return resp.data;
};

export const deleteUser = async (uid) => {
    const resp = await api.delete(`${API_BASE}/delete/${uid}`);
    return resp.data;
};

export const login = async (user) => {
    const resp = await api.put(`${API_BASE}/login`, {
        params: {
            user: user
        }
    });
    console.log(resp);
    console.log(resp.session);
    return resp.data;
};

export const logout = async () => {
    const resp = await api.get(`${API_BASE}/logout`);
    return resp.data;
};

export const signup = async (user) => {
    const resp = await api.post(`${API_BASE}/signup`, {
        params: {
            user: user
        }
    });
    return resp.data;
};

export const getSession = async () => {
    const resp = await api.get(`${API_BASE}/api/session/get/`);
    return resp.data;
};

export const getProfile = async (username) => {
    const resp = await api.get(`${API_BASE}/profile/${username}`);
    return resp.data;
};

export const comment = async (userId, comment) => {
    const resp = await api.post(`${API_BASE}/comment/${userId}`, {
        params: {
            comment: comment
        }
    });
    return resp.data;
};

export const deleteComment = async (userId, comment) => {
    const resp = await api.post(`${API_BASE}/deletecomment/${userId}`, {
        params: {
            comment: comment
        }
    });
    console.log(resp.data);
    return resp.data;
};

export const getUsers = async (searchQuery) => {
    const resp = await api.get(`${API_BASE}/users${searchQuery ? `/?search=${searchQuery}` : ''}`);
    return resp.data;
};

export const getVisitedLinks = async () => {
    const resp = await api.get(`${API_BASE}/links`);
    return resp.data;
};

export const getNewestUser = async () => {
    const resp = await api.get(`${API_BASE}/newestuser`);
    return resp.data;
};
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
    })
    return resp.data;
}

export const deleteUser = async (uid) => {
    const resp = await api.delete(`${API_BASE}/delete/${uid}`)
    return resp.data;
}

export const login = async (user) => {
    const resp = await api.put(`${API_BASE}/login`, {
        params: {
            user: user
        }
    })
    return resp.data;
}

export const logout = async () => {
    const resp = await api.get(`${API_BASE}/logout`)
    return resp.data;
}

export const signup = async (user) => {
    const resp = await api.post(`${API_BASE}/signup`, {
        params: {
            user: user
        }
    })
    return resp.data;
}

export const getSession = async () => {
    const resp = await api.get(`${API_BASE}/api/session/get/`)
    return resp.data;
}

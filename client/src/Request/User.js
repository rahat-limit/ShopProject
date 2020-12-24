import axios from 'axios';
import { removeUser, setUser } from '../Reducer/userReducer';

export const register = async (user) => {
    try {
        const res = await axios.post('http://localhost:5000/users/register', user)

        return res;
    } catch (e) {
        alert(e.response.data.msg);
    }
}

export const login = (user) => {
    try {
        return async dispatch => {
            const res = await axios.post('http://localhost:5000/users/login', user)

            dispatch(setUser(res.data.user))

            localStorage.setItem('token', res.data.token)
            return true;
        }
    } catch (e) {
        alert({error: e.response.data.msg})
    }
}

export const getUser = () => {
    try {
        return async dispatch => {
            const res = await axios.get('http://localhost:5000/users/getUser', { headers: {authorization: localStorage.getItem('token') } })

            dispatch(setUser(res.data.user))

            localStorage.setItem('token', res.data.token)
        }
    } catch (e) {
        return e
    }
}

export const logout = () => {
    try {
        return async dispatch => {
            dispatch(removeUser())

            localStorage.removeItem('token')
        }
    } catch (e) {
        return e
    }
}
const defaultState = {
    user: {},
    isAuth: false,
    errors: ''
}

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

export const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload, isAuth: true, errors: ''}
        case REMOVE_USER:
            return {...state, user: {}, isAuth: false}
        default:
            return state;
    }
}

export const setUser = (payload) => ({type: SET_USER, payload})
export const removeUser = () => ({type: SET_USER})

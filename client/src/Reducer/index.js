import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productReducer } from './productReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
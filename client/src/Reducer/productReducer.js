const ProductInfo = []

const SET_PRODUCT = 'SET_PRODUCT';

export const productReducer = (state = ProductInfo, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return [...state, action.payload]
        default:
            return state;
    }
}

export const setProducts = (payload) => ({type: SET_PRODUCT, payload})
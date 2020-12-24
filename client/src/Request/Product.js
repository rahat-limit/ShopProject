import { setProducts } from "../Reducer/productReducer";
import axios from 'axios'

// export const createProduct = (info) => {
//     try {
//         return async dispatch => {
//             const product = await axios.post('http://localhost:5000/product/createProduct', info)

//             dispatch(setProduct(product.data.product))
//         }
//     } catch (e) {

//     }
// }

export const getAll = () => {
    try {
        return async dispatch => {
            const res = await axios.get('http://localhost:5000/product/getProduct', { headers: {authorization: localStorage.getItem('token')} })

            dispatch(setProducts([...res.data.product]))
        }
    } catch (e) {

    }
}
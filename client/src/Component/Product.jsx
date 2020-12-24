import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../Request/Product';


function Product() {
    const dipatch = useDispatch()

    const products = useSelector(state => state.product)

    const getInfo = () => {
        products.children.map(el => {
            return (
                <h1>{el.title}</h1>
            )
        })
    }

    return (
        <div>
            {getInfo}
        </div>
    )
}

export default Product

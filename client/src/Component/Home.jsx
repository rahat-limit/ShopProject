import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAll } from '../Request/Product'
import Product from './Product'

function Home() {
    return (
        <div>
            <Product />
        </div>
    )
}

export default Home

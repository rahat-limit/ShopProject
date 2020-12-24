import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './Component/Register';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Home from './Component/Home';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './Request/User';
import { getAll } from './Request/Product';

function App() {
    // const user = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    const products = useSelector(state => state.product)
    const dispatch = useDispatch() 
    const getInfo = () => {
        dispatch(getAll())
    }

    useEffect(() => {
        dispatch(getUser())
        getInfo()
    })

    return (
        <div>
            <Navbar />
            <Switch>
                {isAuth && <Route path='/' component={Home}/>}
                {!isAuth && <Route path='/login'exact component={Login}/>}
                {!isAuth && <Route path='/register' component={Register}/>}
                {isAuth && <Redirect to='/'/>}
                {!isAuth && <Redirect to='/login'/>}
            </Switch>
        </div>
    )
}

export default App

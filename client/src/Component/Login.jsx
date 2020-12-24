import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../Request/User';
import { useHistory } from 'react-router-dom'

function Login() {
    const user = {
        email: '',
        password: ''
    }
    const [data, setData] = useState(user)
    const dispatch = useDispatch()

    const history = useHistory()

    const { email, password } = data; 
    const handleChange = text => e => {
        setData({...data, [text]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(login(data)).then(res => {
                if (res) {
                    history.push('/')
                }
            })
        } catch (err) {
            console.log(err.message)
        } 
    }
    return (
        <form className='container' onSubmit={handleSubmit}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="text" placeholder='Email' value={email} onChange={handleChange('email')} name='email' className="validate"/>
                <label htmlFor="email"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password" type="password" placeholder='Password' value={password} onChange={handleChange('password')} name='password' className="validate"/>
                <label htmlFor="password"></label>
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
                Sign In
            </button>
            <button className="btn waves-effect waves-light" type="button" style={{marginLeft: '20px'}} name="action">
                <NavLink to='/register' style={{color: '#fff'}}>
                    Register
                </NavLink>
            </button>
        </form>
    )
}

export default Login

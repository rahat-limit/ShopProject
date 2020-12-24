import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { register } from '../Request/User';

function Register() {
    const user = {
        email: '',
        name: '',
        password1: '',
        password2: ''
    }
    const history = useHistory()
    const [data, setData] = useState(user)
    const handleChange = text => e => {
        setData({...data, [text]: e.target.value})
    }

    const { email, name, password1, password2 } = data;

    const registerHandler = e => {
        try {
            e.preventDefault()

            register(data).then((res) => {
                if (res) {
                    history.push('/login')
                }
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <form className='container' onSubmit={registerHandler}>
            <h1 style={{textAlign: 'center'}}>Register</h1>
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="text" placeholder='Email' value={email} onChange={handleChange('email')} name='email' className="validate"/>
                <label htmlFor="email"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="name" type="text" placeholder='Name' value={name} onChange={handleChange('name')} name='name' className="validate"/>
                <label htmlFor="name"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password1" type="password" placeholder='password' value={password1} onChange={handleChange('password1')} name='password1' className="validate"/>
                <label htmlFor="password1"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password2" type="password" placeholder='Confirm Password' value={password2} onChange={handleChange('password2')} name='password2' className="validate"/>
                <label htmlFor="password2"></label>
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
                Sign Up
            </button>
            <button className="btn waves-effect waves-light" type="button" style={{marginLeft: '20px'}} name="action">
                <NavLink to='/login' style={{color: '#fff'}}>
                    Login
                </NavLink>
            </button>
        </form>
    )
}

export default Register

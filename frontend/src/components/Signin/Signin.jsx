import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { login } from '../../redux/authSlice';
import { request } from '../../util/fetchAPI';
import classes from './signin.module.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const headers = {
                'Content-Type': 'application/json'
            }
            const data = await request(
                '/auth/login', 
                'POST', 
                headers, 
                { email, password }
            );

            dispatch(login(data));
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Sign In</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email..." 
                        onChange={(e) => setEmail(e.target.value)}   
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password..." 
                        onChange={(e) => setPassword(e.target.value)}   
                    />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/signup">Register</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signin;

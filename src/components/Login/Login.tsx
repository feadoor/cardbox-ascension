import React, { useState } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';

export interface LoginProps {
    doLogin: (email: string, password: string) => Promise<any>;
}

const Login: React.FC<LoginProps> = ({doLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (isLoggedIn) {
        return <Redirect to="/"></Redirect>
    }

    return <div className="login">
        <label className="login__label">
            Email
            <input type="email" className="login__input" value={email} onChange={e => setEmail(e.target.value)}></input>
        </label>
        <label className="login__label">
            Password
            <input type="password" className="login__input" value={password} onChange={e => setPassword(e.target.value)}></input>
        </label>
        <button className="login__submit" onClick={() => doLogin(email, password).then(() => setIsLoggedIn(true))}>Submit</button>
    </div>
}

export default Login;

import React from 'react';
import './LoginPage.css';
import NetworkedLogin from '../../containers/NetworkedLogin/NetworkedLogin';

const LoginPage: React.FC = () => {
    return <div className="login-page">
        <NetworkedLogin></NetworkedLogin>
    </div>
}

export default LoginPage;

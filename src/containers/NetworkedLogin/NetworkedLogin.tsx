import React from 'react';
import Login from '../../components/Login/Login';

import { login } from '../../services/loginService';

const NetworkedLogin: React.FC = () => {
    return <Login doLogin={login}></Login>
}

export default NetworkedLogin;

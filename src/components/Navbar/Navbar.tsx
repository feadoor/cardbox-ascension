import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <Link className="navbar__link" to="/">Home</Link>
        </div>
    );
}

export default Navbar;

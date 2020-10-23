import React from 'react';
import { Link } from 'react-router-dom';

// import './NavBar.css';

const NavBar = () => {
    return (
        <div>
            <h5>NAVBAR</h5>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/todolist">Todo List</Link></li>
                <li><Link to="/grid">Grid</Link></li>
            </ul>
            <hr />
        </div>
    );
};

export default NavBar;
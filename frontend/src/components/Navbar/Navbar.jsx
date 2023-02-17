import React from 'react';

import { BsHouseDoor } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import classes from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Link to="/" className={classes.left}>
                    Real Estate <BsHouseDoor />
                </Link>
                <ul className={classes.center}>
                    <li className={classes.listItem}>Home</li>
                    <li className={classes.listItem}>About</li>
                    <li className={classes.listItem}>Featured</li>
                    <li className={classes.listItem}>Contacts</li>
                </ul>
                <div className={classes.right}>
                    <Link to="/signup">Signup</Link>
                    <Link to="/signin">Signin</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

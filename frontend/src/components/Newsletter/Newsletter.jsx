import React from 'react';

import { FiSend } from 'react-icons/fi';

import classes from './newsletter.module.css';

const Newsletter = () => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5>Want to get the latest offers?</h5>
                    <h2>Send us your email and we will do the rest</h2>
                </div>
                <div className={classes.inputContainer}>
                    <input type="email" placeholder="Type email..." />
                    <FiSend className={classes.sendIcon} />
                </div>
            </div>
        </div>
    );
}

export default Newsletter;

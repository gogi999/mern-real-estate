import React from 'react';

import classes from './footer.module.css';

const Footer = () => {
    return (
        <footer>
            <div className={classes.wrapper}>
                <div className={classes.col}>
                    <h2>About the App</h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Provident facere, voluptate dolore accusamus consequatur 
                        veniam atque inventore magni ipsam recusandae molestiae 
                        accusantium est iure vero eveniet, laboriosam perspiciatis 
                        animi assumenda.
                    </p>
                </div>
                <div className={classes.col}>
                    <h2>Contacts</h2>
                    <span>Phone: +123 456 789</span>
                    <span>Youtube: Gogi999</span>
                    <span>Github: gogi999</span>
                </div>
                <div className={classes.col}>
                    <h2>Location</h2>
                    <span>Continent: Europe</span>
                    <span>Country: Bosnia and Herzegovina</span>
                    <span>Current Location: Bosnia and Herzegovina</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

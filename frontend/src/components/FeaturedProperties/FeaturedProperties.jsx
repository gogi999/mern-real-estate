import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaBed,
  FaSquareFull,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import img from '../../assets/estate2.jpg';
import person from '../../assets/person.jpg';
import { request } from '../../util/fetchAPI';
import classes from './featuredProperties.module.css';

const FeaturedProperties = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await request('/property/find/featured', 'GET');
                setFeaturedProperties(data);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchFeatured();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5>Properties you may like</h5>
                    <h2>Our Featured Properties</h2>
                </div>
                <div className={classes.featuredProperties}>
                    {featuredProperties.map((property) => (
                        <div className={classes.featuredProperty} key={property._id}>
                            <Link 
                                to={`/propertyDetail/${property._id}`}
                                className={classes.imgContainer}
                            >
                                <img src={img} alt="" />
                            </Link>
                            <div className={classes.details}>
                                <div className={classes.priceAndOwner}>
                                    <span className={classes.price}>
                                        $ {property?.price}
                                    </span>
                                    <img src={person} alt="" className={classes.owner} />
                                </div>
                                <div className={classes.moreDetails}>
                                    <span>{property?.beds} beds <FaBed className={classes.icon} /></span>
                                    <span>{property?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span>
                                </div>
                                <div className={classes.desc}>
                                    {property?.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedProperties;

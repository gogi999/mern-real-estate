import React, {
  useEffect,
  useState,
} from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import {
  FaBed,
  FaSquareFull,
} from 'react-icons/fa';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import person from '../../assets/person.jpg';
import { request } from '../../util/fetchAPI';
import { continentToIndex } from '../../util/indexToContinent';
import { arrPriceRanges } from '../../util/indexToPriceRange';
import classes from './properties.module.css';

const Properties = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [state, setState] = useState(null);
    const query = (useLocation().search).slice(1); // slice(1) -> to get rid of ?
    const arrQuery = query.split('&');
    const navigate = useNavigate();

    const handleState = (e) => {
        setState((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSearch = (param = state) => {
        let options;

        // We either pass the formattedObj or event
        if (param?.nativeEvent) {
            options = state;
        } else {
            options = param;
        }

        // eslint-disable-next-line array-callback-return
        const filteredProperties = allProperties.filter((property) => {
            // options.priceRange === 1 => arrPriceRanges[1] => second element => '100000-200000'
            const priceRange = arrPriceRanges[options.priceRange];
            const minPrice = Number(priceRange.split('-')[0]);
            const maxPrice = Number(priceRange.split('-')[1]);
            const continent = continentToIndex(property.continent);
      
            if (
              property.type === options.type
              && continent === Number(options.continent)
              && property.price >= minPrice && property.price <= maxPrice
            ) {
              return property;
            }
          });

        const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`;

        navigate(`/properties?${queryStr}`, { replace: true });
        setFilteredProperties((prev) => filteredProperties);
    }

    // Fetch all properties
    useEffect(() => {
        const fetchAllProperties = async () => {
            try {
                const data = await request('/property/getAll', 'GET');
                setAllProperties(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchAllProperties();
    }, []);

    // Parsing query params
    useEffect(() => {
        if (arrQuery && allProperties?.length > 0 && state === null) {
            let formattedQuery = {}

            arrQuery.forEach((option, idx) => {
                const key = option.split('=')[0];
                const value = option.split('=')[1];

                formattedQuery = { ...formattedQuery, [key]: value }

                // If we are on the last index, assign the formattedQuery object to state
                if (idx === arrQuery.length - 1) {
                    setState(formattedQuery);
                    handleSearch(formattedQuery);
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allProperties, arrQuery, state]);

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.options}>
                    <select name="type" value={state?.type} onChange={handleState}>
                        <option disabled>Select Type</option>
                        <option value="beach">Beach</option>
                        <option value="mountain">Mountain</option>
                        <option value="village">Village</option>
                    </select>
                    <select name="priceRange" value={state?.priceRange} onChange={handleState}>
                        <option disabled>Select Price Range</option>
                        <option value="0">0-100,000</option>
                        <option value="1">100,000-200,000</option>
                        <option value="2">200,000-300,000</option>
                        <option value="3">300,000-400,000</option>
                        <option value="4">400,000-500,000</option>
                    </select>
                    <select name="continent" value={state?.continent} onChange={handleState}>
                        <option disabled>Select Continent</option>
                        <option value="0">Europe</option>
                        <option value="1">Asia</option>
                        <option value="2">Africa</option>
                        <option value="3">South America</option>
                        <option value="4">North America</option>
                        <option value="5">Oceania</option>
                    </select>
                    <button className={classes.searchBtn}>
                        <AiOutlineSearch 
                            className={classes.searchIcon} 
                            onClick={handleSearch}    
                        />
                    </button>
                </div>
                {filteredProperties?.length > 0 ? (
                    <>
                        <div className={classes.titles}>
                            <h5>Selected properties</h5>
                            <h2>Property you may like</h2>
                        </div>
                        <div className={classes.properties}>
                            {filteredProperties.map((property) => (
                                <div className={classes.property} key={property._id}>
                                    <Link 
                                        to={`/propertyDetail/${property._id}`} 
                                        className={classes.imgContainer}
                                    >
                                        <img 
                                            src={`http://localhost:5000/images/${property?.img}`} 
                                            alt="" 
                                        />
                                    </Link>
                                    <div className={classes.details}>
                                        <div className={classes.priceAndOwner}>
                                            <span className={classes.price}>
                                                $ {property.price}
                                            </span>
                                            <img 
                                                src={person}
                                                className={classes.owner}
                                                alt="" 
                                            />
                                        </div>
                                        <div className={classes.moreDetails}>
                                            <span>
                                                {property.beds} <FaBed className={classes.icon} />
                                            </span>
                                            <span>
                                                {property.sqmeters} sq. meters <FaSquareFull className={classes.icon} />
                                            </span>
                                        </div>
                                        <div className={classes.desc}>
                                            {property.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className={classes.noProperty}>
                        We have no properties with the specified options
                    </h2>
                )}
            </div>
        </div>
    );
}

export default Properties;

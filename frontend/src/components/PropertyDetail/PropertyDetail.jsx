import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import {
  FaBed,
  FaSquareFull,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import emailjs from '@emailjs/browser';

import { request } from '../../util/fetchAPI';
import classes from './propertyDetail.module.css';

const PropertyDetail = () => {
    const { user } = useSelector((state) => state.auth);
    const [propertyDetail, setPropertyDetail] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { id } = useParams();
    const formRef = useRef();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await request(`/property/find/${id}`, 'GET');
                setPropertyDetail(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchDetails();
    }, [id]);

    const handleCloseForm = () => {
        setShowForm(false);
        setTitle('');
        setDesc('');
    }

    const handleContactOwner = async (e) => {
        e.preventDefault();

        try {
            emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formRef.current, process.env.REACT_APP_PUBLIC_KEY)
                .then((result) => console.log(result))
                .catch((err) => console.log(err));

            handleCloseForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt="" />
                </div>
                <div className={classes.right}>
                    <h3 className={classes.title}>
                        Title: {`${propertyDetail?.title}`}
                    </h3>
                    <div className={classes.details}>
                        <div className={classes.typeAndContinent}>
                            <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
                            <div>Continent: <span>{`${propertyDetail?.continent}`}</span></div>
                        </div>
                        <div className={classes.priceAndOwner}>
                            <span className={classes.price}><span>Price: $</span>{`${propertyDetail?.price}`}</span>
                            <span
                                style={{ 
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                }}
                            >
                                Owner <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} alt="" />
                            </span>
                        </div>
                        <div className={classes.moreDetails}>
                            <span>
                                {propertyDetail?.beds} <FaBed className={classes.icon} />
                                {propertyDetail?.sqmeters} <FaSquareFull className={classes.icon} />
                            </span>
                        </div>
                    </div>
                    <p className={classes.desc}>
                        Description: <span>{`${propertyDetail?.desc}`}</span>
                    </p>
                    <button className={classes.contactOwner} onClick={() => setShowForm(true)}>
                        Contact Owner
                    </button>
                </div>
            </div>
            {showForm && (
                <div className={classes.contactForm} onClick={handleCloseForm}>
                    <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
                        <h2>Send Email to Owner</h2>
                        <form onSubmit={handleContactOwner} ref={formRef}>
                            <input 
                                value={user?.email} 
                                type="text" 
                                placeholder="My email" 
                                name="from_email" 
                            />
                            <input 
                                value={user?.username} 
                                type="text" 
                                placeholder="My username" 
                                name="from_username"  
                            />
                            <input 
                                value={propertyDetail?.currentOwner?.email} 
                                type="email" 
                                placeholder="Owner email" 
                                name="to_email"  
                            />
                            <input 
                                value={title} 
                                type="text" 
                                placeholder="Title" 
                                name="from_title" 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                            <input 
                                value={desc} 
                                type="text" 
                                placeholder="Description" 
                                name="message" 
                                onChange={(e) => setDesc(e.target.value)} 
                            />
                            <button>Send</button>
                            <AiOutlineClose className={classes.removeIcon} onClick={handleCloseForm} />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropertyDetail;

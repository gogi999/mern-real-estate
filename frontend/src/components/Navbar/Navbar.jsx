import React, { useState } from 'react';

import {
  AiOutlineClose,
  AiOutlineFileImage,
} from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { logout } from '../../redux/authSlice';
import { request } from '../../util/fetchAPI';
import classes from './navbar.module.css';

const Navbar = () => {
    const [state, setState] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    }

    const handleCloseForm = () => {
        setShowForm(false);
        setPhoto(null);
        setState({});
    }

    const handleListProperty = async (e) => {
        e.preventDefault();

        try {
            let filename = null;

            if (photo) {
                const formData = new FormData();
                filename = crypto.randomUUID() + photo.name;
                formData.append('filename', filename);
                formData.append('image', photo);

                await request('/upload/image', 'POST', formData, true);
            } else {
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            await request(
                '/property', 
                'POST', 
                headers, 
                { ...state, img: filename }
            );
            handleCloseForm();
        } catch (err) {
            console.error(err);
        }
    }

    const handleState = (e) => {
        setState((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

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
                    {!user ? (
                        <>
                            <Link to="/signup">Signup</Link>
                            <Link to="/signin">Signin</Link>
                        </>
                    ) : (
                        <>
                            <span>Hi there {user.username}</span>
                            <span className={classes.logoutBtn} onClick={handleLogout}>
                                Logout
                            </span>
                            <Link 
                                to="/"
                                className={classes.list}
                                onClick={() => setShowForm(true)}
                            >
                                List your property
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {showForm && (
                <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                    <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                        <h2>List Property</h2>
                        <form onSubmit={handleListProperty}>
                            <input 
                                type="text" 
                                placeholder="Title..." 
                                name="title"
                                onChange={handleState}    
                            />
                            <input 
                                type="text" 
                                placeholder="Type..." 
                                name="type"
                                onChange={handleState}    
                            />
                            <input 
                                type="text" 
                                placeholder="Desc..." 
                                name="desc"
                                onChange={handleState}    
                            />
                            <input 
                                type="text" 
                                placeholder="Continent..." 
                                name="continent"
                                onChange={handleState}    
                            />
                            <input 
                                type="number" 
                                placeholder="Price..." 
                                name="price"
                                onChange={handleState}    
                            />
                            <input 
                                type="number" 
                                placeholder="Sq. meters..." 
                                name="sqmeters"
                                onChange={handleState}    
                            />
                            <input 
                                type="number" 
                                placeholder="Beds..." 
                                name="beds"
                                step={1}
                                min={2}
                                onChange={handleState}    
                            />
                            <div 
                                style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "12px",
                                    width: "50%" 
                                }}
                            >
                                <label htmlFor="photo">
                                    Property picture <AiOutlineFileImage />
                                </label>
                                <input 
                                    type="file" 
                                    id="photo" 
                                    style={{ display: "none" }} 
                                    onChange={(e) => setPhoto(e.target.files[0])}    
                                />
                                {photo && <p>{photo.name}</p>}
                            </div>
                            <button>
                                List Property
                            </button>
                        </form>
                        <AiOutlineClose 
                            className={classes.removeIcon}
                            onClick={handleCloseForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;

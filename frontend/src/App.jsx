import './App.css';

import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import FeaturedProperties
  from './components/FeaturedProperties/FeaturedProperties';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Newsletter from './components/Newsletter/Newsletter';
import PopularProperties
  from './components/PopularProperties/PopularProperties';
import Properties from './components/Properties/Properties';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <Navbar />
                            <Hero />
                            <PopularProperties />
                            <FeaturedProperties />
                            <Newsletter />
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/properties" 
                    element={
                        <>
                            <Navbar />
                            <Properties />
                            <Footer />
                        </>
                    } 
                />
                <Route 
                    path="/propertyDetail/:id" 
                    element={
                        <>
                            <Navbar />
                            <PropertyDetail />
                            <Footer />
                        </>
                    } 
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </div>
    );
}

export default App;

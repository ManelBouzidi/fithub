import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FrontOfficeLayout({ isAuthenticated, setIsAuthenticated }) {
    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Outlet />
            <Footer />
        </>
    );
}

export default FrontOfficeLayout;

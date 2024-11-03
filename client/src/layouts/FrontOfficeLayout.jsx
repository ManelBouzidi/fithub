import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function FrontOfficeLayout({ isAuthenticated, setIsAuthenticated }) {
    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Outlet />
        </>
    );
}

export default FrontOfficeLayout;

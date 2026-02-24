import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pb-24 md:pb-0">
                <Outlet />
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNav />
        </div>
    );
};

export default Layout;

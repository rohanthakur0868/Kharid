import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/products', icon: Search, label: 'Shop' },
        { path: '/wishlist', icon: Heart, label: 'Wishlist' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-white pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-6 py-3 flex items-center gap-6 border border-gray-100 mx-auto">

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="relative flex items-center justify-center group"
                        >
                            <motion.div
                                animate={{
                                    y: isActive ? -20 : 0,
                                    scale: isActive ? 1.1 : 1
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="relative flex flex-col items-center justify-center w-12 h-12"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill-active"
                                        className="absolute inset-0 bg-primary shadow-[0_10px_20px_rgba(5,150,105,0.4)] rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <item.icon
                                    className={`w-5 h-5 transition-colors duration-200 relative z-10 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                />

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 35 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute text-[10px] font-bold text-primary whitespace-nowrap z-0"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default BottomNav;

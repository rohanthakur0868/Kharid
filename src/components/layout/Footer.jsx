import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-emerald-950 text-emerald-100 py-12 border-t border-emerald-900">
            <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Kharid.</h3>
                    <p className="text-sm text-gray-400">
                        Your daily destination for everything needed. Premium quality, best prices.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                        <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                        <li><Link to="/products?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
                        <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                        <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                        <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
            <div className="container-custom mt-12 pt-8 border-t border-emerald-900 text-center text-sm text-emerald-400">
                © {new Date().getFullYear()} Kharid. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

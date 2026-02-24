import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Heart, Search, Menu, X, Gem, User } from 'lucide-react';
import { selectCartCount } from '../../redux/slices/cartSlice';
import { selectWishlistItems } from '../../redux/slices/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const cartCount = useSelector(selectCartCount);
    const wishlistItems = useSelector(selectWishlistItems);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (searchTerm.trim().length > 1) {
            const matches = products.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5);
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
            setIsMenuOpen(false);
            setSuggestions([]);
        }
    };

    const linkClass = (path) => `
        text-sm font-medium transition-colors hover:text-primary relative
        ${location.pathname === path ? 'text-primary' : 'text-gray-600'}
        after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] 
        after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left
        ${location.pathname === path ? 'after:scale-x-100' : ''}
    `;

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300  h-[10vh] content-center ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4 border-b border-transparent '
                }`}
        >
            <div className="container-custom flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white group-hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30">
                        <Gem className="w-5 h-5 fill-white/20" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight flex items-center">
                        <span className="text-primary">Kharid</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className={linkClass('/')}>Home</Link>
                    <Link to="/products" className={linkClass('/products')}>Shop</Link>
                    <Link to="/products?category=electronics" className={linkClass('/products?category=electronics')}>Electronics</Link>
                    <Link to="/products?category=fashion" className={linkClass('/products?category=fashion')}>Fashion</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative group hidden lg:block">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100/50 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all w-48 group-focus-within:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>

                        <AnimatePresence>
                            {suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                                >
                                    {suggestions.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/products/${product.id}`}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setSuggestions([]);
                                            }}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <img src={product.image} alt={product.title} className="w-8 h-8 rounded bg-gray-100 object-cover" />
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-bold text-gray-900 truncate">{product.title}</p>
                                                <p className="text-xs text-gray-400">{product.category}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Link
                                        to={`/products?search=${searchTerm}`}
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSuggestions([]);
                                        }}
                                        className="block p-3 text-center text-xs font-bold text-primary hover:bg-gray-50 border-t border-gray-50"
                                    >
                                        View all results for "{searchTerm}"
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600 hover:text-primary">
                            <Heart className="w-5 h-5" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                            )}
                        </Link>

                        <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600 hover:text-primary">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        <div className="hidden md:block relative ml-4">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all focus:outline-none"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 p-2"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-sm font-bold text-gray-900">Alex Johnson</p>
                                            <p className="text-xs text-gray-400">alex@example.com</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                                            >
                                                <User className="w-4 h-4" /> My Profile
                                            </Link>
                                            <button
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                                onClick={() => {
                                                    alert('Upload New Picture feature coming soon!');
                                                    setIsProfileOpen(false);
                                                }}
                                            >
                                                <Gem className="w-4 h-4" /> Update Picture
                                            </button>
                                            <button
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <X className="w-4 h-4" /> Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container-custom py-4 space-y-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-4 pr-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </form>
                            <nav className="flex flex-col gap-2">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-600 hover:text-primary font-medium border-b border-gray-50">Home</Link>
                                <Link to="/products" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-600 hover:text-primary font-medium border-b border-gray-50">Shop All</Link>
                                <Link to="/products?category=electronics" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-600 hover:text-primary font-medium border-b border-gray-50">Electronics</Link>
                                <Link to="/products?category=fashion" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-600 hover:text-primary font-medium">Fashion</Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

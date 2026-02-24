import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Heart, ArrowLeft, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../redux/slices/wishlistSlice';
import { selectAllProducts } from '../redux/slices/productSlice';
import { useToast } from '../context/ToastContext';
import useLoading from '../hooks/useLoading';
import Skeleton from '../components/common/Skeleton';
import ProductCard from '../components/product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
    const loading = useLoading();
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [product, setProduct] = useState(null);
    const isInWishlist = useSelector((state) => selectIsInWishlist(state, Number(id)));
    const [qty, setQty] = useState(1);
    const { addToast } = useToast();
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const found = products.find(p => p.id === Number(id));
        setProduct(found);
        window.scrollTo(0, 0);
    }, [id, products]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: qty }));
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleWishlistToggle = () => {
        dispatch(toggleWishlist(product));
        if (isInWishlist) {
            addToast('Removed from wishlist', 'info');
        } else {
            addToast('Added to wishlist');
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Skeleton className="aspect-[3/4] rounded-none" />
                    <div className="space-y-6 pt-8">
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="w-3/4 h-12" />
                        <Skeleton className="w-1/4 h-8" />
                        <Skeleton className="w-full h-32" />
                        <div className="flex gap-4">
                            <Skeleton className="flex-1 h-14" />
                            <Skeleton className="w-14 h-14" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="bg-white min-h-screen">
            <div className="container-custom py-8">
                <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    <div className="bg-gray-100 aspect-[3/4] relative overflow-hidden group rounded-2xl">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">
                            17% Off
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{product.category}</span>
                        <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-6 leading-tight font-bold">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-2xl font-bold font-sans text-gray-900">${product.price.toFixed(2)}</span>
                            <span className="text-xl text-gray-400 line-through font-sans">${(product.price * 1.2).toFixed(2)}</span>
                        </div>

                        <p className="text-gray-600 text-lg mb-10 leading-relaxed font-sans font-light">
                            {product.description}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">Quantity</span>
                                <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-xl font-medium px-2">-</button>
                                    <span className="w-8 text-center font-bold">{qty}</span>
                                    <button onClick={() => setQty(qty + 1)} className="text-xl font-medium px-2">+</button>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center h-16">
                                <motion.button
                                    onClick={handleAddToCart}
                                    className={`relative h-full flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-colors overflow-hidden rounded-full ${isAdded ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-gray-900'
                                        }`}
                                    animate={{
                                        width: isAdded ? 64 : "100%",
                                        borderRadius: "9999px"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isAdded ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Check className="w-6 h-6" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="text"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 whitespace-nowrap"
                                            >
                                                <ShoppingBag className="w-5 h-5" /> Add to Cart
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                <motion.button
                                    onClick={handleWishlistToggle}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center transition-colors shrink-0 ${isInWishlist ? 'text-red-500 border-red-500' : 'text-gray-900 hover:border-black'}`}
                                >
                                    <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                                </motion.button>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-gray-400" />
                                <div>
                                    <h4 className="font-bold text-sm">Free Shipping</h4>
                                    <p className="text-xs text-gray-500">On orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RefreshCw className="w-5 h-5 text-gray-400" />
                                <div>
                                    <h4 className="font-bold text-sm">Easy Returns</h4>
                                    <p className="text-xs text-gray-500">30-day return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <section className="mb-20">
                        <h2 className="font-display font-bold text-3xl mb-8">You may also like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;

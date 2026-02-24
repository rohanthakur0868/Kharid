import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { ShoppingBag, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { toggleWishlist, selectIsInWishlist } from '../../redux/slices/wishlistSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const [isHovered, setIsHovered] = useState(false);
    const isInWishlist = useSelector((state) => selectIsInWishlist(state, product.id));

    const isSale = product.id % 2 !== 0;
    const isNew = product.id % 3 === 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));
        addToast(`Added ${product.title} to bag`, 'success');
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
        if (isInWishlist) {
            addToast('Removed from wishlist', 'info');
        } else {
            addToast('Added to wishlist', 'success');
        }
    };

    return (
        <div
            className="group relative flex flex-col w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative rounded-2xl overflow-hidden p-[2px] h-full isolate">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,theme(colors.primary.DEFAULT)_360deg)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500 will-change-transform z-[-1]" />

                <div className="bg-white text-gray-900 rounded-2xl h-full flex flex-col relative z-20 overflow-hidden">

                    <Link to={`/products/${product.id}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {isNew && <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">New</span>}
                            {isSale && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Sale</span>}
                        </div>

                        <button
                            onClick={handleWishlist}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                        >
                            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                    </Link>

                    <div className="p-3 flex-1 flex flex-col">
                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">{product.category}</p>
                        <Link to={`/products/${product.id}`} className="block">
                            <h3 className="font-display font-bold text-base leading-snug mb-1 text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex flex-col">
                                <span className="font-bold font-sans text-gray-900">${product.price.toFixed(2)}</span>
                                {isSale && <span className="text-[10px] text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>}
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                            >
                                <ShoppingBag className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

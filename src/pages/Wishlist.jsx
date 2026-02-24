import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlistItems, toggleWishlist } from '../redux/slices/wishlistSlice';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Wishlist = () => {
    const wishlistItems = useSelector(selectWishlistItems);

    if (wishlistItems.length === 0) {
        return (
            <div className="container-custom py-20 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">My Wishlist</h2>
                <p className="text-gray-500 mb-8">You haven't saved any items yet.</p>
                <Link to="/products" className='block w-max mx-auto'>
                    <Button>Explore Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlistItems.length})</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal, clearCart } from '../redux/slices/cartSlice';
import Button from '../components/common/Button';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    if (cartItems.length === 0) {
        return (
            <div className="container-custom py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className='block w-full flex items-center justify-center'>
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="hidden md:grid grid-cols-5 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                            <div className="col-span-2">Product</div>
                            <div className="text-center">Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-center">Total</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div key={item.id} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                    <div className="col-span-2 flex gap-4 items-center">
                                        <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            <img src={item?.image || 'https://via.placeholder.com/100'} alt={item?.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item?.title || 'Unknown Product'}</h3>
                                            <p className="text-sm text-gray-500">{item?.category}</p>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="text-red-500 text-sm hover:underline mt-1 flex items-center gap-1 md:hidden"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center font-medium text-gray-900 hidden md:block">
                                        ${(item?.price || 0).toFixed(2)}
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="flex items-center border border-gray-200 rounded-lg w-max">
                                            <button
                                                className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-center">
                                        <span className="md:hidden font-medium text-gray-500">Total:</span>
                                        <span className="font-bold text-primary text-lg">
                                            ${((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                                        </span>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-gray-400 hover:text-red-500 transition-colors hidden md:block ml-4"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link to="/products" className="text-gray-600 hover:text-primary flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Continue Shopping
                        </Link>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="text-red-500 hover:text-red-600 font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (Estimated)</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout">
                            <Button className="w-full py-3 text-base">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

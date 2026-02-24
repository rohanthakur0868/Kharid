import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/slices/cartSlice';
import { addOrder } from '../redux/slices/orderSlice';
import Button from '../components/common/Button';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        if (cartItems.length === 0 && !isSubmitting) {
            navigate('/cart');
        }
    }, [cartItems.length, isSubmitting, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 1000000)}`,
            date: new Date().toISOString(),
            items: cartItems,
            total: cartTotal,
            shippingAddress: formData
        };

        dispatch(addOrder(newOrder));
        dispatch(clearCart());
        addToast('Order placed successfully!', 'success');
        navigate('/order-success');
    };

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mt-8 mb-4">Payment Details</h2>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600 mb-2">Simulated Credit Card</p>
                                <input
                                    type="text"
                                    disabled
                                    value="**** **** **** 4242"
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                        <div className="max-h-60 overflow-y-auto mb-4 divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 py-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium truncate">{item.title}</h4>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            className="w-full mt-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

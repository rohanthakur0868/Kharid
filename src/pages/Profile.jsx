import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Flame, TrendingUp, Settings, ChevronRight, Award, ShoppingBag, Package } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectOrders, selectTotalSpend } from '../redux/slices/orderSlice';

const Profile = () => {
    const orders = useSelector(selectOrders);
    const totalSpend = useSelector(selectTotalSpend);

    return (
        <div className="container-custom py-8 pb-32">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-display">My Profile</h1>
                    <p className="text-gray-500 font-sans">Welcome back, Alex!</p>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-primary">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
                <motion.div whileHover={{ y: -5 }} className="bg-primary p-6 rounded-[2.5rem] flex items-center justify-between shadow-lg shadow-primary/30">
                    <div>
                        <h3 className="font-bold opacity-80 mb-1 font-sans">Total Orders</h3>
                        <p className="text-4xl font-bold font-display">{orders.length}</p>
                        <div className="flex items-center gap-1 text-xs font-bold mt-2">
                            All time
                        </div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Package className="w-8 h-8" />
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-secondary p-6 rounded-[2.5rem] flex items-center justify-between shadow-lg shadow-secondary/30">
                    <div>
                        <h3 className="font-bold opacity-80 mb-1 font-sans">Total Spent</h3>
                        <p className="text-4xl font-bold font-display">${totalSpend.toFixed(2)}</p>
                        <div className="flex items-center gap-1 text-xs font-bold mt-2">
                            <Flame className="w-4 h-4" /> Eco-friendly shopping
                        </div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                </motion.div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-50 mb-8 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold font-display">Recent Activity</h3>
                    {orders.length > 0 && <button className="text-sm font-bold text-primary hover:underline font-sans">See All</button>}
                </div>

                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.slice(0, 5).map((order) => (
                            <ActivityItem
                                key={order.id}
                                icon={ShoppingBag}
                                color="bg-primary/10 text-primary"
                                title={`Order ${order.id}`}
                                desc={new Date(order.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                value={`$${order.total.toFixed(2)}`}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="w-10 h-10 text-gray-200" />
                            </div>
                            <p className="text-gray-400 font-sans">No orders yet. Start shopping!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest">Pro Member</span>
                    <h3 className="text-3xl font-bold mb-3 font-display">Upgrade to Premium</h3>
                    <p className="opacity-70 mb-8 text-sm max-w-md font-sans leading-relaxed">Unlock free worldwide shipping on all orders and get exclusive early access to new collections.</p>
                    <button className="bg-white text-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all transform hover:scale-105">
                        Claim Membership
                    </button>
                </div>
                <div className="absolute right-[-40px] bottom-[-40px] opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <Award className="w-64 h-64" />
                </div>
            </div>
        </div>
    );
};

const ActivityItem = ({ icon: Icon, color, title, desc, value }) => (
    <div className="flex items-center gap-5 p-3 hover:bg-gray-50 rounded-[1.5rem] transition-all cursor-pointer group">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-900 font-sans">{title}</h4>
            <p className="text-xs text-gray-400 font-medium font-sans uppercase tracking-wider">{desc}</p>
        </div>
        <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{value}</div>
    </div>
);

export default Profile;

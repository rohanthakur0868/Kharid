import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import Button from '../components/common/Button';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            email: formData.email,
            name: formData.name || 'User'
        }));
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-20 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/20 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
                    alt="Fashion"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
                />

                <div className="relative z-20 text-white max-w-md">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl font-display font-bold mb-6 leading-tight">
                            Discover <br />
                            <span className="text-emerald-300">Premium</span> <br />
                            Lifestyle
                        </h1>
                        <p className="text-xl opacity-80 font-light leading-relaxed mb-8">
                            Join our community of trendsetters and get exclusive access to the latest collections.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm self-center font-medium">Joined by 10k+ users</p>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-10 z-20 flex gap-4 text-white/40">
                    <span className="text-xs tracking-widest font-bold">KHARID © 2026</span>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/30">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50"
                >
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin ? 'Please enter your details to login' : 'Fill in the form to get started'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1"
                                >
                                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder="alex@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="text-right">
                                <button type="button" className="text-sm font-bold text-primary hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <Button type="submit" className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 group shadow-lg shadow-primary/20">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold"><span className="bg-white px-4 text-gray-400">Or continue with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-sm">
                                <Github className="w-5 h-5" /> GitHub
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path></svg> Google
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm font-medium text-gray-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary font-bold hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;

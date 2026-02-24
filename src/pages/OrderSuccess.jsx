import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50">
            <div className="container-custom max-w-2xl px-4 py-12 text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle className="w-12 h-12 text-primary" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display"
                >
                    Order Placed Successfully!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-600 mb-10 max-w-md mx-auto font-sans"
                >
                    Thank you for your purchase. We've received your order and we'll notify you once it's shipped.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/products" className="w-full sm:w-auto">
                        <Button variant="primary" className="w-full px-8 py-4 rounded-full flex items-center justify-center gap-2 group">
                            Continue Shopping
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>

                    <Link to="/profile" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full px-8 py-4 rounded-full flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <ShoppingBag className="w-4 h-4" />
                            View Orders
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 pt-8 border-t border-gray-100"
                >
                    <p className="text-sm text-gray-400">
                        Order confirmation sent to your email.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { completeWelcome } from '../redux/slices/authSlice';
import { Instagram, Twitter, Facebook, Github, Heart, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(7);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            dispatch(completeWelcome());
        }, 7000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [dispatch]);

    const socialLinks = [
        { icon: Instagram, href: "#", color: "hover:text-pink-500", label: "Instagram" },
        { icon: Twitter, href: "#", color: "hover:text-blue-400", label: "Twitter" },
        { icon: Github, href: "#", color: "hover:text-gray-800", label: "Github" },
    ];

    const sentence = "Welcome to Kharid.";
    const welcomeWords = "We're so glad you're here. Get ready for a premium shopping experience tailored just for you.";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0, opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative text-center px-6 max-w-4xl"
            >
                <motion.div
                    variants={itemVariants}
                    className="relative inline-block mb-10"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-primary/30 relative z-10"
                    >
                        <span className="text-4xl font-bold">K</span>
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 rounded-[2rem] -z-10 blur-xl"
                    />
                </motion.div>

                <div className="mb-6">
                    <h1 className="text-3xl md:text-6xl font-outfit font-bold text-gray-900 tracking-tighter flex justify-center flex-wrap gap-x-2">
                        {sentence.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="flex overflow-hidden py-2">
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={charIndex}
                                        variants={letterVariants}
                                        transition={{
                                            duration: 0.5,
                                            delay: (wordIndex * word.length + charIndex) * 0.05,
                                            type: "spring",
                                            stiffness: 120
                                        }}
                                    >
                                        {word === "Kharid." ? (
                                            <span className="text-primary">{char}</span>
                                        ) : char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>

                <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-base md:text-lg text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
                        {welcomeWords}
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full mt-6"
                    />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="space-y-8"
                >
                    <div className="flex flex-col items-center gap-3">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 text-primary"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-[0.4em] font-black">Crafted with Love</span>
                            <Heart className="w-4 h-4 fill-current" />
                        </motion.div>
                        <h3 className="text-3xl font-display font-bold text-secondary group flex items-center gap-3">
                            <span className="text-gray-400 font-light">by</span> Rohan Thakur
                        </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {socialLinks.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.1,
                                    backgroundColor: "rgba(5, 150, 105, 0.1)"
                                }}
                                className={`flex items-center justify-center p-5 bg-gray-50 rounded-full text-gray-400 transition-all duration-300 border border-transparent hover:border-primary/20 hover:text-primary shadow-sm group`}
                            >
                                <social.icon className="w-8 h-8 transition-transform group-hover:scale-110" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    className="mt-12 text-sm font-bold text-primary animate-pulse"
                >
                    Redirecting in {seconds}s...
                </motion.div>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100/50 backdrop-blur-sm">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary-dark shadow-[0_0_15px_rgba(5,150,105,0.5)]"
                />
            </div>
        </div>
    );
};

export default WelcomeScreen;

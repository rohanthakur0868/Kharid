import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            addToast('Message sent successfully! We will get back to you soon.', 'success');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div className="container-custom py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Email Us</h3>
                            <p className="text-gray-600 mb-2">Our friendly team is here to help.</p>
                            <a href="mailto:support@shopverse.com" className="text-primary font-medium hover:underline">support@shopverse.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Office</h3>
                            <p className="text-gray-600 mb-2">Come say hello at our office HQ.</p>
                            <p className="text-sm">123 Commerce St, Market City, ST 12345</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Phone</h3>
                            <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+15550000000" className="text-primary font-medium hover:underline">+1 (555) 000-0000</a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all resize-none"
                                    placeholder="How can we help?"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <Button className="w-full py-3">
                                Send Message <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

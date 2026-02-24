import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import useLoading from '../hooks/useLoading';
import Skeleton from '../components/common/Skeleton';
import ProductCard from '../components/product/ProductCard';
import { products, categories, heroSlides } from '../data/products';

const HeroSlider = () => {

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(prev => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrent(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900 group">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div className="absolute inset-0">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center text-white px-4">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                            Featured Collection
                        </span>
                        <h1 className="font-display text-4xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl">
                            {slide.title}
                        </h1>
                        <p className="font-sans text-gray-200 text-lg md:text-xl max-w-2xl mb-10 opacity-90">
                            {slide.subtitle}
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to={slide.path}
                                className="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105 bg-primary hover:bg-primary-hover"
                            >
                                {slide.cta}
                            </Link>
                            <Link
                                to="/products"
                                className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-colors"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const loading = useLoading();

    const latestProducts = [...products].reverse().slice(0, 8);
    const popularProducts = products.filter(p => p.reviews > 150).slice(0, 8);
    const topRatedProducts = products.filter(p => p.rating >= 4.8).slice(0, 8);

    if (loading) {
        return (
            <div className="container-custom py-8 space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="aspect-square rounded-[2rem]" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <HeroSlider />

            <div className="container-custom py-16 space-y-24">

                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                            <p className="text-gray-500">Browse our wide range of collections</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat) => (
                            <Link to={`/products?category=${cat.id}`} key={cat.id} className="group relative rounded-2xl overflow-hidden aspect-square">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center p-2 text-center">
                                    <h3 className="text-white font-bold text-sm md:text-base border-b-2 border-transparent group-hover:border-primary pb-1 transition-all">{cat.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-3xl font-bold text-gray-900">Latest Drops</h2>
                            <p className="text-gray-500 text-sm">Freshly added to our store</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {latestProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Link to="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">View All New Arrivals <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                </section>

                <section className="bg-gray-50 -mx-4 px-4 py-16 rounded-[3rem]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-3xl font-bold text-gray-900">Most Popular</h2>
                            <p className="text-gray-500 text-sm">Bestsellers loved by everyone</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {popularProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-3xl font-bold text-gray-900">Top Rated</h2>
                            <p className="text-gray-500 text-sm">Highest quality picks</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {topRatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;

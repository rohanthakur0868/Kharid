import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import {
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    selectProducts
} from '../redux/slices/productSlice';
import { categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import useLoading from '../hooks/useLoading';
import Skeleton from '../components/common/Skeleton';

const Shop = () => {
    const loading = useLoading();
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectProducts);
    const [searchParams, setSearchParams] = useSearchParams();

    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');

    useEffect(() => {
        if (urlCategory) {
            dispatch(setSelectedCategory(urlCategory));
        } else {
            dispatch(setSelectedCategory('all'));
        }

        if (urlSearch) {
            dispatch(setSearchQuery(urlSearch));
        } else {
            dispatch(setSearchQuery(''));
        }
    }, [urlCategory, urlSearch, dispatch]);

    const handleCategoryChange = (category) => {
        if (category === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 shrink-0 space-y-4">
                        <Skeleton className="h-64 rounded-xl" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <Skeleton className="h-12 rounded-lg" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-96 rounded-[2rem]" />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row gap-8">

                <div className="w-full md:w-64 shrink-0 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Filter className="w-5 h-5" /> Filters
                        </h3>

                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={!urlCategory}
                                        onChange={() => handleCategoryChange('all')}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-gray-600 hover:text-primary">All Categories</span>
                                </label>
                                {categories.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={urlCategory === cat.id}
                                            onChange={() => handleCategoryChange(cat.id)}
                                            className="text-primary focus:ring-primary"
                                        />
                                        <span className="text-gray-600 hover:text-primary">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-gray-500">
                            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select
                                onChange={handleSortChange}
                                className="border-gray-200 rounded-md text-sm focus:ring-primary focus:border-primary bg-transparent py-1 pl-2 pr-8"
                            >
                                <option value="default">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchParams({});
                                    dispatch(setSearchQuery(''));
                                }}
                                className="text-primary font-medium hover:underline mt-2"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;

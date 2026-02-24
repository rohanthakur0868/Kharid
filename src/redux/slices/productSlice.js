import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products';

const initialState = {
    items: products,
    filteredItems: products,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            filterProducts(state);
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            filterProducts(state);
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            sortProducts(state);
        },
    },
});

const filterProducts = (state) => {
    let result = state.items;

    if (state.selectedCategory !== 'all') {
        result = result.filter(product => product.category === state.selectedCategory);
    }

    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }

    state.filteredItems = result;
    sortProducts(state);
};

const sortProducts = (state) => {
    if (state.sortBy === 'price-low') {
        state.filteredItems.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
        state.filteredItems.sort((a, b) => b.price - a.price);
    }
};

export const { setSearchQuery, setSelectedCategory, setSortBy } = productSlice.actions;

export const selectProducts = (state) => state.products.filteredItems;
export const selectAllProducts = (state) => state.products.items;

export default productSlice.reducer;

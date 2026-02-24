import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('wishlist', serializedState);
    } catch (err) {
    }
};

const initialState = loadState();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push(action.payload);
            }
            saveState(state);
        },
        clearWishlist: (state) => {
            state.items = [];
            saveState(state);
        }
    },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, productId) =>
    state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;

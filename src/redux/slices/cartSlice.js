import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { items: [] };
        }
        const state = JSON.parse(serializedState);
        if (state && state.items) {
            state.items = state.items.filter(item => item && item.id && item.price);
        }
        return state;
    } catch (err) {
        return { items: [] };
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
    }
};

const initialState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveState(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveState(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity > 0 ? quantity : 1;
            }
            saveState(state);
        },
        clearCart: (state) => {
            state.items = [];
            saveState(state);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartTotal = (state) =>
    (state.cart?.items || []).reduce((total, item) => total + (Number(item?.price) || 0) * (Number(item?.quantity) || 1), 0);
export const selectCartCount = (state) =>
    (state.cart?.items || []).reduce((count, item) => count + (Number(item?.quantity) || 0), 0);

export default cartSlice.reducer;

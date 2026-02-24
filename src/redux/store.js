import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productReducer,
        orders: orderReducer,
        auth: authReducer,
    },
});

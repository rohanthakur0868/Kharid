import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: JSON.parse(localStorage.getItem('orders')) || [],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.unshift(action.payload); // Newest orders first
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
    },
});

export const { addOrder } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectTotalSpend = (state) =>
    state.orders.orders.reduce((acc, order) => acc + order.total, 0);

export default orderSlice.reducer;

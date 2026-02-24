import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    showWelcome: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.showWelcome = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.showWelcome = false;
            localStorage.removeItem('user');
        },
        completeWelcome: (state) => {
            state.showWelcome = false;
        }
    },
});

export const { login, logout, completeWelcome } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;


import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Cart, { AddItemToCart, RemoveItemFromCart } from './slices/Cart';

const store = configureStore({
    reducer: {
        Cart
    },
    devTools: process.env.NEXT_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;


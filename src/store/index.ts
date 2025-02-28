import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import searchMovie from './slices/searchMovie';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        searchMovie,
    },
    devTools: process.env.NEXT_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

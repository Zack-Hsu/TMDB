import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import searchMovie from './slices/searchMovie';
import TMDBUser from "./slices/user"
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        searchMovie,
        TMDBUser
    },
    devTools: process.env.NEXT_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

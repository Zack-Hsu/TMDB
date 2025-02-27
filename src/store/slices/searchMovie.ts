import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'searchMovie',
    initialState: {
        searchMovieName: '', // 修正拼字
    },
    reducers: {
        setSearchMovieName: (state, action: PayloadAction<string>) => {
            state.searchMovieName = action.payload; // 修正拼字
        }
    },
});

export const {
    setSearchMovieName
} = slice.actions;

export default slice.reducer;
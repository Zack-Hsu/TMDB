import { UserSession } from '@/types/store/states/userSession-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSession: UserSession = {
    success: false,
    session_id: '',
    errLog: ''
}

const slice = createSlice({
    name: 'userSession',
    initialState: {
        userSession: userSession,
    },
    reducers: {
        setSearchMovieName: (state, action: PayloadAction<UserSession>) => {
            state.userSession = action.payload; // 修正拼字
        }
    },
});

export const {
    setSearchMovieName
} = slice.actions;

export default slice.reducer;
import { RequestToken } from '@/types/store/states/requestToken-type';
import { UserInformation } from '@/types/store/states/userInfomation-type';
import { UserSession } from '@/types/store/states/userSession-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const requestToken: RequestToken = {
    request_token: '',
    success: false,
}

export const initSession: UserSession = { success: false, session_id: '' }; // 讀取 session


const profile: UserInformation = {
    avatar: {
        gravatar: {
            hash: ''
        },
        tmdb: {
            avatar_path: ''
        }
    },
    id: 0,
    iso_639_1: '',
    iso_3166_1: '',
    name: '',
    include_adult: false,
    username: ''
}

const watchList = {

}

const slice = createSlice({
    name: 'TMDBUser',
    initialState: {
        requestToken: requestToken,
        session: initSession,
        profile: profile,
        watchList: watchList
    },
    reducers: {
        setRequestToken: (state, action: PayloadAction<RequestToken>) => {
            state.requestToken = action.payload
        },
        setSession: (state, action: PayloadAction<UserSession>) => {
            state.session = action.payload; // 修正拼字
            localStorage.setItem('tmdbSession', JSON.stringify(action.payload)); // 存入 localStorage
        },
        setProfile: (state, action: PayloadAction<UserInformation>) => {
            state.profile = action.payload
        },/*
        setWatchList: (state, action: PayloadAction<UserInformation>) => {
            state.profile = action.payload
        },*/
    },
});

export const {
    setRequestToken,
    setSession,
    setProfile
} = slice.actions;
export default slice.reducer;
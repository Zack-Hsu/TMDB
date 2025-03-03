import { Movie, MovieResult, MovieCredits } from '@/types/store/states/movie-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initSearchResult: Movie = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}
const movieCredits: MovieCredits = {
    id: 0,
    cast: [],
    crew: [],
}

const initActiveMovie: MovieResult = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    orginal_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
}

const slice = createSlice({
    name: 'searchMovie',
    initialState: {
        searchMovieName: '',
        searchResult: initSearchResult,
        showMovieDetail: false,
        activeMovie: initActiveMovie,
        movieCredits: movieCredits,
    },
    reducers: {
        setSearchMovieName: (state, action: PayloadAction<string>) => {
            state.searchMovieName = action.payload;
        },
        setSearchResult: (state, action: PayloadAction<Movie>) => {
            state.searchResult = action.payload
        },
        sortSearchResult: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.searchResult.results.sort((a, b) => {
                return action.payload === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
        },
        setShowMovieDetail: (state, action: PayloadAction<boolean>) => {
            state.showMovieDetail = action.payload
        },
        setActiveMovie: (state, action: PayloadAction<MovieResult>) => {
            state.activeMovie = action.payload
        },
        setMovieCredits: (state, action: PayloadAction<MovieCredits>) => {
            state.movieCredits = action.payload
        }
    },
});

export const {
    setSearchMovieName,
    setSearchResult,
    sortSearchResult,
    setShowMovieDetail,
    setActiveMovie,
    setMovieCredits
} = slice.actions;

export default slice.reducer;
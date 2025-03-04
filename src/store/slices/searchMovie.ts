import { Movie, MovieResult, MovieCredits, MovieSchema, MovieResultSchema } from '@/types/store/states/movie-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export const initSearchResult: Movie = {
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
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    media_type: ''
}

const slice = createSlice({
    name: 'searchMovie',
    initialState: {
        searchMovieName: '',
        fetchMovieLoader: false,
        searchResult: initSearchResult,
        showMovieDetail: false,
        activeMovie: initActiveMovie,
        movieCredits: movieCredits,
    },
    reducers: {
        setSearchMovieName: (state, action: PayloadAction<string>) => {
            state.searchMovieName = action.payload;
        },
        setFetchMovieLoader: (state, action: PayloadAction<boolean>) => {
            state.fetchMovieLoader = action.payload
        },
        setSearchResult: (state, action: PayloadAction<Movie>) => {
            const MoviePreprocessedSchema = z.preprocess((data) => {
                if (Array.isArray(data)) {
                    return data[0];
                }
                return data;
            }, MovieSchema);
            const result = MoviePreprocessedSchema.safeParse(action.payload)
            if (result.success) {
                state.fetchMovieLoader = false
                state.searchResult = result.data
            } else {
                console.log(result)
            }
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
            if (MovieResultSchema.safeParse(action.payload).success) {
                state.activeMovie = action.payload
            }
        },
        setMovieCredits: (state, action: PayloadAction<MovieCredits>) => {
            state.movieCredits = action.payload
        }
    },
});

export const {
    setSearchMovieName,
    setFetchMovieLoader,
    setSearchResult,
    sortSearchResult,
    setShowMovieDetail,
    setActiveMovie,
    setMovieCredits
} = slice.actions;

export default slice.reducer;
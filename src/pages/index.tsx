import React, { useEffect, useMemo } from "react";
import BaseLayout from "@/elements/layouts/BaseLayout";
import infinityScroll from "@/lib/infinityScroll";
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from "@/elements/components/MovieCard";
import searchMovies from "@/service/tmdb/searchMovie";
import { setFetchMovieLoader, setSearchResult } from "@/store/slices/searchMovie";
import { Movie, MovieResult } from "@/types/store/states/movie-types";
import { RootState } from "@/store";
import getTrendingMovie from "@/service/tmdb/getTrendingMovie";
import MovieCardPopUp from "@/elements/components/MovieCardPopUp/MovieCardPopUp";
import Spinner from "@/elements/components/Spinner/Spinner";


export default function Index() {
    const { searchMovieName, searchResult, fetchMovieLoader } = useSelector((state: RootState) => state.searchMovie)
    const dispatch = useDispatch()
    /** 當有查詢到結果的時候，就啟用infinityScroll */
    useEffect(() => {
        const removeInfinityScroll = infinityScroll(() => {
            dispatch(setFetchMovieLoader(true))
            if (searchMovieName == "") {
                getTrendingMovie(searchResult.page + 1)
                    .then((res: Movie) => {
                        const results = [...searchResult.results, ...res.results]
                        res.results = results
                        dispatch(setSearchResult(res))
                    })
            } else {
                searchMovies(searchMovieName, searchResult.page + 1)
                    .then((res: Movie) => {
                        const results = [...searchResult.results, ...res.results]
                        res.results = results
                        dispatch(setSearchResult(res))
                    })
            }
        })
        return () => {
            removeInfinityScroll()
        };
    }, [searchResult])

    /** 當user 開始搜尋時使用Search API，若搜尋字串都刪除的時候返回第一頁的推薦電影  */
    useEffect(() => {
        window.scrollTo(0, 0)
        if (searchMovieName !== "") {
            searchMovies(searchMovieName, 1)
                .then((res: Movie) => {
                    dispatch(setSearchResult(res))
                })
        } else {
            getTrendingMovie(1)
                .then((data: Movie) => {
                    dispatch(setSearchResult(data))
                })
        }
    }, [searchMovieName, dispatch])

    /** 一開始就載入一頁推薦電影 */
    useEffect(() => {
        getTrendingMovie()
            .then((data: Movie) => dispatch(setSearchResult(data)))
    }, [dispatch])
    /** 當有查詢到結果的時候顯示搜尋結果標題，若沒有的話顯示推薦電影 */
    const Title = useMemo(() => {
        if (searchMovieName) {
            return <h3 className="py-3">搜尋結果</h3>
        } else {
            return <h3 className="py-3">推薦電影</h3>
        }
    }, [searchMovieName])
    return (
        <BaseLayout>
            <div className="container" data-bs-theme="dark">
                {Title}
                <div className="row mt-3">
                    {searchResult?.results?.map((movie: MovieResult) => {
                        return <MovieCard key={movie.id} movie={movie} />
                    })}
                </div>
                <MovieCardPopUp />
                <Spinner loaderReduxState={fetchMovieLoader} />
                <div className="">Current Page:{searchResult?.page}</div>
                <div className="">Total Pages:{searchResult?.total_pages}</div>
            </div>
        </BaseLayout >
    );
}

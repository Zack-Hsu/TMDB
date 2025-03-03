import React, { useEffect } from "react";
import BaseLayout from "@/elements/layouts/BaseLayout";
import { useDispatch, useSelector } from 'react-redux';
import LoginButton from "@/elements/components/LoginButton/LoginButton";
import MovieCard from "@/elements/components/MovieCard";
import { setSearchResult } from "@/store/slices/searchMovie";
import { Movie, MovieResult } from "@/types/store/states/movie-types";
import getWatchListMovies from "@/service/tmdb/watchList/getWatchListMovies";
import { RootState } from "@/store";
import MovieCardPopUp from "@/elements/components/MovieCardPopUp/MovieCardPopUp";


export default function WatchList() {
    const { searchResult } = useSelector((state: RootState) => state.searchMovie)
    const { session, profile } = useSelector((state: RootState) => state.TMDBUser)
    const distpatch = useDispatch()

    useEffect(() => {
        if (session.success && profile.id) {
            getWatchListMovies(profile.id, session.session_id)
                .then((data: Movie) => distpatch(setSearchResult(data)))
        }
    }, [profile, session, distpatch])
    console.log(profile);
    return (
        <BaseLayout>
            <div className="container" data-bs-theme="dark">
                <LoginButton />
                <h3>待看清單</h3>
                <div className="row">
                    {searchResult?.results?.map((movie: MovieResult) => {
                        const fullImageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
                        return <MovieCard key={movie.id} movie={movie} fullImageUrl={fullImageUrl} isWatchList={true} />
                    })}
                </div>
                <MovieCardPopUp />
                <div className="">Current Page:{searchResult?.page}</div>
                <div className="">Total Pages:{searchResult?.total_pages}</div>
            </div>
        </BaseLayout >
    );
}

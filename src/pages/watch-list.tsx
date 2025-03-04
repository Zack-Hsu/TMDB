import React, { useEffect, useState } from "react";
import BaseLayout from "@/elements/layouts/BaseLayout";
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from "@/elements/components/MovieCard";
import { setSearchResult } from "@/store/slices/searchMovie";
import { Movie, MovieResult } from "@/types/store/states/movie-types";
import getWatchListMovies from "@/service/tmdb/watchList/getWatchListMovies";
import { RootState } from "@/store";
import MovieCardPopUp from "@/elements/components/MovieCardPopUp/MovieCardPopUp";

export default function WatchList() {
    const { searchResult } = useSelector((state: RootState) => state.searchMovie)
    const { session, profile } = useSelector((state: RootState) => state.TMDBUser)
    const dispatch = useDispatch();
    const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);


    useEffect(() => {
        if (session.success && profile.id) {
            getWatchListMovies(profile.id, session.session_id, "created_at.asc")
                .then((data: Movie) => dispatch(setSearchResult(data)));
        } else {
            //router.push("/");
        }
    }, [profile, session, dispatch]);

    const handleLottery = () => {
        if (!searchResult?.results?.length) return;
        setIsSpinning(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * searchResult.results.length);
            setSelectedMovie(searchResult.results[randomIndex]);
            setIsSpinning(false);
        }, 1000);
    };

    return (
        <BaseLayout>
            <div className="container" data-bs-theme="dark">
                <h3 className="py-3">待播清單</h3>
                <div className="row">
                    {searchResult?.results?.map((movie: MovieResult) => {
                        return <MovieCard key={movie.id} movie={movie} isWatchList={true} />;
                    })}
                </div>
                <MovieCardPopUp />
                <div className="mt-4 text-center">
                    <button className="btn btn-primary" onClick={handleLottery} disabled={isSpinning}>
                        {isSpinning ? "轉盤轉動中..." : "隨機選片"}
                    </button>
                    {selectedMovie && (
                        <MovieCard key={selectedMovie.id} movie={selectedMovie} isWatchList={true} />
                    )}
                </div>
                <div className="">Current Page: {searchResult?.page}</div>
                <div className="">Total Pages: {searchResult?.total_pages}</div>
            </div>
        </BaseLayout>
    );
}

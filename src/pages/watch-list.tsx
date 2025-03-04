import React, { useEffect, useState } from "react";
import BaseLayout from "@/elements/layouts/BaseLayout";
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from "@/elements/components/MovieCard";
import { setSearchResult } from "@/store/slices/searchMovie";
import { Movie, MovieResult } from "@/types/store/states/movie-types";
import getWatchListMovies from "@/service/tmdb/watchList/getWatchListMovies";
import { RootState } from "@/store";
import MovieCardContainer from "@/elements/components/MovieCardContainer/MovieCardContainer";
import { useTMDBAuth } from "@/elements/components/LoginButton/LoginButton";
import Link from "next/link";

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
    const { isLogin } = useTMDBAuth()
    return (
        <BaseLayout>
            <div className="container" data-bs-theme="dark">
                {!isLogin && (<h5 className="mt-3">尚未登入，請<Link href="/" className="text-secondary">返回探索</Link></h5>)}
                {isLogin && (
                    <>
                        <button className="btn btn--primary ms-3 mt-3" onClick={handleLottery} disabled={isSpinning}>
                            {isSpinning ? "轉盤轉動中..." : "隨機選片"}
                        </button>
                        <div className="mt-4 text-center">
                            {selectedMovie && (
                                <MovieCard key={selectedMovie.id} movie={selectedMovie} isWatchList={true} />
                            )}
                        </div>
                        <hr />
                        <div className="mt-3">
                            <h3 className="py-3 d-flex align-items-center">待播清單</h3>
                            <MovieCardContainer />
                        </div>
                    </>
                )}

            </div>
        </BaseLayout>
    );
}

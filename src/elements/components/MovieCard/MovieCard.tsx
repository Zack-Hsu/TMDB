import addToWatchList from "@/service/tmdb/watchList/addToWatchList"
import { RootState } from "@/store"
import { MovieCredits, MovieResult } from "@/types/store/states/movie-types"
import Image from "next/image"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveMovie, setMovieCredits, setShowMovieDetail } from "@/store/slices/searchMovie"
import getMovieCredits from "@/service/tmdb/getMovieCredits"

export default function MovieCard(props: { movie: MovieResult, isWatchList?: boolean }) {
    const { movie, isWatchList } = props
    const { profile, session } = useSelector((state: RootState) => state.TMDBUser)
    const { activeMovie } = useSelector((state: RootState) => state.searchMovie)
    const dispatch = useDispatch()
    const viewMovieDetail = (movie: MovieResult) => {
        dispatch(setActiveMovie(movie))
        dispatch(setShowMovieDetail(true))
        getMovieCredits(movie.id)
            .then((res: MovieCredits) => dispatch(setMovieCredits(res)))

    }
    const AddToWatchList = useMemo(() => {
        if (profile.id && session.success && activeMovie.id) {
            if (isWatchList) {
                return <button className="btn btn--primary">已加入清單</button>
            }
            return <button className="btn btn--primary" onClick={() => {
                addToWatchList(profile.id, session.session_id, activeMovie.id)
            }}>Add to watch List</button>
        }
        else {
            return <></>
        }
    }, [profile, session, activeMovie, isWatchList])
    const fullImageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
    return (
        <div key={movie.id} className="col-lg-4 col-sm-6 mb-3">
            <div className="card border border-secondary"
                onClick={() => {
                    viewMovieDetail(movie)
                }}
            >
                <Image src={fullImageUrl} width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '300px', objectFit: "cover" }}
                    className="card-img-top" alt="Waves"
                />
                <div className="card-body">
                    <h5 className="card-title text-truncate">{movie.title}</h5>
                    <span className="text-secondary">{movie.release_date || '查無日期'}</span>
                    <div className="w-100">
                        {AddToWatchList}
                    </div>
                </div>
            </div>
        </div>
    )
}
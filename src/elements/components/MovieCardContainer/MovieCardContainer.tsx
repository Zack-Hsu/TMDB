import { RootState } from "@/store"
import { useSelector } from "react-redux"
import MovieCard from "../MovieCard/MovieCard"
import { MovieResult } from "@/types/store/states/movie-types"
import { useRouter } from "next/router"
import Link from "next/link"
import MovieCardPopUp from "../MovieCardPopUp/MovieCardPopUp"
import Spinner from "../Spinner/Spinner"

export default function MovieCardContainer() {
    const { searchResult, fetchMovieLoader } = useSelector((state: RootState) => state.searchMovie)
    const { pathname } = useRouter()
    if (searchResult.results.length == 0) {
        if (pathname == "/watch-list") {
            return <h4>目前沒有待播放的電影喔，請前往探索 <Link href="/" className="btn btn-sm btn-light">探索去</Link></h4>
        }
        return <h4 className="w-100 text-center">查無結果，請重新搜尋</h4>
    }
    return (
        <div className="row">
            {searchResult?.results?.map((movie: MovieResult) => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
            <MovieCardPopUp />
            <Spinner loaderReduxState={fetchMovieLoader} />
        </div>
    )
}
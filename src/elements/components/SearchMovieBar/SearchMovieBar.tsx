import "./SearchMovieBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieName } from "@/store/slices/searchMovie";
import { RootState } from "@/store";
export default function SearchMovieBar() {
    const dispatch = useDispatch();
    return (
        <input
            type="text"
            className="form-control me-2"
            placeholder="搜尋電影 （建議使用英文）"
            value={useSelector((state: RootState) => state.searchMovie.searchMovieName)}
            onChange={(e) => {
                dispatch(setSearchMovieName(e.target.value as string));
            }}
        />
    )
}
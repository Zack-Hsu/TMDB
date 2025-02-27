import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieName } from "@/store/slices/searchMovie";
import { useAppDispatch } from "@/store";
export default function SearchMovieBar(props: { query: string }) {
    const { query } = props;
    const dispatch = useAppDispatch();
    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={useSelector((state: any) => state.searchMoviceName)}
            onChange={(e) => {
                dispatch(setSearchMovieName(e.target.value));
            }}
        />
    )
}
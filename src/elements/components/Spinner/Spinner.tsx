import { RootState } from "@/store"
import { useSelector } from "react-redux"

export default function Spinner() {
    const { fetchMovieLoader } = useSelector((state: RootState) => state.searchMovie)
    if (fetchMovieLoader) {
        return (
            <>
                <div style={{ position: 'fixed', bottom: '10%', left: '50%', zIndex: "10011", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="spinner-border" role="status">
                    </div>
                    <span className="sr-only w-100">Loading...</span>
                </div>
            </>
        )
    } else {
        return null
    }
}
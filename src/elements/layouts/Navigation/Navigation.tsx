import SearchMovieBar from "@/elements/components/SearchMovieBar/SearchMovieBar"
import { RootState } from "@/store"
import Link from "next/link"
import { useMemo } from "react"
import { useSelector } from "react-redux"

export default function Navigation(props: { children: React.ReactNode }) {
    const { children } = props
    const {
        session,
    } = useSelector((state: RootState) => state.TMDBUser)
    const WatchListLink = useMemo(() => {
        if (session.success) {
            return (
                <li className={`nav-item`}>
                    <Link className="nav-link" href="/watch-list">待播清單</Link>
                </li>
            )
        } else {
            return <></>
        }
    }, [session])
    return (
        <div className="w-100 sticky-top bg-dark p-1">
            <div className="row align-items-center">
                <div className="col-auto">
                    <Link href="/" className="nav-link">
                        <h2>TMDB</h2>
                    </Link>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <nav className="navbar navbar-expand-lg ">
                            <SearchMovieBar />
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    {WatchListLink}
                                    <li className="nav-item">
                                        {children}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
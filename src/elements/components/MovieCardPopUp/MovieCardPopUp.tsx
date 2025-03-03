import addToWatchList from "@/service/tmdb/watchList/addToWatchList"
import styles from "@/elements/components/MovieCard/MovieCard.module.scss"

import { RootState } from "@/store"
import { setShowMovieDetail } from "@/store/slices/searchMovie"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function MovieCardPopUp() {
    const dispatch = useDispatch()
    const { pathname } = useRouter()
    const { profile, session } = useSelector((state: RootState) => state.TMDBUser)
    const { showMovieDetail, movieCredits, activeMovie } = useSelector((state: RootState) => state.searchMovie)
    const [fullImageUrl, setFullImageUrl] = useState<string>(`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`)
    const AddToWatchList = useMemo(() => {
        if (profile.id && session.success && activeMovie.id) {
            if (pathname == "/watch-list") {
                return <button className="btn btn--primary">已加入清單</button>
            }
            return (
                <button className="btn btn--primary" onClick={(e) => {
                    addToWatchList(profile.id, session.session_id, activeMovie.id)
                        .then((res) => {
                            if (res.success) {
                                (e.target as HTMLButtonElement).innerHTML = `<a href="/TMDB/watch-list">前往查看待播放清單</a>`
                            }
                        })
                }}>
                    Add to watch List
                </button>
            )
        }
        else {
            return <></>
        }
    }, [profile, session, activeMovie, pathname])
    const CastInformationCard = useMemo(() => {
        if (movieCredits.cast.length > 0) {
            return (
                <div style={{ display: 'flex', width: '300px', overflowX: 'auto' }}>
                    {movieCredits.cast.slice(0, 5).map((itm) => {
                        return <div key={itm.cast_id} className="border" style={{ width: "150px" }}>
                            <Image src={`https://media.themoviedb.org/t/p/w276_and_h350_face${itm.profile_path}`} width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '150px', height: '150px', objectFit: "cover" }}
                                className="card-img-top" alt="Waves"
                            />
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{itm.original_name}</h5>
                                <span className="text-secondary">{itm.character}</span>
                            </div>
                        </div>
                    })}
                </div>
            )
        } else {
            return null
        }
    }, [movieCredits])
    useEffect(() => {
        setFullImageUrl(`https://image.tmdb.org/t/p/w500${activeMovie.poster_path}`)
    }, [activeMovie])
    if (activeMovie && showMovieDetail && movieCredits) {
        return (
            <div className={styles.popupOverlay}>
                <div className={styles.popup}>
                    <div className="w-100 d-flex justify-content-end mb-1 cursor-pointer" style={{ position: "fixed", height: "100vh", right: '1rem', top: '1rem' }} onClick={() => dispatch(setShowMovieDetail(false))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>
                    <div className="card">
                        <div className="row m-0">
                            <div className="col-lg-4 p-3 d-flex justify-content-center align-items-center bg-light">
                                <Image src={fullImageUrl}
                                    width={0}
                                    height={0}
                                    style={{ width: 'auto', height: 'auto', maxWidth: "100%", maxHeight: "500px" }}
                                    className="card-img-top" alt="Waves"
                                />
                            </div>
                            <div className="col d-flex justify-content-center align-items-start">
                                <div className="w-100 p-3 text-start">
                                    <h3>{activeMovie.title}</h3>
                                    <p>{activeMovie.overview}</p>
                                    <span className="text-secondary">{activeMovie.release_date || '查無日期'}</span>
                                    {CastInformationCard}
                                    <div className="w-100 mt-1">
                                        {AddToWatchList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
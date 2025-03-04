import styles from "./LoginButton.module.scss"
import getTMDBRequestToken from "@/service/tmdb/getTMDBRequestToken";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initProfile, initSession, setProfile, setRequestToken, setSession } from "@/store/slices/user";
import createSession from "@/service/tmdb/createSession";
import getUserInformation from "@/service/tmdb/getUserInformation";
import { UserInformation } from "@/types/store/states/userInfomation-type";
import { RootState } from "@/store";
import Link from "next/link";
import { initSearchResult, setSearchResult } from "@/store/slices/searchMovie";
//import useSessionFromLocalStorage from "@/lib/useSessionFromLocalStorage";
export function useTMDBAuth() {
    const dispatch = useDispatch();
    const { requestToken, session, profile } = useSelector((state: RootState) => state.TMDBUser);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [TMDBAuthUrl, setTMDBAuthUrl] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (session.success) {
            getUserInformation(session.session_id).then((res: UserInformation) => {
                dispatch(setProfile(res));
            });
        }
    }, [session, dispatch]);

    useEffect(() => {
        if (!session.success) {
            const { protocol, host, pathname } = window.location;
            setTMDBAuthUrl(`https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${protocol}//${host}${pathname}`);
        }
    }, [requestToken, session]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedSession = JSON.parse(localStorage.getItem("tmdbSession") || "{}");
        if (storedSession?.success) {
            dispatch(setSession(storedSession));
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const approved = urlParams.get("approved");
            const request_token = urlParams.get("request_token");

            if (approved === "true" && request_token) {
                createSession(request_token)
                    .then(res => dispatch(setSession(res)))
                    .catch(() => getTMDBRequestToken().then(res => dispatch(setRequestToken(res))));
            } else {
                getTMDBRequestToken().then(res => dispatch(setRequestToken(res)));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (session.success && profile.id) {
            setIsLogin(true);
        } else {
            setIsLogin(false)
        }
    }, [session, profile]);

    const handleLogout = () => {
        dispatch(setSession(initSession))
        dispatch(setProfile(initProfile))
        dispatch(setSearchResult(initSearchResult))
        getTMDBRequestToken().then(res => dispatch(setRequestToken(res)));
    };
    const WatchListLink = useMemo(() => (
        session.success ? <Link className="dropdown-item align-items-center d-flex" href="/watch-list">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-view-list me-3" viewBox="0 0 16 16">
                <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14" />
            </svg> 待播清單
        </Link> : null
    ), [session]);

    return {
        profile,
        session,
        TMDBAuthUrl,
        isDropdownOpen,
        setDropdownOpen,
        handleLogout,
        WatchListLink,
        isLogin
    };
}
export default function LoginButton() {
    const { profile, TMDBAuthUrl, isDropdownOpen, setDropdownOpen, handleLogout, WatchListLink, isLogin } = useTMDBAuth();
    return (

        isLogin ? (
            <div className="dropdown" >
                <div className="d-flex align-items-center">
                    <div className={styles.avatar} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        {profile.username[0]}
                    </div>
                    <div className="dropdown-toggle" style={{ marginLeft: '.25rem' }}></div>
                </div>
                <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} style={{ right: 0 }}>
                    {WatchListLink}
                    <button className="dropdown-item" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-box-arrow-right me-3" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                        登出 TMDB
                    </button>
                </div>
            </div>
        ) : (
            <Link className="btn btn-light" href={TMDBAuthUrl}>登入</Link>
        )
    );
}

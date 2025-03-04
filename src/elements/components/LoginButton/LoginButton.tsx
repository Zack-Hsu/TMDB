import styles from "./LoginButton.module.scss"
import getTMDBRequestToken from "@/service/tmdb/getTMDBRequestToken";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSession, setProfile, setRequestToken, setSession } from "@/store/slices/user";
import createSession from "@/service/tmdb/createSession";
import getUserInformation from "@/service/tmdb/getUserInformation";
import { UserInformation } from "@/types/store/states/userInfomation-type";
import { RootState } from "@/store";
import Navigation from "@/elements/layouts/Navigation/Navigation";
import Link from "next/link";
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
        }
    }, [session, profile]);

    const handleLogout = () => {
        dispatch(setSession(initSession));
        getTMDBRequestToken().then(res => dispatch(setRequestToken(res)));
    };
    const WatchListLink = useMemo(() => (
        session.success ? <Link className="dropdown-item" href="/watch-list">待播清單</Link> : null
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
        <Navigation>
            {isLogin ? (
                <div className="dropdown">
                    <div className="d-flex align-items-center">
                        <div className={styles.avatar} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                            <h3>{profile.username[0]}</h3>
                        </div>
                        <div className="dropdown-toggle"></div>
                    </div>
                    <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} style={{ right: 0 }}>
                        <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                        {WatchListLink}
                    </div>
                </div>
            ) : (
                <Link className="btn btn-primary" href={TMDBAuthUrl}>Login</Link>
            )}
        </Navigation>
    );
}

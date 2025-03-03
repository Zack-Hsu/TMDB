import styles from "./LoginButton.module.scss"
import getTMDBRequestToken from "@/service/tmdb/getTMDBRequestToken";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestToken } from "@/types/store/states/requestToken-type";
import { initSession, setProfile, setRequestToken, setSession } from "@/store/slices/user";
import createSession from "@/service/tmdb/createSession";
import getUserInformation from "@/service/tmdb/getUserInformation";
import { UserInformation } from "@/types/store/states/userInfomation-type";
import { RootState } from "@/store";
import Navigation from "@/elements/layouts/Navigation/Navigation";
import Link from "next/link";
//import useSessionFromLocalStorage from "@/lib/useSessionFromLocalStorage";

export default function LoginButton() {
    const dispatch = useDispatch()
    const [isShowUserDropDown, setIsShowUserDropDown] = useState<boolean>(false)
    const {
        requestToken,
        session,
        profile,
    } = useSelector((state: RootState) => state.TMDBUser)
    const [TMDBAuthUrl, setTMDBAuthUrl] = useState<string>(`https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=https://localhost:3000`)
    /** 若Session 資料正確，透過API 獲得用戶資訊 */
    useEffect(() => {
        if (session.success) {
            getUserInformation(session.session_id)
                .then((res: UserInformation) => {
                    dispatch(setProfile(res))
                })
        }
    }, [session, dispatch])
    /** 透過外部連結登入TMDB 的網址 */
    useEffect(() => {
        if (location && !session.success) {
            const { protocol, pathname, host } = location
            setTMDBAuthUrl(`https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${protocol}//${host}${pathname}`)
        }

    }, [requestToken, session])
    /** 
     * 當透過外部連結登入過後，會返回一串帶有HTTP GET 的參數，如果Approved 將request token 存入 redux 
     * 這個地方有已知風險，但因為不在題庫裡面所以沒有製作（直接拿GET 回來的東西存入 Redux 是有風險的）
     * */
    useEffect(() => {
        let session = { success: false, session_id: '' }
        if (typeof window !== 'undefined' && localStorage.getItem('tmdbSession')) {
            session = JSON.parse(localStorage.getItem('tmdbSession') as string);
        }
        if (session.success) {
            dispatch(setSession(session))
            //dispatch(setUserRole(UserRoleEnum.User))
        } else {
            const approved = new URLSearchParams(location.search).get("approved")
            const request_token = new URLSearchParams(location.search).get("request_token")
            if (approved == 'true' && request_token) {
                if (!session.success) {
                    createSession(request_token)
                        .then((res) => dispatch(setSession(res)))
                        .catch(() => {
                            getTMDBRequestToken()
                                .then((res: RequestToken) => dispatch(setRequestToken(res)))
                        })
                }
            } else {
                getTMDBRequestToken()
                    .then((res: RequestToken) => dispatch(setRequestToken(res)))
            }
        }
    }, [dispatch])
    const WatchListLink = useMemo(() => {
        if (session.success) {
            return (<Link className="dropdown-item" href="/watch-list">待播清單</Link>
            )
        } else {
            return <></>
        }
    }, [session])
    /** 已經登入就顯示Avatar，沒有的話顯示Login Button */
    const LoginToggle = useMemo(() => {
        if (profile.id && session.success) {
            return (
                <div className="dropdown">
                    <div className="d-flex align-items-center">
                        <div className={styles.avatar} onClick={() => setIsShowUserDropDown(!isShowUserDropDown)}>
                            <h3>{profile.username[0]}</h3>
                        </div>
                        <div className="dropdown-toggle"></div>
                    </div>
                    <div className={`dropdown-menu ${isShowUserDropDown ? "show" : ''}`} style={{ right: 0 }}>
                        <button className="dropdown-item"
                            onClick={() => {
                                dispatch(setSession(initSession))
                                getTMDBRequestToken()
                                    .then((res: RequestToken) => dispatch(setRequestToken(res)))
                            }}>Log Out</button>
                        {WatchListLink}
                    </div>
                </div>
            )
        } else {
            return (
                <a className="btn btn-primary" href={TMDBAuthUrl}>Login</a>
            )
        }
    }, [profile, session, TMDBAuthUrl, isShowUserDropDown])
    return (
        <Navigation>
            {LoginToggle}
        </Navigation>
    )
}

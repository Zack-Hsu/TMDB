import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BaseLayout from "@/elements/layouts/BaseLayout";
import Image from "next/image";
import infinityScroll from "@/lib/infinityScroll";
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import SearchMovieBar from "@/elements/components/SearchMovieBar/SearchMovieBar";


interface Session {
    success: boolean;
    session_id: string;
    errLog?: string
}

interface RequestToken {
    success: boolean;
    expires_at?: string;
    request_token: string;
}

interface Movie {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        orginal_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
}

interface UserInformation {
    avatar: {
        gravatar: {
            hash: string
        },
        tmdb: {
            avatar_path: string
        }
    },
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string
}

const fetchMovies = async (query: string = '', page: number = 1) => {
    const API_KEY = "367a786553f6d6acd23b37641e73be0b";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
};

const createRequestToken = async () => {
    const url = 'https://api.themoviedb.org/3/authentication/token/new';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        }
    };
    const response = await axios.get(url, options);
    return response
}

const createSession = async (requestToken: string) => {
    const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/3/authentication/session/new',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        },
        data: { request_token: requestToken }
    };

    const response = axios.request(options)
    return response
}

const GetUserInformation = async (sessionId: string) => {
    const API_KEY = "367a786553f6d6acd23b37641e73be0b";
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/21839650?api_key=${API_KEY}&session_id=${sessionId}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        }
    };

    const response = axios.request(options);
    return response
}

const UserLogin = (requestToken?: string) => {
    location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/#approved`;
}

const addTofavorite = async (userId: number, sessionId: string, movieId: number) => {
    const options = {
        method: 'POST',
        url: `https://api.themoviedb.org/3/account/${userId}/watchlist?session_id=${sessionId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        },
        data: { media_type: 'movie', media_id: movieId, watchlist: true }
    };

    axios.request(options)
}

export default function MovieSearch() {
    const [query, setQuery] = useState<string>("")
    const [requestToken, setRequestToken] = useState<RequestToken>()
    const [data, setData] = useState<Movie>()
    const [session, setSession] = useState<Session>({ success: false, session_id: '' })
    const [userInformation, setUserInformation] = useState<UserInformation | null>(null)
    const [idx, setIdx] = useState(0)
    const { searchMovieName } = useSelector((state: any) => state.searchMovie)
    useEffect(() => {
        fetchMovies(query).then((data) => setData(data))
    }, [searchMovieName])
    useEffect(() => {
        if (session.success) {
            GetUserInformation(session.session_id).then((res) => setUserInformation(res.data)).catch((err) => {
                setUserInformation(null)
                console.log(err);
            })
        }
    }, [session])
    useEffect(() => {
        if (data?.results?.length) {
            infinityScroll(() => {
                fetchMovies(query, data.page + 1)
                    .then((res: Movie) => {
                        const results = [...data.results, ...res.results]
                        res.results = results
                        setData(res)
                    })
            })
        }
    }, [data, query])
    useEffect(() => {
        createRequestToken().then((res) => setRequestToken(res.data)) // 取得request_token
        const approved = new URLSearchParams(location.search).get("approved") // 查看是否callback approved
        const callBackRequestToken = new URLSearchParams(location.search).get("request_token") // 查看是否callback request token
        if (approved && callBackRequestToken) {
            setRequestToken({ request_token: callBackRequestToken, expires_at: requestToken?.expires_at, success: true })
            createSession(callBackRequestToken).then((res) => setSession(res.data)).catch((err) => {
                setSession({ success: false, session_id: '', errLog: err })
            })
        }
    }, [])
    return (
        <BaseLayout>
            <div className="container" data-bs-theme="dark">
                <button onClick={() => { UserLogin(requestToken?.request_token) }}>Login - {userInformation?.username}</button>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <h1>測試</h1>
                <SearchMovieBar query="" />
                <div style={{ height: '120vh', width: '100%' }}></div>
                <div className="row">
                    {data?.results?.map((movie) => {
                        const fullImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        return (
                            <div key={movie.id} className="col-lg-4 col-sm-6 mb-3" >
                                <div className="card">
                                    <Image src={fullImageUrl} width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: '300px', objectFit: "cover" }}
                                        className="card-img-top" alt="Waves"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text text-truncate">{movie.overview}</p>
                                        <button className="btn btn-primary" onClick={() => {
                                            if (userInformation) {
                                                addTofavorite(userInformation.id, session.session_id, movie.id)
                                            }
                                        }}>add to favorite</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="">Current Page:{data?.page}</div>
                <div className="">Total Pages:{data?.total_pages}</div>
            </div>
        </BaseLayout >
    );
}

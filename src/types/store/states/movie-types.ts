export interface Movie {
    page: number;
    results: MovieResult[];
    total_pages: number;
    total_results: number;
}

export interface MovieResult {
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
}

export interface MovieCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number
    cast_img: string;
}

export interface Crew {
    adult: boolean;//Defaults to true
    gender: number//Defaults to 0
    id: number        //Defaults to 0
    known_for_department: string
    name: string
    original_name: string
    popularity: number//Defaults to 0
    profile_path: string
    credit_id: string
    department: string
    job: string
}
import axios from "axios";

export default async function searchMovies(query: string = '', page: number = 1) {
    const API_KEY = "367a786553f6d6acd23b37641e73be0b";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    return (await axios.get(url)).data;
};

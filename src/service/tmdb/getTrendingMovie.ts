import axios from 'axios';
export default async function getTrendingMovie(page: number = 1) {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        }
    };

    return (await axios.request(options)).data
}


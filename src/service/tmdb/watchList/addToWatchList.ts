import axios from "axios";

export default async function addToWatchList(userId: number, sessionId: string, movieId: number) {
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
    return axios.request(options)
}

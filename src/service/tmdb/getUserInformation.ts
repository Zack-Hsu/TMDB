import axios from "axios";

export default async function getUserInformation(sessionId: string) {
    const API_KEY = "367a786553f6d6acd23b37641e73be0b";
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/21839650?api_key=${API_KEY}&session_id=${sessionId}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjdhNzg2NTUzZjZkNmFjZDIzYjM3NjQxZTczYmUwYiIsIm5iZiI6MTc0MDM2NzE1MC4yNTUsInN1YiI6IjY3YmJlNTJkYmQ0OGU4OTI0Y2JlZTVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xa3Po7q0eXaQe4jofc07HDfFxkv_k_pDe9FS_RbNNhM'
        }
    };

    const response = (await axios.request(options)).data;
    return response
}

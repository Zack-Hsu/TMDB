export default function useSessionFromLocalStorage() {
    if (typeof window !== 'undefined' && localStorage.getItem('tmdbSession')) {
        return JSON.parse(localStorage.getItem('tmdbSession') as string);
    }
    return { success: false, session_id: '' };
}

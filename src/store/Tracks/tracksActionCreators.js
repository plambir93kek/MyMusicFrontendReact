
export const FetchTracks = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await fetch('https://mymusicbackendnest.herokuapp.com/tracks');
            const payload = await response.json();
            dispatch({ type: 'FETCH_TRACKS', payload })
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch (e) {
            dispatch({ type: 'SET_ERROR', payload: true })
        }
    }
};

export const searchTracks = (query) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://mymusicbackendnest.herokuapp.com/tracks/search?query=${query}`);
            const payload = await response.json();
            dispatch({ type: 'FETCH_TRACKS', payload });
        } catch (e) {
            dispatch({ type: 'SET_ERROR', payload: true })
        }
    }
};
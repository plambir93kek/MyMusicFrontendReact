

export const fetchArticles = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await fetch('http://localhost:5000/tracks/articles');
            const articles = await response.json();
            dispatch({type: 'FETCH_ARTICLES', payload: articles});
            dispatch({ type: 'SET_LOADING,', payload: false });
        } catch (e) {
           dispatch({type: 'SET_ERROR', payload: true})
        }
    }
};

export const setArticleActive = (payload) => {
    return {type:'SET_ACTIVE', payload}
}

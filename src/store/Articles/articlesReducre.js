
const initialState = {
    articles: [],
    error: false,
    isLoading: true,
    active: false
};

export const articlesReducer = (state=initialState, action) => {
    switch(action.type){
        case('FETCH_ARTICLES'):
          return {...state, articles: action.payload}
        case('SET_ERROR'):
          return {...state, error: action.payload}
        case('SET_LOADING'):
        return {...state, isLoading: action.payload}
        default:
          return state
    }
}
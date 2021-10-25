
const initialState = {
    tracks: [],
    isLoading: true,
    error: false,
  };
  
  export const trackReducer = (state=initialState, action) => {
     switch(action.type){
         case('FETCH_TRACKS'):
           return {...state, tracks: action.payload}
         case('SET_ERROR'):
           return {...state, error: action.payload}
         case('SET_LOADING'):
           return {...state, isLoading: action.payload}
         default:
             return state
     }
  };


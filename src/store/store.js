import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { articlesReducer } from "./Articles/articlesReducre";
import { playerReducer } from "./Player/playerReducer";
import { trackReducer } from "./Tracks/tracksReducer";



const rootReducer = combineReducers({
    tracks: trackReducer,
    player: playerReducer,
    articles: articlesReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
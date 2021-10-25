
const initialState = {
    _id: '0',
    pause: true,
    order: '0',
    audio: '',
    currentTime: 0,
    volume: 1
};

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_PLAYER_TRACK'):
            return { ...action.payload }
        case ('SET_PAUSE'):
            return { ...state, pause: action.payload }
        case ('SET_CURRENT_TIME'):
            return { ...state, currentTime: action.payload }
        case ('SET_VOLUME'):
            return { ...state, volume: action.payload }
        default:
            return state
    }
};
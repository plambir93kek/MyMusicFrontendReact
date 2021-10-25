

export const setPlayerTrack = (payload) => {
    return {type: 'SET_PLAYER_TRACK', payload}
};

export const setPlayerPause = (payload) => {
    return {type: 'SET_PAUSE', payload}
};

export const setCurrentTime = (payload) => {
    return {type: 'SET_CURRENT_TIME', payload}
}

export const setVolume = (payload) => {
    return {type: 'SET_VOLUME', payload}
}

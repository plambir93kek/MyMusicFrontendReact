import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTime, setPlayerPause, setPlayerTrack } from '../../store/Player/playerActionCreators';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import TrackItem from '../TrackItem/TrackItem';
import './player.css';

//render track list and player panel
const Player = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPlayerTrack({}))
        dispatch(setPlayerTrack({ _id: '0' }))
    }, [])

    const tracks = useSelector(state => state.tracks.tracks);
    const isLoading = useSelector(state => state.tracks.isLoading);
    const playerTrack = useSelector(state => state.player);
    const error = useSelector(state => state.tracks.error);

    const [duration, setDuration] = useState(null);
    const audio = useRef();
    
    
    const playTrack = () => {
        dispatch(setPlayerPause(false))
        if (duration) {
            audio.current.play()
        }
    };

    const pauseTrack = () => {
        dispatch(setPlayerPause(true));
        audio.current.pause()
    }

    const changeCurretTime = (time) => {
        audio.current.currentTime = time;
        dispatch(setCurrentTime(time))
    };

    const changeVolume = (vol) => {
        audio.current.volume = vol;
    }


    return (
        <div>
            {error && <h2 style={{ margin: '100px 50px', textAlign: 'center' }}>Ошибка загрузки данных...</h2>}
            <audio src={playerTrack.audio} ref={audio}
                onLoadedData={(e) => { setDuration(e.currentTarget.duration); audio.current.play() }} onTimeUpdate={(e) => { dispatch(setCurrentTime(e.currentTarget.currentTime)) }}></audio>
            <div style={{ marginTop: '30px' }}>
                {isLoading ?
                    ''
                    : tracks?.map(track => <TrackItem
                        playTrack={playTrack}
                        track={track}
                        key={track._id}
                        pauseTrack={pauseTrack}
                    />
                    )

                }
            </div>
            <PlayerPanel
                duration={duration}
                changeCurretTime={changeCurretTime}
                pauseTrack={pauseTrack}
                playTrack={playTrack}
                changeVolume={changeVolume}
            />
        </div>
    )
};

export default Player;
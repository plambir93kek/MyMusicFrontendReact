import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTime, setPlayerPause } from '../../store/Player/playerActionCreators';
import { FetchTracks } from "../../store/Tracks/tracksActionCreators";
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import TrackItem from '../TrackItem/TrackItem';
import './player.css';

const Player = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchTracks())
    }, [])

    const tracks = useSelector(state => state.tracks.tracks);
    const isLoading = useSelector(state => state.tracks.isLoading);
    const playerTrack = useSelector(state => state.player);
    const error = useSelector(state => state.tracks.error);

    const [duration, setDuration] = useState(null);
    const audio = useRef();
    let int;

    const playTrack = async () => {
        dispatch(setPlayerPause(false))
        if(duration){
            audio.current.play()
        }
    };

    const pauseTrack = () => {
        dispatch(setPlayerPause(true));
        clearInterval(int);
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
            {error && <h2 style={{margin: '100px 50px', textAlign:'center'}}>Ошибка загрузки данных...</h2>}
            <audio src={playerTrack.audio} ref={audio}
                onLoadedData={(e) => { setDuration(e.currentTarget.duration); audio.current.play() }} onTimeUpdate={(e) => { dispatch(setCurrentTime(e.currentTarget.currentTime)) }}></audio>
            <div style={{marginTop:'30px'}}>
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
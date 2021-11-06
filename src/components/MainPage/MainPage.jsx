import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Articles from '../Articles/Articles';
import Player from '../Player/Player';
import './mainPage.css';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import { setCurrentTime, setPlayerPause } from '../../store/Player/playerActionCreators';


//render tracks, player panel and articles, controls audio
const MainPage = () => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('')
    const [fired, setFired] = useState(false)
    const playerTrack = useSelector(state => state.player);
    const isLoading = useSelector(state => state.tracks.isLoading);

    const [duration, setDuration] = useState(null);
    const audio = useRef();


    const playTrack = async () => {
        dispatch(setPlayerPause(false))
        await audio.current.load()
        audio.current.play() 
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
 

    //add scroll on track list, when player panel is visible

    useEffect(() => {
        if (playerTrack._id !== '0' && !fired) {

            const timeoutId = setTimeout(() => {
                setScroll("scrollPage")
                setFired(true)
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [fired, playerTrack._id])

    return (
        <>
            {isLoading ?
                <h1 style={{ textAlign: 'center' }}>...Loading data, please wait</h1>
                :

                <div className={`mainPage ${scroll}`}>
                    <audio
                        src={playerTrack.audio} ref={audio}
                        onLoadedData={(e) => {
                            setDuration(e.currentTarget.duration);
                        }}
                        onTimeUpdate={(e) => { dispatch(setCurrentTime(e.currentTarget.currentTime)) }}>
                    </audio>
                    <Player playTrack={playTrack} pauseTrack={pauseTrack} />
                    <Articles />
                </div>
            }
            
            <PlayerPanel
                duration={duration}
                changeCurretTime={changeCurretTime}
                pauseTrack={pauseTrack}
                playTrack={playTrack}
                changeVolume={changeVolume}
            />
           
        </>

    )
};

export default MainPage;
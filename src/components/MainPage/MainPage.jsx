import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Articles from '../Articles/Articles';
import Player from '../Player/Player';
import './mainPage.css';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import { setCurrentTime, setPlayerPause } from '../../store/Player/playerActionCreators';
import styled from 'styled-components';

//this wrapper fix Safari 100vh bug in mobile version
const Wrapper = styled.div`
  height: ${props => props.height? props.height - props.scroll: 'auto' }px;
  overflow-y: auto;
  @media (max-width: 650px) {
    height: ${props => props.height? props.height - props.scroll - 35: 'auto' }px; 
  }
`;


//render tracks, player panel and articles, controls audio
const MainPage = () => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState(0);
    const [height, setHeight] = useState(null);
    const [fired, setFired] = useState(false);
    const playerTrack = useSelector(state => state.player);
    const isLoading = useSelector(state => state.tracks.isLoading);

    const [duration, setDuration] = useState(null);
    const audio = useRef();


    const playTrack = async () => {
        dispatch(setPlayerPause(false))
        await audio.current.load()
        audio.current.play() 
       
    };

    const pauseTrack = async () => {
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
 

    //add scroll on track list, when player panel is visible, only once after track was setted to player

    useEffect(() => {
        if (playerTrack._id !== '0' && !fired) {

            const timeoutId = setTimeout(() => {
                setHeight(window.innerHeight)
                setScroll(225)
                setFired(true)
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [ playerTrack._id, fired]);

    // this is fix for Safari 100vh bug
    useEffect(() =>{
        if(fired){
            setHeight(window.innerHeight)
        }
    }, [window.innerHeight])

    return (
        <>
        <Wrapper height={height} scroll={scroll}>
            {isLoading ?
                <h1 style={{ textAlign: 'center' }}>...Loading data, please wait</h1>
                :

                <div className='mainPage'>
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
            </Wrapper>
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
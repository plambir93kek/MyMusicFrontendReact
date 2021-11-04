import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './playerPanel.css';
import { useSelector } from 'react-redux';
import { setPlayerTrack } from '../../store/Player/playerActionCreators';
import { useDispatch } from 'react-redux';

const PlayerPanel = ({ duration, changeCurretTime, pauseTrack, playTrack, changeVolume }) => {

    const [likePlayer, setLikePlayer] = useState(false);
    const [toggleVol, setToggleVol] = useState(true);
    const [showVol, setShowVol] = useState(false);
    const [volume, setVolume] = useState(100)

    const playerTrack = useSelector(state => state.player);
    const currentTime = playerTrack.currentTime;
    const tracks = useSelector(state => state.tracks.tracks)
    const dispatch = useDispatch()

    const prevTrack = playerTrack.order === '0' ?
        tracks[tracks.length - 1]
        :
        tracks[Number(playerTrack.order) - 1];

    const nextTrack = Number(playerTrack.order) === tracks.length - 1 ?
        tracks[0]
        :
        tracks[Number(playerTrack.order) + 1];

    const setNextTrack = () => {
        if (prevTrack) {
            dispatch(setPlayerTrack({
                artist: nextTrack.artist,
                name: nextTrack.name,
                _id: nextTrack._id,
                pause: false,
                order: nextTrack.order,
                audio: `https://mymusicbackendnest.herokuapp.com/audio/${nextTrack.audio}`,
                picture: `https://mymusicbackendnest.herokuapp.com/image/${nextTrack.picture}`,
                volume: 1,
                currentTime: 0
            }));
            
        }
    }

    const setPrevTrack = () => {
        if (nextTrack) {
            dispatch(setPlayerTrack({
                artist: prevTrack.artist,
                name: prevTrack.name,
                _id: prevTrack._id,
                pause: false,
                order: prevTrack.order,
                audio: `https://mymusicbackendnest.herokuapp.com/audio/${prevTrack.audio}`,
                picture: `https://mymusicbackendnest.herokuapp.com/image/${prevTrack.picture}`,
                volume: 1,
                currentTime: 0
            }));
        }
    }


    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return `${minutes}:${seconds}`;
    }
    
    //show volume slider
    const showSlider = () => {
        setShowVol(true)
    };
    
    //hide volume slider
    const hideSlider = () => {
        setShowVol(false)
    };

    const volumeOn = () => {
        setToggleVol(!toggleVol)
        changeVolume(0)
        setVolume(0)
    };

    const volumeOff = () => {
        setToggleVol(!toggleVol)
        changeVolume(1)
        setVolume(100)
    };
    
    //chang current time of audio
    const changeCT = (e) => {
        if(currentTime===duration){
            setNextTrack()
        }else{
          changeCurretTime(Number(e.target.value))
        }
    }

    const changeVol = (e) => {
        changeVolume(Number(e.target.value) / 100)
        setVolume(Number(e.target.value))
    }

    useEffect(() =>{
        if (currentTime === duration) {
            setNextTrack()
        };
    })


    return (
        <div> {playerTrack._id !== '0' &&
            <div className='player'>
                <Slider
                    max={duration} value={currentTime} onChange={changeCT}
                    aria-label="time-indicator"
                    size="small"
                    min={0}
                    step={1}
                    style={{padding:'0px'}}
                    sx={{
                        height: 10, padding: '0px', opacity: 0.7,
                        '&:hover': {
                            opacity: 1
                        },
                        '& .MuiSlider-thumb': {
                            width: 10,
                            height: 10,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0px 0px 0px 2px rgb(80, 1, 155)',
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <div className='timePanel'>
                    <p className='currentTime'>{currentTime ? formatTime(currentTime) : '0:00'}</p>
                    <div className='trackMini'>
                        <p style={{ margin: '0', textAlign: 'center' }}>{playerTrack.name}</p>
                        <p style={{ margin: '0', textAlign: 'center' }}>{playerTrack.artist}</p>
                    </div>
                    <p className='duration'>{duration ? formatTime(duration) : ''}</p>
                </div>
                <div className='playerPanel'>
                    <div className='keys'>
                        <SkipPreviousIcon onClick={setPrevTrack} fontSize='large' />
                        {playerTrack.pause ?
                            <PlayArrowIcon aria-label='play' fontSize='large' onClick={playTrack} />
                            :
                            <PauseIcon aria-label='pause' fontSize='large' onClick={pauseTrack} />
                        }

                        <SkipNextIcon  onClick={setNextTrack} fontSize='large' />
                    </div>
                    <div className='track'>
                        <img className='trackIcon' src={playerTrack.picture} />
                        <div>
                            <p className='artist'>{playerTrack.name}</p>
                            <p className='name'>{playerTrack.artist}</p>
                        </div>

                    </div>
                    <div className='likeIcon'>
                        {likePlayer ? <FavoriteIcon fontSize='medium' onClick={() => { setLikePlayer(!likePlayer) }} /> :
                            <FavoriteBorderIcon fontSize='medium' onClick={() => { setLikePlayer(!likePlayer) }} />}
                    </div>
                    <div onMouseEnter={showSlider} onMouseLeave={hideSlider} className='volume'>
                        {showVol && <div style={{ height: '100px', marginBottom: '17px' }}>
                            <Slider
                                value={volume}
                                onChange={changeVol}
                                className='slider' max={99} min={0}
                                sx={{
                                    '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                    },
                                }}
                                orientation="vertical"
                            />
                        </div>}
                        {toggleVol && volume !== 0 ?
                            <VolumeUpIcon fontSize='medium' sx={{ marginTop: '50px' }} onClick={volumeOn} />
                            :
                            <VolumeOffIcon fontSize='medium' sx={{ marginTop: '50px' }} onClick={volumeOff} />}
                    </div>
                </div>
            </div>
        }

        </div>

    )
};

export default PlayerPanel;
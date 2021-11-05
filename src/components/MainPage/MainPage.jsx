import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Articles from '../Articles/Articles';
import Player from '../Player/Player';
import './mainPage.css'

//render tracks, player panel and articles
const MainPage = () => {
    const [scroll, setScroll] = useState('')
    const [fired, setFired] = useState(false)
    const playerTrack = useSelector(state => state.player);
    const isLoading = useSelector(state => state.tracks.isLoading);

    //add scroll on track list, when player panel is visible
   
    useEffect(() => {
        if (playerTrack._id !== '0' && !fired) {
            
            const timeoutId = setTimeout(() => {
                setScroll("scrollPage")
                    setFired(true)
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [fired,playerTrack._id])

    return (
        <>
        {isLoading? 
        <h1 style={{textAlign:'center'}}>...Loading data, please wait</h1>
        :
        <div className={`mainPage ${scroll}`}>
            <Player />
            <Articles />
        </div>
        }
        </>

    )
};

export default MainPage;
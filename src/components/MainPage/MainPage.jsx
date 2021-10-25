import React from 'react';
import { useSelector } from 'react-redux';
import Articles from '../Articles/Articles';
import Player from '../Player/Player';
import './mainPage.css'


const MainPage = () => {

    const playerTrack = useSelector(state => state.player)

    return (
        <div className={`mainPage  ${playerTrack._id !== '0'? 'scrollPage' : ''}`}>
            <Player/>
            <Articles />
        </div>
    )
};

export default MainPage;
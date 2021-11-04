import React from 'react';
import { useSelector } from 'react-redux';
import Articles from '../Articles/Articles';
import Player from '../Player/Player';
import './mainPage.css'

//render tracks, player panel and articles
const MainPage = () => {

    const playerTrack = useSelector(state => state.player);
    
    //add scroll on track list, when player panel is visible
    const addScroll = ()=>{
        const main = document.getElementsByClassName('mainPage')[0];
        setTimeout(()=> {
            if(main){
            main.classList.add("scrollPage")
            }
        }, 1000)
    }

    return (
        
        <div className={`mainPage ${playerTrack._id !== '0'? addScroll() : ''}`}>
            <Player/>
            <Articles />
        </div>
        
    )
};

export default MainPage;
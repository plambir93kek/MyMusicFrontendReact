import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { searchTracks } from '../../store/Tracks/tracksActionCreators';
import { useDispatch } from 'react-redux';

//Component render the navbar and search input to find tracks
const Header = () => {

    const dispatch = useDispatch();

    //define timer to stop immediate dispatch and request to server;
    const [timer, setTimer] = useState();
    const [serarchTerm, setSearchTerm] = useState('');

    //dispatches the serarch`s input
    const search = ({ target }) => {
        setSearchTerm(target.value)
        if (timer) {
            clearTimeout(timer)
        } 
            setTimer(
                setTimeout(() => {
                    dispatch(searchTracks(target.value))
                }, 300)
            )
    }

    return (
        <div className='header'>
            <h1><span className='span'>My</span> Music</h1>
            <div className='links'>
                <div>
                <NavLink className='nav' to='/'>Tracks</NavLink>
                <NavLink className='nav' to='/about'>About</NavLink>
                </div>
                <TextField value={serarchTerm} onChange={search}  className='search' id="standard-basic" label="Search tracks" variant="standard" />
            </div>
            <MusicNoteIcon className='icon' sx={{ color: 'rgb(80, 1, 155)', width: '80px', height: '45px' }} />
        </div>
    )
};

export default Header;
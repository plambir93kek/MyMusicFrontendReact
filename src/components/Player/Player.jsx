import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrackItem from '../TrackItem/TrackItem';
import { setPlayerTrack } from '../../store/Player/playerActionCreators';
import './player.css';

//render player list 
const Player = ({playTrack, pauseTrack}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPlayerTrack({}))
        dispatch(setPlayerTrack({ _id: '0' }))
    }, [])

    const tracks = useSelector(state => state.tracks.tracks);
    const isLoading = useSelector(state => state.tracks.isLoading);
    const error = useSelector(state => state.tracks.error);
    
    return (
        <div>
            {error && <h2 style={{ margin: '100px 50px', textAlign: 'center' }}>Ошибка загрузки данных...</h2>}
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
        </div>
    )
};

export default Player;
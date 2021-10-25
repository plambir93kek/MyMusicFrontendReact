import React, { useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './trackitem.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerTrack} from '../../store/Player/playerActionCreators';

const TrackItem = ({ track, playTrack, pauseTrack }) => {

    const dispatch = useDispatch()
    const playerTrack = useSelector(state => state.player);
    const [like, setLike] = useState(false);

    const thisTrack = {
        artist: track.artist,
        name: track.name,
        _id: track._id,
        pause: false,
        order: track.order,
        audio: `http://localhost:5000/audio/${track.audio}`,
        picture: `http://localhost:5000/image/${track.picture}`,
        volume: 1,
        currentTime: 0
    }

    const setPlayTrack = () => {
        if(track._id!==playerTrack._id){
            dispatch(setPlayerTrack(thisTrack))
        }
        playTrack()
    }

    const setPauseTrack = () => {
        pauseTrack()
    }

    return (
            <div className='trackItem'>
                {!(track._id === playerTrack._id && !playerTrack.pause)
                    ?
                    <PlayCircleOutlineIcon sx={{ width: '70px', height: '70px', color: '#10162F' }} onClick={setPlayTrack} />
                    :
                    <PauseCircleOutlineIcon sx={{ width: '70px', height: '70px', color: '#10162F' }} onClick={setPauseTrack} />
                }
                <img className='trackIcon' src={`http://localhost:5000/image/${track.picture}`} />
                <div className='trackInf'>
                    <p className='artist'>{track.artist}</p>
                    <p className='name'>{track.name}</p>
                </div>
                {like ?
                    <FavoriteIcon className='end' onClick={() => setLike(!like)} />
                    :
                    <FavoriteBorderIcon className='end' onClick={() => setLike(!like)} />
                }
                <p className='duration end'>{track.duration}</p>
            </div>
       
    )
};

export default TrackItem;
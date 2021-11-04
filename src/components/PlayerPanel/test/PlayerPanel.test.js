import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import PlayerPanel from '../PlayerPanel';
import {setPlayerPause, setPlayerTrack} from '../../../store/Player/playerActionCreators';
import userEvent from '@testing-library/user-event';


test('test play and pause buttons', () => {
    store.dispatch(setPlayerTrack({_id: '1', name:'hello'}))
     const pauseTrack = jest.fn();
     const playTrack = jest.fn();
    render(
      <Provider store={store}>
          <PlayerPanel playTrack={playTrack} pauseTrack={pauseTrack}/>
      </Provider>
    )
    const name = screen.getAllByText(/hello/i)
    expect(name[0]).toBeInTheDocument()

   const pauseButton = screen.getByLabelText('pause');
   userEvent.click(pauseButton);
   expect(pauseTrack).toHaveBeenCalled()

   store.dispatch(setPlayerPause(true))
   const playButton = screen.queryByLabelText('play');
   userEvent.click(playButton);
   expect(playTrack).toHaveBeenCalled()
})
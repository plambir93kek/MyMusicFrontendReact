import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { render, screen } from '@testing-library/react';
import TrackItem from '../TrackItem';

test('render track name, then click play and pause', () => {
    const track = {
        artist: 'one',
        name: 'two',
        _id: '1',
        order: '1',
        audio: `src`,
        picture: `src`,
    };

    const playTrack = jest.fn();
    const pauseTrack = jest.fn()

    render(
        <Provider store={store}>
            <TrackItem track={track} playTrack={playTrack} pauseTrack={pauseTrack} />
        </Provider>
    )

    const name=screen.queryByText(/two/i);
    expect(name).toBeInTheDocument();

    const playButton = screen.queryByLabelText(/play/i)
    userEvent.click(playButton);
    expect(playTrack).toHaveBeenCalled();

    const pauseButton = screen.queryByLabelText(/pause/i);
    userEvent.click(pauseButton);
    expect(pauseTrack).toHaveBeenCalled();
})
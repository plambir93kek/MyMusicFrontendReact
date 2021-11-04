import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { FetchTracks } from '../../../store/Tracks/tracksActionCreators';
import Player from '../Player';

export const handlers = [
    rest.get('https://mymusicbackendnest.herokuapp.com/tracks', (req, res, ctx) => {
        return res(ctx.json([
            {
                artist: 'one',
                name: 'two',
                _id: '1',
                order: '1',
                audio: `src`,
                picture: `src`,
            },
            {
                artist: 'three',
                name: 'four',
                _id: '2',
                order: '2',
                audio: `src`,
                picture: `src`,
            }
        ]), ctx.delay(150))
    })
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('render fetched track list', async () => {
    store.dispatch(FetchTracks());

    render (
        <Provider store={store}>
            <Player />
        </Provider>
    );

    const name= await screen.findByText(/one/i);
    const artist = await screen.findByText(/three/i);
    expect(name).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
})
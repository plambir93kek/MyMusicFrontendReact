import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Articles from '../Articles';
import { fetchArticles } from '../../../store/Articles/ariclesAcrionCreators';
import userEvent from '@testing-library/user-event';

export const handlers = [
    rest.get('https://mymusicbackendnest.herokuapp.com/tracks/articles', (req, res, ctx) => {
        return res(ctx.json([
            {
                band: 'Nirvana',
                text: 'Gurunge is dead',
                picture: 'nirvana'
            },
            {
                band: 'One',
                text: 'Two',
                picture: 'two'
            }
        ]), ctx.delay(150))
    })
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetch articles and click button to open article', async () => {
    store.dispatch(fetchArticles());
    store.dispatch({ type: 'SET_LOADING', payload: false })
    render(
        <Provider store={store}>
            <Articles />
        </Provider>
    )

    const band = await screen.findByText(/nirvana/i)
    expect(band).toBeInTheDocument();

    const readMore = screen.getByText(/read/i);
    userEvent.click(readMore);
    const text = await screen.findByText(/Gurunge/i);
    expect(text).toBeInTheDocument();
})
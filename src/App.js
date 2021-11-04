import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { fetchArticles } from './store/Articles/ariclesAcrionCreators';
import { FetchTracks } from './store/Tracks/tracksActionCreators';

function App() {
   const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(FetchTracks());
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

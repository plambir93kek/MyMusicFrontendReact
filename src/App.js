import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Player from './components/Player/Player';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header />
       <MainPage/>
      </BrowserRouter>
    </div>
  );
}

export default App;

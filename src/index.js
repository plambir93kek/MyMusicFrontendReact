import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material';
import theme from './MaterialUiTheme/theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);


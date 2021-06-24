import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import theme from './mainTheme';
import { history, configureStore } from './configureStore';
import { saveStateToSessionStorage } from './utils/sessionStorage';
import { throttle } from './utils/throttle';

export const store = configureStore();
store.subscribe(() => throttle(() => saveStateToSessionStorage(store.getState()),1000));

ReactDOM.render(
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <ToastContainer style={ { top: 70 } } />
                <App />
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

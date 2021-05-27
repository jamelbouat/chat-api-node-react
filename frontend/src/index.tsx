import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { history, configureStore } from './configureStore';
import { saveStateToSessionStorage } from './utils/sessionStorage';
import App from './App';
import theme from './mainTheme';
import { throttle } from './utils/throttle';

const store = configureStore();
store.subscribe(() => throttle(() => saveStateToSessionStorage(store.getState()),1000));

ReactDOM.render(
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <App />
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

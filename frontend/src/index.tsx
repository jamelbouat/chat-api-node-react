import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { history, configureStore } from './configureStore';
import App from './App';
import theme from './mainTheme';

export const store = configureStore();

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

import React from 'react';
import { hot } from 'react-hot-loader/root';

import Routes from './routes';
import NavigationBar from './containers/NavigationBar';

const App = () => {
    return (
        <>
            <NavigationBar />
            <Routes />
        </>
    );
};

export default hot(App);

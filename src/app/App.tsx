import React from 'react';
import Setup from './SetUp';
import { Provider } from 'react-redux';
import store from '../store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Setup />
        </Provider>
    );
};

export default App;

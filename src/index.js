import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './redux/rootReducer'
import {saveState,loadState} from './localStorage'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const persistedState = loadState();
console.log(persistedState)
const store = createStore(
    rootReducer,
    {
        list: persistedState && {
            list: persistedState.list
        },
        dictionary: persistedState && {
            dictionary: persistedState.dictionary,
            dictionaryLanguage: persistedState.dictionaryLanguage
        },
    }
);
store.subscribe(() => {
    saveState({
        list: store.getState().list.list,
        dictionary: store.getState().dictionary.dictionary,
        dictionaryLanguage: store.getState().dictionary.dictionaryLanguage
    });
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';                             // Access the store from anywhere inside the App.
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';


import reducers from './reducers'

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


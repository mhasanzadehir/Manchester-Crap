import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import App from "./containers/App";
import {Provider} from 'react-redux';


let store = createStore(reducer, applyMiddleware(thunk));
render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
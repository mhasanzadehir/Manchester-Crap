import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import store from './store'
import App from './containers/App'
import {addUserToState} from "./actions";


store.dispatch(addUserToState(null));
render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <App/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


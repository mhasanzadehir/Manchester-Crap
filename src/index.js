import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import store from './store'
import App from './containers/App'
import {addUserToState} from "./actions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {initializePage} from "./constansts/ActionTypes";

store.dispatch(initializePage());

render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


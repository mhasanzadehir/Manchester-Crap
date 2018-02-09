import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import store from './store'
import App from './containers/App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {APP_NAME} from "./constansts/AppDetail";

function render() {
    localStorage.setItem(APP_NAME, JSON.stringify(store.getState()));
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider>
                    <App/>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);


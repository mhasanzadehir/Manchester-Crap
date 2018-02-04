import React, {Component} from 'react';
import {Route , Switch} from 'react-router-dom'
import RegisterPage from './Register'
import MainPage from './MainPage'
import GamePage from "./GamePage";
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {APP_NAME} from "../constansts/AppDetail";


class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={RegisterPage}/>
                    <Route path='/MainPage' component={MainPage}/>
                    <Route path='/GamePage' component={GamePage}/>
                </Switch>
                <NotificationContainer/>
            </div>
        );
    }
}

export default App;

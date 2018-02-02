import React, {Component} from 'react';
import {Route , Switch} from 'react-router-dom'
import RegisterPage from './Register'
import MainPage from './MainPage'
import GamePage from "./GamePage";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={RegisterPage}/>
                    <Route path='/MainPage' component={MainPage}/>
                    <Route path='/GamePage' component={GamePage}/>
                </Switch>
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import {Route , Switch} from 'react-router-dom'
import RegisterPage from './Register'
import MainPage from './MainPage'
import GamePage from "./GamePage";
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {APP_NAME} from "../constansts/AppDetail";
import AppBar from 'material-ui/AppBar';
import {Drawer, FlatButton, MenuItem} from "material-ui";
import Logged from "../components/Logged";


class App extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            loggedIn: false
        };
        this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
    }

    onLeftIconButtonClick(){
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div>
                <AppBar
                    title={APP_NAME}
                    onLeftIconButtonClick={this.onLeftIconButtonClick}
                    onRightIconButtonClick={
                        this.state.loggedIn?
                            <FlatButton label="Login" />:
                            <Logged/>
                    }
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onClick={this.onLeftIconButtonClick}>Menu Item</MenuItem>
                    <MenuItem onClick={this.onLeftIconButtonClick}>Menu Item 2</MenuItem>
                </Drawer>
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
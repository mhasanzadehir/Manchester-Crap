import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import RegisterPage from './Register'
import MainPage from './MainPage'
import GamePage from "./GamePage";
import 'react-notifications/lib/notifications.css';
import {APP_NAME} from "../constansts/AppDetail";
import AppBar from 'material-ui/AppBar';
import {Dialog, Drawer, FlatButton, MenuItem, RaisedButton, Snackbar, TextField} from "material-ui";
import Logged from "../components/Logged";
import {parseSignIn} from "../init/parsInit";
import {addSnackText, closeSnackText} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class App extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            signed: false,
            signIn: {
                username: "",
                password: "",
                form: false,
            },
            signUp: {
                username: "",
                email: "",
                password: "",
                form: false,
            }
        };
        this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
        this.onRightIconButtonClick = this.onRightIconButtonClick.bind(this);
        this.signOnChange = this.signOnChange.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.singInSuccess = this.singInSuccess.bind(this);
    }

    onLeftIconButtonClick() {
        this.setState({
            open: !this.state.open
        })
    }

    signOnChange(event) {
        const state = this.state;
        state.signIn[event.target.name] = event.target.value;
        this.setState(state);
        console.log(this.props.snackText)
    }

    signUpSubmit(event) {

    }

    singInSuccess(user) {
        // this.props.addUserToState(user);
        // this.setState({redirect: true});
        // event.preventDefault();
        // Parse.User.logIn(this.state.username, this.state.password, {
        //     success: (user) => {
        //         NotificationManager.success("salam", "salam");
        //         this.props.addUserToState(user);
        //         this.setState({redirect: true});
        //     },
        //     error: (user, error) => {
        //         NotificationManager.error(error.message);
        //     }
        // });
    }

    onRightIconButtonClick() {

    }

    render() {
        return (
            <div>
                <AppBar
                    title={APP_NAME}
                    onLeftIconButtonClick={this.onLeftIconButtonClick}
                    onRightIconButtonClick={this.onRightIconButtonClick}
                    iconElementRight={this.state.signed
                        ? <Logged/>
                        : <FlatButton onClick={() => this.setState({signIn: {form: true}})} label="Sign In"/>}
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
                <Dialog
                    contentStyle={{textAlign: "center", width: "350px"}}

                    title="Sign In"
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={() => {
                                    this.setState({signIn: {form: false}})
                                }}
                            />
                            <RaisedButton
                                label="Sign In"
                                primary={true}
                                onClick={() => {
                                    parseSignIn(
                                        this.state.signIn.username,
                                        this.state.signIn.password,
                                        this.singInSuccess,
                                        this.props.addSnackText)
                                }}
                            />
                        </div>
                    }
                    modal={false}
                    open={this.state.signIn.form}
                    onRequestClose={() => this.setState({signIn: {form: false}})}
                >
                    <TextField
                        name="username"
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={this.signOnChange}
                        type="text"
                        value={this.state.signIn.username}
                    />
                    <TextField
                        name="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        onChange={this.signOnChange}
                        type="password"
                        value={this.state.signIn.password}
                    />
                    <FlatButton
                        label="Register now"
                        onClick={() => {
                            this.setState({signIn: {form: false}});
                            this.setState({signUp: {form: true}});
                        }
                        }/>
                </Dialog>
                <Dialog
                    contentStyle={{textAlign: "center", width: "350px"}}
                    title="Sing Up"
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={() => {
                                    this.setState({signUp: {form: false}})
                                }}
                            />
                            <RaisedButton
                                label="Sign Up"
                                primary={true}
                                // onClick={this.handleClose}
                            />
                        </div>
                    }
                    modal={false}
                    open={this.state.signUp.form}
                    onRequestClose={() => this.setState({signUp: {form: false}})}
                >

                    <TextField
                        name="username"
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={this.signOnChange}
                        type="text"
                        value={this.state.signUp.username}
                    />
                    <TextField
                        name="email"
                        hintText="Email"
                        floatingLabelText="Email"
                        onChange={this.signOnChange}
                        type="email"
                        value={this.state.signUp.email}
                    />
                    <TextField
                        name="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        onChange={this.signOnChange}
                        type="password"
                        value={this.state.signUp.password}
                    />
                </Dialog>
                <Switch>
                    <Route exact path='/' component={RegisterPage}/>
                    <Route path='/MainPage' component={MainPage}/>
                    <Route path='/GamePage' component={GamePage}/>
                </Switch>
                <Snackbar
                    open={this.props.snackIsOpen}
                    message={this.props.snackText}
                    autoHideDuration={5000}
                    onRequestClose={this.props.closeSnackText}
                />
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        snackText: state.pageStatus.snackText,
        snackIsOpen: state.pageStatus.snackIsOpen
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addSnackText: addSnackText,
        closeSnackText: closeSnackText
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
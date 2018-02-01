import React, {Component} from 'react';
import {parseInitializer} from "../init/parsInit";
import {connect} from 'react-redux'
import {addUserToState} from "../actions";


var Parse = parseInitializer();

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            code: '',
            // codeNumberDisplay:'none'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.signUp_error = this.signUp_error.bind(this);
        this.signUp_success = this.signUp_success.bind(this);


    }

    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit(e) {
        e.preventDefault();
        let user = new Parse.User();
        user.set("username", this.state.username);
        user.set("email", this.state.email);
        user.set("password", this.state.password);
        user.signUp(null, {
            success: (user) => {
                this.signUp_success(user)
            },
            error: (user, error) => {
                this.signUp_error(user, error)
            }
        });

    }

    signUp_success(user) {
        this.setState({error: "register complete please log in"});
        // Hooray! Let trem use tre app now.
    }

    signUp_error(user, error) {
        // Show tre error message somewhere and let tre user try again.
        this.setState({error: error.message});
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>username</td>
                            <td>
                                <input required="true" type="text" name="username" value={this.state.username}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>
                                <input type="email" name="email" value={this.state.email} onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>
                                <input type="password" name="password" value={this.state.password}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Register</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <p>{this.state.error}</p>
            </div>
        );
    }

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.logIn_success = this.logIn_success.bind(this);
        this.logIn_error = this.logIn_error.bind(this);

    }

    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (user) => this.logIn_success(user),
            error: (user, error) => this.logIn_error(user, error)
        });
    }

    logIn_success(user) {
        this.props.addUserToState(user);
    }

    logIn_error(user, error) {
        this.setState({error: error.message});
    }


    render() {
        return (
            <div>
                <h1>Log in</h1>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>username</td>
                            <td>
                                <input type="text" name="username" value={this.state.username}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>
                                <input type="password" name="password" value={this.state.password}
                                       onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Login</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <p>{this.state.error}</p>
            </div>
        );
    }

}


class RegisterPage extends Component {
    render() {
        return (
            <div>
                <Register/>
                <br/>
                <Login/>
            </div>
        );
    }

}

export default connect(
    null,
    {addUserToState: addUserToState}
)(RegisterPage)

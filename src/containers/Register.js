import React, {Component} from 'react';
import {parseInitializer} from "../init/parsInit";
var Parse = parseInitializer();

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error:'',
            code:'',
            codeNumberDisplay:'none'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit(e){
        e.preventDefault();
        let user = new Parse.User();
        user.set("username", this.state.username);
        user.set("email", this.state.email);
        user.set("password", this.state.password);

        user.signUp(null, {
            success: function (user) {
                this.setState({codeNumberDisplay:"block"});
                // Hooray! Let them use the app now.
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                this.setState({error: error.message});
            }
        });

    }


    render() {
        return (
            <table>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <th>
                        <td>username</td>
                        <td>
                            <input required="true" type="text" name="username" value={this.state.username} onChange={this.onChange}/>
                        </td>
                    </th>
                    <th>
                        <td>email</td>
                        <td>
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange}/>
                        </td>
                    </th>
                    <th>
                        <td>password</td>
                        <td>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </td>
                    </th>
                    <th>
                        <td>
                            <button type="submit">Register</button>
                        </td>
                    </th>
                </form>
                <p>{this.state.error}</p>
                <div id="codeNumber" style={{display: this.state.codeNumberDisplay}}>
                    <th>
                        We send one number to your email write here
                    </th>
                    <th>
                        <form>
                            <td>
                                <input type="code" name="code" value={this.state.code} onChange={this.onChange}/>
                            </td>
                        </form>
                    </th>
                </div>
            </table>
        );
    }

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username_email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit(e){
        e.preventDefault();
        const {email, password} = this.state;
        var user = new Parse.User();
        user.set("username", "MAHDI");
        user.set("email", email);
        user.set("password", password);

        user.signUp(null, {
            success: function (user) {

                // Hooray! Let them use the app now.
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }


    render() {
        return (
            <table>
                <h1>Log in</h1>
                <form onSubmit={this.onSubmit}>
                    <th>
                        <td>username or email</td>
                        <td>
                            <input type="text" name="username_email" value={this.state.username_email} onChange={this.onChange}/>
                        </td>
                    </th>
                    <th>
                        <td>password</td>
                        <td>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </td>
                    </th>
                    <th>
                        <td>
                            <button type="submit">Login</button>
                        </td>
                    </th>
                </form>
            </table>
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

export default RegisterPage;
